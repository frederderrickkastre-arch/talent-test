// schema.ts
// ==========================================
// 三才天赋测试 - 核心数据结构
// ==========================================

/**
 * 天赋类型枚举
 */
export type TalentType = '将才' | '帅才' | '慧才';

/**
 * 十二颗灵种类型
 */
export type TwelveSeedsType = '忍稳准狠' | '松静定慧' | '真善美乐';

/**
 * 外在识别维度
 */
export interface ExternalRecognition {
  /** 面相特征 */
  facialFeatures: {
    description: string; // 面相描述
    characteristics: string[]; // 特征列表
  };
  /** 眼神特征 */
  eyeExpression: {
    description: string; // 眼神描述
    traits: string[]; // 眼神特质
  };
  /** 肢体语言 */
  bodyLanguage: {
    description: string; // 肢体语言描述
    gestures: string[]; // 典型动作/姿态
  };
}

/**
 * 内在画像维度
 */
export interface InternalPortrait {
  /** 性格特征 */
  personality: {
    coreTraits: string[]; // 核心性格特质
    description: string; // 性格描述
  };
  /** 思维模式 */
  thinking: {
    pattern: string; // 思维模式描述
    strengths: string[]; // 思维优势
    characteristics: string[]; // 思维特征
  };
  /** 内心世界 */
  innerWorld: {
    description: string; // 内心世界描述
    values: string[]; // 核心价值观
    motivations: string[]; // 内在驱动力
  };
}

/**
 * 情感观维度
 */
export interface EmotionalView {
  /** 情感表达方式 */
  expression: {
    style: string; // 表达风格
    description: string; // 详细描述
  };
  /** 情感处理方式 */
  handling: {
    approach: string; // 处理方式
    strategies: string[]; // 应对策略
  };
  /** 情感需求 */
  needs: {
    primary: string[]; // 主要情感需求
    description: string; // 需求描述
  };
}

/**
 * 社交说服之道维度
 */
export interface SocialPersuasion {
  /** 沟通风格 */
  communication: {
    style: string; // 沟通风格
    characteristics: string[]; // 沟通特点
  };
  /** 说服策略 */
  persuasion: {
    methods: string[]; // 说服方法
    strengths: string[]; // 说服优势
  };
  /** 社交影响力 */
  influence: {
    level: '高' | '中' | '低';
    description: string; // 影响力描述
    ways: string[]; // 影响方式
  };
}

/**
 * 死穴与修炼路径维度
 */
export interface WeaknessAndCultivation {
  /** 死穴（弱点/盲点） */
  weaknesses: {
    critical: string[]; // 关键弱点
    blindSpots: string[]; // 盲点
    description: string; // 弱点描述
  };
  /** 修炼路径 */
  cultivation: {
    path: string; // 修炼路径描述
    steps: string[]; // 修炼步骤
    focus: string[]; // 修炼重点
  };
  /** 成长建议 */
  growth: {
    suggestions: string[]; // 成长建议
    priorities: string[]; // 优先级
  };
}

/**
 * 十二颗灵种
 */
export interface TwelveSeeds {
  /** 灵种类型 */
  type: TwelveSeedsType;
  /** 灵种含义 */
  meaning: {
    description: string; // 整体含义
    seeds: {
      name: string; // 灵种名称（如：忍、稳、准、狠）
      description: string; // 该灵种的描述
      cultivation: string; // 修炼方法
    }[];
  };
  /** 修炼建议 */
  cultivation: {
    daily: string[]; // 日常修炼
    weekly: string[]; // 周度修炼
    monthly: string[]; // 月度修炼
  };
}

/**
 * 三才天赋测试报告
 */
export interface TalentAssessmentReport {
  /** 基本信息 */
  id: string;
  meta: {
    userName: string;
    age: number;
    gender: string;
    reportDate: string;
    totalWords?: number;
  };

  /** 天赋类型 */
  talentType: {
    type: TalentType; // 将才/帅才/慧才
    title: string; // 如："天生将才"、"统帅之才"、"智慧之囊"
    description: string; // 天赋类型描述
    score: {
      /** 将才得分 */
      general: number; // 0-100
      /** 帅才得分 */
      marshal: number; // 0-100
      /** 慧才得分 */
      wisdom: number; // 0-100
    };
  };

  /** 测评维度 */
  dimensions: {
    /** 外在识别（面相/眼神/肢体） */
    externalRecognition: ExternalRecognition;
    /** 内在画像（性格/思维/内心世界） */
    internalPortrait: InternalPortrait;
    /** 情感观 */
    emotionalView: EmotionalView;
    /** 社交说服之道 */
    socialPersuasion: SocialPersuasion;
    /** 死穴与修炼路径 */
    weaknessAndCultivation: WeaknessAndCultivation;
  };

  /** 十二颗灵种 */
  twelveSeeds: TwelveSeeds;

  /** 综合评估 */
  summary: {
    /** 核心优势 */
    strengths: string[];
    /** 发展潜力 */
    potential: string[];
    /** 关键提醒 */
    reminders: string[];
    /** 总体评价 */
    overall: string;
  };

  /** 修身建议 */
  cultivationAdvice: {
    /** 短期目标（1-3个月） */
    shortTerm: {
      goals: string[];
      actions: string[];
    };
    /** 中期目标（3-12个月） */
    mediumTerm: {
      goals: string[];
      actions: string[];
    };
    /** 长期目标（1年以上） */
    longTerm: {
      goals: string[];
      actions: string[];
    };
  };
}
