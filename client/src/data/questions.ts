/**
 * 三才天赋测评题库 - 探险幻境版
 * 共 27 道题，分为三个阶段
 * 
 * 阶段一（1-6题）：意象图选择 - 直觉判断
 * 阶段二（7-24题）：情境文字题 - MBTI + 三才映射
 * 阶段三（25-27题）：天命领取 - 霍兰德职业兴趣
 */

// 三才类型标记
export type TalentType = "S" | "J" | "H"; // S=帅才, J=将才, H=慧才

// MBTI 维度标记
export type MBTIDimension = "E" | "I" | "S_mbti" | "N" | "T" | "F" | "J_mbti" | "P";

export interface QuestionOption {
  text: string;
  type: TalentType; // 三才分值类型
  score: number;
  mbti?: MBTIDimension; // MBTI 维度（阶段二使用）
  imageUrl?: string; // 选项图片URL（阶段一使用）
}

export interface TalentQuestion {
  id: number;
  phase: 1 | 2 | 3; // 所属阶段
  question: string;
  options: QuestionOption[];
  dimension: string; // 题目维度说明
}

export const questions: TalentQuestion[] = [
  // ========== 阶段一：意象图选择（1-6题）==========
  {
    id: 1,
    phase: 1,
    question: "当你闭上眼睛，感受内心深处的能量，你看到的原力来源是什么？",
    options: [
      { text: "拨云见日的金光", type: "S", score: 5, imageUrl: "/images/questions/拨云见日的金光.png" },
      { text: "律动的大地脉搏", type: "J", score: 5, imageUrl: "/images/questions/律动的大地脉搏.png" },
      { text: "深邃的智慧古灯", type: "H", score: 5, imageUrl: "/images/questions/深邃的智慧古灯.png" }
    ],
    dimension: "原力来源"
  },
  {
    id: 2,
    phase: 1,
    question: "在梦境的世界里，你发现自己穿上了一套潜意识为你准备的衣装，那是什么样子的？",
    options: [
      { text: "威严的机甲", type: "S", score: 5, imageUrl: "/images/questions/威严的机甲.png" },
      { text: "时尚的猎装", type: "J", score: 5, imageUrl: "/images/questions/时尚的猎装.png" },
      { text: "经典的古袍", type: "H", score: 5, imageUrl: "/images/questions/经典的古袍.png" }
    ],
    dimension: "潜意识衣装"
  },
  {
    id: 3,
    phase: 1,
    question: "如果可以实现一个内心最深处的渴望，你最想拥有的画面是？",
    options: [
      { text: "俯瞰领地的金雕", type: "S", score: 5, imageUrl: "/images/questions/俯瞰领地的金雕.png" },
      { text: "篝火旁的英雄聚会", type: "J", score: 5, imageUrl: "/images/questions/英雄聚会.png" },
      { text: "漂浮的星空图书馆", type: "H", score: 5, imageUrl: "/images/questions/星空图书馆.png" }
    ],
    dimension: "核心渴望"
  },
  {
    id: 4,
    phase: 1,
    question: "在幻境中，你面前出现了三扇恐惧之门。哪扇门让你最不想进去？",
    options: [
      { text: "孤独的高处王座", type: "S", score: 5, imageUrl: "/images/questions/孤独的高处王座.png" },
      { text: "迷雾中松开的双手", type: "J", score: 5, imageUrl: "/images/questions/迷雾中松开的手2.png" },
      { text: "被锁链束缚的家园", type: "H", score: 5, imageUrl: "/images/questions/束缚的家园.png" }
    ],
    dimension: "恐惧之门"
  },
  {
    id: 5,
    phase: 1,
    question: "当你踏上探险之旅，你最自然呈现的行动姿态是？",
    options: [
      { text: "浪尖上的船长", type: "S", score: 5, imageUrl: "/images/questions/浪尖上的船长.png" },
      { text: "专注的工匠", type: "J", score: 5, imageUrl: "/images/questions/专注的工匠.png" },
      { text: "游历的学者", type: "H", score: 5, imageUrl: "/images/questions/游历的学者.png" }
    ],
    dimension: "行动姿态"
  },
  {
    id: 6,
    phase: 1,
    question: "智者告诉你，要治愈内心的伤痛，你需要选择一种终极解药。你会选？",
    options: [
      { text: "碎裂的华丽镜子", type: "S", score: 5, imageUrl: "/images/questions/碎裂的华丽镜子4.png" },
      { text: "照亮森林的火把", type: "J", score: 5, imageUrl: "/images/questions/照亮森林的火把.png" },
      { text: "撒向人群的金币", type: "H", score: 5, imageUrl: "/images/questions/撒向人群的金币.png" }
    ],
    dimension: "终极解药"
  },

  // ========== 阶段二：情境文字题（7-24题）==========
  {
    id: 7,
    phase: 2,
    question: "你睁开眼发现自己置身于一个热闹非凡的异族狂欢节，人群正在欢呼。你会？",
    options: [
      { text: "兴奋地冲进人群中心，跟着大家一起跳舞", type: "S", score: 5, mbti: "E" },
      { text: "先站在高处的阴影里，观察他们的节奏和规则再考虑加入", type: "H", score: 5, mbti: "I" }
    ],
    dimension: "异世界降临 - E/I能量取向"
  },
  {
    id: 8,
    phase: 2,
    question: "你得到了一张通往宝藏的古老地图，上面布满了复杂的线条。你第一眼关注的是？",
    options: [
      { text: "图上标注的每一个具体的路标、河流和陷阱位置", type: "J", score: 5, mbti: "S_mbti" },
      { text: "地图整体的构图和它背后可能隐藏的某种规律", type: "H", score: 5, mbti: "N" }
    ],
    dimension: "神秘的古地图 - S/N信息采集"
  },
  {
    id: 9,
    phase: 2,
    question: "探险队只剩下一块面包，两个队友都在喊饿。你会？",
    options: [
      { text: "提出一个公平的竞争规则，或者按贡献大小分配", type: "S", score: 5, mbti: "T" },
      { text: "观察谁看起来更虚弱，或者先照顾大家的情绪", type: "J", score: 5, mbti: "F" }
    ],
    dimension: "分配最后的粮草 - T/F决策方式"
  },
  {
    id: 10,
    phase: 2,
    question: "今晚要在森林扎营，作为队长，你对计划的态度是？",
    options: [
      { text: "必须定好守夜时间和起床表，大家严格执行", type: "S", score: 5, mbti: "J_mbti" },
      { text: "走到哪算哪，根据晚上的天气和心情再决定", type: "J", score: 5, mbti: "P" }
    ],
    dimension: "营地的纪律 - J/P生活方式"
  },
  {
    id: 11,
    phase: 2,
    question: "前方被巨石堵死，必须清理才能通过。你的本能反应是？",
    options: [
      { text: "立刻卷起袖子开始搬运，即便要干上一整天", type: "S", score: 5 },
      { text: "先停下来研究杠杆原理，看看能不能用巧劲挪开", type: "H", score: 5 }
    ],
    dimension: "遭遇巨石挡路 - 盖洛普执行力"
  },
  {
    id: 12,
    phase: 2,
    question: "你在赶路时听到深处有哭声，但带队任务很紧。你会？",
    options: [
      { text: "停下脚步去安抚并帮助那个人，哪怕耽误进度", type: "J", score: 5 },
      { text: "标记位置并告诉队友，等完成目标后再回来", type: "S", score: 5 }
    ],
    dimension: "森林里的求救声 - 盖洛普关系建立"
  },
  {
    id: 13,
    phase: 2,
    question: "队伍进入了完全未知的迷雾区，大家很慌乱。你会？",
    options: [
      { text: "站出来大声指挥大家排好队，跟着我走", type: "S", score: 5 },
      { text: "默默观察四周的痕迹，寻找逻辑证据给领袖参考", type: "H", score: 5 }
    ],
    dimension: "谁来领头 - 盖洛普影响力"
  },
  {
    id: 14,
    phase: 2,
    question: "在神庙尽头，你只能带走一样东西。你会选择？",
    options: [
      { text: "象征至高权力的金色权杖", type: "S", score: 5 },
      { text: "能召唤失散队友的友谊号角", type: "J", score: 5 },
      { text: "记载着世界运行规律的真理卷轴", type: "H", score: 5 }
    ],
    dimension: "如果只能带走一件宝物 - 三才内心最爱"
  },
  {
    id: 15,
    phase: 2,
    question: "守护者指出你在探险中犯了一个低级错误。你的第一反应是？",
    options: [
      { text: "强烈反驳，认为对方是在挑战你的威严", type: "S", score: 5 },
      { text: "感到很不好意思，担心大家因为这个不再信任你", type: "J", score: 5 },
      { text: "冷静分析这个错误的逻辑，思考如何修正它", type: "H", score: 5 }
    ],
    dimension: "面对突如其来的批评 - 三才性格体现"
  },
  {
    id: 16,
    phase: 2,
    question: "任务完成了，举行庆功宴。你最在乎的是？",
    options: [
      { text: "我是不是坐在最显眼、最受尊敬的位置", type: "S", score: 5 },
      { text: "我的好哥们、好队友是不是都围在我身边", type: "J", score: 5 },
      { text: "这次探险到底增加了多少实用的经验和财物", type: "H", score: 5 }
    ],
    dimension: "庆功宴上的座次 - 三才价值取向"
  },
  {
    id: 17,
    phase: 2,
    question: "在森林里发现一辆镶满宝石的华丽战车，但它会拖慢进度。你会？",
    options: [
      { text: "觉得非常有面子，一定要把它带走显摆", type: "S", score: 5 },
      { text: "拒绝诱惑，认为完成任务本身才最酷", type: "S", score: 3 }
    ],
    dimension: "华丽的诱惑 - 帅才死穴：色"
  },
  {
    id: 18,
    phase: 2,
    question: "你发现最好的哥们躲着你跟别人说话。你会？",
    options: [
      { text: "忍不住胡思乱想，觉得他是不是要背叛自己", type: "J", score: 5 },
      { text: "直接找他问清楚，相信感情经得起考验", type: "J", score: 3 }
    ],
    dimension: "队友的背叛嫌疑 - 将才死穴：情/多疑"
  },
  {
    id: 19,
    phase: 2,
    question: "你捡到了很多金币。如果现在需要拿出一半去救助路边的难民，你会？",
    options: [
      { text: "感到非常心疼，觉得这是自己辛苦得来的，不想给", type: "H", score: 5 },
      { text: "豪爽地拿出来，认为钱财流转才能产生更大的价值", type: "H", score: 3 }
    ],
    dimension: "意外的横财 - 慧才死穴：钱/吝啬"
  },
  {
    id: 20,
    phase: 2,
    question: "当规则阻碍了目标的达成，你会？",
    options: [
      { text: "我来引领大家，打破旧规则建立新秩序", type: "S", score: 5 },
      { text: "坚持自己的立场，绝对不随波逐流", type: "J", score: 5 },
      { text: "将所学知识奉献给所有人，为了大家的利益", type: "H", score: 5 }
    ],
    dimension: "面对规则的挑战 - 改变命运的动力"
  },
  {
    id: 21,
    phase: 2,
    question: "你希望队友如何跟你交流工作？",
    options: [
      { text: "经常夸赞我的决策英明，让我有干劲", type: "S", score: 5 },
      { text: "多关心我的辛苦，给我情感上的支持", type: "J", score: 5 },
      { text: "肯定我的专业分析，让我觉得自己有价值", type: "H", score: 5 }
    ],
    dimension: "探险中的沟通方式 - 三才沟通偏好"
  },
  {
    id: 22,
    phase: 2,
    question: "这个机关你以前从未见过。你会？",
    options: [
      { text: "哪怕丢脸也要请教别人，直到弄懂为止", type: "S", score: 5 },
      { text: "不怕上当受骗，亲自上手去体验和尝试", type: "J", score: 5 },
      { text: "不怕吃亏付出，拿出钻研精神去攻克", type: "H", score: 5 }
    ],
    dimension: "遇到极难的机关 - 学习与改变"
  },
  {
    id: 23,
    phase: 2,
    question: "和队友发生激烈争吵时，你通常表现为？",
    options: [
      { text: "说一些娇气、示弱的话，其实内心很强势", type: "S", score: 5 },
      { text: "嘴上答应得好好的，但其实没想清楚怎么做", type: "J", score: 5 },
      { text: "心里有很多想法，但嘴上什么都不说", type: "H", score: 5 }
    ],
    dimension: "冲突时的姿态 - 行为修正"
  },
  {
    id: 24,
    phase: 2,
    question: "回到家，你最想做哪种放松？",
    options: [
      { text: "练习书法或打坐，让风火的心平静下来", type: "S", score: 5 },
      { text: "制定下一个阶段的明确计划，不再摇摆", type: "J", score: 5 },
      { text: "学习格斗或柔道，增强自己的胆量和力量", type: "H", score: 5 }
    ],
    dimension: "探险结束后的休息 - 生活修炼建议"
  },

  // ========== 阶段三：天命领取（25-27题）==========
  {
    id: 25,
    phase: 3,
    question: "当你站在探险的终点，守护者拿出了三件汇聚了不同能量的圣物，你只能带走一件：",
    options: [
      { text: "黄金指挥棒：挥动它能号令千军万马，让世界按照你的意志运行", type: "S", score: 10 },
      { text: "治愈之泉：能抚平世间一切伤痛，让不同的人重新握手言和", type: "J", score: 10 },
      { text: "真理之瞳：戴上它能看穿一切事物的本质，解开宇宙最深的奥秘", type: "H", score: 10 }
    ],
    dimension: "觉醒圣物的选择 - 霍兰德RIASEC映射"
  },
  {
    id: 26,
    phase: 3,
    question: "如果你能亲手建造一个属于自己的理想世界，你最希望那里是什么样子的？",
    options: [
      { text: "宏伟的宫殿：秩序井然，所有人都在你的引领下高效地完成伟大的奇迹", type: "S", score: 10 },
      { text: "温馨的部落：充满欢笑，每个人都能被温柔对待，感受到彼此的关怀", type: "J", score: 10 },
      { text: "精密的智库：充满策略，每一步行动都经过深度计算，充满了智慧的博弈", type: "H", score: 10 }
    ],
    dimension: "未来领地的构建 - 核心价值空间"
  },
  {
    id: 27,
    phase: 3,
    question: "在离开幻境前，你必须向自己的内心许下一个诺言。你会选择戴上哪枚勋章？",
    options: [
      { text: "勇者勋章：承诺无论发生什么，都敢做敢当，不再被虚荣和面子所累", type: "S", score: 10 },
      { text: "仁者勋章：承诺永远相信善良的力量，放下怀疑，让内心不再动摇", type: "J", score: 10 },
      { text: "智者勋章：承诺不断提升格局，乐于分享知识，不再斤斤计较得失", type: "H", score: 10 }
    ],
    dimension: "终极勋章的承诺 - 三才突破方向"
  }
];

/**
 * 根据答案计算三才天赋得分
 * @param answers 用户答案记录 { questionId: selectedOptionText }
 */
export function calculateTalentScores(answers: Record<number, string>): {
  commander: number; // 帅才（天）- 对应 type: "S"
  general: number;   // 将才（地）- 对应 type: "J"
  advisor: number;   // 慧才（人）- 对应 type: "H"
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
        // 将 type 映射到对应的分数字段
        if (option.type === "S") {
          scores.commander += option.score;
        } else if (option.type === "J") {
          scores.general += option.score;
        } else if (option.type === "H") {
          scores.advisor += option.score;
        }
      }
    }
  });
  
  return scores;
}

/**
 * 计算 MBTI 维度得分（仅阶段二题目）
 * @param answers 用户答案记录
 */
export function calculateMBTIScores(answers: Record<number, string>): {
  E: number; I: number;
  S: number; N: number;
  T: number; F: number;
  J: number; P: number;
} {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  Object.entries(answers).forEach(([questionId, selectedText]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question && question.phase === 2) {
      const option = question.options.find(opt => opt.text === selectedText);
      if (option?.mbti) {
        const mbtiKey = option.mbti.replace("_mbti", "") as keyof typeof scores;
        if (mbtiKey in scores) {
          scores[mbtiKey] += option.score;
        }
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

/**
 * 获取指定阶段的题目
 */
export function getQuestionsByPhase(phase: 1 | 2 | 3): TalentQuestion[] {
  return questions.filter(q => q.phase === phase);
}

/**
 * 获取题目总数
 */
export function getTotalQuestions(): number {
  return questions.length;
}

// 兼容性导出：为了兼容 api.ts 对 ASSESSMENT_QUESTIONS 的引用需求
export const ASSESSMENT_QUESTIONS = questions;
