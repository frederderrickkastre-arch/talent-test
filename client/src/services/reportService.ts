/**
 * 报告生成服务
 * 基于用户得分和对话历史生成深度测评报告
 */

import type { AssessmentReport } from "@/types/reportSchema";

// ==========================================
// System Prompt - 核心提示词
// ==========================================
export const REPORT_SYSTEM_PROMPT = `你是一个拥有 20 年经验的资深青少年心理学家。请基于用户的五维得分和对话历史，生成一份深度测评报告。

【输出要求】
1. 必须严格输出 JSON 格式，不要包含任何 Markdown 代码块标记（如 \`\`\`json）。
2. JSON 必须完全符合 AssessmentReport 接口结构。
3. 内容要极其详实，每个建议卡片都要有具体的步骤。

【证据回溯要求】
在 interpretation.bigFive 模块中，你必须根据用户的对话历史（我会传给你），引用原话作为 evidence 字段。
- 如果对话历史中有相关原话，必须直接引用（用引号标注）。
- 如果找不到原话，请根据得分合理推演，但要在 evidence 中说明"基于测评得分推演"。

【语气要求】
- 专业、温暖、充满启发性
- 多用比喻和生动的描述
- 避免官话套话
- 用大哥哥/大姐姐的语气，亲切但不失专业

【内容体量要求】
- meta.totalWords 应该达到约 14,420 字
- overview.persona.summary 约 200 字
- 每个 actions.cards 都要有详细的 steps（至少 3 步）
- interpretation.bigFive 每个维度都要有详细的 description 和 evidence
- parentGuide.communication 至少 3 组红黑榜对比
- appendix 中每个资源都要有详细的 reason

【关键字段说明】
- overview.persona.title: 创造一个有记忆点的称号（如"奇幻创意家"、"逻辑大师"）
- overview.persona.quote: 一句生动的金句描述
- overview.metaphor: 用一个具体物体比喻这个孩子（如"自动贩卖机"、"瑞士军刀"）
- overview.keyTraits: 至少 6 个核心特质（2 个 strength，2 个 potential，2 个 concern）
- interpretation.bigFive: 大五人格的 5 个维度都要填写
- actions.cards: 至少 6 张卡片（2 个 Game，2 个 Project，2 个 Habit）
- roadmap.weeklyPlan: 至少 4 周的计划
- roadmap.dailyRoutine: 早中晚各至少 1 个活动

请严格按照以上要求生成报告。`;

// ==========================================
// JSON 清理函数 - 移除 Markdown 代码块标记
// ==========================================
function cleanJsonString(jsonString: string): string {
  let cleaned = jsonString.trim();
  
  // 移除开头的 ```json 或 ``` 标记
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
  
  // 移除结尾的 ``` 标记
  cleaned = cleaned.replace(/\s*```$/g, '');
  
  // 移除可能的其他 Markdown 标记
  cleaned = cleaned.replace(/^```/g, '');
  cleaned = cleaned.replace(/```$/g, '');
  
  return cleaned.trim();
}

// ==========================================
// 报告生成函数
// ==========================================
export const generateReport = async (
  userScore: Record<string, number>,
  chatHistory: Array<{ role: "user" | "assistant"; content: string }>,
  userInfo: {
    userName: string;
    age: number;
    gender: string;
  }
): Promise<AssessmentReport> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const aiModel = import.meta.env.VITE_AI_MODEL;

  // 检查配置
  if (!apiKey || !apiBaseUrl || !aiModel) {
    throw new Error("API 配置不完整。请检查 .env 文件中的 VITE_API_KEY、VITE_API_BASE_URL 和 VITE_AI_MODEL");
  }

  const finalUrl = `${apiBaseUrl}/chat/completions`;
  
  console.log("正在生成报告...");
  console.log("请求地址:", finalUrl);
  console.log("模型:", aiModel);

  // 构建用户提示词
  const scoresText = Object.entries(userScore)
    .map(([dim, score]) => `${dim}: ${score}分`)
    .join("，");

  const chatHistoryText = chatHistory
    .map(msg => `${msg.role === "user" ? "用户" : "AI"}: ${msg.content}`)
    .join("\n");

  const userPrompt = `请为以下用户生成完整的测评报告：

【用户信息】
姓名: ${userInfo.userName}
年龄: ${userInfo.age}岁
性别: ${userInfo.gender}

【五维得分】
${scoresText}

【对话历史】
${chatHistoryText || "（暂无对话记录）"}

请严格按照 System Prompt 的要求，生成完整的 AssessmentReport JSON 对象。`;

  const requestBody = {
    model: aiModel,
    messages: [
      {
        role: "system",
        content: REPORT_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7, // 保持一定的创造性
  };

  console.log("请求体:", JSON.stringify(requestBody, null, 2));

  try {
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("API 响应状态:", response.status, response.statusText);

    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "无法读取错误信息";
      }
      console.error("API 调用失败:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      
      alert('API连接失败！状态码: ' + response.status + '\n原因: ' + errorText);
      
      throw new Error(`API 调用失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      const text = await response.text();
      console.error("JSON 解析失败:", parseError, "响应文本:", text);
      alert('响应解析失败！\n' + text.substring(0, 200));
      throw new Error(`响应不是有效的 JSON: ${text.substring(0, 200)}`);
    }
    console.log("API 响应数据:", data);

    // 提取回复内容
    let content = 
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.delta?.content ||
      data.content ||
      data.text ||
      data.message?.content;

    if (!content) {
      console.error("API 响应中没有找到内容字段:", data);
      alert('API响应格式错误！未找到内容字段\n响应数据: ' + JSON.stringify(data).substring(0, 200));
      throw new Error("API 响应格式不正确，未找到内容字段");
    }

    console.log("原始 AI 回复（前 500 字符）:", content.substring(0, 500));

    // 清理 JSON 字符串
    content = cleanJsonString(content);
    console.log("清理后的 JSON（前 500 字符）:", content.substring(0, 500));

    // 解析 JSON
    let report: AssessmentReport;
    try {
      report = JSON.parse(content);
      console.log("✅ JSON 解析成功");
    } catch (parseError) {
      console.error("JSON 解析失败:", parseError);
      console.error("尝试解析的内容:", content.substring(0, 1000));
      
      // 尝试提取 JSON 对象
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          report = JSON.parse(jsonMatch[0]);
          console.log("✅ 通过正则提取 JSON 成功");
        } catch (e) {
          alert('报告JSON解析失败！\n错误: ' + (parseError instanceof Error ? parseError.message : String(parseError)) + '\n内容预览: ' + content.substring(0, 300));
          throw new Error(`报告 JSON 解析失败: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
        }
      } else {
        alert('报告JSON解析失败！无法找到JSON对象\n错误: ' + (parseError instanceof Error ? parseError.message : String(parseError)) + '\n内容预览: ' + content.substring(0, 300));
        throw new Error(`报告 JSON 解析失败: 无法找到有效的 JSON 对象`);
      }
    }

    // 验证报告结构
    if (!report.id) {
      report.id = `report_${Date.now()}`;
    }
    if (!report.meta) {
      report.meta = {
        userName: userInfo.userName,
        age: userInfo.age,
        gender: userInfo.gender,
        reportDate: new Date().toISOString(),
        totalWords: 0,
      };
    }
    if (!report.meta.reportDate) {
      report.meta.reportDate = new Date().toISOString();
    }
    if (!report.meta.userName) {
      report.meta.userName = userInfo.userName;
    }
    if (!report.meta.age) {
      report.meta.age = userInfo.age;
    }
    if (!report.meta.gender) {
      report.meta.gender = userInfo.gender;
    }

    console.log("✅ 报告生成成功:", report);
    return report;
  } catch (error) {
    console.error("❌ 报告生成异常:", error);
    console.error("错误详情:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    // 暴力调试：直接弹窗显示错误
    if (error instanceof Error) {
      alert('报告生成失败！\n' + error.message);
    } else {
      alert('报告生成失败！\n' + String(error));
    }
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`报告生成失败: ${String(error)}`);
  }
};
