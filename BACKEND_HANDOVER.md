# 后端交接表

## 一、当前架构说明

> ⚠️ **重要提示**：当前项目为**纯前端架构**，所有 AI 调用直接从浏览器发起。如需后端支持，请参考本文档进行开发。

### 当前架构图

```
┌─────────────────┐      ┌─────────────────┐
│   用户浏览器     │ ──── │   AI API        │
│   (React SPA)   │      │ (eden321.com)   │
└─────────────────┘      └─────────────────┘
        │
        ▼
┌─────────────────┐
│  sessionStorage │  ← 临时存储答案和报告
└─────────────────┘
```

### 建议架构图（需后端开发）

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   用户浏览器     │ ──── │   后端服务器     │ ──── │   AI API        │
│   (React SPA)   │      │  (Node/Python)  │      │ (eden321.com)   │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    数据库        │
                         │ (MySQL/MongoDB) │
                         └─────────────────┘
```

---

## 二、AI API 接口规范

### 基础配置

| 配置项 | 值 |
|--------|-----|
| Base URL | `https://www.eden321.com/v1` |
| Model | `gemini-3-flash-preview` |
| 接口格式 | OpenAI 兼容格式 |
| 认证方式 | Bearer Token |

### 请求示例

```bash
POST https://www.eden321.com/v1/chat/completions
Content-Type: application/json
Authorization: Bearer sk-xxxxx

{
  "model": "gemini-3-flash-preview",
  "messages": [
    {
      "role": "user",
      "content": "你的 Prompt 内容..."
    }
  ],
  "response_format": { "type": "json_object" },
  "temperature": 0.7,
  "max_tokens": 8192
}
```

### 响应示例

```json
{
  "id": "chatcmpl-xxx",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"identity\": {...}, \"pyramid\": [...], ...}"
      },
      "finish_reason": "stop"
    }
  ]
}
```

---

## 三、报告数据结构

### TypeScript 类型定义

```typescript
// 报告主结构
interface ReportData {
  identity: IdentityInfo;
  pyramid: PyramidLayer[];
  future: FutureScenarios;
  keys: UnlockKey[];
}

// 身份信息
interface IdentityInfo {
  title: string;        // "黄金狮王"
  subtitle: string;     // "茧中形态：暴躁孤君"
  description: string;  // 500字判词
  score: number;        // 0-100
  radar: RadarDataItem[];
}

// 雷达图数据项
interface RadarDataItem {
  subject: string;  // "野心"
  A: number;        // 0-100
  fullMark: number; // 100
}

// 金字塔层级
interface PyramidLayer {
  layer: string;    // "根基层：安全原力"
  score: number;    // 0-100
  status: "collapse" | "unstable" | "solid";
  diagnosis: string; // 200字诊断
}

// 未来剧本
interface FutureScenarios {
  scenarioA: string; // 悲惨剧本 300字
  scenarioB: string; // 辉煌剧本 300字
}

// 解锁钥匙
interface UnlockKey {
  name: string;      // "锁心猿"
  solution: string;  // 100字解决方案
  courseIndex: number; // 0-10
}
```

---

## 四、数据库设计建议

### 用户表 (users)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT | 主键 |
| phone | VARCHAR(20) | 手机号 |
| nickname | VARCHAR(50) | 昵称 |
| avatar | VARCHAR(255) | 头像URL |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

### 测评记录表 (assessments)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT | 主键 |
| user_id | BIGINT | 用户ID |
| child_name | VARCHAR(50) | 孩子姓名 |
| child_age | INT | 孩子年龄 |
| answers | JSON | 答案数据 |
| scores | JSON | 三才分数 |
| status | ENUM | pending/completed |
| created_at | DATETIME | 创建时间 |

### 报告表 (reports)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT | 主键 |
| assessment_id | BIGINT | 测评ID |
| report_data | JSON | 完整报告JSON |
| is_paid | BOOLEAN | 是否已付费 |
| created_at | DATETIME | 创建时间 |

---

## 五、后端 API 设计建议

### 认证接口

```
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/user
```

### 测评接口

```
POST /api/assessments           # 创建测评
GET  /api/assessments/:id       # 获取测评详情
PUT  /api/assessments/:id       # 更新答案
POST /api/assessments/:id/submit # 提交测评
```

### 报告接口

```
POST /api/reports/generate      # 生成报告（调用AI）
GET  /api/reports/:id           # 获取报告
POST /api/reports/:id/pay       # 付费解锁
GET  /api/reports/:id/share     # 获取分享链接
```

---

## 六、安全注意事项

### API Key 保护

```
❌ 错误做法：API Key 放在前端代码中
✅ 正确做法：API Key 存储在后端环境变量
```

### 请求校验

1. **身份验证**：所有接口需要 JWT Token
2. **频率限制**：AI 生成接口限制每用户每日 10 次
3. **输入校验**：答案数据需要后端验证格式

### 数据加密

1. 用户手机号需加密存储
2. 报告数据敏感字段需脱敏
3. HTTPS 强制开启

---

## 七、部署配置

### 环境变量（后端）

```env
# 数据库
DATABASE_URL=mysql://user:pass@host:3306/talent_db

# AI API
AI_API_KEY=sk-xxxxx
AI_API_BASE_URL=https://www.eden321.com/v1
AI_MODEL=gemini-3-flash-preview

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# 应用
PORT=3000
NODE_ENV=production
```

### Docker 部署示例

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 八、监控与日志

### 推荐监控指标

| 指标 | 说明 | 阈值 |
|------|------|------|
| API 响应时间 | AI 生成接口 | < 60s |
| 错误率 | 5xx 错误比例 | < 1% |
| 并发用户数 | 同时在线 | 根据服务器配置 |
| AI 调用成功率 | 报告生成成功率 | > 95% |

### 日志格式建议

```json
{
  "timestamp": "2026-01-24T12:00:00Z",
  "level": "info",
  "service": "talent-api",
  "message": "Report generated successfully",
  "userId": 12345,
  "assessmentId": 67890,
  "duration": 35000
}
```

---

## 九、迁移计划

### 阶段一：后端基础（1-2周）

- [ ] 搭建 Node.js/Express 或 Python/FastAPI 后端
- [ ] 实现用户认证（手机号登录）
- [ ] 实现测评数据存储

### 阶段二：AI 中转（1周）

- [ ] 后端封装 AI 调用接口
- [ ] 前端改为调用后端接口
- [ ] API Key 迁移到后端

### 阶段三：付费功能（1-2周）

- [ ] 集成支付（微信/支付宝）
- [ ] 实现报告付费解锁
- [ ] 添加订单管理

---

## 十、技术支持

如需技术支持，请联系：

- 前端问题：参考 `PROJECT_DOCUMENTATION.md`
- 部署问题：参考 `QUICK_DEPLOY.md`
- 业务问题：联系产品负责人
