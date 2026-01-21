/**
 * 三才天赋测评题库
 * 包含 30 道单选题，每种类型（帅才、将才、慧才）各 10 题
 */

export interface QuestionOption {
  text: string;
  type: "commander" | "general" | "advisor"; // 帅才、将才、慧才
  score: number;
}

export interface TalentQuestion {
  id: number;
  question: string;
  options: QuestionOption[];
  dimension: string; // 题目维度说明
}

export const questions: TalentQuestion[] = [
  // ==========================================
  // 帅才（天）类型 - 10 题
  // 维度：大局观、责任感、抗压能力、规则意识
  // ==========================================
  
  {
    id: 1,
    question: "学校要组织大型活动，但几个部门意见不统一，作为组织者你会：",
    options: [
      { text: "召集各部门开会，制定统一规则和流程，确保活动有序进行", type: "commander", score: 5 },
      { text: "先了解各方需求，然后快速做出决定，立即开始执行", type: "general", score: 3 },
      { text: "分别与各部门深入沟通，理解他们的想法，寻找共同点", type: "advisor", score: 2 }
    ],
    dimension: "大局观、规则意识"
  },
  
  {
    id: 2,
    question: "班级要参加校级比赛，但训练时间与学习冲突，你会：",
    options: [
      { text: "制定详细的时间表，平衡学习和训练，确保两者都不耽误", type: "commander", score: 5 },
      { text: "直接选择更重要的，全力以赴完成", type: "general", score: 3 },
      { text: "和老师、同学商量，看看能否找到更好的解决方案", type: "advisor", score: 2 }
    ],
    dimension: "责任感、大局观"
  },
  
  {
    id: 3,
    question: "社团活动遇到突发情况，原计划无法执行，你会：",
    options: [
      { text: "保持冷静，快速评估情况，制定新的规则和流程", type: "commander", score: 5 },
      { text: "立即采取行动，用最快的方式解决问题", type: "general", score: 3 },
      { text: "先安抚大家的情绪，然后一起想办法", type: "advisor", score: 2 }
    ],
    dimension: "抗压能力、规则意识"
  },
  
  {
    id: 4,
    question: "发现班级有同学违反校规，但他是你的好朋友，你会：",
    options: [
      { text: "私下提醒他，并帮助他理解规则的重要性，引导他改正", type: "commander", score: 5 },
      { text: "直接告诉他这样做不对，要求他立即停止", type: "general", score: 3 },
      { text: "先了解他为什么这样做，理解他的处境后再沟通", type: "advisor", score: 2 }
    ],
    dimension: "规则意识、责任感"
  },
  
  {
    id: 5,
    question: "期末考试临近，但班级还有重要活动需要组织，你会：",
    options: [
      { text: "统筹安排，制定计划，确保学习和活动都能有序推进", type: "commander", score: 5 },
      { text: "先完成最重要的任务，其他事情往后排", type: "general", score: 3 },
      { text: "和同学们商量，看看如何调整时间安排", type: "advisor", score: 2 }
    ],
    dimension: "大局观、抗压能力"
  },
  
  {
    id: 6,
    question: "运动会上，你们班落后很多，但还有最后几个项目，你会：",
    options: [
      { text: "分析剩余项目的优势，制定策略，鼓舞士气，争取翻盘", type: "commander", score: 5 },
      { text: "告诉同学们不要放弃，拼尽全力完成剩下的比赛", type: "general", score: 3 },
      { text: "安慰同学们，告诉他们尽力就好，享受比赛过程", type: "advisor", score: 2 }
    ],
    dimension: "抗压能力、大局观"
  },
  
  {
    id: 7,
    question: "班级要制定新的班规，但同学们意见分歧很大，你会：",
    options: [
      { text: "组织讨论会，让每个人表达意见，然后制定公平合理的规则", type: "commander", score: 5 },
      { text: "直接提出一个明确的方案，让大家执行", type: "general", score: 3 },
      { text: "先了解每个人的想法，然后提出一个大家都能接受的方案", type: "advisor", score: 2 }
    ],
    dimension: "规则意识、大局观"
  },
  
  {
    id: 8,
    question: "家庭聚会时，长辈们因为意见不合产生争执，你会：",
    options: [
      { text: "主动调解，帮助大家理解彼此的观点，寻找共同点", type: "commander", score: 5 },
      { text: "直接表达自己的看法，希望他们停止争论", type: "general", score: 3 },
      { text: "先倾听每个人的想法，理解他们的情绪，然后温和地沟通", type: "advisor", score: 2 }
    ],
    dimension: "责任感、大局观"
  },
  
  {
    id: 9,
    question: "学校要你负责一个长期项目，但中间遇到很多困难，你会：",
    options: [
      { text: "坚持到底，制定阶段性目标，逐步克服困难，确保项目完成", type: "commander", score: 5 },
      { text: "遇到困难就立即想办法解决，不达目的不罢休", type: "general", score: 3 },
      { text: "根据实际情况灵活调整，如果实在不行就改变方向", type: "advisor", score: 2 }
    ],
    dimension: "抗压能力、责任感"
  },
  
  {
    id: 10,
    question: "发现班级管理存在漏洞，可能导致问题，你会：",
    options: [
      { text: "分析问题的根源，制定完善的制度，预防类似问题再次发生", type: "commander", score: 5 },
      { text: "立即采取措施，堵住漏洞，解决问题", type: "general", score: 3 },
      { text: "先了解具体情况，然后提出改进建议", type: "advisor", score: 2 }
    ],
    dimension: "规则意识、大局观"
  },
  
  // ==========================================
  // 将才（地）类型 - 10 题
  // 维度：执行力、决断力、毅力、结果导向
  // ==========================================
  
  {
    id: 11,
    question: "老师布置了一个很难的任务，要求一周内完成，你会：",
    options: [
      { text: "立即开始行动，制定计划，每天完成一部分，确保按时完成", type: "general", score: 5 },
      { text: "先分析任务，制定详细方案，然后按步骤执行", type: "commander", score: 3 },
      { text: "先了解任务的具体要求，看看能否找到更简单的方法", type: "advisor", score: 2 }
    ],
    dimension: "执行力、结果导向"
  },
  
  {
    id: 12,
    question: "参加体育比赛时，你落后对手很多，但比赛还没结束，你会：",
    options: [
      { text: "咬紧牙关，拼尽全力，不到最后一刻绝不放弃", type: "general", score: 5 },
      { text: "分析对手的弱点，调整策略，争取反超", type: "commander", score: 3 },
      { text: "享受比赛过程，尽力而为，结果不重要", type: "advisor", score: 2 }
    ],
    dimension: "毅力、结果导向"
  },
  
  {
    id: 13,
    question: "和朋友约好一起做作业，但他临时有事不能来，你会：",
    options: [
      { text: "自己先开始做，完成自己能完成的部分，等他来了再一起讨论", type: "general", score: 5 },
      { text: "重新安排时间，制定新的计划", type: "commander", score: 3 },
      { text: "理解他的情况，等他来了再一起做", type: "advisor", score: 2 }
    ],
    dimension: "执行力、决断力"
  },
  
  {
    id: 14,
    question: "学习新技能时，遇到困难总是学不会，你会：",
    options: [
      { text: "反复练习，不断尝试，直到掌握为止", type: "general", score: 5 },
      { text: "分析问题所在，制定学习计划，系统性地攻克", type: "commander", score: 3 },
      { text: "寻找不同的学习方法，或者请教他人", type: "advisor", score: 2 }
    ],
    dimension: "毅力、执行力"
  },
  
  {
    id: 15,
    question: "班级要完成一个紧急任务，时间很紧，你会：",
    options: [
      { text: "立即行动，快速分配任务，大家分头完成，最后汇总", type: "general", score: 5 },
      { text: "先制定详细计划，明确每个人的职责，然后执行", type: "commander", score: 3 },
      { text: "先了解任务的具体要求，看看能否简化流程", type: "advisor", score: 2 }
    ],
    dimension: "决断力、执行力"
  },
  
  {
    id: 16,
    question: "制定了一个学习计划，但执行几天后发现效果不好，你会：",
    options: [
      { text: "立即调整计划，找到更有效的方法，继续执行", type: "general", score: 5 },
      { text: "分析问题原因，重新制定更完善的计划", type: "commander", score: 3 },
      { text: "尝试不同的方法，看看哪种更适合自己", type: "advisor", score: 2 }
    ],
    dimension: "决断力、结果导向"
  },
  
  {
    id: 17,
    question: "参加长跑比赛，跑到一半时感觉很累，想放弃，你会：",
    options: [
      { text: "告诉自己要坚持，调整呼吸和节奏，继续跑下去", type: "general", score: 5 },
      { text: "分析自己的状态，制定策略，合理分配体力", type: "commander", score: 3 },
      { text: "放慢速度，享受跑步的过程，能完成就好", type: "advisor", score: 2 }
    ],
    dimension: "毅力、结果导向"
  },
  
  {
    id: 18,
    question: "发现自己的学习方法效率不高，成绩没有提升，你会：",
    options: [
      { text: "立即改变方法，尝试更直接有效的方式，直到看到结果", type: "general", score: 5 },
      { text: "分析问题，制定新的学习策略，系统性地改进", type: "commander", score: 3 },
      { text: "多尝试几种方法，找到最适合自己的", type: "advisor", score: 2 }
    ],
    dimension: "决断力、结果导向"
  },
  
  {
    id: 19,
    question: "和朋友一起做项目，但他总是拖延，影响进度，你会：",
    options: [
      { text: "直接告诉他问题，要求他加快速度，确保项目按时完成", type: "general", score: 5 },
      { text: "制定明确的时间表，分配任务，监督执行", type: "commander", score: 3 },
      { text: "了解他拖延的原因，帮助他解决问题", type: "advisor", score: 2 }
    ],
    dimension: "执行力、结果导向"
  },
  
  {
    id: 20,
    question: "参加竞赛时，遇到一道很难的题目，你会：",
    options: [
      { text: "集中精力，反复思考，尝试各种方法，直到解出来", type: "general", score: 5 },
      { text: "分析题目类型，运用学过的知识，系统性地解决", type: "commander", score: 3 },
      { text: "先跳过，做其他题目，最后再回来思考这道题", type: "advisor", score: 2 }
    ],
    dimension: "毅力、执行力"
  },
  
  // ==========================================
  // 慧才（人）类型 - 10 题
  // 维度：共情力、沟通力、创新力、应变能力
  // ==========================================
  
  {
    id: 21,
    question: "看到同学因为考试没考好而难过，你会：",
    options: [
      { text: "先理解他的感受，安慰他，然后一起分析问题，帮助他找到改进方法", type: "advisor", score: 5 },
      { text: "告诉他下次努力就好，然后帮他制定学习计划", type: "commander", score: 3 },
      { text: "直接告诉他不要难过，继续努力", type: "general", score: 2 }
    ],
    dimension: "共情力、沟通力"
  },
  
  {
    id: 22,
    question: "班级要组织活动，但常规方式大家都不感兴趣，你会：",
    options: [
      { text: "了解大家的想法，设计一个新颖有趣的活动形式，让大家参与", type: "advisor", score: 5 },
      { text: "制定一个更有吸引力的活动方案，确保大家参与", type: "commander", score: 3 },
      { text: "直接提出一个活动方案，让大家执行", type: "general", score: 2 }
    ],
    dimension: "创新力、沟通力"
  },
  
  {
    id: 23,
    question: "和朋友发生误会，但他不愿意沟通，你会：",
    options: [
      { text: "先理解他的情绪，用温和的方式表达自己的想法，寻找和解的机会", type: "advisor", score: 5 },
      { text: "主动找他，说明情况，希望解决问题", type: "commander", score: 3 },
      { text: "直接说明误会的原因，要求他理解", type: "general", score: 2 }
    ],
    dimension: "共情力、沟通力"
  },
  
  {
    id: 24,
    question: "学习时遇到难题，常规方法都试过了还是不会，你会：",
    options: [
      { text: "换个角度思考，尝试一些创新的方法，或者请教不同的人", type: "advisor", score: 5 },
      { text: "分析问题，寻找更系统的解决方法", type: "commander", score: 3 },
      { text: "继续尝试，反复练习，直到掌握", type: "general", score: 2 }
    ],
    dimension: "创新力、应变能力"
  },
  
  {
    id: 25,
    question: "参加辩论赛时，对方提出了你没想到的观点，你会：",
    options: [
      { text: "快速理解对方的逻辑，灵活调整自己的论点，找到新的角度回应", type: "advisor", score: 5 },
      { text: "分析对方的观点，制定应对策略", type: "commander", score: 3 },
      { text: "坚持自己的观点，用更强的论据反驳", type: "general", score: 2 }
    ],
    dimension: "应变能力、创新力"
  },
  
  {
    id: 26,
    question: "发现同学因为家庭问题影响学习，你会：",
    options: [
      { text: "先理解他的处境，倾听他的烦恼，然后提供情感支持和实际帮助", type: "advisor", score: 5 },
      { text: "帮助他分析问题，制定解决方案", type: "commander", score: 3 },
      { text: "告诉他不要被影响，专注于学习", type: "general", score: 2 }
    ],
    dimension: "共情力、沟通力"
  },
  
  {
    id: 27,
    question: "做作业时，发现题目可以用多种方法解答，你会：",
    options: [
      { text: "尝试不同的方法，比较它们的优劣，选择最有趣或最巧妙的方式", type: "advisor", score: 5 },
      { text: "分析各种方法，选择最系统、最规范的方式", type: "commander", score: 3 },
      { text: "选择最快、最直接的方法，完成即可", type: "general", score: 2 }
    ],
    dimension: "创新力、应变能力"
  },
  
  {
    id: 28,
    question: "和朋友聊天时，发现他情绪低落但不愿意说原因，你会：",
    options: [
      { text: "用温和的方式关心他，分享自己的经历，让他愿意敞开心扉", type: "advisor", score: 5 },
      { text: "直接询问原因，希望帮助他解决问题", type: "commander", score: 3 },
      { text: "告诉他不要想太多，开心一点", type: "general", score: 2 }
    ],
    dimension: "共情力、沟通力"
  },
  
  {
    id: 29,
    question: "参加创意比赛，要求用独特的方式展示作品，你会：",
    options: [
      { text: "深入了解主题，用新颖的角度和形式表达，让人印象深刻", type: "advisor", score: 5 },
      { text: "制定详细的方案，确保作品完整且有创意", type: "commander", score: 3 },
      { text: "直接开始制作，用最直接的方式完成作品", type: "general", score: 2 }
    ],
    dimension: "创新力、应变能力"
  },
  
  {
    id: 30,
    question: "遇到突发情况，原计划无法执行，需要立即改变策略，你会：",
    options: [
      { text: "快速理解新情况，灵活调整方案，找到新的解决路径", type: "advisor", score: 5 },
      { text: "分析新情况，制定新的计划，确保目标达成", type: "commander", score: 3 },
      { text: "立即采取行动，用最快的方式应对", type: "general", score: 2 }
    ],
    dimension: "应变能力、创新力"
  }
];

/**
 * 根据答案计算三才天赋得分
 */
export function calculateTalentScores(answers: Record<number, string>): {
  commander: number; // 帅才（天）
  general: number;   // 将才（地）
  advisor: number;   // 慧才（人）
} {
  const scores = {
    commander: 0,
    general: 0,
    advisor: 0
  };
  
  Object.entries(answers).forEach(([questionId, selectedText]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question) {
      const option = question.options.find(opt => opt.text === selectedText);
      if (option) {
        scores[option.type] += option.score;
      }
    }
  });
  
  return scores;
}

/**
 * 根据得分判定天赋类型
 */
export function determineTalentType(scores: {
  commander: number;
  general: number;
  advisor: number;
}): "将才" | "帅才" | "慧才" {
  const maxScore = Math.max(scores.commander, scores.general, scores.advisor);
  
  if (maxScore === scores.commander) {
    return "帅才";
  } else if (maxScore === scores.general) {
    return "将才";
  } else {
    return "慧才";
  }
}

// 兼容性导出：为了兼容 api.ts 对 ASSESSMENT_QUESTIONS 的引用需求
export const ASSESSMENT_QUESTIONS = questions;