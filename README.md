更新时间：2023年10月10日

# AI语音对话助手

基于 OpenAI API 的智能语音对话助手，支持语音输入和语音合成输出。

## 功能特点

- 🎤 语音输入转文字
- 🤖 OpenAI API 智能对话
- 🔊 文字转语音回复
- 💡 实时对话反馈
- 🎨 简洁现代的界面设计

## 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/你的用户名/ai-voice-assistant.git
   cd ai-voice-assistant
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   - 复制 `.env.example` 为 `.env`
   - 在 `.env` 文件中设置你的 OpenAI API 密钥：
     ```
     OPENAI_API_KEY=你的密钥
     ```

4. **启动服务**
   ```bash
   npm run dev
   ```

5. **访问应用**
   打开浏览器访问 `http://localhost:3000`

## 技术栈

- **前端**：
  - HTML5 / CSS3
  - JavaScript (ES6+)
  - Web Speech API
  
- **后端**：
  - Node.js
  - Express.js
  - OpenAI API

## 开发说明

- 开发模式：`npm run dev`
- 生产模式：`npm start`

## 注意事项

- 需要现代浏览器支持（推荐 Chrome）
- 需要有效的 OpenAI API 密钥
- 确保良好的网络连接

## 许可证

MIT License
