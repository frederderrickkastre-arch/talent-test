/**
 * 天命觉醒诊断书 - 四阶金字塔报告数据结构
 * 
 * 四大板块：
 * 1. 元神觉醒（三才金字塔底层）
 * 2. 五原力雷达（能量引擎层）
 * 3. 12灵种与人生剧本（生命图谱层）
 * 4. 终极形态唤醒（生命跨越层）
 */

// ============================================
// 第一板块：元神觉醒（三才金字塔底层）
// ============================================

/** 三才类型 */
export type SanCaiType = "帅才" | "将才" | "慧才";

/** 三才等级 */
export type SanCaiRank = "天命高才" | "器用中才" | "觉醒低才";

/** 三才系统 */
export type SanCaiSystem = "天系" | "人系" | "地系";

/** 魔心类型 */
export type MoXinType = "虚荣" | "多疑" | "嫉妒";

/** 天心类型 */
export type TianXinType = "义" | "仁" | "智";

/** 三才排序项 */
export interface SanCaiRankItem {
  /** 才能类型 */
  type: SanCaiType;
  /** 排序等级 */
  rank: SanCaiRank;
  /** 分数 (0-100) */
  score: number;
}

/** 蜕变环 */
export interface TransformationRing {
  /** 茧中形态（现状）- 被魔心困住的平庸状态 */
  cocoonForm: {
    /** 形态名称，如"暴躁孤君"、"折翼天鹅" */
    name: string;
    /** 困扰的魔心类型 */
    moXin: MoXinType;
    /** 详细描述（不少于150字） */
    description: string;
  };
  /** 终极形态（目标）- 魔心转天心后的圆满状态 */
  ultimateForm: {
    /** 形态名称，如"黄金狮王"、"逍遥鲲鹏" */
    name: string;
    /** 觉醒的天心类型 */
    tianXin: TianXinType;
    /** 详细描述（不少于150字） */
    description: string;
  };
}

/** 元神觉醒板块 */
export interface YuanShenAwakening {
  /** 三才排序（3项，从高到低） */
  sanCaiRanking: SanCaiRankItem[];
  /** 角色定义 */
  roleDefinition: {
    /** 所属系统：天系/人系/地系 */
    system: SanCaiSystem;
    /** 角色名称，如"霸道统帅"、"深谋谋士"、"黄金守护者" */
    roleName: string;
    /** 角色描述（不少于100字） */
    description: string;
  };
  /** 蜕变环设计 */
  transformation: TransformationRing;
}

// ============================================
// 第二板块：五原力雷达（能量引擎层）
// ============================================

/** 五原力类型 */
export type WuYuanLiType = "执行" | "影响" | "关系" | "战略" | "直觉";

/** 五原力数据项 */
export interface WuYuanLiItem {
  /** 原力类型 */
  subject: WuYuanLiType;
  /** 得分值 (0-100) */
  score: number;
  /** 满分值，固定为 100 */
  fullMark: 100;
  /** 简短描述 */
  brief: string;
}

/** 五原力雷达板块 */
export interface WuYuanLiRadar {
  /** 五原力数据（5项） */
  forces: WuYuanLiItem[];
  /** 深度分析：能量高低分布解读（不少于200字） */
  distributionAnalysis: string;
  /** 深度分析：原力互补关系解读（不少于200字） */
  complementAnalysis: string;
}

// ============================================
// 第三板块：12灵种与人生剧本（生命图谱层）
// ============================================

/** 灵种类型 */
export type LingZhongType = 
  | "美丑" | "真假" | "善恶"     // 价值判断三灵种
  | "支配欲" | "陶醉欲" | "积累欲"  // 欲望动力三灵种
  | "胆量" | "定力" | "格局"     // 心力修行三灵种
  | "勇气" | "仁爱" | "智慧";    // 天心觉醒三灵种

/** 灵种状态 */
export type LingZhongStatus = "沉睡" | "萌芽" | "觉醒";

/** 灵种数据项 */
export interface LingZhongItem {
  /** 灵种类型 */
  type: LingZhongType;
  /** 状态 */
  status: LingZhongStatus;
  /** 得分 (0-100) */
  score: number;
  /** 简短诊断 */
  diagnosis: string;
}

/** 12灵种与人生剧本板块 */
export interface LingZhongLifeScript {
  /** 12灵种映射 */
  lingZhongs: LingZhongItem[];
  /** 学业镜像分析（核心！解释为什么学习不好，不少于400字） */
  academicMirror: {
    /** 学业问题根源分析 */
    rootCause: string;
    /** 具体表现 */
    manifestations: string[];
    /** 心理机制解释 */
    psychologyExplanation: string;
  };
  /** 未来警示：如果不修正，学习短路如何演变成事业崩塌（不少于300字） */
  futureWarning: string;
}

// ============================================
// 第四板块：终极形态唤醒（生命跨越层）
// ============================================

/** 终极形态唤醒板块 */
export interface UltimateAwakening {
  /** 巅峰描述：完全解锁天心后的终极人生图景（不少于400字） */
  peakVision: string;
  /** 解锁密钥 */
  unlockKeys: {
    /** 改变命运的一句话 */
    destinyQuote: string;
    /** 具体修行动作（3项） */
    practiceActions: Array<{
      /** 动作名称 */
      name: string;
      /** 具体方法（不少于100字） */
      method: string;
      /** 对应课程索引 */
      courseIndex: number;
    }>;
  };
}

// ============================================
// 完整报告数据结构
// ============================================

/** 四阶金字塔报告数据 */
export interface ReportData {
  /** 第一板块：元神觉醒 */
  yuanShen: YuanShenAwakening;
  /** 第二板块：五原力雷达 */
  wuYuanLi: WuYuanLiRadar;
  /** 第三板块：12灵种与人生剧本 */
  lingZhong: LingZhongLifeScript;
  /** 第四板块：终极形态唤醒 */
  ultimate: UltimateAwakening;
  
  // === 兼容旧版前端的字段 ===
  /** @deprecated 使用 yuanShen.transformation.ultimateForm 替代 */
  identity?: {
    title: string;
    subtitle: string;
    description: string;
    score: number;
    radar: Array<{ subject: string; A: number; fullMark: number }>;
  };
  /** @deprecated 使用 wuYuanLi 替代 */
  pyramid?: Array<{
    layer: string;
    status: "collapse" | "unstable" | "solid";
    score: number;
    diagnosis: string;
  }>;
  /** @deprecated 使用 lingZhong.futureWarning 和 ultimate.peakVision 替代 */
  future?: {
    scenarioA: string;
    scenarioB: string;
  };
  /** @deprecated 使用 ultimate.unlockKeys.practiceActions 替代 */
  keys?: Array<{
    name: string;
    solution: string;
    courseIndex: number;
  }>;
}

// ============================================
// API 请求/响应类型
// ============================================

/** 金字塔层级状态 */
export type PyramidStatus = "collapse" | "unstable" | "solid";

/** 雷达图数据项（兼容旧版） */
export interface RadarDataItem {
  subject: string;
  A: number;
  fullMark: 100;
}

/** 身份信息（兼容旧版） */
export interface IdentityInfo {
  title: string;
  subtitle: string;
  description: string;
  score: number;
  radar: RadarDataItem[];
}

/** 金字塔层级信息（兼容旧版） */
export interface PyramidLayer {
  layer: string;
  status: PyramidStatus;
  score: number;
  diagnosis: string;
}

/** 未来剧本（兼容旧版） */
export interface FutureScenarios {
  scenarioA: string;
  scenarioB: string;
}

/** 解锁钥匙（兼容旧版） */
export interface UnlockKey {
  name: string;
  solution: string;
  courseIndex: number;
}

/** API 请求参数 */
export interface ReportRequest {
  answers: Record<number, string>;
  userInfo?: {
    userName: string;
    age: number;
    gender: string;
  };
  chatHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

/** API 响应 */
export interface ReportResponse {
  success: boolean;
  data?: ReportData;
  error?: string;
  errorCode?: string;
}
