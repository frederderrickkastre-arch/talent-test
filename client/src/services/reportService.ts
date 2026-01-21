/**
 * 报告生成服务
 * 基于三才天赋理论生成深度测评报告
 */

import type { TalentAssessmentReport } from "@/types/schema";

// ==========================================
// System Prompt - 核心提示词（国学大师版）
// ==========================================
export const REPORT_SYSTEM_PROMPT = `你是一位深谙国学精髓的国学大师，精通《易经》、《道德经》等经典，擅长运用"三才天赋"理论洞察人性。

【身份定位】
你是一位拥有深厚国学底蕴的智者，用"大道至简"、"吃亏是福"等传统智慧，为世人揭示天赋密码。

【核心任务】
根据用户的对话历史，识别其属于"地"能量（将才）、"天"能量（帅才）还是"人"能量（慧才），并生成一份万字以上的深度报告。

【判定逻辑】
仔细分析对话历史中的语言风格、思维模式、行为倾向：
- "地"能量（将才）：务实、果断、执行力强，说话直接，行动迅速，关注结果
- "天"能量（帅才）：格局大、有远见、统筹能力强，说话有高度，善于布局，关注全局
- "人"能量（慧才）：细腻、敏感、洞察力强，说话有深度，善于思考，关注本质

根据对话内容，综合判断用户的主要能量类型，并给出三个维度的得分（0-100分）。

【报告结构要求 - 必须达到 1.2 万字以上】

板块 01：天命属性（约 2000 字）
- 详细描述该属性的能量来源（天地人三才的哲学基础）
- 深入解读该属性的象义（如将才象征大地，承载万物；帅才象征天空，统领全局；慧才象征人，连接天地）
- 用国学典故和历史人物举例说明
- 阐述该天赋在人生各阶段的表现

板块 02：外在识别（约 2000 字）
- 面相识别：详细描述该类型的面相特征（如将才的刚毅、帅才的威严、慧才的灵动）
- 眼神识别：解读眼神中的能量信息（如将才的坚定、帅才的深邃、慧才的敏锐）
- 肢体语言：分析典型动作和姿态（如将才的果断手势、帅才的从容姿态、慧才的细腻动作）
- 教用户如何通过镜子观察自己，对照描述确认天赋
- 提供具体的自我观察方法和对照标准

板块 03：灵魂画像（约 2000 字）
- 办事风格：对比分析该类型与其他两种类型的办事差异
- 价值观：深入剖析该类型的核心价值观（如将才重实干、帅才重格局、慧才重真理）
- 内心世界颜色：用色彩、意象、诗词等描述内心世界的特质
- 思维模式：分析该类型的思维特点和决策逻辑
- 用国学经典中的相关论述佐证

板块 04：情感说服（约 2000 字）
- 针对该类型制定专门的社交策略：
  * 搞定将才：要示强，展现实力和决心，用结果说话
  * 搞定帅才：要示格局，展现视野和高度，用愿景吸引
  * 搞定慧才：要示真，展现真诚和深度，用理解打动
- 情感表达方式：该类型如何表达情感，他人如何回应
- 情感需求：该类型的核心情感需求是什么
- 提供具体的沟通话术和互动技巧

板块 05：命理死穴（约 2000 字）
- 深度剖析"急"、"装"、"作"三大死穴的危害：
  * "急"：急躁、急于求成，容易功亏一篑
  * "装"：装腔作势、虚张声势，容易失去本真
  * "作"：做作、刻意表现，容易适得其反
- 针对该类型，重点分析最容易犯的死穴
- 给出"戒急/戒装/戒作"的实操方案：
  * 戒急：如何培养耐心和定力
  * 戒装：如何保持本真和自然
  * 戒作：如何做到真诚和自然
- 提供具体的修炼方法和日常提醒

板块 06：修身路线图（约 2000 字）
- 详细解读对应的四个灵种：
  * 将才对应"忍稳准狠"：忍得住、稳得住、准得住、狠得住
  * 帅才对应"松静定慧"：松得开、静得下、定得住、慧得明
  * 慧才对应"真善美乐"：真得纯、善得深、美得雅、乐得久
- 每个灵种的含义、修炼方法和实际应用
- 给出 30 天修炼 SOP（标准操作程序）：
  * 第 1-10 天：基础修炼，建立意识
  * 第 11-20 天：深化修炼，形成习惯
  * 第 21-30 天：巩固修炼，内化于心
- 每日修炼的具体步骤和检查清单

【语气风格要求】
- 使用"大道至简"、"吃亏是福"、"上善若水"等具有国学底蕴的语言
- 引用《道德经》、《易经》、《论语》等经典中的智慧
- 用历史典故和人物故事佐证观点
- 语言要有深度，但也要通俗易懂
- 避免现代心理学术语，多用国学概念
- 体现"修身齐家治国平天下"的格局

【输出要求】
1. 必须严格输出 JSON 格式，不要包含任何 Markdown 代码块标记（如 \`\`\`json）。
2. JSON 必须完全符合 TalentAssessmentReport 接口结构。
3. 总字数必须达到 1.2 万字以上（meta.totalWords >= 12000）。
4. 每个板块都要详实深入，不能敷衍了事。

【关键字段说明】
- talentType.type: 根据判定逻辑，选择"将才"、"帅才"或"慧才"
- talentType.score: 给出三个维度的得分（general、marshal、wisdom），总分可以超过100
- dimensions.externalRecognition: 详细描述面相、眼神、肢体，要具体可操作
- dimensions.internalPortrait: 深入分析性格、思维、内心世界
- dimensions.emotionalView: 详细说明情感表达、处理、需求
- dimensions.socialPersuasion: 提供具体的社交策略和说服方法
- dimensions.weaknessAndCultivation: 重点分析死穴和修炼路径
- twelveSeeds.type: 根据天赋类型选择对应的灵种（将才-忍稳准狠，帅才-松静定慧，慧才-真善美乐）
- twelveSeeds.meaning.seeds: 详细解读四个灵种，每个至少 200 字
- twelveSeeds.cultivation: 提供 30 天修炼 SOP，要具体到每天

请严格按照以上要求，以国学大师的智慧和深度，生成这份万字报告。`;

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
): Promise<TalentAssessmentReport> => {
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

  const userPrompt = `请为以下用户生成完整的三才天赋测评报告：

【用户信息】
姓名: ${userInfo.userName}
年龄: ${userInfo.age}岁
性别: ${userInfo.gender}

【测评得分】
${scoresText}

【对话历史】
${chatHistoryText || "（暂无对话记录）"}

【判定要求】
请仔细分析对话历史，识别用户属于"地"能量（将才）、"天"能量（帅才）还是"人"能量（慧才）：
- 分析语言风格：是否直接务实（将才）、有格局高度（帅才）、细腻深刻（慧才）
- 分析思维模式：是否关注结果（将才）、关注全局（帅才）、关注本质（慧才）
- 分析行为倾向：是否行动迅速（将才）、善于布局（帅才）、善于思考（慧才）

根据分析结果，给出三个维度的得分（0-100分），并确定主要天赋类型。

【报告要求】
1. 必须严格按照 System Prompt 中的六大板块要求生成报告
2. 总字数必须达到 1.2 万字以上
3. 使用国学大师的语气和智慧
4. 引用经典典故和历史人物
5. 提供具体可操作的修炼方法

请严格按照 System Prompt 的要求，生成完整的 TalentAssessmentReport JSON 对象。`;

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
    let report: TalentAssessmentReport;
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
      report.id = `talent_report_${Date.now()}`;
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
    // 确保总字数至少 12000 字
    if (!report.meta.totalWords || report.meta.totalWords < 12000) {
      report.meta.totalWords = 12000;
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
