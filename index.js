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
   
    async function get_api_key() {
        try {
            const response = await fetch('config.json');
            const response2 = await response.json();
            return response2.API_KEY;
        } catch (error) {
            throw new Error("Erro na busca pela chave da API");
        }
    }
    
    get_api_key().then(async (response) => {
        let chave_api = response;
        try {
            const call_chatgpt = await fetch("https://api.openai.com/v1/chat/completions", { // Endpoint corrigido
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + chave_api,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Modelo de chat
                    messages: [
                        {
                            role: "system",
                            content: "Você é um instrutor de idiomas experiente. Ajude o usuário a aprender o idioma escolhido respondendo às perguntas, corrigindo erros, e fornecendo explicações claras."
                        },
                        {
                            role: "user",
                            content: message // Substitua 'message' pelo conteúdo da pergunta do usuário
                        }
                    ],
                    max_tokens: 2048, // Tamanho da resposta
                    temperature: 0.5 // Criatividade na resposta
                }),
            });
            const dados = await call_chatgpt.json();
            const resposta_gpt = dados.choices[0].message.content;
            const botMessage = resposta_gpt || "Desculpe, não entendi. Pode reformular a pergunta?";
            setTimeout(() => addMessage('bot', botMessage), 1000);
        } catch (err) {
            console.log(err);
        }
    });
    

    

   


   
}
