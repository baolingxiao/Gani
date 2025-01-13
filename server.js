// server.js - 基于 Express 和 OpenAI 官方库
import 'dotenv/config';
import express from 'express';
import { OpenAI } from 'openai';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));  // 托管前端文件
import cors from 'cors';
app.use(cors());

// 初始化 OpenAI 实例 (新版用法)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// API 路由：接收用户请求并调用 OpenAI
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).send('API密钥未正确配置');
    }

    try {
        console.log("调用 OpenAI API 前");
        // 使用新版的chat.completions.create
        const response = await openai.chat.completions.create({
            model: "gpt-4", // 确保模型名称符合最新版本
            messages: [{ role: "user", content: message }]
        });
        
        // 返回AI的回复
        const aiResponse = response.choices[0].message.content;
        console.log("AI 回复成功: ", aiResponse);
        res.json({ reply: aiResponse });
    } catch (error) {
        console.error("OpenAI API 调用失败：", error);
        res.status(500).json({
            error: "API调用失败，请检查密钥或网络",
            details: error.message
        });        
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`✅ 服务器运行在: http://localhost:${port}`);
});
