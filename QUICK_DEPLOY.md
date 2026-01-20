# 快速部署指南

## ✅ 构建已完成

项目已成功构建，生产文件在 `dist` 目录。

## 🚀 最快部署方式：Vercel（5分钟）

### 步骤 1: 准备代码
```bash
# 确保代码已提交到 Git
git add .
git commit -m "准备部署"
git push
```

### 步骤 2: 部署到 Vercel

1. **访问** [vercel.com](https://vercel.com)
2. **登录** 使用 GitHub 账号
3. **导入项目**
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
4. **配置项目**
   - Framework Preset: **Vite**
   - Root Directory: `./` (默认)
   - Build Command: `npm run build` (默认)
   - Output Directory: `dist` (默认)
5. **添加环境变量**
   在 Environment Variables 中添加：
   ```
   VITE_API_KEY = sk-QUBOqdB7DAsD24Zq0uVyoM1NVRXApskFn1Ta7opEpnF8dbKk
   VITE_API_BASE_URL = https://www.eden321.com/v1
   VITE_AI_MODEL = gemini-3-flash-preview
   ```
6. **部署**
   - 点击 "Deploy"
   - 等待 2-3 分钟
   - 获得部署 URL

### 步骤 3: 访问网站
部署完成后，你会得到一个 URL，例如：
```
https://your-project.vercel.app
```

---

## 📦 其他部署方式

### Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 连接 GitHub 仓库
3. 设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 添加环境变量（同上）

### 传统服务器
1. 将 `dist` 目录上传到服务器
2. 配置 Web 服务器（Nginx/Apache）
3. 设置环境变量

详细步骤请查看 `DEPLOYMENT_GUIDE.md`

---

## ⚠️ 重要提示

1. **环境变量必须设置**
   - 在部署平台的环境变量设置中添加
   - 不要提交 `.env` 文件到 Git

2. **API Key 安全**
   - 生产环境建议使用不同的 API Key
   - 考虑使用 API 代理

3. **路由配置**
   - 如果使用子路径部署，需要修改 `vite.config.ts` 的 `base` 配置

---

## 🎉 完成！

部署完成后，你的网站就可以通过 URL 访问了！
