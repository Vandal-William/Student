import { createSceneAndAssistant } from './createSceneAndAssistant.js';

createSceneAndAssistant({animation:'Bashful'})

const close_menu = document.getElementById('close-menu');
const menu = document.getElementById('menu');
close_menu.addEventListener('click', () => {
    menu.style.display = "none";
})