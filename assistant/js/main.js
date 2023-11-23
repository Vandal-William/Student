import { createSceneAndAssistant} from './createSceneAndAssistant.js';
import {navigate} from './navigate.js';
import { interactWithAssistant } from './interactWithAssistant.js';
import { moveCharacter } from './moveCharacter.js';
import {htmlAnalysis} from './htmlAnalysis.js';
import {searchStackOverflow} from './searchStackOverflow.js';

createSceneAndAssistant();
moveCharacter();
const close = document.querySelectorAll('.close');
close.forEach(cross => {
    cross.addEventListener('click', () => {
        cross.parentElement.parentElement.style.display = "none"
    })
})

const amanda_menu = document.querySelectorAll('.menu-li');
amanda_menu.forEach(li => {
    li.addEventListener('click', (e) => {
        const value = e.target.id
        navigate(value);
        menu.style.display = "none";
    })

})
const form = document.getElementById('chat-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const chat = e.target;
    const message = chat.elements['message'].value;
    interactWithAssistant(message);
    form.reset();
})

const form_review = document.getElementById('review-form');
form_review.addEventListener('submit', (e) => {

    e.preventDefault();
    const chat = e.target;
    const files = chat.elements['file'].files;
    const language = chat.elements['language'].value;

    const reader = new FileReader();
    reader.onload = function(event) {
        const content = event.target.result;
        if(files && language === 'html'){
            htmlAnalysis(content);
            form_review.reset();
        }
    };
    reader.readAsText(files[0]);
    
});

const form_overflow = document.getElementById('overflow-form');
form_overflow.addEventListener('submit', (e) => {
    e.preventDefault();
    const chat = e.target;
    const question = chat.elements['question'].files;
    const language = chat.elements['language'].value;
    searchStackOverflow(question, language);
    form_overflow.reset();
})