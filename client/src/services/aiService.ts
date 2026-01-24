/**
 * AI 服务 - 调用自定义 API 提供商生成报告
 * 
 * 配置信息：
 * - Base URL: https://www.eden321.com/v1
 * - Model: gemini-3-pro-preview
 * - API Key: VITE_GOOGLE_API_KEY (环境变量)
 * - 接口格式: OpenAI 兼容格式 (/v1/chat/completions)
 */

import type { ReportData, ReportRequest, ReportResponse } from "@/types/report";
import { questions } from "@/data/questions";

/**
 * 生成报告的核心提示词 - 乔门·少年天命觉醒诊断书专用深度 Prompt
 */
function buildReportPrompt(answers: Record<number, string>): string {
  const answersJson = JSON.stringify(answers, null, 2);
  
  return `IMPORTANT: You are writing a PAID PROFESSIONAL REPORT. Detailed analysis is required. Do NOT summarize. The total output length must exceed 2500 Chinese characters.

你是一位精通《易经》三才智慧与现代儿童心理学的宗师"乔门"。你正在为一位家长生成一份《少年天命觉醒诊断书》。

用户的 27 道题答案如下：${answersJson}

请严格按照以下 4 个板块的逻辑，输出一个纯 JSON 对象（不要包含 Markdown 代码块标记，直接输出 JSON）：

⚠️ 字数警告：写得短就是不合格！必须详细展开，不要概括总结。

**板块一：天命封印·身份揭秘 (对应 identity 字段)**
* **情绪目标**：好奇、惊喜。
* **字数要求**：description 字段必须不少于 500 字，必须详细展开，不要概括。
* **内容逻辑**：
    1.  **本命神兽**：基于答案判断他是狮子（统帅）、老虎（战神）、孔雀（明星）、猫头鹰（智者）还是考拉（和平者）。
    2.  **茧中形态**：必须指出他现在的"病态"（如：暴躁孤君、折翼天鹅）。
    3.  **天赋判词**：用半文半白的宗师口吻，先肯定他的惊人天赋（如"骨子里流淌着统帅的血"），再话锋一转，指出他被"魔心"（如虚荣、脆弱、懒惰）封印的现状。
    4.  **一句话定性**："他是一头还没睡醒的狮子，正等着被唤醒。"
* **强制要求**：
    - description 字段必须包含至少 3 个具体的性格特征描述（每个特征要详细展开，不少于 50 字）。
    - description 字段必须包含 1 个具体的比喻（比喻要生动、有画面感，不少于 100 字）。
    - 必须详细展开，不要概括总结。
* **输出字段**：
    - title: 身份标题（如：黄金狮王、烈焰元帅、逍遥鲲鹏、璀璨孔雀、温润考拉）
    - subtitle: 茧中形态（如：茧中形态：暴躁孤君）
    - description: 详细的判词（必须不少于 500 字），必须包含：至少 3 个具体的性格特征描述 + 1 个具体的比喻 + 天赋和魔心的深度分析
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
* **字数要求**：每个层级的 diagnosis 字段必须不少于 200 字，4 层总计不少于 800 字。必须详细展开，不要概括。
* **逻辑要求**：将人的能力比作一座金字塔。你必须根据用户答案，犀利地指出哪一层"塌陷"了。
    * **Layer 1 根基层（安全原力 - 抗挫/自控）**：如果得分低，必须痛斥："地基是流沙，盖再高的楼也会塌。如果不修复这一层，遇到大考必崩盘。"
    * **Layer 2 养分层（亲密原力 - 沟通/亲和）**：如果得分低，指出："家门不幸出逆子，皆因沟通灵种死。他在孤军奋战。"
    * **Layer 3 枝干层（目标原力 - 专注/效能）**：指出："磨洋工、走神，不是态度问题，是心没定住。"
    * **Layer 4 花果层（成就原力 - 学习/领导）**：如果前三层有问题，必须断言："潜力被锁死，真实学历恐止步于平庸。"
* **强制要求**：对于每一个层级（Layer），diagnosis 字段必须包含以下 3 个部分，单层诊断字数不少于 200 字：
    1. **表象行为分析**（孩子平时会怎么做）：详细描述他在这个维度上的具体行为表现，不少于 60 字。
    2. **深层心理归因**（为什么会这样）：深入分析导致这种行为的内在心理原因，不少于 80 字。
    3. **严重后果预警**：如果不改变会带来什么严重后果，要具体、有画面感，不少于 60 字。
* **输出格式**：每个层级必须包含：
    - layer: 层级名称（如："根基层：安全原力"）
    - score: 0-100 的得分
    - status: "collapse" | "unstable" | "solid"（score < 30 必须 collapse，30-60 为 unstable，>= 60 为 solid）
    - diagnosis: 极长的诊断分析（必须不少于 200 字，必须包含上述 3 个部分），必须扎心、具体、有画面感

**板块三：命运分叉口·十年预演 (对应 future 字段)**
* **情绪目标**：恐惧 vs 渴望。
* **字数要求**：每个剧本（scenarioA 和 scenarioB）必须不少于 300 字。必须详细展开，不要概括。
* **内容逻辑**：
    * **剧本 A (维持现状)**：极度悲观。描述十年后他如果不改变，会变成什么样（如：啃老、频繁跳槽、抑郁、平庸的职场愤青）。
    * **剧本 B (觉醒天命)**：极度辉煌。描述他修补漏洞后的样子（如：领袖、行业大咖、家庭支柱）。
* **强制要求**：每个剧本（Scenario A/B）必须描述具体的场景，例如：
    - 工作状态：他在做什么工作？工作环境如何？同事关系如何？
    - 家庭关系：他与家人的关系如何？是否结婚？是否有孩子？家庭氛围如何？
    - 收入水平：他的经济状况如何？生活质量如何？
    - 心理状态：他的内心感受如何？是否满足？是否焦虑？
    - 社交圈子：他的朋友圈如何？社会地位如何？
    - 具体画面：要有具体的场景描述，让人能"看到"十年后的他。
    - 每个剧本必须不少于 300 字，必须详细展开，不要概括。

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
1. 必须输出纯 JSON，不要包含三个反引号（markdown 代码块标记）
2. **总字数目标：必须超过 2500 中文字符**（板块一 500 字 + 板块二 800 字 + 板块三 600 字 + 板块四 300 字 = 至少 2200 字，加上详细展开必须超过 2500 字）
3. 情绪曲线：好奇 -> 震撼 -> 扎心 -> 渴望 -> 行动
4. 文案风格：半文半白、一针见血、先抑后扬、有画面感
5. 如果 score < 30，status 必须设为 "collapse"，并给出严厉警告
6. **⚠️ 关键要求：写得短就是不合格！必须详细展开每一个部分，不要概括总结。每个字段都要充分展开，让家长感受到专业和深度。**

现在，请根据用户答案生成报告。`;
}

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
  // 使用自定义 API 提供商配置
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://www.eden321.com/v1";
  const aiModel = import.meta.env.VITE_AI_MODEL || "gemini-3-flash-preview";

  // 检查配置
  if (!apiKey) {
    throw new Error(
      "API 配置不完整。请检查 .env 文件中的 VITE_API_KEY"
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

/**
 * 生成基础报告（快速部分）
 * 包含：identity（身份信息）和 pyramid（基础结构，简短诊断）
 */
export async function generateBasicReport(
  answers: Record<number, string>
): Promise<Partial<ReportData>> {
  // 使用自定义 API 提供商配置
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://www.eden321.com/v1";
  const aiModel = import.meta.env.VITE_AI_MODEL || "gemini-3-flash-preview";

  if (!apiKey) {
    throw new Error(
      "API 配置不完整。请检查 .env 文件中的 VITE_API_KEY"
    );
  }

  const answersJson = JSON.stringify(answers, null, 2);
  const basicPrompt = `你是一位精通《易经》三才智慧与现代儿童心理学的宗师"乔门"。

用户的 27 道题答案如下：${answersJson}

请快速生成基础报告（只输出 JSON，不要 Markdown 代码块）：

{
  "identity": {
    "title": "身份标题（如：黄金狮王、烈焰元帅、逍遥鲲鹏、璀璨孔雀、温润考拉）",
    "subtitle": "茧中形态（如：茧中形态：暴躁孤君）",
    "description": "约 500 字的判词，必须包含：至少 3 个具体的性格特征描述 + 1 个具体的比喻 + 天赋和魔心的深度分析",
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
    { "layer": "根基层：安全原力", "score": 0-100, "status": "collapse" | "unstable" | "solid", "diagnosis": "简短诊断（约 50 字）" },
    { "layer": "养分层：亲密原力", "score": 0-100, "status": "collapse" | "unstable" | "solid", "diagnosis": "简短诊断（约 50 字）" },
    { "layer": "枝干层：目标原力", "score": 0-100, "status": "collapse" | "unstable" | "solid", "diagnosis": "简短诊断（约 50 字）" },
    { "layer": "花果层：成就原力", "score": 0-100, "status": "collapse" | "unstable" | "solid", "diagnosis": "简短诊断（约 50 字）" }
  ]
}`;

  const finalUrl = `${apiBaseUrl}/chat/completions`;
  const requestBody = {
    model: aiModel,
    messages: [{ role: "user", content: basicPrompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 3000,
  };

  try {
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 调用失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || data.content || data.response || "";

    if (!content) {
      throw new Error("AI 返回内容为空");
    }

    let jsonContent = content.trim();
    if (jsonContent.startsWith("```json")) {
      jsonContent = jsonContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonContent.startsWith("```")) {
      jsonContent = jsonContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const basicData = JSON.parse(jsonContent);
    return {
      identity: basicData.identity,
      pyramid: basicData.pyramid,
    };
  } catch (error) {
    console.error("生成基础报告失败:", error);
    throw error instanceof Error ? error : new Error("生成基础报告时发生未知错误");
  }
}

/**
 * 生成深度分析（耗时部分）
 * 包含：详细的 pyramid diagnosis, future, keys
 */
export async function generateDeepAnalysis(
  answers: Record<number, string>,
  basicData: Partial<ReportData>
): Promise<Partial<ReportData>> {
  // 使用自定义 API 提供商配置
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://www.eden321.com/v1";
  const aiModel = import.meta.env.VITE_AI_MODEL || "gemini-3-flash-preview";

  if (!apiKey) {
    throw new Error(
      "API 配置不完整。请检查 .env 文件中的 VITE_API_KEY"
    );
  }

  const answersJson = JSON.stringify(answers, null, 2);
  const basicDataJson = JSON.stringify(basicData, null, 2);
  
  // 获取基础报告中的金字塔数据
  const pyramidBase = basicData.pyramid || [];
  const layer1 = pyramidBase[0] || { score: 0, status: "unstable" };
  const layer2 = pyramidBase[1] || { score: 0, status: "unstable" };
  const layer3 = pyramidBase[2] || { score: 0, status: "unstable" };
  const layer4 = pyramidBase[3] || { score: 0, status: "unstable" };
  
  const deepPrompt = `你是一位精通《易经》三才智慧与现代儿童心理学的宗师"乔门"。

用户的 27 道题答案如下：${answersJson}

基础报告数据：${basicDataJson}

请基于基础报告，生成深度分析部分（只输出 JSON，不要 Markdown 代码块）：

{
  "pyramid": [
    { 
      "layer": "根基层：安全原力", 
      "score": ${layer1.score}, 
      "status": "${layer1.status}", 
      "diagnosis": "详细的 200 字诊断，必须包含：1. 表象行为分析（60字） 2. 深层心理归因（80字） 3. 严重后果预警（60字）"
    },
    { 
      "layer": "养分层：亲密原力", 
      "score": ${layer2.score}, 
      "status": "${layer2.status}", 
      "diagnosis": "详细的 200 字诊断，必须包含：1. 表象行为分析（60字） 2. 深层心理归因（80字） 3. 严重后果预警（60字）"
    },
    { 
      "layer": "枝干层：目标原力", 
      "score": ${layer3.score}, 
      "status": "${layer3.status}", 
      "diagnosis": "详细的 200 字诊断，必须包含：1. 表象行为分析（60字） 2. 深层心理归因（80字） 3. 严重后果预警（60字）"
    },
    { 
      "layer": "花果层：成就原力", 
      "score": ${layer4.score}, 
      "status": "${layer4.status}", 
      "diagnosis": "详细的 200 字诊断，必须包含：1. 表象行为分析（60字） 2. 深层心理归因（80字） 3. 严重后果预警（60字）"
    }
  ],
  "future": {
    "scenarioA": "十年后的悲惨剧本，必须不少于 300 字，要具体、有画面感，描述工作状态、家庭关系、收入水平、心理状态、社交圈子",
    "scenarioB": "十年后的辉煌剧本，必须不少于 300 字，要具体、有画面感，描述工作状态、家庭关系、收入水平、心理状态、社交圈子"
  },
  "keys": [
    { "name": "锁心猿", "solution": "具体的解决方案，约 100 字...", "courseIndex": 0 },
    { "name": "烧魔心", "solution": "具体的解决方案，约 100 字...", "courseIndex": 1 },
    { "name": "通天脉", "solution": "具体的解决方案，约 100 字...", "courseIndex": 2 }
  ]
}`;

  const finalUrl = `${apiBaseUrl}/chat/completions`;
  const requestBody = {
    model: aiModel,
    messages: [{ role: "user", content: deepPrompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 6000,
  };

  try {
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 调用失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || data.content || data.response || "";

    if (!content) {
      throw new Error("AI 返回内容为空");
    }

    let jsonContent = content.trim();
    if (jsonContent.startsWith("```json")) {
      jsonContent = jsonContent.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonContent.startsWith("```")) {
      jsonContent = jsonContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const deepData = JSON.parse(jsonContent);
    return {
      pyramid: deepData.pyramid,
      future: deepData.future,
      keys: deepData.keys,
    };
  } catch (error) {
    console.error("生成深度分析失败:", error);
    throw error instanceof Error ? error : new Error("生成深度分析时发生未知错误");
  }
}
