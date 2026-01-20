/**
 * 浏览器控制台测试脚本
 * 在浏览器控制台中运行此脚本来准备测试数据
 */

// 在浏览器控制台中运行此代码
(function() {
  console.log("🚀 开始准备测试数据...\n");
  
  // 1. 创建评估
  const assessment = {
    assessmentId: 1,
    childName: "测试用户",
    gender: "male",
    age: 14,
    status: "report_generated",
    currentQuestion: 65,
    createdAt: new Date().toISOString(),
  };
  
  const assessments = JSON.parse(localStorage.getItem("talent_assessments") || "[]");
  assessments.push(assessment);
  localStorage.setItem("talent_assessments", JSON.stringify(assessments));
  console.log("✅ 创建评估:", assessment);
  
  // 2. 创建答案（65道题，随机选择）
  const answers = [];
  for (let i = 1; i <= 65; i++) {
    answers.push({
      assessmentId: 1,
      questionId: i,
      selectedOption: Math.random() > 0.5 ? "A" : "B",
    });
  }
  
  const allAnswers = JSON.parse(localStorage.getItem("talent_answers") || "[]");
  answers.forEach(answer => allAnswers.push(answer));
  localStorage.setItem("talent_answers", JSON.stringify(allAnswers));
  console.log(`✅ 创建 ${answers.length} 个答案`);
  
  // 3. 创建对话历史
  const conversations = [
    {
      assessmentId: 1,
      role: "user",
      content: "我想了解一下我的创新能力怎么样？",
      timestamp: new Date().toISOString(),
    },
    {
      assessmentId: 1,
      role: "assistant",
      content: "根据你的测评结果，你在创新思维方面表现突出。你经常能提出独特的想法，比如你提到过'用兔子耳朵当粉笔'这样的创意，这体现了你丰富的想象力。",
      timestamp: new Date().toISOString(),
    },
    {
      assessmentId: 1,
      role: "user",
      content: "那我的学习能力呢？",
      timestamp: new Date().toISOString(),
    },
    {
      assessmentId: 1,
      role: "assistant",
      content: "你的学习能力也很强。你能够快速理解新概念，并且善于将理论应用到实践中。建议你继续保持这种学习热情。",
      timestamp: new Date().toISOString(),
    },
  ];
  
  const allConversations = JSON.parse(localStorage.getItem("talent_conversations") || "[]");
  conversations.forEach(conv => allConversations.push(conv));
  localStorage.setItem("talent_conversations", JSON.stringify(allConversations));
  console.log(`✅ 创建 ${conversations.length} 条对话记录`);
  
  console.log("\n✅ 测试数据准备完成！");
  console.log("\n📝 下一步：");
  console.log("1. 访问: http://localhost:5173/report?id=1");
  console.log("2. 页面会自动生成报告");
  console.log("3. 等待 10-20 秒查看结果");
  
  console.log("\n💾 当前 localStorage 数据:");
  console.log("- 评估:", JSON.parse(localStorage.getItem("talent_assessments") || "[]"));
  console.log("- 答案:", JSON.parse(localStorage.getItem("talent_answers") || "[]").length, "条");
  console.log("- 对话:", JSON.parse(localStorage.getItem("talent_conversations") || "[]").length, "条");
  
  return {
    assessment,
    answers: answers.length,
    conversations: conversations.length,
  };
})();
