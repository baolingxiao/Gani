// 获取HTML元素
const startRecordingBtn = document.getElementById('startRecordingBtn');
const userInputElement = document.getElementById('userInput');
const aiResponseElement = document.getElementById('aiResponse');

// 获取HTML元素
const stopRecordingBtn = document.createElement('button');
stopRecordingBtn.textContent = '🛑 结束录音';
stopRecordingBtn.style.display = 'none';
document.body.appendChild(stopRecordingBtn);

// 语音识别与文本转换
function startRecording() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-CN'; // 中文语音识别
    recognition.start();
    
    // 更新按钮状态
    startRecordingBtn.textContent = '🎙️ 正在录音...';
    startRecordingBtn.disabled = true;
    stopRecordingBtn.style.display = 'inline-block';
    
    recognition.onresult = async (event) => {
        const userSpeech = event.results[0][0].transcript;
        userInputElement.innerText = userSpeech;

        // 改为向后端发送请求
        const aiReply = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userSpeech })
        })
        .then(res => res.json())
        .then(data => data.reply)
        .catch(error => {
            console.error("API调用错误：", error);
            return "AI回复出错，请检查网络连接或API密钥。";
        });

        aiResponseElement.innerText = aiReply;
        speakText(aiReply);
        
        // 恢复按钮状态
        startRecordingBtn.textContent = '🎙️ 开始录音';
        startRecordingBtn.disabled = false;
        stopRecordingBtn.style.display = 'none';
    };

    recognition.onerror = (error) => {
        alert("语音识别出错，请重试！");
        console.error(error);
        startRecordingBtn.textContent = '🎙️ 开始录音';
        startRecordingBtn.disabled = false;
        stopRecordingBtn.style.display = 'none';
    };

    stopRecordingBtn.onclick = () => {
        recognition.stop();
        startRecordingBtn.textContent = '🎙️ 开始录音';
        startRecordingBtn.disabled = false;
        stopRecordingBtn.style.display = 'none';
    };
}

// 语音合成播放
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'zh-CN'; // 中文语音
    speech.rate = 1.0;  // 语速
    speech.pitch = 1.0; // 音高
    speechSynthesis.speak(speech);
}

// 绑定按钮点击事件
startRecordingBtn.addEventListener('click', startRecording); 