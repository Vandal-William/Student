import { assistantResponse } from "./assistantResponse.js";
import { userRequest } from "./userRequest.js";
import { changeCharacterAnimation } from "./addCharacterToScene.js";
import { global } from "./global.js";

const chatHistory = document.querySelector(".chat-history");

export function interactWithAssistant(message) {
  
    if(message !== ""){

        userRequest(message, chatHistory);
    }

    if (message.toLowerCase().includes("bonjour") ) {
        setTimeout(()=>{
            const pseudo = sessionStorage.getItem('pseudo') ? sessionStorage.getItem('pseudo') : "";
            assistantResponse(`Bonjour ${pseudo} que puis-je faire pour vous ?`, chatHistory);
            changeCharacterAnimation('hello', global.characterObject);
        }, 1000);
        setTimeout(()=>{
            changeCharacterAnimation('Bashful', global.characterObject);
        }, 3000)
    }
}

