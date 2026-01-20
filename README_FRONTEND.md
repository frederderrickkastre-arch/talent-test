# 纯前端天赋测评应用

这是一个纯前端的 React 单页应用，所有数据存储在浏览器的 localStorage 中，不需要后端服务器或数据库。

## 快速开始

1. 安装依赖：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
pnpm dev
```

应用将在 `http://localhost:5173` 启动（Vite 默认端口）。

## 功能说明

### 数据存储
- 所有测评数据（答案、对话、报告）都存储在浏览器的 localStorage 中
- 数据键名：
  - `talent_assessments`: 测评记录
  - `talent_answers`: 答案数据
  - `talent_conversations`: AI 对话历史
  - `talent_reports`: 生成的报告

### AI 对话功能
应用支持两种 AI 对话方式：

1. **使用 OpenAI API**（推荐）：
   - 在项目根目录创建 `.env` 文件
   - 添加：`VITE_OPENAI_API_KEY=your_openai_api_key`

2. **使用 Google Gemini API**：
   - 在 `.env` 文件中添加：`VITE_GEMINI_API_KEY=your_gemini_api_key`

3. **模拟模式**（无 API Key）：
   - 如果没有配置 API Key，应用会使用模拟回复
   - 模拟回复会给出通用的建议和反馈

### 构建生产版本

```bash
pnpm build
```

构建产物在 `dist` 文件夹中，可以直接部署到任何静态文件服务器。

## 项目结构

```
client/
  src/
    data/
      questions.ts          # 65 道测评题目
    services/
      api.ts                # API 服务（替代 tRPC）
      storage.ts            # localStorage 存储服务
    pages/
      Assessment.tsx        # 测评页面
```

## 注意事项

- 所有数据仅存储在浏览器本地，清除浏览器数据会丢失所有记录
- 如果需要使用真实的 AI 对话，请配置相应的 API Key
- 这是一个纯前端应用，不需要后端服务器支持
