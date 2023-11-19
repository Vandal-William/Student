import { createSceneAndAssistant } from './createSceneAndAssistant.js';
import {navigate} from './navigate.js';
import { interactWithAssistant } from './interactWithAssistant.js';

createSceneAndAssistant()

const close_menu = document.getElementById('close-menu');
const menu = document.getElementById('menu');
close_menu.addEventListener('click', () => {
    menu.style.display = "none";
})

const amanda_menu = document.querySelectorAll('.amanda-menu');
amanda_menu.forEach(li => {
    li.addEventListener('click', (e) => {
        const value = e.target.id
        navigate(value);
        menu.style.display = "none";
    })

})

const form = document.getElementById('chat-form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    chat = e.target;
    const message = chat.elements['message'].value;
    interactWithAssistant(message);
    form.reset();
})

const close_chat = document.getElementById('close-chat');
const chat_window = document.getElementById('chat');
close_chat.addEventListener('click', () => {
    chat_window.style.display = "none";
})