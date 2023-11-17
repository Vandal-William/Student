import {breakTime} from './breakTime.js'
import { menu } from './menu.js';
import { interactWithAssistant } from './interactWithAssistant.js';
import { searchStackOverflow } from './searchStackOverflow.js';
import { navigate } from './navigate.js';
import { htmlAnalysis } from './htmlAnalysis.js';
import {postTaskInFirebase} from '../../js/postTaskInFirebase.js';
import { searchInReddit } from './searchInReddit.js';

menu()
breakTime()
const lifeCycle = setInterval(breakTime, 60000); // 1 minute
sessionStorage.setItem('lifeCycle', lifeCycle.toString());

const navigateToTab = document.querySelectorAll('.nav-li')
navigateToTab.forEach( li => {
    li.addEventListener('click', (e) => {
        const value = li.id;
        navigate(value)

    })
})

const form = document.querySelector(".message-box");

form.addEventListener('submit', (e) => {

    e.preventDefault()
    const chat = e.target;
    const message = chat.elements['message'].value;
    interactWithAssistant(message)
    chat.elements['message'].value = ''
        
  
})

// const submit_button = document.querySelector('.submit_chat');
// submit_button.setAttribute('title', 'Ce bouton est désactivé');
// submit_button.addEventListener('mouseenter', function(event) {
//     if (this.hasAttribute('disabled')) {
//       this.setAttribute('title', 'Votre assistant est indisponible pour le moment');
//     }
// });
// submit_button.addEventListener('mouseleave', function(event) {
//   this.removeAttribute('title');
// });

// postTaskInFirebase()
