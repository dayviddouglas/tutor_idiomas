function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    if (message) {
        addMessage('user', message);
        userInput.value = '';
        getBotResponse(message);
    }
}

function addMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}



 function getBotResponse (message) {
    // Simulação de resposta do chatbot
    const responses = {
        "olá": "Olá! Como posso ajudar você a aprender inglês hoje?",
        "como você está?": "Estou ótimo! E você?",
        "qual é a tradução de 'comprar'?": "A tradução de 'comprar' é 'buy'."
    };
   
    async function get_api_key(){
        await fetch('config.json')
        .then(response => response.json())
        .then(config => {
           return config.API_KEY; 
        });
    }

    async function request_api(user_message) {
       let chave_api= get_api_key();
       console.log(chave_api);

    }

    request_api();



    

    const botMessage = responses[message.toLowerCase()] || "Desculpe, não entendi. Pode reformular a pergunta?";
    setTimeout(() => addMessage('bot', botMessage), 1000);
}
