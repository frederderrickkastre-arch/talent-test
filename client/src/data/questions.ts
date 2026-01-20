/**
 * 测评题库数据
 * 包含 65 道题目，涵盖 7 大维度
 */

export interface QuestionData {
  questionNumber: number;
  questionText: string;
  optionA: string;
  optionB: string;
  dimension: string;
}

export const ASSESSMENT_QUESTIONS: QuestionData[] = [
  // 创新思维维度 (1-10)
  {
    questionNumber: 1,
    questionText: "面对周末的空闲时间，你更倾向于：",
    optionA: "探索一个从未接触过的新领域",
    optionB: "深入研究自己已经熟悉的兴趣",
    dimension: "创新思维",
  },
  {
    questionNumber: 2,
    questionText: "当需要完成一个开放性的项目时，你更倾向于：",
    optionA: "尝试一种全新的、未经验证的方法",
    optionB: "采用已被证明有效的传统方法",
    dimension: "创新思维",
  },
  {
    questionNumber: 3,
    questionText: "在选择阅读材料时，你更偏好：",
    optionA: "探讨抽象概念和哲学思考的内容",
    optionB: "提供具体技能和实用知识的内容",
    dimension: "创新思维",
  },
  {
    questionNumber: 4,
    questionText: "面对多项任务时，你的处理方式是：",
    optionA: "制定详细计划，按优先级逐一完成",
    optionB: "根据当时的状态灵活安排",
    dimension: "创新思维",
  },
  {
    questionNumber: 5,
    questionText: "当遇到问题时，你通常会：",
    optionA: "立即寻求他人的帮助和建议",
    optionB: "先独立思考，尝试自己解决",
    dimension: "创新思维",
  },
  {
    questionNumber: 6,
    questionText: "在团队合作中，你更喜欢：",
    optionA: "提出新想法和创意方案",
    optionB: "确保团队的执行效率和质量",
    dimension: "创新思维",
  },
  {
    questionNumber: 7,
    questionText: "面对失败时，你的反应是：",
    optionA: "分析原因，尝试不同的方法",
    optionB: "感到沮丧，需要时间调整心态",
    dimension: "创新思维",
  },
  {
    questionNumber: 8,
    questionText: "在学习新知识时，你更倾向于：",
    optionA: "通过实践和试错来学习",
    optionB: "先理解理论，再应用到实践",
    dimension: "创新思维",
  },
  {
    questionNumber: 9,
    questionText: "你对未来的规划是：",
    optionA: "充满想象，经常改变目标",
    optionB: "清晰明确，坚持长期目标",
    dimension: "创新思维",
  },
  {
    questionNumber: 10,
    questionText: "在面对陌生环境时，你会：",
    optionA: "主动探索和适应新环境",
    optionB: "需要一段时间才能适应",
    dimension: "创新思维",
  },

  // 系统思维维度 (11-20)
  {
    questionNumber: 11,
    questionText: "你更擅长：",
    optionA: "看到事物之间的联系和规律",
    optionB: "关注具体的细节和特殊情况",
    dimension: "系统思维",
  },
  {
    questionNumber: 12,
    questionText: "在解决复杂问题时，你通常：",
    optionA: "先分解成小问题逐个解决",
    optionB: "从整体出发寻找根本原因",
    dimension: "系统思维",
  },
  {
    questionNumber: 13,
    questionText: "你对数据和统计的态度是：",
    optionA: "很感兴趣，喜欢用数据说话",
    optionB: "不太关注，更相信直觉",
    dimension: "系统思维",
  },
  {
    questionNumber: 14,
    questionText: "在学习编程或逻辑类课程时，你的感受是：",
    optionA: "很有趣，容易理解逻辑关系",
    optionB: "有些困难，需要更多时间理解",
    dimension: "系统思维",
  },
  {
    questionNumber: 15,
    questionText: "你更喜欢的学科是：",
    optionA: "数学、物理、化学等理科科目",
    optionB: "语文、历史、地理等文科科目",
    dimension: "系统思维",
  },
  {
    questionNumber: 16,
    questionText: "在制定计划时，你会：",
    optionA: "列出详细的步骤和时间表",
    optionB: "有大致的方向，具体安排灵活调整",
    dimension: "系统思维",
  },
  {
    questionNumber: 17,
    questionText: "你对因果关系的理解是：",
    optionA: "敏锐，能快速找到原因和结果",
    optionB: "需要更多信息才能判断",
    dimension: "系统思维",
  },
  {
    questionNumber: 18,
    questionText: "在分析问题时，你倾向于：",
    optionA: "使用图表、模型或框架",
    optionB: "用语言描述和讨论",
    dimension: "系统思维",
  },
  {
    questionNumber: 19,
    questionText: "你对规则和流程的态度是：",
    optionA: "认为规则很重要，应该遵守",
    optionB: "认为规则可以灵活变通",
    dimension: "系统思维",
  },
  {
    questionNumber: 20,
    questionText: "在预测未来时，你通常：",
    optionA: "基于历史数据和趋势分析",
    optionB: "凭直觉和经验判断",
    dimension: "系统思维",
  },

  // 共情能力维度 (21-30)
  {
    questionNumber: 21,
    questionText: "当别人遇到困难时，你的第一反应是：",
    optionA: "感同身受，想帮助他们",
    optionB: "理性分析，提出解决方案",
    dimension: "共情能力",
  },
  {
    questionNumber: 22,
    questionText: "你更容易被什么触动：",
    optionA: "他人的情感和故事",
    optionB: "有趣的想法和新奇的事物",
    dimension: "共情能力",
  },
  {
    questionNumber: 23,
    questionText: "在团队中，你的角色通常是：",
    optionA: "倾听者和支持者",
    optionB: "决策者和推动者",
    dimension: "共情能力",
  },
  {
    questionNumber: 24,
    questionText: "你对他人的感受的敏感度：",
    optionA: "很高，能察觉到细微的情绪变化",
    optionB: "一般，需要他人明确表达",
    dimension: "共情能力",
  },
  {
    questionNumber: 25,
    questionText: "在冲突中，你更倾向于：",
    optionA: "寻求理解和和解",
    optionB: "坚持自己的立场",
    dimension: "共情能力",
  },
  {
    questionNumber: 26,
    questionText: "你对慈善或志愿服务的兴趣：",
    optionA: "很高，想帮助需要帮助的人",
    optionB: "一般，更关注个人发展",
    dimension: "共情能力",
  },
  {
    questionNumber: 27,
    questionText: "看到不公平的事情时，你会：",
    optionA: "感到愤怒和不安，想改变现状",
    optionB: "认为这是现实的一部分",
    dimension: "共情能力",
  },
  {
    questionNumber: 28,
    questionText: "在与他人交流时，你更关注：",
    optionA: "对方的感受和需求",
    optionB: "信息的准确性和逻辑",
    dimension: "共情能力",
  },
  {
    questionNumber: 29,
    questionText: "你对他人的隐私和感受的尊重：",
    optionA: "非常重视，会主动保护",
    optionB: "一般，按照社会规范处理",
    dimension: "共情能力",
  },
  {
    questionNumber: 30,
    questionText: "你更喜欢的电影或书籍类型是：",
    optionA: "人物关系复杂、情感丰富的作品",
    optionB: "情节紧张、充满冒险的作品",
    dimension: "共情能力",
  },

  // 学习能力维度 (31-40)
  {
    questionNumber: 31,
    questionText: "你的学习方式是：",
    optionA: "快速理解，举一反三",
    optionB: "需要反复练习才能掌握",
    dimension: "学习能力",
  },
  {
    questionNumber: 32,
    questionText: "面对新知识时，你通常：",
    optionA: "能快速找到关键点和联系",
    optionB: "需要逐步理解每个细节",
    dimension: "学习能力",
  },
  {
    questionNumber: 33,
    questionText: "你的记忆力：",
    optionA: "很强，能记住大量信息",
    optionB: "一般，需要重复复习",
    dimension: "学习能力",
  },
  {
    questionNumber: 34,
    questionText: "在学习中遇到困难时，你会：",
    optionA: "尝试多种方法直到理解",
    optionB: "寻求他人帮助",
    dimension: "学习能力",
  },
  {
    questionNumber: 35,
    questionText: "你的学习动力来自于：",
    optionA: "内在的好奇心和兴趣",
    optionB: "外在的奖励和评价",
    dimension: "学习能力",
  },
  {
    questionNumber: 36,
    questionText: "在学习新技能时，你的速度：",
    optionA: "很快，能迅速上手",
    optionB: "较慢，需要更多时间适应",
    dimension: "学习能力",
  },
  {
    questionNumber: 37,
    questionText: "你对学习的态度是：",
    optionA: "热情高涨，主动探索",
    optionB: "被动应付，完成任务即可",
    dimension: "学习能力",
  },
  {
    questionNumber: 38,
    questionText: "你更喜欢的学习方式是：",
    optionA: "自主学习和探索",
    optionB: "有人指导和教授",
    dimension: "学习能力",
  },
  {
    questionNumber: 39,
    questionText: "在学习过程中，你会：",
    optionA: "主动总结和反思",
    optionB: "被动接收信息",
    dimension: "学习能力",
  },
  {
    questionNumber: 40,
    questionText: "你对自己的学习能力的评价是：",
    optionA: "很有信心，认为自己能学好任何东西",
    optionB: "有些怀疑，认为某些东西难以掌握",
    dimension: "学习能力",
  },

  // 领导力维度 (41-50)
  {
    questionNumber: 41,
    questionText: "在团队中，你更倾向于：",
    optionA: "主动承担领导责任",
    optionB: "配合他人的安排",
    dimension: "领导力",
  },
  {
    questionNumber: 42,
    questionText: "当团队意见不一致时，你会：",
    optionA: "主动协调，寻求共识",
    optionB: "保持中立，让他人决定",
    dimension: "领导力",
  },
  {
    questionNumber: 43,
    questionText: "你对团队目标的承诺：",
    optionA: "非常高，会全力推动实现",
    optionB: "一般，按部就班完成任务",
    dimension: "领导力",
  },
  {
    questionNumber: 44,
    questionText: "在面对挑战时，你会：",
    optionA: "鼓舞他人，带领团队前进",
    optionB: "等待他人的指示",
    dimension: "领导力",
  },
  {
    questionNumber: 45,
    questionText: "你对他人的影响力：",
    optionA: "很强，能说服和激励他人",
    optionB: "一般，主要靠个人努力",
    dimension: "领导力",
  },
  {
    questionNumber: 46,
    questionText: "你更喜欢的工作环境是：",
    optionA: "有明确的目标和自主权",
    optionB: "有详细的指导和支持",
    dimension: "领导力",
  },
  {
    questionNumber: 47,
    questionText: "在做决定时，你通常：",
    optionA: "果断决策，承担责任",
    optionB: "征求意见，谨慎决定",
    dimension: "领导力",
  },
  {
    questionNumber: 48,
    questionText: "你对风险的态度是：",
    optionA: "愿意承担适度风险以获得更大收益",
    optionB: "倾向于选择安全稳定的方案",
    dimension: "领导力",
  },
  {
    questionNumber: 49,
    questionText: "你对团队成员的期望：",
    optionA: "高标准，相信他们能做得更好",
    optionB: "合理期望，接受他们的现状",
    dimension: "领导力",
  },
  {
    questionNumber: 50,
    questionText: "你对自己的领导潜力的评价：",
    optionA: "很有信心，认为自己能成为好领导",
    optionB: "有些怀疑，不确定自己是否适合领导",
    dimension: "领导力",
  },

  // 创意表达维度 (51-60)
  {
    questionNumber: 51,
    questionText: "你更擅长的表达方式是：",
    optionA: "通过艺术、音乐或写作表达",
    optionB: "通过言语和逻辑表达",
    dimension: "创意表达",
  },
  {
    questionNumber: 52,
    questionText: "你对美学和设计的敏感度：",
    optionA: "很高，能察觉到细微的审美差异",
    optionB: "一般，不太关注外观",
    dimension: "创意表达",
  },
  {
    questionNumber: 53,
    questionText: "在创意项目中，你的角色通常是：",
    optionA: "提供创意想法和灵感",
    optionB: "执行和完善他人的想法",
    dimension: "创意表达",
  },
  {
    questionNumber: 54,
    questionText: "你对艺术和文化的兴趣：",
    optionA: "很高，经常参与相关活动",
    optionB: "一般，偶尔接触",
    dimension: "创意表达",
  },
  {
    questionNumber: 55,
    questionText: "你更喜欢的创意形式是：",
    optionA: "视觉艺术（绘画、设计、摄影）",
    optionB: "文字艺术（写作、诗歌、剧本）",
    dimension: "创意表达",
  },
  {
    questionNumber: 56,
    questionText: "在面对空白画布或白纸时，你会：",
    optionA: "充满灵感，迫不及待地开始创作",
    optionB: "感到困惑，不知道从何开始",
    dimension: "创意表达",
  },
  {
    questionNumber: 57,
    questionText: "你对他人作品的评价通常是：",
    optionA: "从创意和表达的角度欣赏",
    optionB: "从实用性和逻辑的角度评估",
    dimension: "创意表达",
  },
  {
    questionNumber: 58,
    questionText: "你的想象力：",
    optionA: "丰富，经常有天马行空的想法",
    optionB: "一般，更多基于现实",
    dimension: "创意表达",
  },
  {
    questionNumber: 59,
    questionText: "在解决问题时，你会：",
    optionA: "尝试创新和非常规的方法",
    optionB: "采用传统和经过验证的方法",
    dimension: "创意表达",
  },
  {
    questionNumber: 60,
    questionText: "你对自己的创意能力的评价是：",
    optionA: "很有信心，认为自己很有创意",
    optionB: "有些怀疑，不认为自己特别有创意",
    dimension: "创意表达",
  },

  // 社交能力维度 (61-65)
  {
    questionNumber: 61,
    questionText: "在社交场合中，你通常：",
    optionA: "主动与他人交谈，建立新的联系",
    optionB: "等待他人主动靠近，或与熟人交流",
    dimension: "社交能力",
  },
  {
    questionNumber: 62,
    questionText: "你对陌生人的态度是：",
    optionA: "充满好奇和热情",
    optionB: "有些警惕和保留",
    dimension: "社交能力",
  },
  {
    questionNumber: 63,
    questionText: "在维持友谊时，你会：",
    optionA: "主动联系和关心朋友",
    optionB: "等待朋友主动联系",
    dimension: "社交能力",
  },
  {
    questionNumber: 64,
    questionText: "你的社交圈子：",
    optionA: "很广，有很多朋友和熟人",
    optionB: "较小，只有少数亲密朋友",
    dimension: "社交能力",
  },
  {
    questionNumber: 65,
    questionText: "在团队活动中，你的参与度：",
    optionA: "很高，积极参与和贡献",
    optionB: "一般，按照要求参与",
    dimension: "社交能力",
  },
];

/**
 * 7 大维度的定义和权重
 */
export const DIMENSIONS = [
  { name: "创新思维", description: "探索新想法和创新解决方案的能力", weight: 1 },
  { name: "系统思维", description: "分析复杂系统和逻辑关系的能力", weight: 1 },
  { name: "共情能力", description: "理解和关心他人感受的能力", weight: 1 },
  { name: "学习能力", description: "快速学习和掌握新知识的能力", weight: 1 },
  { name: "领导力", description: "引导和激励他人的能力", weight: 1 },
  { name: "创意表达", description: "通过艺术和创意表达想法的能力", weight: 1 },
  { name: "社交能力", description: "与他人建立和维持关系的能力", weight: 1 },
];
