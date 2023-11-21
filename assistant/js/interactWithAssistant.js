import { assistantResponse } from "./assistantResponse.js";
import { userRequest } from "./userRequest.js";
import { changeCharacterAnimation } from './createSceneAndAssistant.js';

const chatHistory = document.querySelector(".chat-history");

export function interactWithAssistant(message) {
  
    if(message !== ""){

        userRequest(message, chatHistory);
    }

    if (message.toLowerCase().includes("bonjour") ) {
        setTimeout(()=>{
            const pseudo = sessionStorage.getItem('pseudo') ? sessionStorage.getItem('pseudo') : "";
            assistantResponse(`Bonjour ${pseudo} que puis-je faire pour vous ?`, chatHistory);
            changeCharacterAnimation('hello', window.globalData.character);
        }, 1000);
        setTimeout(()=>{
            changeCharacterAnimation('Bashful', window.globalData.character);
        }, 3000)
    }
}

