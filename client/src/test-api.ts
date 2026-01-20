/**
 * 测试 API 配置的辅助函数
 * 在浏览器控制台运行：testAPI()
 */

export function testAPI() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const aiModel = import.meta.env.VITE_AI_MODEL;
  
  console.log("=== API 配置检查 ===");
  console.log("VITE_API_KEY:", apiKey ? `${apiKey.substring(0, 10)}...` : "未设置");
  console.log("VITE_API_BASE_URL:", apiBaseUrl || "未设置");
  console.log("VITE_AI_MODEL:", aiModel || "未设置");
  console.log("===================");
  
  if (!apiKey || !apiBaseUrl || !aiModel) {
    console.error("❌ API 配置不完整！请检查 .env 文件");
    return;
  }
  
  console.log("✅ API 配置完整，开始测试...");
  
  // 测试 API 调用
  fetch(`${apiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: aiModel,
      messages: [
        {
          role: "user",
          content: "你好，请回复'测试成功'",
        },
      ],
    }),
  })
    .then(async (response) => {
      console.log("响应状态:", response.status, response.statusText);
      if (response.ok) {
        const data = await response.json();
        console.log("✅ API 调用成功！");
        console.log("响应数据:", data);
        const content = 
          data.choices?.[0]?.message?.content ||
          data.choices?.[0]?.delta?.content ||
          data.content ||
          data.text;
        if (content) {
          console.log("AI 回复:", content);
        }
      } else {
        const errorText = await response.text();
        console.error("❌ API 调用失败:");
        console.error("状态码:", response.status);
        console.error("错误信息:", errorText);
      }
    })
    .catch((error) => {
      console.error("❌ 网络错误:", error);
    });
}

// 在全局暴露测试函数
if (typeof window !== "undefined") {
  (window as any).testAPI = testAPI;
}
