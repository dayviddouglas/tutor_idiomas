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
   
   async function get_api_key() {
        try {
            const response = await fetch('config.json')
            const response2 = await response.json();
            return response2.API_KEY
        } catch (error) {
            throw new Error("Erro na busca pela chave da API");
        }
   }




    async function request_api() {
             get_api_key().then((response)=>{
                chave_api= response;
                try {
                    const call_chatgpt = 
                } catch (error) {
                    
                }


            });
         

    }


    

// async function getApiKey() {
//     try {
//         const response = await fetch('config.json');
//         const config = await response.json();
//         return config.API_KEY; // Retorne o valor desejado
//     } catch (error) {
//         throw new Error('Erro ao buscar a chave da API'); // Lançar um erro para capturá-lo no .catch
//     }
// }

// getApiKey()
//     .then((response) => {
//         console.log(response); // Mostra a API_KEY no console
//     })
//     .catch((err) => {
//         console.error(err); // Mostra o erro no console
//     });

    
    




    

    const botMessage = responses[message.toLowerCase()] || "Desculpe, não entendi. Pode reformular a pergunta?";
    setTimeout(() => addMessage('bot', botMessage), 1000);
}
