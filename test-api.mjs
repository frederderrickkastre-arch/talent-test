/**
 * 测试 API 配置
 * 运行: node test-api.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 .env 文件
let envVars = {};
try {
  const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
} catch (error) {
  console.error('无法读取 .env 文件:', error.message);
  process.exit(1);
}

const apiKey = envVars.VITE_API_KEY;
const apiBaseUrl = envVars.VITE_API_BASE_URL;
const aiModel = envVars.VITE_AI_MODEL;

console.log('=== API 配置检查 ===');
console.log('VITE_API_KEY:', apiKey ? `${apiKey.substring(0, 15)}...` : '❌ 未设置');
console.log('VITE_API_BASE_URL:', apiBaseUrl || '❌ 未设置');
console.log('VITE_AI_MODEL:', aiModel || '❌ 未设置');
console.log('===================\n');

if (!apiKey || !apiBaseUrl || !aiModel) {
  console.error('❌ API 配置不完整！请检查 .env 文件');
  process.exit(1);
}

console.log('✅ API 配置完整，开始测试...\n');

// 测试 API 调用
const testMessage = '你好，请回复"测试成功"';

console.log('发送测试请求...');
console.log('URL:', `${apiBaseUrl}/chat/completions`);
console.log('Model:', aiModel);
console.log('Message:', testMessage);
console.log('');

try {
  const response = await fetch(`${apiBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: aiModel,
      messages: [
        {
          role: 'user',
          content: testMessage,
        },
      ],
    }),
  });

  console.log('响应状态:', response.status, response.statusText);
  console.log('');

  if (response.ok) {
    const data = await response.json();
    console.log('✅ API 调用成功！\n');
    console.log('响应数据结构:');
    console.log(JSON.stringify(data, null, 2));
    console.log('');

    // 尝试提取回复内容
    const content = 
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.delta?.content ||
      data.content ||
      data.text ||
      data.message?.content;

    if (content) {
      console.log('🤖 AI 回复:', content);
      console.log('\n✅ 测试通过！API 工作正常。');
    } else {
      console.warn('⚠️  响应中没有找到内容字段');
      console.log('请检查响应数据结构');
    }
  } else {
    const errorText = await response.text();
    console.error('❌ API 调用失败:');
    console.error('状态码:', response.status);
    console.error('错误信息:', errorText);
    
    try {
      const errorJson = JSON.parse(errorText);
      console.error('错误详情:', JSON.stringify(errorJson, null, 2));
    } catch {
      // 不是 JSON，直接显示文本
    }
  }
} catch (error) {
  console.error('❌ 网络错误:', error.message);
  if (error.cause) {
    console.error('错误原因:', error.cause);
  }
}
