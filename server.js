require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// 正确读取密钥
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.error("❌ API密钥未正确读取，请检查Vercel环境变量！");
}

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`, // 使用环境变量的密钥
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("API调用失败：", error);
        res.status(500).send('API调用失败，请检查密钥或网络');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 