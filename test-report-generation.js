/**
 * 完整报告生成测试脚本
 * 模拟完整的测评流程并生成报告
 */

// 模拟 localStorage
const localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = JSON.stringify(value);
  },
  clear() {
    this.data = {};
  }
};

// 模拟存储函数
function createTestAssessment() {
  const assessment = {
    assessmentId: 1,
    childName: "小明",
    gender: "male",
    age: 14,
    status: "report_generated",
    currentQuestion: 65,
    createdAt: new Date().toISOString(),
  };
  
  const assessments = JSON.parse(localStorage.getItem("talent_assessments") || "[]");
  assessments.push(assessment);
  localStorage.setItem("talent_assessments", assessments);
  
  console.log("✅ 创建评估:", assessment);
  return assessment;
}

function createTestAnswers(assessmentId) {
  // 模拟 65 道题的答案（随机选择 A 或 B）
  const answers = [];
  for (let i = 1; i <= 65; i++) {
    answers.push({
      assessmentId,
      questionId: i,
      selectedOption: Math.random() > 0.5 ? "A" : "B",
    });
  }
  
  const allAnswers = JSON.parse(localStorage.getItem("talent_answers") || "[]");
  answers.forEach(answer => allAnswers.push(answer));
  localStorage.setItem("talent_answers", allAnswers);
  
  console.log(`✅ 创建 ${answers.length} 个答案`);
  return answers;
}

function createTestConversations(assessmentId) {
  const conversations = [
    {
      assessmentId,
      role: "user",
      content: "我想了解一下我的创新能力怎么样？",
      timestamp: new Date().toISOString(),
    },
    {
      assessmentId,
      role: "assistant",
      content: "根据你的测评结果，你在创新思维方面表现突出。你经常能提出独特的想法，比如你提到过'用兔子耳朵当粉笔'这样的创意，这体现了你丰富的想象力。",
      timestamp: new Date().toISOString(),
    },
    {
      assessmentId,
      role: "user",
      content: "那我的学习能力呢？",
      timestamp: new Date().toISOString(),
    },
    {
      assessmentId,
      role: "assistant",
      content: "你的学习能力也很强。你能够快速理解新概念，并且善于将理论应用到实践中。建议你继续保持这种学习热情。",
      timestamp: new Date().toISOString(),
    },
  ];
  
  const allConversations = JSON.parse(localStorage.getItem("talent_conversations") || "[]");
  conversations.forEach(conv => allConversations.push(conv));
  localStorage.setItem("talent_conversations", allConversations);
  
  console.log(`✅ 创建 ${conversations.length} 条对话记录`);
  return conversations;
}

// 计算得分
function calculateScores(assessmentId, questions, dimensions) {
  const answers = JSON.parse(localStorage.getItem("talent_answers") || "[]")
    .filter(a => a.assessmentId === assessmentId);
  
  const dimensionScores = {};
  dimensions.forEach(dim => {
    dimensionScores[dim.name] = 0;
  });
  
  answers.forEach(answer => {
    const question = questions.find(q => q.questionNumber === answer.questionId);
    if (question && answer.selectedOption === "A") {
      dimensionScores[question.dimension] = (dimensionScores[question.dimension] || 0) + 1;
    }
  });
  
  // 转换为百分比
  Object.keys(dimensionScores).forEach(dim => {
    const maxScore = 10;
    dimensionScores[dim] = Math.round((dimensionScores[dim] / maxScore) * 100);
  });
  
  console.log("✅ 计算得分:", dimensionScores);
  return dimensionScores;
}

// 主测试函数
async function runFullTest() {
  console.log("🚀 开始完整报告生成测试...\n");
  
  // 1. 创建评估
  const assessment = createTestAssessment();
  const assessmentId = assessment.assessmentId;
  
  // 2. 创建答案（需要从 questions.ts 导入，这里简化处理）
  createTestAnswers(assessmentId);
  
  // 3. 创建对话历史
  createTestConversations(assessmentId);
  
  // 4. 计算得分（需要实际题目数据）
  // 这里只是示例，实际需要导入真实的题目数据
  const mockScores = {
    "创新思维": 75,
    "系统思维": 68,
    "共情能力": 82,
    "学习能力": 70,
    "领导力": 65,
    "创意表达": 78,
    "社交能力": 72,
  };
  
  console.log("\n📊 模拟得分:", mockScores);
  
  // 5. 准备报告生成数据
  const reportData = {
    assessmentId,
    scores: mockScores,
    chatHistory: [
      { role: "user", content: "我想了解一下我的创新能力怎么样？" },
      { role: "assistant", content: "根据你的测评结果，你在创新思维方面表现突出。你经常能提出独特的想法，比如你提到过'用兔子耳朵当粉笔'这样的创意，这体现了你丰富的想象力。" },
      { role: "user", content: "那我的学习能力呢？" },
      { role: "assistant", content: "你的学习能力也很强。你能够快速理解新概念，并且善于将理论应用到实践中。建议你继续保持这种学习热情。" },
    ],
    userInfo: {
      userName: assessment.childName,
      age: assessment.age,
      gender: assessment.gender,
    },
  };
  
  console.log("\n✅ 测试数据准备完成！");
  console.log("\n📝 下一步：");
  console.log("1. 打开浏览器访问: http://localhost:5173/report?id=1");
  console.log("2. 页面应该会自动调用 generateReport 函数");
  console.log("3. 等待 AI 生成报告（10-20秒）");
  console.log("4. 检查报告是否正常显示");
  
  console.log("\n💾 localStorage 数据已准备:");
  console.log("- 评估记录:", JSON.parse(localStorage.getItem("talent_assessments") || "[]"));
  console.log("- 答案记录:", JSON.parse(localStorage.getItem("talent_answers") || "[]").length, "条");
  console.log("- 对话记录:", JSON.parse(localStorage.getItem("talent_conversations") || "[]").length, "条");
  
  return reportData;
}

// 如果是在 Node.js 环境中运行
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runFullTest, localStorage };
} else {
  // 浏览器环境
  console.log("请在浏览器控制台中运行此脚本");
}
