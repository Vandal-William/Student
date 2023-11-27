import { activeMarked } from "./activeMarked.js";

const home = document.querySelector('#site-title');
home.style.cursor = "pointer";

const generateRepoButton = document.getElementById('generate');
const inputMail = document.querySelector('#user-info');
const inputPass = document.querySelector('#password');
const connectButton = document.querySelector('#submit-info');
const disconnectButton = document.querySelector('#disconect');
const submitButton = document.querySelector('#submit-info');
const accordionContainer = document.querySelector('.menu');
const markdownPreview = document.getElementById("markdownPreview");
const dialogCloseButton = document.querySelector("#close-button");
const dialog = document.querySelector('#dialog');
const guidesLink = document.querySelector('#guides');
const programmeLink = document.querySelector('#programme');
const assistantLink = document.querySelector('.assistant-link');

home.addEventListener('click', () => {
    activeMarked('./pages/bienvenu.md');
})

activeMarked('./pages/bienvenu.md');
   
guidesLink.addEventListener('click', () => {
    activeMarked('./pages/guides.md');
})

programmeLink.addEventListener('click', () => {
    activeMarked('./pages/programme.md');
})

const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get("id");

if(paramValue){
    activeMarked(`./pages/${paramValue}.md`);
}