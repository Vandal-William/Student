import { connectWithFirebase } from "./firebaseConnect.js";
import { createMenuConnect } from "./createMenuConnect.js"
import { activeMarked } from "./marked.js";
import { firebaseData } from "./firbaseData.js";

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

activeMarked('./cours/bienvenu.md');

auth.onAuthStateChanged(user =>{
    if(user){
        connectButton.style.display = "none"
        inputPass.style.display = "none"
        inputMail.style.display = "none"
        disconnectButton.style.display = "block"
        accordionContainer.style.display = "block"

        db.collection('access').get().then(snap => {
            const access = firebaseData(snap.docs);
            db.collection('language').get().then(snapshot =>{
            const languages = firebaseData(snapshot.docs);
            createMenuConnect(user.W.O, access, languages);
            });
        })

    }else{
        connectButton.style.display = "inline-block"
        inputPass.style.display = "inline-block"
        inputMail.style.display = "inline-block"
        disconnectButton.style.display = "none"
        accordionContainer.style.display = "none"
        markdownPreview.style.margin = "auto"
        markdownPreview.style.height = "91vh"
        markdownPreview.style.overflow = "auto"
    }
})

submitButton.addEventListener("click", () => {
    connectWithFirebase() 
});  

home.addEventListener('click', () => {
    generateRepoButton.style.display = 'none'
    activeMarked('./cours/bienvenu.md');
})

disconnectButton.addEventListener('click', () => {
    accordionContainer.innerHTML= "";
    activeMarked('./cours/bienvenu.md');
    auth.signOut().then(() =>{
        console.log("disconnected !")
    })
})

dialogCloseButton.addEventListener('click', () => {
    dialog.style.display = "none"
})