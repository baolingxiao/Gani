// 获取HTML元素
const startRecordingBtn = document.getElementById('startRecordingBtn');
const userInputElement = document.getElementById('userInput');
const aiResponseElement = document.getElementById('aiResponse');

// 创建停止录音按钮
const stopRecordingBtn = document.createElement('button');
stopRecordingBtn.textContent = '🛑 结束录音';
stopRecordingBtn.style.display = 'none';
document.body.appendChild(stopRecordingBtn);

// 语音识别与文本转换
function startRecording() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'zh-CN'; // 中文语音识别
    recognition.start();
    
    startRecordingBtn.textContent = '🎙️ 正在录音...';
    startRecordingBtn.disabled = true;
    stopRecordingBtn.style.display = 'inline-block';
    
    recognition.onresult = async (event) => {
        const userSpeech = event.results[0][0].transcript;
        userInputElement.innerText = userSpeech;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userSpeech })
            });
            if (!response.ok) throw new Error("服务器返回异常");

            const data = await response.json();
            aiResponseElement.innerText = data.reply;
            speakText(data.reply);
        } catch (error) {
            console.error("API调用错误：", error);
            aiResponseElement.innerText = "AI回复出错，请检查网络连接或API密钥。";
        }

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
    speech.lang = 'zh-CN';
    speech.rate = 1.0;
    speech.pitch = 1.0;
    speechSynthesis.speak(speech);
}

// 绑定按钮点击事件
startRecordingBtn.addEventListener('click', startRecording);
