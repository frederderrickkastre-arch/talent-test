/**
 * 动态报告生成器
 * 基于标签加权系统的智能报告生成算法
 */

import { questions } from "@/data/questions";

// ==========================================
// 类型定义
// ==========================================

export interface AnswerRecord {
  [questionId: number]: string; // questionId -> selectedOptionText
}

export interface TagWeights {
  // 五原力维度
  ambition: number;        // 野心/抱负
  resilience: number;       // 抗挫力
  patience: number;        // 耐性
  fragility: number;       // 脆弱性
  control: number;         // 控制欲
  independence: number;    // 独立性
  empathy: number;         // 共情力
  strategy: number;        // 策略性
  impulsivity: number;      // 冲动性
  adaptability: number;    // 适应性
  
  // 神兽特质
  lion_traits: number;     // 狮子特质（威严、领导）
  tiger_traits: number;    // 老虎特质（勇猛、直接）
  fox_traits: number;      // 狐狸特质（智慧、灵活）
  wolf_traits: number;     // 狼特质（团队、忠诚）
  eagle_traits: number;    // 鹰特质（高远、洞察）
  phoenix_traits: number;  // 凤凰特质（重生、优雅）
}

export interface IdentityResult {
  primary: string;          // 主要身份
  secondary?: string;       // 次要身份（双相神兽时）
  isHybrid: boolean;        // 是否为双相神兽
  scores: TagWeights;      // 所有标签得分
}

export interface DiagnosticResult {
  crossAnalysis: string;    // 交叉诊断文案
  warnings: string[];       // 警告信息
  strengths: string[];      // 优势分析
}

export interface ReportContent {
  sealOfDestiny: string;   // 天命封印板块
  pyramidFault: string;    // 金字塔断层板块
  tenYearPreview: string;  // 十年预演板块
}

// ==========================================
// 标签权重矩阵 (Scoring Matrix)
// ==========================================

/**
 * 为每道题的每个选项定义标签权重
 * 格式: questionId -> optionIndex -> { tag: weight }
 */
const SCORING_MATRIX: Record<number, Record<number, Partial<TagWeights>>> = {
  // Q1: 角色偏好
  1: {
    0: { ambition: 5, lion_traits: 3, control: 4 }, // 国王/总导演
    1: { resilience: 5, tiger_traits: 3, independence: 4 }, // 大将军/侠客
    2: { strategy: 5, fox_traits: 3, empathy: 3 }, // 神秘巫师/军师
    3: { patience: 3, adaptability: 2 }, // 路人甲
  },
  
  // Q2: 情绪反应
  2: {
    0: { impulsivity: 5, lion_traits: 3, control: 4 }, // 愤怒：想当众质问
    1: { fragility: 5, wolf_traits: 3, empathy: 4 }, // 伤心：觉得被背叛
    2: { strategy: 5, fox_traits: 3, patience: 3 }, // 盘算：暗中反击
    3: { patience: 4, adaptability: 3 }, // 无所谓
  },
  
  // Q3: 价值追求
  3: {
    0: { ambition: 5, lion_traits: 4, control: 3 }, // 万人敬仰
    1: { resilience: 5, tiger_traits: 4, independence: 3 }, // 无敌力量
    2: { strategy: 5, fox_traits: 3, empathy: 2 }, // 超级财富
    3: { patience: 3, adaptability: 2 }, // 没意思
  },
  
  // Q4: 恐惧类型
  4: {
    0: { fragility: 5, lion_traits: 3, control: 4 }, // 当众出丑
    1: { fragility: 5, wolf_traits: 3, empathy: 4 }, // 被抛弃
    2: { strategy: 4, fox_traits: 3, independence: 3 }, // 被困住/变穷
    3: { patience: 3, adaptability: 3 }, // 很少做噩梦
  },
  
  // Q5: 团队协作
  5: {
    0: { control: 5, lion_traits: 4, impulsivity: 3 }, // 不听话的
    1: { fragility: 5, wolf_traits: 4, empathy: 3 }, // 卖队友的
    2: { strategy: 4, fox_traits: 3, patience: 2 }, // 太笨的
    3: { patience: 4, adaptability: 3 }, // 都还好
  },
  
  // Q6: 消费观念
  6: {
    0: { ambition: 4, lion_traits: 3, impulsivity: 4 }, // 买最酷的
    1: { empathy: 5, wolf_traits: 3, independence: 2 }, // 大家一起花
    2: { strategy: 5, fox_traits: 3, patience: 4 }, // 存起来/捡漏
    3: { patience: 3, adaptability: 2 }, // 交给爸妈
  },
  
  // Q7: 问题解决
  7: {
    0: { impulsivity: 4, lion_traits: 3, resilience: 2 }, // 放弃/硬撑
    1: { empathy: 4, wolf_traits: 3, independence: 2 }, // 求救
    2: { strategy: 5, fox_traits: 4, adaptability: 3 }, // 钻空子
    3: { patience: 3, adaptability: 2 }, // 先放着
  },
  
  // Q8: 能力偏好
  8: {
    0: { ambition: 5, lion_traits: 4, control: 5 }, // 言出法随
    1: { resilience: 5, tiger_traits: 4, independence: 4 }, // 金刚不坏
    2: { strategy: 5, fox_traits: 4, empathy: 4 }, // 读心术
    3: { patience: 3, adaptability: 2 }, // 不感兴趣
  },
  
  // Q9: 应对方式
  9: {
    0: { strategy: 4, fox_traits: 3, control: 3 }, // 掩饰
    1: { fragility: 5, wolf_traits: 3, impulsivity: 3 }, // 慌张
    2: { strategy: 4, fox_traits: 3, patience: 2 }, // 找理由
    3: { patience: 3, adaptability: 2 }, // 愣住
  },
  
  // Q10: 自我认知
  10: {
    0: { ambition: 4, lion_traits: 5, control: 4 }, // 狮子
    1: { resilience: 4, tiger_traits: 4, wolf_traits: 3, independence: 3 }, // 狗狗/狼
    2: { strategy: 4, fox_traits: 5, empathy: 3 }, // 狐狸/猫头鹰
    3: { patience: 3, adaptability: 3 }, // 树懒/考拉
  },
  
  // Q11: 抗挫力
  11: {
    0: { fragility: 5, lion_traits: 3, control: 3 }, // 觉得丢人，不想去学校
    1: { strategy: 4, fox_traits: 3, patience: 2 }, // 找理由，推卸责任
    2: { fragility: 5, wolf_traits: 3, impulsivity: 4 }, // 大哭一场，自暴自弃
    3: { patience: 3, adaptability: 3 }, // 说不上来
  },
  
  // Q12: 自控力
  12: {
    0: { impulsivity: 5, lion_traits: 3, control: 2 }, // 先玩一会儿
    1: { strategy: 4, fox_traits: 3, adaptability: 3 }, // 边玩边写
    2: { fragility: 4, wolf_traits: 3, independence: 2 }, // 只有爸妈盯着才写
    3: { patience: 4, control: 3 }, // 不确定
  },
  
  // Q13: 主角力
  13: {
    0: { control: 5, lion_traits: 4, independence: 2 }, // 伸出脚让爸妈帮我弄
    1: { impulsivity: 4, tiger_traits: 3, independence: 3 }, // 自己弄，弄不好发脾气
    2: { strategy: 3, fox_traits: 3, patience: 2 }, // 懒得弄，拖着走
    3: { patience: 3, adaptability: 3 }, // 等别人提醒
  },
  
  // Q14: 幸福力
  14: {
    0: { strategy: 4, fox_traits: 3, empathy: 2 }, // "哼，肯定是假的"
    1: { impulsivity: 4, tiger_traits: 3, independence: 3 }, // "我也要买！"
    2: { control: 4, lion_traits: 3, empathy: 2 }, // "他就是显摆"
    3: { patience: 3, adaptability: 3 }, // 没啥想法
  },
  
  // Q15: 亲和力
  15: {
    0: { control: 4, lion_traits: 3, independence: 3 }, // 谁也不理，装高冷
    1: { fragility: 5, wolf_traits: 3, empathy: 3 }, // 浑身不自在，想回家
    2: { strategy: 4, fox_traits: 3, empathy: 4 }, // 只理看起来好说话的
    3: { patience: 3, adaptability: 3 }, // 就在那坐着
  },
  
  // Q16: 沟通力
  16: {
    0: { impulsivity: 5, lion_traits: 3, control: 3 }, // 大喊："烦死了！"
    1: { strategy: 4, fox_traits: 3, patience: 3 }, // 假装没听见
    2: { fragility: 4, wolf_traits: 3, independence: 2 }, // "马上"，但不动
    3: { patience: 3, adaptability: 3 }, // 以上都不是
  },
  
  // Q17: 效能力
  17: {
    0: { fragility: 5, wolf_traits: 3, impulsivity: 3 }, // 拖到最后哭着补
    1: { strategy: 4, fox_traits: 3, adaptability: 3 }, // 只做简单的
    2: { impulsivity: 4, lion_traits: 3, control: 2 }, // 写写玩玩
    3: { patience: 3, adaptability: 3 }, // 没有固定的做法
  },
  
  // Q18: 专注力
  18: {
    0: { impulsivity: 5, lion_traits: 3, control: 2 }, // 马上转头看
    1: { strategy: 4, fox_traits: 3, adaptability: 3 }, // 脑子里想游戏
    2: { empathy: 4, wolf_traits: 3, independence: 2 }, // 找人说话
    3: { patience: 4, control: 3 }, // 以上都不是
  },
  
  // Q19: 学习力
  19: {
    0: { fragility: 5, lion_traits: 3, control: 3 }, // 不敢问，装懂
    1: { fragility: 5, wolf_traits: 3, impulsivity: 3 }, // 放弃听讲
    2: { strategy: 4, fox_traits: 3, patience: 2 }, // 想着回家抄
    3: { patience: 3, adaptability: 3 }, // 就那样听着
  },
  
  // Q20: 创造力
  20: {
    0: { impulsivity: 5, tiger_traits: 3, independence: 3 }, // 全买零食花光
    1: { strategy: 4, fox_traits: 3, patience: 4 }, // 藏起来不舍得花
    2: { ambition: 4, lion_traits: 3, control: 3 }, // 请客充面子
    3: { patience: 3, adaptability: 3 }, // 交给家长
  },
  
  // Q21: 贵人力
  21: {
    0: { fragility: 5, wolf_traits: 3, independence: 2 }, // 不好意思去
    1: { control: 5, lion_traits: 4, ambition: 3 }, // 觉得老师该主动找我
    2: { strategy: 5, fox_traits: 4, empathy: 2 }, // 想送礼换名额
    3: { patience: 3, adaptability: 3 }, // 就不去了
  },
  
  // Q22: 领导力
  22: {
    0: { control: 5, lion_traits: 4, impulsivity: 4 }, // 拍桌子强迫大家
    1: { fragility: 5, wolf_traits: 3, impulsivity: 3 }, // 赌气不玩了
    2: { strategy: 4, fox_traits: 3, adaptability: 3 }, // 跟着起哄
    3: { patience: 3, adaptability: 3 }, // 在旁边看着
  },
  
  // Q23: 领导方式
  23: {
    0: { control: 5, lion_traits: 4, ambition: 3 }, // 立规矩
    1: { empathy: 5, wolf_traits: 4, independence: 2 }, // 拉关系
    2: { strategy: 5, fox_traits: 4, patience: 3 }, // 用策略
    3: { patience: 3, adaptability: 3 }, // 那就不当了
  },
  
  // Q24: 应急能力
  24: {
    0: { resilience: 5, lion_traits: 3, control: 4 }, // 镇定，找警察
    1: { impulsivity: 5, tiger_traits: 3, independence: 3 }, // 跑着找
    2: { strategy: 5, fox_traits: 4, adaptability: 4 }, // 查地图/找替代
    3: { fragility: 4, patience: 3 }, // 站在原地等
  },
  
  // Q25: 奖励偏好
  25: {
    0: { ambition: 5, lion_traits: 4, control: 3 }, // 荣誉金牌
    1: { resilience: 5, tiger_traits: 4, independence: 4 }, // 无敌军队
    2: { strategy: 5, fox_traits: 4, empathy: 2 }, // 隐秘宝石
    3: { patience: 3, adaptability: 3 }, // 随便给点什么都行
  },
  
  // Q26: 冲突处理
  26: {
    0: { control: 5, lion_traits: 4, resilience: 3 }, // 气场压制
    1: { impulsivity: 5, tiger_traits: 4, independence: 3 }, // 骂回去
    2: { strategy: 5, fox_traits: 4, patience: 3 }, // 设套录音
    3: { patience: 4, adaptability: 3 }, // 走开，或者忍着不说话
  },
  
  // Q27: 英雄观
  27: {
    0: { ambition: 4, lion_traits: 5, control: 4 }, // 威严如山
    1: { resilience: 5, tiger_traits: 5, independence: 4 }, // 热血冲锋
    2: { strategy: 5, fox_traits: 5, empathy: 3 }, // 聪明绝顶
    3: { patience: 3, adaptability: 3 }, // 平平淡淡
  },
};

// ==========================================
// 身份映射表
// ==========================================

const IDENTITY_MAP: Record<string, { name: string; description: string }> = {
  lion_traits: { name: "黄金狮王", description: "威严如山，统御四方，天生的领导者" },
  tiger_traits: { name: "烈焰元帅", description: "勇猛果敢，冲锋陷阵，战场上的猛将" },
  fox_traits: { name: "逍遥鲲鹏", description: "智慧超群，运筹帷幄，智者的化身" },
  wolf_traits: { name: "忠诚战狼", description: "团队至上，重情重义，可靠的伙伴" },
  eagle_traits: { name: "苍穹雄鹰", description: "高瞻远瞩，洞察秋毫，战略家" },
  phoenix_traits: { name: "涅槃凤凰", description: "优雅重生，适应力强，变革者" },
};

// ==========================================
// 核心算法函数
// ==========================================

/**
 * 计算所有标签的加权得分
 */
function calculateTagWeights(answers: AnswerRecord): TagWeights {
  const weights: TagWeights = {
    ambition: 0,
    resilience: 0,
    patience: 0,
    fragility: 0,
    control: 0,
    independence: 0,
    empathy: 0,
    strategy: 0,
    impulsivity: 0,
    adaptability: 0,
    lion_traits: 0,
    tiger_traits: 0,
    fox_traits: 0,
    wolf_traits: 0,
    eagle_traits: 0,
    phoenix_traits: 0,
  };

  Object.entries(answers).forEach(([questionIdStr, selectedText]) => {
    const questionId = parseInt(questionIdStr);
    const question = questions.find(q => q.id === questionId);
    
    if (!question) return;
    
    // 找到用户选择的选项索引
    const optionIndex = question.options.findIndex(opt => opt.text === selectedText);
    if (optionIndex === -1) return;
    
    // 获取该选项的标签权重
    const optionWeights = SCORING_MATRIX[questionId]?.[optionIndex];
    if (!optionWeights) return;
    
    // 累加权重
    Object.entries(optionWeights).forEach(([tag, weight]) => {
      const key = tag as keyof TagWeights;
      if (weights.hasOwnProperty(key)) {
        weights[key] += weight;
      }
    });
  });

  return weights;
}

/**
 * 动态身份判定
 */
function determineIdentity(weights: TagWeights): IdentityResult {
  // 提取所有神兽特质得分
  const traitScores = {
    lion_traits: weights.lion_traits,
    tiger_traits: weights.tiger_traits,
    fox_traits: weights.fox_traits,
    wolf_traits: weights.wolf_traits,
    eagle_traits: weights.eagle_traits,
    phoenix_traits: weights.phoenix_traits,
  };

  // 按得分排序
  const sorted = Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a)
    .map(([trait, score]) => ({ trait, score }));

  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  // 判断是否为双相神兽（前两名得分相差 < 2）
  const isHybrid = first.score > 0 && second.score > 0 && (first.score - second.score) < 2;

  return {
    primary: first.trait,
    secondary: isHybrid ? second.trait : undefined,
    isHybrid,
    scores: weights,
  };
}

/**
 * 关联诊断（交叉分析）
 */
function performCrossAnalysis(weights: TagWeights): DiagnosticResult {
  const diagnostics: string[] = [];
  const warnings: string[] = [];
  const strengths: string[] = [];

  // 诊断规则 1: 野心 vs 抗挫力
  if (weights.ambition > 80 && weights.resilience < 30) {
    diagnostics.push("心比天高，命比纸薄。典型的'玻璃心霸王'，遇到小挫折就会崩盘。你的野心如烈火，但抗压能力却如薄冰，这是你最大的命门。");
    warnings.push("建议：先修炼内心韧性，再追求外在成就。否则，每一次失败都会成为压垮你的最后一根稻草。");
  } else if (weights.ambition > 80 && weights.resilience > 80) {
    diagnostics.push("天生的战神，越挫越勇，天命不可挡。你的野心与韧性完美结合，这是成就大业的黄金配置。");
    strengths.push("你拥有'打不死的小强'精神，无论遇到什么挫折，都能重新站起来，这是你最大的优势。");
  }

  // 诊断规则 2: 控制欲 vs 共情力
  if (weights.control > 80 && weights.empathy < 30) {
    diagnostics.push("独裁者的孤独。你渴望掌控一切，却缺乏理解他人的能力，这会让你的团队离心离德。");
    warnings.push("建议：学会倾听，理解他人需求。真正的领导力不是控制，而是感召。");
  } else if (weights.control > 60 && weights.empathy > 60) {
    diagnostics.push("天生的领袖。你既有掌控全局的能力，又能理解他人，这是完美的领导配置。");
    strengths.push("你的领导风格既有威严，又有温度，这是你最大的魅力所在。");
  }

  // 诊断规则 3: 策略性 vs 冲动性
  if (weights.strategy > 80 && weights.impulsivity < 30) {
    diagnostics.push("智者的冷静。你善于谋划，从不冲动行事，这是你最大的优势。");
    strengths.push("你的理性思维让你在关键时刻总能做出最正确的决策。");
  } else if (weights.impulsivity > 80 && weights.strategy < 30) {
    diagnostics.push("行动派的莽撞。你行动迅速，但缺乏深思熟虑，容易在关键时刻做出错误决定。");
    warnings.push("建议：学会三思而后行。有时候，慢一点反而能走得更远。");
  } else if (weights.strategy > 60 && weights.impulsivity > 60) {
    diagnostics.push("矛盾的双面体。你既有深思熟虑的一面，又有冲动行事的一面，这种矛盾让你难以预测。");
    warnings.push("建议：学会平衡理性与感性，在关键时刻做出最合适的选择。");
  }

  // 诊断规则 4: 脆弱性 vs 独立性
  if (weights.fragility > 80 && weights.independence < 30) {
    diagnostics.push("温室里的花朵。你内心脆弱，又缺乏独立能力，这让你在现实世界中举步维艰。");
    warnings.push("建议：逐步培养独立能力，增强心理韧性。只有走出舒适区，才能成长。");
  } else if (weights.fragility < 30 && weights.independence > 80) {
    diagnostics.push("钢铁意志。你内心强大，又极度独立，这是你最大的优势。");
    strengths.push("你拥有'打不死'的精神，无论遇到什么困难，都能独自面对并解决。");
  }

  // 诊断规则 5: 耐性 vs 适应性
  if (weights.patience > 80 && weights.adaptability < 30) {
    diagnostics.push("守旧者的固执。你很有耐心，但缺乏适应能力，这让你在快速变化的世界中显得格格不入。");
    warnings.push("建议：学会拥抱变化，适应新环境。只有与时俱进，才能不被淘汰。");
  } else if (weights.patience > 60 && weights.adaptability > 60) {
    diagnostics.push("完美的平衡者。你既有耐心，又有适应能力，这是你最大的优势。");
    strengths.push("你能够在变化中保持稳定，在稳定中寻求突破，这是你最大的魅力。");
  }

  // 如果没有匹配的诊断，生成通用诊断
  if (diagnostics.length === 0) {
    const maxTag = Object.entries(weights)
      .filter(([key]) => !key.includes('_traits'))
      .sort(([, a], [, b]) => b - a)[0];
    
    if (maxTag && maxTag[1] > 50) {
      diagnostics.push(`你的${getTagName(maxTag[0])}得分最高，这是你性格的核心特征。`);
    } else {
      diagnostics.push("你的性格特征较为均衡，没有明显的极端倾向。");
    }
  }

  return {
    crossAnalysis: diagnostics.join("\n\n"),
    warnings,
    strengths,
  };
}

/**
 * 获取标签的中文名称
 */
function getTagName(tag: string): string {
  const tagNames: Record<string, string> = {
    ambition: "野心",
    resilience: "抗挫力",
    patience: "耐性",
    fragility: "脆弱性",
    control: "控制欲",
    independence: "独立性",
    empathy: "共情力",
    strategy: "策略性",
    impulsivity: "冲动性",
    adaptability: "适应性",
  };
  return tagNames[tag] || tag;
}

// ==========================================
// 动态文案库
// ==========================================

/**
 * 根据分数段获取文案等级
 */
function getScoreLevel(score: number): "low" | "medium" | "high" {
  if (score < 30) return "low";
  if (score < 70) return "medium";
  return "high";
}

/**
 * 生成"天命封印"板块内容
 */
function generateSealOfDestiny(identity: IdentityResult, weights: TagWeights): string {
  const primaryIdentity = IDENTITY_MAP[identity.primary];
  const secondaryIdentity = identity.secondary ? IDENTITY_MAP[identity.secondary] : null;

  if (identity.isHybrid && secondaryIdentity) {
    return `【天命封印：${primaryIdentity.name} × ${secondaryIdentity.name}】

经过天、地、人三才的推演，你的元神特质呈现出罕见的"双相神兽"形态。

你的主元神是${primaryIdentity.name}，${primaryIdentity.description}。但同时，你的次元神${secondaryIdentity.name}也在暗中涌动，${secondaryIdentity.description}。

这种矛盾的特质让你在人群中显得与众不同。你既有${primaryIdentity.name}的威严与统御力，又有${secondaryIdentity.name}的${secondaryIdentity.description.includes('智慧') ? '智慧与洞察' : secondaryIdentity.description.includes('勇猛') ? '勇猛与果敢' : '灵活与适应'}。

这种双相特质既是你的优势，也是你的挑战。你需要学会在两种特质之间找到平衡，让它们相互补充，而不是相互冲突。

【封印等级】：★★★★☆（双相神兽，潜力巨大）
【觉醒难度】：★★★★★（需要极高的自我认知和平衡能力）`;
  } else {
    return `【天命封印：${primaryIdentity.name}】

经过天、地、人三才的推演，你的元神特质更偏向于${primaryIdentity.name}。

${primaryIdentity.description}。这是你与生俱来的天赋，也是你命运的起点。

你的性格特征中，${getTopTraits(weights, 3).map(t => `${t.name}(${t.score}分)`).join('、')}得分最高，这决定了你的核心特质。

【封印等级】：${getSealLevel(weights)}（${getSealDescription(weights)}）
【觉醒难度】：${getAwakeningDifficulty(weights)}（${getAwakeningDescription(weights)}）`;
  }
}

/**
 * 生成"金字塔断层"板块内容
 */
function generatePyramidFault(diagnostic: DiagnosticResult, weights: TagWeights): string {
  const topTraits = getTopTraits(weights, 3);
  const weakTraits = getWeakTraits(weights, 3);

  return `【金字塔断层：五原力失衡诊断】

${diagnostic.crossAnalysis}

【五原力得分排名】：
${topTraits.map((t, i) => `${i + 1}. ${t.name}: ${t.score}分`).join('\n')}

【薄弱环节】：
${weakTraits.map((t, i) => `${i + 1}. ${t.name}: ${t.score}分（需要重点修炼）`).join('\n')}

${diagnostic.warnings.length > 0 ? `\n【警告信号】\n${diagnostic.warnings.map(w => `⚠️ ${w}`).join('\n')}` : ''}

${diagnostic.strengths.length > 0 ? `\n【优势分析】\n${diagnostic.strengths.map(s => `✅ ${s}`).join('\n')}` : ''}`;
}

/**
 * 生成"十年预演"板块内容
 */
function generateTenYearPreview(identity: IdentityResult, weights: TagWeights, diagnostic: DiagnosticResult): string {
  const primaryIdentity = IDENTITY_MAP[identity.primary];
  const ageGroups = [
    { age: "18-22岁", description: "大学/初入社会" },
    { age: "23-27岁", description: "职场打拼/创业初期" },
    { age: "28-32岁", description: "事业上升/人生转折" },
  ];

  const previews = ageGroups.map(({ age, description }) => {
    return generateAgePreview(age, description, identity, weights, diagnostic);
  });

  return `【十年预演：未来轨迹推演】

基于你的${primaryIdentity.name}特质和五原力得分，我们为你推演了未来十年的关键节点：

${previews.join('\n\n')}

【总体预测】：
${generateOverallPrediction(identity, weights, diagnostic)}`;
}

/**
 * 生成特定年龄段的预演
 */
function generateAgePreview(
  age: string,
  description: string,
  identity: IdentityResult,
  weights: TagWeights,
  diagnostic: DiagnosticResult
): string {
  const primaryIdentity = IDENTITY_MAP[identity.primary];
  const templates: Record<string, string[]> = {
    "18-22岁": [
      `在${age}这个阶段，你的${primaryIdentity.name}特质开始显现。${description}，你会${weights.ambition > 70 ? '展现出强烈的野心和抱负' : weights.strategy > 70 ? '展现出过人的智慧和策略' : '展现出独特的个性魅力'}。`,
      `这个阶段的关键挑战是${weights.resilience < 40 ? '抗挫力不足，容易在遇到困难时放弃' : weights.adaptability < 40 ? '适应能力不足，难以快速融入新环境' : '需要找到自己的定位和方向'}。`,
      `建议：${weights.fragility > 60 ? '加强心理建设，培养韧性' : weights.independence < 40 ? '逐步培养独立能力' : '保持现有优势，继续发展'}。`,
    ],
    "23-27岁": [
      `进入${age}，你的${primaryIdentity.name}特质将得到充分展现。${description}，你会${weights.control > 70 ? '展现出强大的领导力和控制欲' : weights.empathy > 70 ? '展现出出色的共情能力和人际魅力' : '展现出独特的竞争优势'}。`,
      `这个阶段的关键机遇是${weights.strategy > 70 ? '利用你的策略思维，在复杂环境中找到突破口' : weights.resilience > 70 ? '利用你的韧性，在困难中坚持到底' : '利用你的独特优势，在竞争中脱颖而出'}。`,
      `建议：${diagnostic.warnings.length > 0 ? diagnostic.warnings[0] : '保持现有优势，继续发展'}。`,
    ],
    "28-32岁": [
      `在${age}这个阶段，你的${primaryIdentity.name}特质将达到巅峰。${description}，你会${identity.isHybrid ? '展现出双相神兽的独特魅力，在两种特质之间找到完美平衡' : '展现出单一特质的极致优势'}。`,
      `这个阶段的关键转折是${weights.ambition > 80 ? '实现你的野心和抱负，达到人生巅峰' : weights.strategy > 80 ? '利用你的智慧，在复杂环境中找到最优解' : '找到人生的真正意义和价值'}。`,
      `建议：${diagnostic.strengths.length > 0 ? `继续发挥${diagnostic.strengths[0]}` : '保持现有优势，继续发展'}。`,
    ],
  };

  const template = templates[age] || templates["18-22岁"];
  return `【${age}：${description}】
${template.join('\n')}`;
}

/**
 * 生成总体预测
 */
function generateOverallPrediction(
  identity: IdentityResult,
  weights: TagWeights,
  diagnostic: DiagnosticResult
): string {
  const primaryIdentity = IDENTITY_MAP[identity.primary];
  
  if (identity.isHybrid) {
    return `你是一个罕见的"双相神兽"，拥有${primaryIdentity.name}和${IDENTITY_MAP[identity.secondary!].name}的双重特质。这种矛盾的特质让你在人生道路上充满变数，但也充满机遇。你需要学会在两种特质之间找到平衡，让它们相互补充，而不是相互冲突。如果你能做到这一点，你将成为人群中最独特、最有魅力的人。`;
  } else {
    const topTrait = getTopTraits(weights, 1)[0];
    return `基于你的${primaryIdentity.name}特质和${topTrait.name}得分，你的未来十年将充满${weights.ambition > 70 ? '挑战和机遇' : weights.strategy > 70 ? '智慧和策略' : '稳定和成长'}。你需要${diagnostic.warnings.length > 0 ? `注意${diagnostic.warnings[0]}` : '继续保持现有优势'}，同时${diagnostic.strengths.length > 0 ? `发挥${diagnostic.strengths[0]}` : '继续发展新的能力'}。如果你能做到这一点，你将在未来十年中取得令人瞩目的成就。`;
  }
}

// ==========================================
// 辅助函数
// ==========================================

/**
 * 获取得分最高的特质
 */
function getTopTraits(weights: TagWeights, count: number): Array<{ name: string; score: number }> {
  return Object.entries(weights)
    .filter(([key]) => !key.includes('_traits'))
    .map(([key, score]) => ({ name: getTagName(key), score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

/**
 * 获取得分最低的特质
 */
function getWeakTraits(weights: TagWeights, count: number): Array<{ name: string; score: number }> {
  return Object.entries(weights)
    .filter(([key]) => !key.includes('_traits'))
    .map(([key, score]) => ({ name: getTagName(key), score }))
    .sort((a, b) => a.score - b.score)
    .slice(0, count);
}

/**
 * 获取封印等级
 */
function getSealLevel(weights: TagWeights): string {
  const maxScore = Math.max(...Object.values(weights).filter((_, i, arr) => i < arr.length - 6));
  if (maxScore > 100) return "★★★★★";
  if (maxScore > 70) return "★★★★☆";
  if (maxScore > 50) return "★★★☆☆";
  return "★★☆☆☆";
}

/**
 * 获取封印描述
 */
function getSealDescription(weights: TagWeights): string {
  const maxScore = Math.max(...Object.values(weights).filter((_, i, arr) => i < arr.length - 6));
  if (maxScore > 100) return "天赋异禀，潜力无限";
  if (maxScore > 70) return "天赋出众，值得培养";
  if (maxScore > 50) return "天赋一般，需要努力";
  return "天赋普通，需要加倍努力";
}

/**
 * 获取觉醒难度
 */
function getAwakeningDifficulty(weights: TagWeights): string {
  const maxScore = Math.max(...Object.values(weights).filter((_, i, arr) => i < arr.length - 6));
  if (maxScore > 100) return "★★★★★";
  if (maxScore > 70) return "★★★★☆";
  if (maxScore > 50) return "★★★☆☆";
  return "★★☆☆☆";
}

/**
 * 获取觉醒描述
 */
function getAwakeningDescription(weights: TagWeights): string {
  const maxScore = Math.max(...Object.values(weights).filter((_, i, arr) => i < arr.length - 6));
  if (maxScore > 100) return "需要极高的自我认知和平衡能力";
  if (maxScore > 70) return "需要较强的自我认知和平衡能力";
  if (maxScore > 50) return "需要一定的自我认知和平衡能力";
  return "需要基础的自我认知和平衡能力";
}

// ==========================================
// 主函数：生成报告
// ==========================================

/**
 * 生成动态报告
 * @param answers 用户答案记录 { questionId: selectedOptionText }
 * @returns 报告内容
 */
export function generateReport(answers: AnswerRecord): ReportContent {
  // 1. 计算标签权重
  const weights = calculateTagWeights(answers);

  // 2. 动态身份判定
  const identity = determineIdentity(weights);

  // 3. 关联诊断
  const diagnostic = performCrossAnalysis(weights);

  // 4. 生成报告内容
  const sealOfDestiny = generateSealOfDestiny(identity, weights);
  const pyramidFault = generatePyramidFault(diagnostic, weights);
  const tenYearPreview = generateTenYearPreview(identity, weights, diagnostic);

  return {
    sealOfDestiny,
    pyramidFault,
    tenYearPreview,
  };
}

/**
 * 导出辅助函数（用于测试）
 */
export {
  calculateTagWeights,
  determineIdentity,
  performCrossAnalysis,
  getTopTraits,
  getWeakTraits,
};
