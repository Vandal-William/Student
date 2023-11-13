import {breakTime} from './breakTime.js'
import { interactWithAssistant } from './interactWithAssistant.js';
import { searchStackOverflow } from './searchStackOverflow.js';
import { navigate } from './navigate.js';

navigate()
breakTime()
const lifeCycle = setInterval(breakTime, 60000); // 1 minute
sessionStorage.setItem('lifeCycle', lifeCycle.toString());

const form = document.querySelector(".interact_interface");

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const chat = e.target;
    const message = chat.elements['message'].value;
    const target = chat.elements['target'].value;
    if (target === "@any"){
        interactWithAssistant(message)
        form.reset();
    }else if(target === "@assistFlow"){
        searchStackOverflow(message)
        form.reset();
    }

})
