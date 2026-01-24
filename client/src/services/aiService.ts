/**
 * AI 服务 - 四阶金字塔报告生成
 * 
 * 报告结构：
 * 1. 元神觉醒（三才金字塔底层）
 * 2. 五原力雷达（能量引擎层）
 * 3. 12灵种与人生剧本（生命图谱层）
 * 4. 终极形态唤醒（生命跨越层）
 * 
 * 总字数：严控 2500 字以上
 */

import type { ReportData } from "@/types/report";

/**
 * 构建四阶金字塔报告的深度 Prompt
 */
function buildFourTierPyramidPrompt(answers: Record<number, string>): string {
  const answersJson = JSON.stringify(answers, null, 2);
  
  return `【身份设定】
你是"乔门宗师"——一位融贯《易经》三才智慧、盖洛普优势理论、MBTI 性格分析和霍兰德职业测评的顶尖大师。你正在为一位 8-16 岁少年的家长撰写一份《少年天命觉醒诊断书》。

【核心使命】
这是一份改变孩子命运的付费报告。你必须像一位阅人无数的宗师在指点迷津，文字要扎心、有穿透力、让家长如醍醐灌顶。杜绝任何空洞的"AI 腔"和敷衍的概括。

【用户测评答案】
${answersJson}

【输出要求】
1. 直接输出纯 JSON，不要任何 Markdown 代码块标记
2. 总字数必须超过 2500 中文字符
3. 情绪曲线：震撼→扎心→焦虑→渴望→行动
4. 文风：半文半白的宗师口吻，先肯定再痛斥，有画面感

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
第一板块：元神觉醒（三才金字塔底层）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【三才排序】
根据答案计算帅才/将才/慧才的得分，按高低排列为：
- 天命高才（得分最高）：这是他的核心天赋，与生俱来
- 器用中才（得分中等）：这是他的辅助能力，可被激活
- 觉醒低才（得分最低）：这是他的短板，需要修炼

【角色定义】
根据"天命高才"判定所属系统和角色：
- 帅才高 → 天系：霸道统帅、烈焰元帅、黄金狮王
- 将才高 → 人系：温暖守护、仁义豪杰、铁血战神
- 慧才高 → 地系：深谋谋士、智慧古灯、逍遥鲲鹏

【蜕变环设计】
茧中形态（现状）：
- 必须描述他被"魔心"困住的平庸状态
- 帅才的魔心是"虚荣"：怕丢脸、爱面子、输不起
- 将才的魔心是"多疑"：患得患失、过度敏感、摇摆不定
- 慧才的魔心是"嫉妒/吝啬"：斤斤计较、怕吃亏、不愿分享

终极形态（目标）：
- 描述魔心转变为"天心"后的圆满状态
- 帅才觉醒天心"义"：敢做敢当、不惧失败、大义凛然
- 将才觉醒天心"仁"：内心安定、信任他人、仁者无忧
- 慧才觉醒天心"智"：格局宏大、乐于分享、智者无惑

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
第二板块：五原力雷达（能量引擎层）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【五原力提炼】
基于盖洛普优势和 MBTI 维度，提炼五大核心原力：
1. 执行原力：行动力、自控力、专注力（对应 J/P 维度 + 盖洛普执行力）
2. 影响原力：领导力、说服力、气场（对应 E/I 维度 + 盖洛普影响力）
3. 关系原力：共情力、亲和力、团队协作（对应 F/T 维度 + 盖洛普关系建立）
4. 战略原力：策略性、分析力、全局观（对应 N/S 维度 + 盖洛普战略思维）
5. 直觉原力：洞察力、创造力、第六感（综合判断）

【雷达图分析】
- 深度解析能量的高低分布：哪个最强？哪个最弱？
- 分析原力之间的互补关系：强项如何带动弱项？弱项如何拖累强项？

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
第三板块：12灵种与人生剧本（生命图谱层）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【12灵种映射】
根据测评选择，映射 12 颗灵种的状态（沉睡/萌芽/觉醒）：

价值判断三灵种：
- 美丑（帅才核心）：在乎外在形象、面子、地位
- 真假（将才核心）：在乎真诚、信任、情感
- 善恶（慧才核心）：在乎对错、利弊、价值

欲望动力三灵种：
- 支配欲（帅才驱动）：追求控制、权力、领导
- 陶醉欲（将才驱动）：追求被爱、认可、归属
- 积累欲（慧才驱动）：追求知识、财富、安全

心力修行三灵种：
- 胆量（帅才修行）：面对失败的勇气
- 定力（将才修行）：抵抗诱惑的意志
- 格局（慧才修行）：超越得失的视野

天心觉醒三灵种：
- 勇气（帅转义）：勇者无畏
- 仁爱（将转仁）：仁者无忧
- 智慧（慧转智）：智者无惑

【学业与人生镜像 - 核心重点！】
⚠️ 这是报告最扎心的部分！必须通过 12 灵种的缺失，深度解释为什么孩子现在学习不好。

举例逻辑：
- 如果帅才高但"胆量"灵种沉睡 → 他因虚荣心太重，怕做错题丢脸，所以遇到难题就逃避放弃
- 如果将才高但"定力"灵种沉睡 → 他因多疑心太重，怕被同学议论，所以上课走神不敢举手
- 如果慧才高但"格局"灵种沉睡 → 他因嫉妒心太重，看到别人进步就焦虑，无法专注自己

必须用"照妖镜"的方式，让家长恍然大悟："原来孩子学习不好，根源在这里！"

【未来警示】
必须明确指出：如果现在不修正这些"学习上的短路"，未来在职场会如何演变成"事业的崩塌"。

要具体、有画面感，让家长感受到强烈的紧迫感：
- 帅才不觉醒：未来遇到职场批评就愤然辞职，频繁跳槽，35岁成为职场弃儿
- 将才不觉醒：未来无法建立稳固的职场人脉，被边缘化，孤立无援
- 慧才不觉醒：未来斤斤计较得罪同事，升职无望，困在基层怨天尤人

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
第四板块：终极形态唤醒（生命跨越层）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【巅峰描述】
描绘孩子完全解锁"天心"后的终极人生图景。
要让家长极其向往，热泪盈眶，愿意付出一切来帮助孩子达到这个状态：
- 事业：行业领袖、受人尊敬、影响深远
- 家庭：孝顺父母、夫妻恩爱、教子有方
- 社交：知己满天下、贵人常相助
- 内心：从容淡定、智慧通达、活出真我

【解锁密钥】
给出具体的修行方案：
1. 改变命运的一句话：一句能刻进骨子里的觉醒咒语
2. 三个具体修行动作：每个动作对应一个课程章节

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【JSON 输出格式】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "yuanShen": {
    "sanCaiRanking": [
      { "type": "帅才/将才/慧才", "rank": "天命高才", "score": 0-100 },
      { "type": "帅才/将才/慧才", "rank": "器用中才", "score": 0-100 },
      { "type": "帅才/将才/慧才", "rank": "觉醒低才", "score": 0-100 }
    ],
    "roleDefinition": {
      "system": "天系/人系/地系",
      "roleName": "霸道统帅/深谋谋士/黄金守护者等",
      "description": "角色描述（不少于100字）"
    },
    "transformation": {
      "cocoonForm": {
        "name": "茧中形态名称（如暴躁孤君）",
        "moXin": "虚荣/多疑/嫉妒",
        "description": "被魔心困住的详细描述（不少于150字），要具体、扎心"
      },
      "ultimateForm": {
        "name": "终极形态名称（如黄金狮王）",
        "tianXin": "义/仁/智",
        "description": "觉醒天心后的详细描述（不少于150字），要辉煌、令人向往"
      }
    }
  },
  "wuYuanLi": {
    "forces": [
      { "subject": "执行", "score": 0-100, "fullMark": 100, "brief": "一句话描述" },
      { "subject": "影响", "score": 0-100, "fullMark": 100, "brief": "一句话描述" },
      { "subject": "关系", "score": 0-100, "fullMark": 100, "brief": "一句话描述" },
      { "subject": "战略", "score": 0-100, "fullMark": 100, "brief": "一句话描述" },
      { "subject": "直觉", "score": 0-100, "fullMark": 100, "brief": "一句话描述" }
    ],
    "distributionAnalysis": "能量高低分布深度解读（不少于200字）",
    "complementAnalysis": "原力互补关系深度解读（不少于200字）"
  },
  "lingZhong": {
    "lingZhongs": [
      { "type": "美丑", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "真假", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "善恶", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "支配欲", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "陶醉欲", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "积累欲", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "胆量", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "定力", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "格局", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "勇气", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "仁爱", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" },
      { "type": "智慧", "status": "沉睡/萌芽/觉醒", "score": 0-100, "diagnosis": "简短诊断" }
    ],
    "academicMirror": {
      "rootCause": "学业问题的根源分析（不少于150字），用照妖镜的方式揭示真相",
      "manifestations": [
        "具体表现1：详细描述孩子学习中的某个问题行为",
        "具体表现2：详细描述孩子学习中的某个问题行为",
        "具体表现3：详细描述孩子学习中的某个问题行为"
      ],
      "psychologyExplanation": "深层心理机制解释（不少于150字），要让家长恍然大悟"
    },
    "futureWarning": "未来警示（不少于300字）：如果不修正，学习短路如何演变成事业崩塌，要具体、有画面感、让家长感到紧迫"
  },
  "ultimate": {
    "peakVision": "巅峰人生图景（不少于400字）：描绘孩子完全觉醒后的辉煌人生，要让家长热泪盈眶、极其向往",
    "unlockKeys": {
      "destinyQuote": "改变命运的一句话（简短有力，能刻进骨子里）",
      "practiceActions": [
        { "name": "修行动作1名称", "method": "具体方法（不少于100字）", "courseIndex": 0 },
        { "name": "修行动作2名称", "method": "具体方法（不少于100字）", "courseIndex": 1 },
        { "name": "修行动作3名称", "method": "具体方法（不少于100字）", "courseIndex": 2 }
      ]
    }
  },
  
  "identity": {
    "title": "从 yuanShen.transformation.ultimateForm.name 复制",
    "subtitle": "茧中形态：从 yuanShen.transformation.cocoonForm.name 复制",
    "description": "从 yuanShen.roleDefinition.description + transformation 描述合并，约500字",
    "score": 0-100,
    "radar": [
      { "subject": "执行", "A": "从 wuYuanLi.forces[0].score 复制", "fullMark": 100 },
      { "subject": "影响", "A": "从 wuYuanLi.forces[1].score 复制", "fullMark": 100 },
      { "subject": "关系", "A": "从 wuYuanLi.forces[2].score 复制", "fullMark": 100 },
      { "subject": "战略", "A": "从 wuYuanLi.forces[3].score 复制", "fullMark": 100 },
      { "subject": "直觉", "A": "从 wuYuanLi.forces[4].score 复制", "fullMark": 100 },
      { "subject": "天心", "A": "综合计算", "fullMark": 100 }
    ]
  },
  "pyramid": [
    { "layer": "元神层：三才天命", "score": 0-100, "status": "collapse/unstable/solid", "diagnosis": "从 yuanShen 提取关键诊断" },
    { "layer": "能量层：五大原力", "score": 0-100, "status": "collapse/unstable/solid", "diagnosis": "从 wuYuanLi 提取关键诊断" },
    { "layer": "灵种层：十二灵种", "score": 0-100, "status": "collapse/unstable/solid", "diagnosis": "从 lingZhong 提取关键诊断" },
    { "layer": "跨越层：终极唤醒", "score": 0-100, "status": "collapse/unstable/solid", "diagnosis": "从 ultimate 提取关键诊断" }
  ],
  "future": {
    "scenarioA": "从 lingZhong.futureWarning 复制或扩写，约300字",
    "scenarioB": "从 ultimate.peakVision 复制或扩写，约300字"
  },
  "keys": [
    { "name": "从 ultimate.unlockKeys.practiceActions[0].name 复制", "solution": "从 method 复制", "courseIndex": 0 },
    { "name": "从 ultimate.unlockKeys.practiceActions[1].name 复制", "solution": "从 method 复制", "courseIndex": 1 },
    { "name": "从 ultimate.unlockKeys.practiceActions[2].name 复制", "solution": "从 method 复制", "courseIndex": 2 }
  ]
}

【最终检查】
1. 确保 JSON 格式正确，可以被直接解析
2. 确保总字数超过 2500 中文字符
3. 确保语气像宗师在指点迷津，有穿透力
4. 确保学业镜像部分足够扎心，让家长恍然大悟
5. 确保巅峰描述部分足够辉煌，让家长热泪盈眶

现在，请根据用户答案生成完整报告。`;
}

/**
 * 调用 AI 生成四阶金字塔报告
 */
export async function generateReportByAI(
  answers: Record<number, string>
): Promise<ReportData> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://www.eden321.com/v1";
  const aiModel = import.meta.env.VITE_AI_MODEL || "gemini-3-flash-preview";

  if (!apiKey) {
    throw new Error("API 配置不完整。请检查 .env 文件中的 VITE_API_KEY");
  }

  const finalUrl = `${apiBaseUrl}/chat/completions`;
  const reportPrompt = buildFourTierPyramidPrompt(answers);

  const requestBody = {
    model: aiModel,
    messages: [
      {
        role: "user",
        content: reportPrompt,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.75,
    max_tokens: 12000, // 增加 token 限制以确保 2500+ 字能完整生成
  };

  console.log("正在请求 AI 生成四阶金字塔报告...", finalUrl);

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

    const content = 
      data.choices?.[0]?.message?.content ||
      data.content ||
      data.response ||
      "";

    if (!content) {
      throw new Error("AI 返回内容为空");
    }

    // 清理 markdown 代码块标记
    let jsonContent = content.trim();
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
      console.error("原始内容:", jsonContent.substring(0, 500));
      throw new Error(`AI 返回的不是有效的 JSON 格式: ${parseError}`);
    }

    // 验证新的四阶结构
    if (!reportData.yuanShen && !reportData.identity) {
      throw new Error("AI 返回的数据结构不完整，缺少 yuanShen 或 identity 字段");
    }

    // 如果返回的是旧格式，尝试兼容处理
    if (!reportData.yuanShen && reportData.identity) {
      console.warn("AI 返回了旧格式数据，尝试兼容处理...");
      reportData = convertOldFormatToNew(reportData);
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
 * 将旧格式数据转换为新的四阶金字塔格式
 */
function convertOldFormatToNew(oldData: any): ReportData {
  return {
    yuanShen: {
      sanCaiRanking: [
        { type: "帅才", rank: "天命高才", score: 80 },
        { type: "将才", rank: "器用中才", score: 60 },
        { type: "慧才", rank: "觉醒低才", score: 40 },
      ],
      roleDefinition: {
        system: "天系",
        roleName: oldData.identity?.title || "未知角色",
        description: oldData.identity?.description?.substring(0, 100) || "",
      },
      transformation: {
        cocoonForm: {
          name: oldData.identity?.subtitle?.replace("茧中形态：", "") || "平庸形态",
          moXin: "虚荣",
          description: oldData.identity?.description?.substring(0, 150) || "",
        },
        ultimateForm: {
          name: oldData.identity?.title || "觉醒形态",
          tianXin: "义",
          description: oldData.identity?.description?.substring(150, 300) || "",
        },
      },
    },
    wuYuanLi: {
      forces: (oldData.identity?.radar || []).slice(0, 5).map((r: any) => ({
        subject: r.subject,
        score: r.A || 50,
        fullMark: 100,
        brief: "",
      })),
      distributionAnalysis: "",
      complementAnalysis: "",
    },
    lingZhong: {
      lingZhongs: [],
      academicMirror: {
        rootCause: "",
        manifestations: [],
        psychologyExplanation: "",
      },
      futureWarning: oldData.future?.scenarioA || "",
    },
    ultimate: {
      peakVision: oldData.future?.scenarioB || "",
      unlockKeys: {
        destinyQuote: "",
        practiceActions: (oldData.keys || []).map((k: any) => ({
          name: k.name,
          method: k.solution,
          courseIndex: k.courseIndex,
        })),
      },
    },
    // 保留旧版兼容字段
    identity: oldData.identity,
    pyramid: oldData.pyramid,
    future: oldData.future,
    keys: oldData.keys,
  };
}

/**
 * 生成基础报告（快速部分）
 */
export async function generateBasicReport(
  answers: Record<number, string>
): Promise<Partial<ReportData>> {
  // 直接调用完整报告生成
  return generateReportByAI(answers);
}

/**
 * 生成深度分析（兼容旧版调用）
 */
export async function generateDeepAnalysis(
  answers: Record<number, string>,
  basicData: Partial<ReportData>
): Promise<Partial<ReportData>> {
  // 新版一次性生成完整报告，此函数保留用于兼容
  if (basicData.yuanShen || basicData.identity) {
    return basicData;
  }
  return generateReportByAI(answers);
}
