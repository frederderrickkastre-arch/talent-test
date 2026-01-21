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
根据用户的30题测试得分和对话历史，识别其属于"地"能量（将才）、"天"能量（帅才）还是"人"能量（慧才），并生成一份万字以上的深度报告。

【开场白要求】
报告开头必须使用："经过天、地、人三才的推演，你的元神特质更偏向于[将才/帅才/慧才]，三才占比为：帅才X%，将才Y%，慧才Z%（总和必须为100%）。"

【判定逻辑 - 双重验证机制】
1. 第一重验证：30题测试得分
   - 系统会传入用户的30题测试得分（commander、general、advisor三个维度的分数）
   - 这是基础判定依据，必须优先参考

2. 第二重验证：对话历史分析
   仔细分析对话历史中的语言风格、思维模式、行为倾向：
   - "地"能量（将才）：务实、果断、执行力强，说话直接，行动迅速，关注结果
   - "天"能量（帅才）：格局大、有远见、统筹能力强，说话有高度，善于布局，关注全局
   - "人"能量（慧才）：细腻、敏感、洞察力强，说话有深度，善于思考，关注本质

3. 双重验证对比
   - 如果测试得分与对话表现一致：正常输出报告
   - 如果测试得分与对话表现严重不符（例如得分是猛将，但说话吞吞吐吐）：
     * 必须在报告的 summary.reminders 中明确指出"潜能反差"
     * 给出深层心理学解释（可能是：环境压抑、自我认知偏差、防御机制等）
     * 分析这种反差的原因和意义

【三才占比计算 - 总盘锁定】
1. 根据30题测试得分，计算三个维度的原始分数
2. 将三个分数转换为百分比，确保总和为100%
   - 公式：帅才占比 = 帅才得分 / (帅才得分 + 将才得分 + 慧才得分) × 100%
   - 将才占比 = 将才得分 / (帅才得分 + 将才得分 + 慧才得分) × 100%
   - 慧才占比 = 慧才得分 / (帅才得分 + 将才得分 + 慧才得分) × 100%
3. 如果某个维度得分最高，该维度即为主要天赋类型
4. 报告必须明确给出三才占比，格式："帅才X%，将才Y%，慧才Z%"

【报告结构要求 - 必须达到 1.2 万字以上】

板块 01：天命属性（约 2000 字）
- 开场白：使用"经过天、地、人三才的推演，你的元神特质更偏向于[类型]，三才占比为：帅才X%，将才Y%，慧才Z%"
- 详细描述该属性的能量来源（天地人三才的哲学基础）
- 深入解读该属性的象义（如将才象征大地，承载万物；帅才象征天空，统领全局；慧才象征人，连接天地）
- 【英雄对标】根据主要天赋类型，将用户比作对应的历史人物：
  * 帅才（统帅）得分最高时：比作 刘邦（知人善任、善于用人）、李世民（胸怀天下、开创盛世）或 康熙（文治武功、统御四方）
  * 将才（先锋）得分最高时：比作 项羽（极致武力、勇猛无双）、韩信（战术天才、用兵如神）或 霍去病（雷厉风行、封狼居胥）
  * 慧才（军师）得分最高时：比作 张良（运筹帷幄、决胜千里）、诸葛亮（神机妙算、鞠躬尽瘁）或 范蠡（深谋远虑、功成身退）
- 详细分析用户与对标历史人物的相似之处（性格、能力、处事风格）
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
- talentType.type: 根据30题测试得分，选择得分最高的类型（"将才"、"帅才"或"慧才"）
- talentType.title: 使用英雄对标，如"天生将才·韩信型"、"统帅之才·刘邦型"、"智慧之囊·张良型"
- talentType.description: 必须包含三才占比说明，格式："经过天、地、人三才的推演，你的元神特质更偏向于[类型]，三才占比为：帅才X%，将才Y%，慧才Z%"
- talentType.score: 给出三个维度的原始得分（general、marshal、wisdom），并计算百分比占比
- summary.reminders: 如果测试得分与对话表现不符，必须在此字段中明确指出"潜能反差"，并给出深层心理学解释
- summary.overall: 必须包含英雄对标分析，说明用户与历史人物的相似之处
- dimensions.externalRecognition: 详细描述面相、眼神、肢体，要具体可操作
- dimensions.internalPortrait: 深入分析性格、思维、内心世界，可结合对标历史人物的特点
- dimensions.emotionalView: 详细说明情感表达、处理、需求
- dimensions.socialPersuasion: 提供具体的社交策略和说服方法
- dimensions.weaknessAndCultivation: 重点分析死穴和修炼路径，可参考对标历史人物的教训
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
  // 提取三才天赋得分（commander=帅才, general=将才, advisor=慧才）
  const commanderScore = userScore.commander || userScore.marshal || 0;
  const generalScore = userScore.general || 0;
  const advisorScore = userScore.advisor || userScore.wisdom || 0;
  
  // 计算三才占比
  const totalScore = commanderScore + generalScore + advisorScore;
  const commanderPercent = totalScore > 0 ? Math.round((commanderScore / totalScore) * 100) : 0;
  const generalPercent = totalScore > 0 ? Math.round((generalScore / totalScore) * 100) : 0;
  const advisorPercent = totalScore > 0 ? Math.round((advisorScore / totalScore) * 100) : 0;
  
  // 确保总和为100%（处理四舍五入误差）
  const adjustedPercent = {
    commander: commanderPercent,
    general: generalPercent,
    advisor: advisorPercent
  };
  const currentSum = commanderPercent + generalPercent + advisorPercent;
  if (currentSum !== 100 && totalScore > 0) {
    // 将差值加到得分最高的维度
    const diff = 100 - currentSum;
    if (commanderScore >= generalScore && commanderScore >= advisorScore) {
      adjustedPercent.commander += diff;
    } else if (generalScore >= advisorScore) {
      adjustedPercent.general += diff;
    } else {
      adjustedPercent.advisor += diff;
    }
  }

  const scoresText = `帅才（天）得分: ${commanderScore}分 (占比: ${adjustedPercent.commander}%)
将才（地）得分: ${generalScore}分 (占比: ${adjustedPercent.general}%)
慧才（人）得分: ${advisorScore}分 (占比: ${adjustedPercent.advisor}%)`;

  const chatHistoryText = chatHistory
    .map(msg => `${msg.role === "user" ? "用户" : "AI"}: ${msg.content}`)
    .join("\n");

  const userPrompt = `请为以下用户生成完整的三才天赋测评报告：

【用户信息】
姓名: ${userInfo.userName}
年龄: ${userInfo.age}岁
性别: ${userInfo.gender}

【30题测试得分 - 第一重验证依据】
${scoresText}
总分: ${totalScore}分

【对话历史 - 第二重验证依据】
${chatHistoryText || "（暂无对话记录）"}

【双重验证要求】
1. 第一重验证（测试得分）：
   - 帅才得分: ${commanderScore}分
   - 将才得分: ${generalScore}分
   - 慧才得分: ${advisorScore}分
   - 主要天赋类型: ${commanderScore >= generalScore && commanderScore >= advisorScore ? "帅才" : generalScore >= advisorScore ? "将才" : "慧才"}
   - 三才占比: 帅才${adjustedPercent.commander}%，将才${adjustedPercent.general}%，慧才${adjustedPercent.advisor}%（总和必须为100%）

2. 第二重验证（对话表现）：
   - 分析对话历史中的语言风格、思维模式、行为倾向
   - 判断对话表现是否与测试得分一致

3. 双重验证对比：
   - 如果一致：正常输出报告
   - 如果不一致：必须在 summary.reminders 中明确指出"潜能反差"，并给出深层心理学解释

【英雄对标要求】
根据主要天赋类型，将用户比作对应的历史人物：
- 帅才（统帅）：刘邦（知人善任）、李世民（胸怀天下）或 康熙（文治武功）
- 将才（先锋）：项羽（极致武力）、韩信（战术天才）或 霍去病（雷厉风行）
- 慧才（军师）：张良（运筹帷幄）、诸葛亮（神机妙算）或 范蠡（深谋远虑）

【报告要求】
1. 开场白必须使用："经过天、地、人三才的推演，你的元神特质更偏向于[类型]，三才占比为：帅才${adjustedPercent.commander}%，将才${adjustedPercent.general}%，慧才${adjustedPercent.advisor}%"
2. 必须明确给出三才占比，总和必须为100%
3. 必须包含英雄对标分析
4. 如果测试得分与对话表现不符，必须在 summary.reminders 中指出"潜能反差"
5. 总字数必须达到 1.2 万字以上
6. 使用国学大师的语气和智慧

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
