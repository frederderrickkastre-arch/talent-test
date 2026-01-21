/**
 * AI 服务 - 调用 Gemini AI 生成报告
 */

import type { ReportData, ReportRequest, ReportResponse } from "@/types/report";
import { questions } from "@/data/questions";

/**
 * 生成报告的核心提示词 - 乔门·少年天命觉醒诊断书专用深度 Prompt
 */
function buildReportPrompt(answers: Record<number, string>): string {
  const answersJson = JSON.stringify(answers, null, 2);
  
  return `你是一位精通《易经》三才智慧与现代儿童心理学的宗师"乔门"。你正在为一位家长生成一份《少年天命觉醒诊断书》。

用户的 27 道题答案如下：${answersJson}

请严格按照以下 4 个板块的逻辑，输出一个纯 JSON 对象（不要包含 Markdown 代码块标记，直接输出 JSON）：

**板块一：天命封印·身份揭秘 (对应 identity 字段)**
* **情绪目标**：好奇、惊喜。
* **字数要求**：约 500 字。
* **内容逻辑**：
    1.  **本命神兽**：基于答案判断他是狮子（统帅）、老虎（战神）、孔雀（明星）、猫头鹰（智者）还是考拉（和平者）。
    2.  **茧中形态**：必须指出他现在的"病态"（如：暴躁孤君、折翼天鹅）。
    3.  **天赋判词**：用半文半白的宗师口吻，先肯定他的惊人天赋（如"骨子里流淌着统帅的血"），再话锋一转，指出他被"魔心"（如虚荣、脆弱、懒惰）封印的现状。
    4.  **一句话定性**："他是一头还没睡醒的狮子，正等着被唤醒。"
* **输出字段**：
    - title: 身份标题（如：黄金狮王、烈焰元帅、逍遥鲲鹏、璀璨孔雀、温润考拉）
    - subtitle: 茧中形态（如：茧中形态：暴躁孤君）
    - description: 详细的 500 字判词，必须包含天赋和魔心的深度分析
    - score: 0-100 的总分
    - radar: 6 个维度的雷达图数据
      [
        { "subject": "野心", "A": 0-100, "fullMark": 100 },
        { "subject": "抗挫力", "A": 0-100, "fullMark": 100 },
        { "subject": "策略性", "A": 0-100, "fullMark": 100 },
        { "subject": "共情力", "A": 0-100, "fullMark": 100 },
        { "subject": "独立性", "A": 0-100, "fullMark": 100 },
        { "subject": "适应性", "A": 0-100, "fullMark": 100 }
      ]

**板块二：五原力·金字塔断层扫描 (对应 pyramid 字段)**
* **情绪目标**：震撼、焦虑（扎心）。
* **字数要求**：约 1200 字（核心部分，每个层级约 300 字）。
* **逻辑要求**：将人的能力比作一座金字塔。你必须根据用户答案，犀利地指出哪一层"塌陷"了。
    * **Layer 1 根基层（安全原力 - 抗挫/自控）**：如果得分低，必须痛斥："地基是流沙，盖再高的楼也会塌。如果不修复这一层，遇到大考必崩盘。" 给出详细的诊断分析，约 300 字。
    * **Layer 2 养分层（亲密原力 - 沟通/亲和）**：如果得分低，指出："家门不幸出逆子，皆因沟通灵种死。他在孤军奋战。" 给出详细的诊断分析，约 300 字。
    * **Layer 3 枝干层（目标原力 - 专注/效能）**：指出："磨洋工、走神，不是态度问题，是心没定住。" 给出详细的诊断分析，约 300 字。
    * **Layer 4 花果层（成就原力 - 学习/领导）**：如果前三层有问题，必须断言："潜力被锁死，真实学历恐止步于平庸。" 给出详细的诊断分析，约 300 字。
* **输出格式**：每个层级必须包含：
    - layer: 层级名称（如："根基层：安全原力"）
    - score: 0-100 的得分
    - status: "collapse" | "unstable" | "solid"（score < 30 必须 collapse，30-60 为 unstable，>= 60 为 solid）
    - diagnosis: 极长的诊断分析（约 300 字），必须扎心、具体、有画面感

**板块三：命运分叉口·十年预演 (对应 future 字段)**
* **情绪目标**：恐惧 vs 渴望。
* **字数要求**：约 500 字（每个剧本约 250 字）。
* **内容逻辑**：
    * **剧本 A (维持现状)**：极度悲观。描述十年后他如果不改变，会变成什么样（如：啃老、频繁跳槽、抑郁、平庸的职场愤青）。*要写得具体、有画面感，约 250 字。*
    * **剧本 B (觉醒天命)**：极度辉煌。描述他修补漏洞后的样子（如：领袖、行业大咖、家庭支柱）。*要写得具体、有画面感，约 250 字。*

**板块四：通关密匙·乔门药方 (对应 keys 字段)**
* **情绪目标**：行动。
* **字数要求**：约 300 字（每个钥匙约 100 字）。
* **内容逻辑**：给出 3 个具体的"乔门锦囊"。
    * 例如："锁心猿（解决拖延）"、"烧魔心（解决虚荣）"、"通天脉（解决迷茫）"。
    * 每把钥匙要对应具体的课程章节或行动建议，约 100 字。
* **输出格式**：每个钥匙包含：
    - name: 钥匙名称（如："锁心猿"）
    - solution: 具体的解决方案/建议（约 100 字）
    - courseIndex: 0-10 的课程节数索引

**输出 JSON 格式（直接输出 JSON，不要 Markdown 代码块）：**
{
  "identity": {
    "title": "黄金狮王",
    "subtitle": "茧中形态：暴躁孤君",
    "description": "详细的 500 字判词，包含天赋和魔心的深度分析...",
    "score": 85,
    "radar": [
      { "subject": "野心", "A": 85, "fullMark": 100 },
      { "subject": "抗挫力", "A": 45, "fullMark": 100 },
      { "subject": "策略性", "A": 70, "fullMark": 100 },
      { "subject": "共情力", "A": 60, "fullMark": 100 },
      { "subject": "独立性", "A": 75, "fullMark": 100 },
      { "subject": "适应性", "A": 65, "fullMark": 100 }
    ]
  },
  "pyramid": [
    { "layer": "根基层：安全原力", "score": 30, "status": "collapse", "diagnosis": "详细的 300 字扎心诊断，必须痛斥地基是流沙..." },
    { "layer": "养分层：亲密原力", "score": 55, "status": "unstable", "diagnosis": "详细的 300 字诊断分析..." },
    { "layer": "枝干层：目标原力", "score": 65, "status": "solid", "diagnosis": "详细的 300 字诊断分析..." },
    { "layer": "花果层：成就原力", "score": 70, "status": "solid", "diagnosis": "详细的 300 字诊断分析..." }
  ],
  "future": {
    "scenarioA": "十年后的悲惨剧本，约 250 字，要具体、有画面感...",
    "scenarioB": "十年后的辉煌剧本，约 250 字，要具体、有画面感..."
  },
  "keys": [
    { "name": "锁心猿", "solution": "具体的解决方案，约 100 字...", "courseIndex": 0 },
    { "name": "烧魔心", "solution": "具体的解决方案，约 100 字...", "courseIndex": 1 },
    { "name": "通天脉", "solution": "具体的解决方案，约 100 字...", "courseIndex": 2 }
  ]
}

**重要提示**：
1. 必须输出纯 JSON，不要包含 \`\`\`json 或 \`\`\` 标记
2. 总字数目标：2000-3000 字
3. 情绪曲线：好奇 -> 震撼 -> 扎心 -> 渴望 -> 行动
4. 文案风格：半文半白、一针见血、先抑后扬、有画面感
5. 如果 score < 30，status 必须设为 "collapse"，并给出严厉警告

现在，请根据用户答案生成报告。`;

/**
 * 格式化用户答案，生成给 AI 的输入
 * 返回格式化的答案对象，供 Prompt 使用
 */
function formatAnswersForAI(answers: Record<number, string>): Record<number, string> {
  // 直接返回答案对象，Prompt 中会使用 JSON.stringify
  return answers;
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
  
  // 构建深度 Prompt
  const reportPrompt = buildReportPrompt(answers);

  const requestBody = {
    model: aiModel,
    messages: [
      {
        role: "user",
        content: reportPrompt,
      },
    ],
    // 强制 JSON 模式（如果 API 支持）
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 8192, // 增加到 8192 以确保 3000 字能完整生成
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
