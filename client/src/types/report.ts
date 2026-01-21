/**
 * 天命觉醒诊断书 - AI 返回数据结构
 * 严格匹配 UI 展示需求
 */

/**
 * 金字塔层级状态
 */
export type PyramidStatus = "collapse" | "unstable" | "solid";

/**
 * 雷达图数据项
 */
export interface RadarDataItem {
  /** 维度名称，如 "野心"、"抗挫力" 等 */
  subject: string;
  /** 得分值 (0-100) */
  A: number;
  /** 满分值，固定为 100 */
  fullMark: 100;
}

/**
 * 身份信息
 */
export interface IdentityInfo {
  /** 身份标题，如 "黄金狮王" */
  title: string;
  /** 副标题/茧中形态，如 "茧中形态：暴躁孤君" */
  subtitle: string;
  /** 判词描述，约 100 字，包含"天赋"和"魔心"的分析 */
  description: string;
  /** 总分 (0-100) */
  score: number;
  /** 雷达图数据，6个维度 */
  radar: RadarDataItem[];
}

/**
 * 金字塔层级信息
 */
export interface PyramidLayer {
  /** 层级名称，如 "根基层：安全原力" */
  layer: string;
  /** 状态：塌陷/不稳/稳固 */
  status: PyramidStatus;
  /** 得分 (0-100) */
  score: number;
  /** 扎心的诊断文案 */
  diagnosis: string;
}

/**
 * 未来剧本
 */
export interface FutureScenarios {
  /** 剧本A：悲惨现状（如果不觉醒） */
  scenarioA: string;
  /** 剧本B：觉醒辉煌（如果觉醒） */
  scenarioB: string;
}

/**
 * 解锁钥匙
 */
export interface UnlockKey {
  /** 钥匙名称，如 "锁心猿" */
  name: string;
  /** 具体的解决方案/建议 */
  solution: string;
  /** 对应的课程节数索引 */
  courseIndex: number;
}

/**
 * 完整的报告数据
 * 对应后端 Gemini AI 接口返回的 JSON 结构
 */
export interface ReportData {
  /** 身份信息 */
  identity: IdentityInfo;
  /** 金字塔层级数组（通常为 5 层） */
  pyramid: PyramidLayer[];
  /** 未来剧本 */
  future: FutureScenarios;
  /** 解锁钥匙数组 */
  keys: UnlockKey[];
}

/**
 * API 请求参数
 */
export interface ReportRequest {
  /** 用户答案记录 { questionId: selectedOptionText } */
  answers: Record<number, string>;
  /** 用户信息（可选） */
  userInfo?: {
    userName: string;
    age: number;
    gender: string;
  };
  /** 对话历史（可选，用于双重验证） */
  chatHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

/**
 * API 响应
 */
export interface ReportResponse {
  /** 是否成功 */
  success: boolean;
  /** 报告数据 */
  data?: ReportData;
  /** 错误信息 */
  error?: string;
  /** 错误代码 */
  errorCode?: string;
}
