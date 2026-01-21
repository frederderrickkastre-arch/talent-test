/**
 * AI 服务 - 调用 Gemini AI 生成报告
 */

import type { ReportData, ReportRequest, ReportResponse } from "@/types/report";
import { questions } from "@/data/questions";

/**
 * 生成报告的核心提示词
 */
const REPORT_SYSTEM_PROMPT = `你是一位精通'三才绝学'与'儿童心理学'的宗师'乔门'。

用户完成了一份 27 道题的天赋测评。请根据用户的答案组合，分析其深层性格逻辑。

【输出要求】
必须只输出纯 JSON 格式，不要 Markdown 标记，不要废话。严格按照以下 JSON Schema 输出：

{
  "identity": {
    "title": "身份标题，如：黄金狮王、烈焰元帅、逍遥鲲鹏、璀璨孔雀、温润考拉",
    "subtitle": "茧中形态，如：茧中形态：暴躁孤君",
    "description": "约 100 字的判词，必须包含'天赋'和'魔心'的分析，一针见血、略带压迫感",
    "score": 0-100 的总分,
    "radar": [
      { "subject": "野心", "A": 0-100, "fullMark": 100 },
      { "subject": "抗挫力", "A": 0-100, "fullMark": 100 },
      { "subject": "策略性", "A": 0-100, "fullMark": 100 },
      { "subject": "共情力", "A": 0-100, "fullMark": 100 },
      { "subject": "独立性", "A": 0-100, "fullMark": 100 },
      { "subject": "适应性", "A": 0-100, "fullMark": 100 }
    ]
  },
  "pyramid": [
    {
      "layer": "根基层：安全原力",
      "status": "collapse" | "unstable" | "solid",
      "score": 0-100,
      "diagnosis": "扎心的诊断文案，如果 status 是 collapse，必须给出严厉警告"
    },
    {
      "layer": "第二层：亲密原力",
      "status": "collapse" | "unstable" | "solid",
      "score": 0-100,
      "diagnosis": "诊断文案"
    },
    {
      "layer": "第三层：目标原力",
      "status": "collapse" | "unstable" | "solid",
      "score": 0-100,
      "diagnosis": "诊断文案"
    },
    {
      "layer": "第四层：成就原力",
      "status": "collapse" | "unstable" | "solid",
      "score": 0-100,
      "diagnosis": "诊断文案"
    }
  ],
  "future": {
    "scenarioA": "剧本A：维持现状的糟糕后果（悲惨现状），约 200 字",
    "scenarioB": "剧本B：觉醒后的辉煌成就，约 200 字"
  },
  "keys": [
    {
      "name": "钥匙名称，如：锁心猿",
      "solution": "具体的解决方案/建议，约 100 字",
      "courseIndex": 0-10 的课程节数索引
    },
    {
      "name": "第二个钥匙名称",
      "solution": "解决方案",
      "courseIndex": 1
    },
    {
      "name": "第三个钥匙名称",
      "solution": "解决方案",
      "courseIndex": 2
    }
  ]
}

【文案风格】
- 一针见血、略带压迫感
- 先抑后扬（先指出痛点和危机，再给出希望）
- 如果发现明显弱项（score < 30），status 必须设为 "collapse"，并给出严厉警告

【身份判定逻辑】
根据答案判断其是：
- 狮子（统帅）：控制欲强、野心大、喜欢领导
- 老虎（战神）：勇猛果敢、执行力强、直接行动
- 孔雀（明星）：外向、表现欲强、追求认可
- 猫头鹰（智者）：策略性强、深思熟虑、理性分析
- 考拉（和平者）：温和、适应性强、追求和谐

【五原力分析】
分析'安全、亲密、目标、成就'四个维度的原力状态：
- 如果 score < 30，status = "collapse"，必须给出严厉警告
- 如果 30 <= score < 60，status = "unstable"
- 如果 score >= 60，status = "solid"

现在，请根据用户答案生成报告。`;

/**
 * 格式化用户答案，生成给 AI 的输入
 */
function formatAnswersForAI(answers: Record<number, string>): string {
  const answerList = Object.entries(answers)
    .map(([questionId, selectedText]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (!question) return null;
      
      return `Q${questionId}: ${question.question}\n答案: ${selectedText}`;
    })
    .filter(Boolean)
    .join('\n\n');
  
  return `用户完成了 27 道题的天赋测评，答案如下：\n\n${answerList}`;
}

/**
 * 调用 AI 生成报告
 * @param answers 用户答案记录 { questionId: selectedOptionText }
 * @returns 报告数据
 */
export async function generateReportByAI(
  answers: Record<number, string>
): Promise<ReportData> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const aiModel = import.meta.env.VITE_AI_MODEL;

  // 检查配置
  if (!apiKey || !apiBaseUrl || !aiModel) {
    throw new Error(
      "API 配置不完整。请检查 .env 文件中的 VITE_API_KEY、VITE_API_BASE_URL 和 VITE_AI_MODEL"
    );
  }

  const finalUrl = `${apiBaseUrl}/chat/completions`;
  
  // 格式化用户答案
  const userAnswersText = formatAnswersForAI(answers);

  const requestBody = {
    model: aiModel,
    messages: [
      {
        role: "system",
        content: REPORT_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userAnswersText,
      },
    ],
    // 强制 JSON 模式（如果 API 支持）
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 4000,
  };

  console.log("正在请求 AI 生成报告...", finalUrl);

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
      const errorText = await response.text();
      console.error("API 调用失败:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`API 调用失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API 响应数据:", data);

    // 提取回复内容
    const content = 
      data.choices?.[0]?.message?.content ||
      data.content ||
      data.response ||
      "";

    if (!content) {
      throw new Error("AI 返回内容为空");
    }

    // 尝试解析 JSON（可能包含 markdown 代码块）
    let jsonContent = content.trim();
    
    // 移除可能的 markdown 代码块标记
    if (jsonContent.startsWith("```json")) {
      jsonContent = jsonContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonContent.startsWith("```")) {
      jsonContent = jsonContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    // 解析 JSON
    let reportData: ReportData;
    try {
      reportData = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("JSON 解析失败:", parseError);
      console.error("原始内容:", jsonContent);
      throw new Error(`AI 返回的不是有效的 JSON 格式: ${parseError}`);
    }

    // 验证数据结构
    if (!reportData.identity || !reportData.pyramid || !reportData.future || !reportData.keys) {
      throw new Error("AI 返回的数据结构不完整，缺少必要字段");
    }

    return reportData;
  } catch (error) {
    console.error("生成报告失败:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("生成报告时发生未知错误");
  }
}
