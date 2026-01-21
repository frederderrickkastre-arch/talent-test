/**
 * API 服务
 * 使用真实 API，无 Mock 逻辑
 */

import { ASSESSMENT_QUESTIONS, type QuestionData } from "@/data/questions";
import * as storage from "./storage";

// AI 对话函数 - 只使用真实 API
export async function callAIChat(message: string, conversationHistory: Array<{ role: "user" | "assistant"; content: string }>): Promise<string> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const aiModel = import.meta.env.VITE_AI_MODEL;

  // 调试：输出所有环境变量
  console.log("=== 环境变量检查 ===");
  console.log("VITE_API_KEY:", apiKey ? `${apiKey.substring(0, 15)}...` : "❌ 未设置");
  console.log("VITE_API_BASE_URL:", apiBaseUrl || "❌ 未设置");
  console.log("VITE_AI_MODEL:", aiModel || "❌ 未设置");
  console.log("所有 import.meta.env:", import.meta.env);
  console.log("===================");

  // 检查配置
  if (!apiKey || !apiBaseUrl || !aiModel) {
    const errorMsg = `API 配置不完整！
    
已检查的环境变量：
- VITE_API_KEY: ${apiKey ? "已设置" : "❌ 未设置"}
- VITE_API_BASE_URL: ${apiBaseUrl || "❌ 未设置"}
- VITE_AI_MODEL: ${aiModel || "❌ 未设置"}

请确认：
1. .env 文件在项目根目录（与 package.json 同级）
2. 变量名以 VITE_ 开头
3. 已重启开发服务器（npm run dev）
4. 浏览器已刷新页面`;
    
    console.error(errorMsg);
    alert(errorMsg);
    throw new Error("API 配置不完整。请检查 .env 文件中的 VITE_API_KEY、VITE_API_BASE_URL 和 VITE_AI_MODEL");
  }

  const finalUrl = `${apiBaseUrl}/chat/completions`;
  
  console.log("正在请求API:", finalUrl, aiModel);
  console.log("正在请求的完整地址:", finalUrl);

  const requestBody = {
    model: aiModel,
    messages: [
      {
        role: "system",
        content: "你是一个专业的青少年天赋挖掘师，名叫小天。你的用户是一个刚做完测评的学生。请根据他的得分，用幽默、活泼、像大哥哥一样的语气和他聊天。多用 Emoji。绝对不要说官话套话。",
      },
      ...conversationHistory,
      { role: "user", content: message },
    ],
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
      
      // 暴力调试：直接弹窗显示错误
      alert('API连接失败！状态码: ' + response.status + '\n原因: ' + errorText);
      
      throw new Error(`API 调用失败: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API 响应数据:", data);

    // 提取回复内容
    const content = 
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.delta?.content ||
      data.content ||
      data.text ||
      data.message?.content;

    if (!content) {
      console.error("API 响应中没有找到内容字段:", data);
      throw new Error("API 响应格式不正确，未找到内容字段");
    }

    console.log("✅ 成功获取 AI 回复:", content.substring(0, 100) + "...");
    return content;
  } catch (error) {
    console.error("❌ API 调用异常:", error);
    console.error("错误详情:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    // 暴力调试：直接弹窗显示错误
    if (error instanceof Error) {
      alert('网络错误！\n' + error.message);
    } else {
      alert('网络错误！\n' + String(error));
    }
    
    // 如果是网络错误（CORS、连接失败等）
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("可能是网络错误或 CORS 问题");
      throw new Error(`网络错误: ${error.message}。请检查 API 地址是否正确，以及是否存在 CORS 限制。`);
    }
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`API 调用失败: ${String(error)}`);
  }
}

// 生成报告函数 - 只使用真实 API
async function generateReportWithAPI(
  childName: string,
  age: number,
  scores: Record<string, number>
): Promise<{
  title: string;
  coreStrengths: string[];
  analysis: string;
  recommendations: string[];
}> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const aiModel = import.meta.env.VITE_AI_MODEL;

  // 检查配置
  if (!apiKey || !apiBaseUrl || !aiModel) {
    throw new Error("API 配置不完整。请检查 .env 文件中的 VITE_API_KEY、VITE_API_BASE_URL 和 VITE_AI_MODEL");
  }

  const finalUrl = `${apiBaseUrl}/chat/completions`;
  const scoresText = Object.entries(scores)
    .map(([dim, score]) => `${dim}: ${score}分`)
    .join("，");

  console.log("正在请求API生成报告:", finalUrl, aiModel);
  console.log("正在请求的完整地址:", finalUrl);

  const requestBody = {
    model: aiModel,
    messages: [
      {
        role: "system",
        content: "你是天赋测评报告专家。根据测评结果生成个性化报告。返回JSON格式，包含title、coreStrengths（数组）、analysis、recommendations（数组）字段。",
      },
      {
        role: "user",
        content: `被测评者：${childName}（${age}岁）。维度得分：${scoresText}。请生成报告。`,
      },
    ],
    response_format: { type: "json_object" },
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
      
      // 暴力调试：直接弹窗显示错误
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
    const content = 
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

    // 解析 JSON
    try {
      const report = JSON.parse(content);
      console.log("✅ 成功解析报告数据:", report);
      
      return {
        title: report.title || `${childName}的天赋测评报告`,
        coreStrengths: Array.isArray(report.coreStrengths) ? report.coreStrengths : [],
        analysis: report.analysis || "",
        recommendations: Array.isArray(report.recommendations) ? report.recommendations : [],
      };
    } catch (parseError) {
      console.error("JSON 解析失败:", parseError, content);
      alert('报告JSON解析失败！\n错误: ' + (parseError instanceof Error ? parseError.message : String(parseError)) + '\n内容: ' + content.substring(0, 200));
      throw new Error(`报告 JSON 解析失败: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
  } catch (error) {
    console.error("API 调用异常:", error);
    
    // 暴力调试：直接弹窗显示错误
    if (error instanceof Error) {
      alert('网络错误！\n' + error.message);
    } else {
      alert('网络错误！\n' + String(error));
    }
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`API 调用失败: ${String(error)}`);
  }
}

// API 服务接口
export const assessmentApi = {
  // 创建评估
  create: async (data: {
    childName: string;
    gender: "male" | "female";
    age: number;
  }): Promise<{ assessmentId: number }> => {
    return storage.createAssessment(data);
  },

  // 获取题目
  getQuestion: async (params: {
    assessmentId: number;
    questionNumber: number;
  }): Promise<QuestionData | null> => {
    const assessment = storage.getAssessment(params.assessmentId);
    if (!assessment) {
      throw new Error("Assessment not found");
    }
    
    const question = ASSESSMENT_QUESTIONS.find(q => q.questionNumber === params.questionNumber);
    return question || null;
  },

  // 保存答案
  saveAnswer: async (data: {
    assessmentId: number;
    questionId: number;
    selectedOption: "A" | "B";
  }): Promise<{ success: boolean }> => {
    storage.saveAnswer(data);
    const nextQuestion = Math.min(data.questionId + 1, 65);
    storage.updateAssessmentStatus(data.assessmentId, "in_progress", nextQuestion);
    return { success: true };
  },

  // 完成问卷
  completeQuestionnaire: async (data: {
    assessmentId: number;
  }): Promise<{ success: boolean }> => {
    storage.updateAssessmentStatus(data.assessmentId, "ai_chat");
    return { success: true };
  },

  // AI 对话 - 只使用真实 API
  aiChat: async (data: {
    assessmentId: number;
    message: string;
  }): Promise<{ response: string }> => {
    // 保存用户消息
    storage.saveConversation({
      assessmentId: data.assessmentId,
      role: "user",
      content: data.message,
    });
    
    // 获取对话历史
    const history = storage.getConversationHistory(data.assessmentId);
    const conversationHistory = history.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));
    
    // 调用真实 API
    const aiResponse = await callAIChat(data.message, conversationHistory);
    
    // 保存 AI 回复
    storage.saveConversation({
      assessmentId: data.assessmentId,
      role: "assistant",
      content: aiResponse,
    });
    
    return { response: aiResponse };
  },

  // 生成报告 - 只使用真实 API
  generateReport: async (data: {
    assessmentId: number;
  }): Promise<{
    success: boolean;
    scores: Record<string, number>;
    report: {
      title: string;
      coreStrengths: string[];
      analysis: string;
      recommendations: string[];
    };
  }> => {
    const assessment = storage.getAssessment(data.assessmentId);
    if (!assessment) {
      throw new Error("Assessment not found");
    }
    
    // 计算维度得分
    const answers = storage.getAssessmentAnswersForCalculation(data.assessmentId);
    const { DIMENSIONS } = await import("@/data/questions");
    
    const dimensionScores: Record<string, number> = {};
    
    // 初始化所有维度得分为 0
    DIMENSIONS.forEach(dim => {
      dimensionScores[dim.name] = 0;
    });
    
    // 计算每个维度的得分
    answers.forEach(answer => {
      const question = ASSESSMENT_QUESTIONS.find(q => q.questionNumber === answer.questionId);
      if (question) {
        // 如果选择 A，该维度得分 +1
        if (answer.selectedOption === "A") {
          dimensionScores[question.dimension] = (dimensionScores[question.dimension] || 0) + 1;
        }
      }
    });
    
    // 将得分转换为百分比（每维度最多 10 题，所以满分是 10 分）
    Object.keys(dimensionScores).forEach(dim => {
      const maxScore = 10; // 每个维度最多 10 题
      dimensionScores[dim] = Math.round((dimensionScores[dim] / maxScore) * 100);
    });
    
    const scores = dimensionScores;
    
    // 调用真实 API 生成报告
    const report = await generateReportWithAPI(assessment.childName, assessment.age, scores);
    
    // 保存报告
    storage.saveReport({
      assessmentId: data.assessmentId,
      dimensionScores: scores,
      reportTitle: report.title,
      reportContent: report.analysis,
      coreStrengths: report.coreStrengths,
      recommendations: report.recommendations,
    });
    
    // 更新状态
    storage.updateAssessmentStatus(data.assessmentId, "report_generated");
    
    return {
      success: true,
      scores,
      report,
    };
  },

  // 获取报告
  getReport: async (data: {
    assessmentId: number;
  }): Promise<{
    assessment: storage.Assessment;
    report: storage.Report;
    scores: Record<string, number>;
    coreStrengths: string[];
    recommendations: string[];
  }> => {
    const assessment = storage.getAssessment(data.assessmentId);
    if (!assessment) {
      throw new Error("Assessment not found");
    }
    
    const report = storage.getReport(data.assessmentId);
    if (!report) {
      throw new Error("Report not found");
    }
    
    // 计算维度得分
    const answers = storage.getAssessmentAnswersForCalculation(data.assessmentId);
    const { DIMENSIONS } = await import("@/data/questions");
    
    const dimensionScores: Record<string, number> = {};
    
    // 初始化所有维度得分为 0
    DIMENSIONS.forEach(dim => {
      dimensionScores[dim.name] = 0;
    });
    
    // 计算每个维度的得分
    answers.forEach(answer => {
      const question = ASSESSMENT_QUESTIONS.find(q => q.questionNumber === answer.questionId);
      if (question) {
        if (answer.selectedOption === "A") {
          dimensionScores[question.dimension] = (dimensionScores[question.dimension] || 0) + 1;
        }
      }
    });
    
    // 将得分转换为百分比
    Object.keys(dimensionScores).forEach(dim => {
      const maxScore = 10;
      dimensionScores[dim] = Math.round((dimensionScores[dim] / maxScore) * 100);
    });
    
    const scores = dimensionScores;
    
    return {
      assessment,
      report: {
        assessmentId: report.assessmentId,
        dimensionScores: report.dimensionScores,
        reportTitle: report.reportTitle,
        reportContent: report.reportContent,
        coreStrengths: report.coreStrengths,
        recommendations: report.recommendations,
      },
      scores,
      coreStrengths: report.coreStrengths,
      recommendations: report.recommendations,
    };
  },
};
