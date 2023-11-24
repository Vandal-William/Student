import {navigate} from './navigate.js';
import { interactWithAssistant } from './interactWithAssistant.js';
import {htmlAnalysis} from './htmlAnalysis.js';
import { authWithFirebase, signOutWithFirebase, verifyIfUser } from './fireBase/authWithFirebase.js';
import { createScene} from './createScene.js';
import { addInFirestoreCollection } from "./fireBase/firestore.js";
import { addCharacterToscene } from "./addCharacterToScene.js";
import { global } from './global.js';


createScene()

const connect_form = document.getElementById('form-connexion');
connect_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const mail = form.elements['mail'].value;
    const password = form.elements['password'].value;
    if(mail && password){
        authWithFirebase(mail, password)
    }
})
verifyIfUser()

const choose_avatar_form = document.getElementById('form-avatar');
choose_avatar_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const pseudo = form.elements['pseudo'].value;
    const avatar = form.elements['choose'].value;
    console.log(global.userId, pseudo, avatar )
    if(global.userId && pseudo && avatar){
        console.log("ok")
        await addInFirestoreCollection(global.userId, pseudo, avatar);
    }
})

const avatar_selected = document.querySelectorAll('.select');
avatar_selected.forEach(avatar => {
    avatar.addEventListener('click', (e) =>{
        const selected = e.target.textContent.toLowerCase();
        console.log(selected)
        const amanda = document.querySelector(`.amanda`);
        const david = document.querySelector(`.david`);
        if(amanda.classList.contains(selected)){
            amanda.classList.add("checked")
        }else{
            amanda.classList.remove("checked")
        }
        if(david.classList.contains(selected)){
            david.classList.add('checked')
        }else{
            david.classList.remove('checked')
        }
    })
})


const disconnect = document.getElementById('disconnect');
disconnect.addEventListener('click', () => {
    signOutWithFirebase()
})

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