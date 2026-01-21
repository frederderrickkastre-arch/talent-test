# Git 推送指南

## ✅ 已完成

- ✅ Git 仓库已初始化
- ✅ 代码已提交（110 个文件）
- ✅ 远程仓库已添加：`https://github.com/frederderrickkastre-arch/talent-test.git`

## ⚠️ 推送失败 - 需要认证

推送失败是因为需要 GitHub 认证。请选择以下方式之一：

---

## 方式 1: 使用 Personal Access Token（推荐）

### 步骤 1: 生成 Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写信息：
   - Note: `talent-test-push`
   - Expiration: 选择合适的时间（如 90 天）
   - 勾选权限：**repo**（完整仓库权限）
4. 点击 "Generate token"
5. **复制生成的 token**（只显示一次，请保存好）

### 步骤 2: 推送代码

在命令行执行：

```bash
git push -u origin main
```

当提示输入用户名时：
- Username: 输入你的 GitHub 用户名（`frederderrickkastre-arch`）
- Password: **粘贴刚才复制的 token**（不是你的 GitHub 密码）

---

## 方式 2: 使用 GitHub CLI

### 步骤 1: 安装 GitHub CLI

```bash
winget install GitHub.cli
```

### 步骤 2: 登录

```bash
gh auth login
```

按照提示选择：
- GitHub.com
- HTTPS
- 浏览器登录或 token

### 步骤 3: 推送

```bash
git push -u origin main
```

---

## 方式 3: 使用 SSH（如果已配置 SSH Key）

### 步骤 1: 修改远程地址

```bash
git remote set-url origin git@github.com:frederderrickkastre-arch/talent-test.git
```

### 步骤 2: 推送

```bash
git push -u origin main
```

---

## 方式 4: 使用 GitHub Desktop（最简单）

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录你的 GitHub 账号
3. 添加本地仓库
4. 点击 "Publish repository"

---

## 验证推送成功

推送成功后，访问：
https://github.com/frederderrickkastre-arch/talent-test

你应该能看到所有代码文件。

---

## 后续部署到 Vercel

推送成功后，在 Vercel 中：

1. 导入 GitHub 仓库：`frederderrickkastre-arch/talent-test`
2. 配置环境变量：
   - `VITE_API_KEY`
   - `VITE_API_BASE_URL`
   - `VITE_AI_MODEL`
3. 部署

---

## 需要帮助？

如果遇到问题，请告诉我具体的错误信息。
