import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./test-api";

// 调试：检查环境变量
console.log("=== 环境变量检查（页面加载时）===");
console.log("VITE_API_KEY:", import.meta.env.VITE_API_KEY ? `${import.meta.env.VITE_API_KEY.substring(0, 15)}...` : "❌ 未设置");
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL || "❌ 未设置");
console.log("VITE_AI_MODEL:", import.meta.env.VITE_AI_MODEL || "❌ 未设置");
console.log("所有 import.meta.env 键:", Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
console.log("================================");

if (!import.meta.env.VITE_API_KEY || !import.meta.env.VITE_API_BASE_URL || !import.meta.env.VITE_AI_MODEL) {
  console.error("⚠️ 警告：API 环境变量未完整加载！");
  console.error("请确认：");
  console.error("1. .env 文件在项目根目录（与 package.json 同级）");
  console.error("2. 变量名以 VITE_ 开头");
  console.error("3. 已重启开发服务器（npm run dev）");
  console.error("4. 浏览器已刷新页面（Ctrl+Shift+R 硬刷新）");
}

createRoot(document.getElementById("root")!).render(<App />);
