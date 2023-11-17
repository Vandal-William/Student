import { assistantResponse } from "./assistantResponse.js";
import { userRequest } from "./userRequest.js";

const gif = document.querySelector(".elina");
const chatHistory = document.querySelector(".chat_history");

export function interactWithAssistant(message) {
  
    if(message !== ""){

        userRequest(message, chatHistory, '@any');
        
    }

    if (message.toLowerCase().includes("bonjour") ) {
        setTimeout(()=>{
            gif.src = './gif/Elina/actions/hello.gif';
            assistantResponse(`Bonjour ${sessionStorage.getItem('pseudo')} que puis-je faire pour vous ?`, chatHistory, '@any');
        }, 1000)
        setTimeout(() => {
            gif.src = './gif/Elina/Elina.gif';
        }, 3000)
        setTimeout(() => {
            sessionStorage.setItem('isdrinking', "false");
        }, 4000)
     
    }
}

