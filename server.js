// server.js - 基于 Express 和 OpenAI 官方库
import 'dotenv/config';
import express from 'express';
import { OpenAI } from 'openai';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));  // 托管前端文件

// 初始化 OpenAI 实例
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
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        });

        const aiResponse = response.choices[0].message.content;
        res.json({ reply: aiResponse });
    } catch (error) {
        console.error("OpenAI API调用失败：", error);
        res.status(500).send('API调用失败，请检查密钥或网络');
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`✅ 服务器运行在: http://localhost:${port}`);
});
