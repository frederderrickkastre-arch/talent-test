/**
 * localStorage 数据存储服务
 * 替代后端数据库，所有数据存储在浏览器本地
 */

const STORAGE_KEYS = {
  ASSESSMENTS: "talent_assessments",
  ANSWERS: "talent_answers",
  CONVERSATIONS: "talent_conversations",
  REPORTS: "talent_reports",
} as const;

export interface Assessment {
  assessmentId: number;
  childName: string;
  gender: "male" | "female";
  age: number;
  status: "in_progress" | "ai_chat" | "report_generated";
  currentQuestion: number;
  createdAt: string;
}

export interface Answer {
  assessmentId: number;
  questionId: number;
  selectedOption: "A" | "B";
}

export interface Conversation {
  assessmentId: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Report {
  assessmentId: number;
  dimensionScores: Record<string, number>;
  reportTitle: string;
  reportContent: string;
  coreStrengths: string[];
  recommendations: string[];
}

// 获取所有评估记录
function getAssessments(): Assessment[] {
  const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
  return data ? JSON.parse(data) : [];
}

// 保存评估记录
function saveAssessments(assessments: Assessment[]): void {
  localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
}

// 获取所有答案
function getAnswers(): Answer[] {
  const data = localStorage.getItem(STORAGE_KEYS.ANSWERS);
  return data ? JSON.parse(data) : [];
}

// 保存答案
function saveAnswers(answers: Answer[]): void {
  localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
}

// 获取所有对话
function getConversations(): Conversation[] {
  const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
  return data ? JSON.parse(data) : [];
}

// 保存对话
function saveConversations(conversations: Conversation[]): void {
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
}

// 获取所有报告
function getReports(): Report[] {
  const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
  return data ? JSON.parse(data) : [];
}

// 保存报告
function saveReports(reports: Report[]): void {
  localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
}

// 创建新的评估
export function createAssessment(data: {
  childName: string;
  gender: "male" | "female";
  age: number;
}): { assessmentId: number } {
  const assessments = getAssessments();
  const newId = assessments.length > 0 ? Math.max(...assessments.map(a => a.assessmentId)) + 1 : 1;
  
  const newAssessment: Assessment = {
    assessmentId: newId,
    childName: data.childName,
    gender: data.gender,
    age: data.age,
    status: "in_progress",
    currentQuestion: 0,
    createdAt: new Date().toISOString(),
  };
  
  assessments.push(newAssessment);
  saveAssessments(assessments);
  
  return { assessmentId: newId };
}

// 获取评估信息
export function getAssessment(assessmentId: number): Assessment | null {
  const assessments = getAssessments();
  return assessments.find(a => a.assessmentId === assessmentId) || null;
}

// 更新评估状态
export function updateAssessmentStatus(
  assessmentId: number,
  status: Assessment["status"],
  currentQuestion?: number
): void {
  const assessments = getAssessments();
  const assessment = assessments.find(a => a.assessmentId === assessmentId);
  if (assessment) {
    assessment.status = status;
    if (currentQuestion !== undefined) {
      assessment.currentQuestion = currentQuestion;
    }
    saveAssessments(assessments);
  }
}

// 获取题目
export function getQuestion(questionNumber: number) {
  // 这个函数将在 API 服务中实现，因为需要导入题目数据
  return null;
}

// 保存答案
export function saveAnswer(data: {
  assessmentId: number;
  questionId: number;
  selectedOption: "A" | "B";
}): void {
  const answers = getAnswers();
  // 移除该题目的旧答案（如果存在）
  const filtered = answers.filter(
    a => !(a.assessmentId === data.assessmentId && a.questionId === data.questionId)
  );
  filtered.push({
    assessmentId: data.assessmentId,
    questionId: data.questionId,
    selectedOption: data.selectedOption,
  });
  saveAnswers(filtered);
}

// 获取评估的所有答案
export function getAssessmentAnswers(assessmentId: number): Answer[] {
  const answers = getAnswers();
  return answers.filter(a => a.assessmentId === assessmentId);
}

// 获取评估的所有答案（供外部使用）
export function getAssessmentAnswersForCalculation(assessmentId: number): Answer[] {
  return getAssessmentAnswers(assessmentId);
}

// 保存对话
export function saveConversation(data: {
  assessmentId: number;
  role: "user" | "assistant";
  content: string;
}): void {
  const conversations = getConversations();
  conversations.push({
    assessmentId: data.assessmentId,
    role: data.role,
    content: data.content,
    timestamp: new Date().toISOString(),
  });
  saveConversations(conversations);
}

// 获取评估的对话历史
export function getConversationHistory(assessmentId: number): Conversation[] {
  const conversations = getConversations();
  return conversations.filter(c => c.assessmentId === assessmentId);
}

// 保存报告
export function saveReport(data: {
  assessmentId: number;
  dimensionScores: Record<string, number>;
  reportTitle: string;
  reportContent: string;
  coreStrengths: string[];
  recommendations: string[];
}): void {
  const reports = getReports();
  // 移除旧报告（如果存在）
  const filtered = reports.filter(r => r.assessmentId !== data.assessmentId);
  filtered.push({
    assessmentId: data.assessmentId,
    dimensionScores: data.dimensionScores,
    reportTitle: data.reportTitle,
    reportContent: data.reportContent,
    coreStrengths: data.coreStrengths,
    recommendations: data.recommendations,
  });
  saveReports(filtered);
}

// 获取报告
export function getReport(assessmentId: number): Report | null {
  const reports = getReports();
  return reports.find(r => r.assessmentId === assessmentId) || null;
}
