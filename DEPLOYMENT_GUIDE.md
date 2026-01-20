# 项目部署指南

## 📦 构建生产版本

### 步骤 1: 安装依赖
```bash
npm install
# 或
pnpm install
```

### 步骤 2: 配置环境变量
在项目根目录创建 `.env.production` 文件（用于生产环境）：

```env
VITE_API_KEY=sk-QUBOqdB7DAsD24Zq0uVyoM1NVRXApskFn1Ta7opEpnF8dbKk
VITE_API_BASE_URL=https://www.eden321.com/v1
VITE_AI_MODEL=gemini-3-flash-preview
```

### 步骤 3: 构建项目
```bash
npm run build
```

构建完成后，会在 `dist` 目录生成生产文件。

### 步骤 4: 本地预览（可选）
```bash
npm run preview
```

---

## 🚀 部署选项

### 方案 1: Vercel（推荐，最简单）

#### 优点
- 免费，自动 HTTPS
- 自动部署（连接 GitHub）
- 全球 CDN 加速
- 环境变量管理简单

#### 步骤

1. **准备代码**
   - 将代码推送到 GitHub

2. **部署到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "New Project"
   - 导入你的 GitHub 仓库

3. **配置项目**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (项目根目录)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **设置环境变量**
   - 在 Vercel 项目设置中添加：
     - `VITE_API_KEY`
     - `VITE_API_BASE_URL`
     - `VITE_AI_MODEL`

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 获得部署 URL（如：`your-project.vercel.app`）

---

### 方案 2: Netlify

#### 步骤

1. **准备代码**
   - 将代码推送到 GitHub

2. **部署到 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 使用 GitHub 账号登录
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 GitHub 仓库

3. **配置构建**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **设置环境变量**
   - 在 Site settings → Environment variables 中添加：
     - `VITE_API_KEY`
     - `VITE_API_BASE_URL`
     - `VITE_AI_MODEL`

5. **部署**
   - 点击 "Deploy site"
   - 等待构建完成

---

### 方案 3: GitHub Pages

#### 步骤

1. **安装 gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **修改 package.json**
   添加部署脚本：
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **修改 vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // 替换为你的仓库名
     // ... 其他配置
   })
   ```

4. **部署**
   ```bash
   npm run deploy
   ```

5. **启用 GitHub Pages**
   - 在 GitHub 仓库设置中
   - 进入 Pages 设置
   - Source 选择 `gh-pages` 分支

---

### 方案 4: 传统服务器部署

#### 步骤

1. **构建项目**
   ```bash
   npm run build
   ```

2. **上传 dist 目录**
   - 将 `dist` 目录中的所有文件上传到服务器
   - 可以使用 FTP、SCP 或服务器管理面板

3. **配置 Web 服务器**

   **Nginx 配置示例**：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

   **Apache 配置示例**（.htaccess）：
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **设置环境变量**
   - 在服务器上创建 `.env.production` 文件
   - 或在构建时通过环境变量传入

---

## ⚙️ 环境变量配置

### 开发环境
文件：`.env`
```env
VITE_API_KEY=your_api_key
VITE_API_BASE_URL=https://www.eden321.com/v1
VITE_AI_MODEL=gemini-3-flash-preview
```

### 生产环境
文件：`.env.production`
```env
VITE_API_KEY=your_production_api_key
VITE_API_BASE_URL=https://www.eden321.com/v1
VITE_AI_MODEL=gemini-3-flash-preview
```

**重要提示**：
- Vite 的环境变量必须以 `VITE_` 开头
- 环境变量会在构建时被注入到代码中
- 不要在代码中暴露敏感信息

---

## 🔒 安全注意事项

1. **API Key 保护**
   - 不要将 `.env` 文件提交到 Git
   - 使用环境变量管理工具
   - 考虑使用 API 代理隐藏真实 Key

2. **CORS 配置**
   - 确保 API 服务器允许你的域名访问
   - 检查 API 服务器的 CORS 设置

3. **HTTPS**
   - 生产环境必须使用 HTTPS
   - 大多数部署平台自动提供 HTTPS

---

## 📝 部署检查清单

- [ ] 代码已推送到 Git 仓库
- [ ] 环境变量已配置
- [ ] 本地构建测试通过（`npm run build`）
- [ ] 本地预览测试通过（`npm run preview`）
- [ ] 部署平台配置正确
- [ ] 环境变量已在部署平台设置
- [ ] 域名已配置（如需要）
- [ ] HTTPS 已启用
- [ ] 功能测试通过

---

## 🐛 常见问题

### 问题 1: 构建失败
**解决方法**：
- 检查 Node.js 版本（建议 18+）
- 清除缓存：`rm -rf node_modules dist`
- 重新安装：`npm install`
- 检查环境变量是否正确

### 问题 2: 页面空白
**解决方法**：
- 检查路由配置（base path）
- 检查浏览器控制台错误
- 确认所有资源路径正确

### 问题 3: API 调用失败
**解决方法**：
- 检查环境变量是否设置
- 检查 API 服务器的 CORS 配置
- 检查网络请求是否被拦截

### 问题 4: 路由 404
**解决方法**：
- 配置服务器重定向到 `index.html`
- 检查 Vite 的 `base` 配置

---

## 🎯 推荐部署方案

**对于初学者**：使用 **Vercel**
- 最简单，5 分钟完成部署
- 自动 HTTPS 和 CDN
- 免费额度充足

**对于企业**：使用 **Netlify** 或 **自建服务器**
- 更多自定义选项
- 更好的控制权

---

## 📞 需要帮助？

如果遇到问题，请检查：
1. 浏览器控制台错误
2. 构建日志
3. 部署平台日志
4. 环境变量配置
