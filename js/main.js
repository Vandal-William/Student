import { connectWithFirebase } from "./firebaseConnect.js";
import { createMenuConnect } from "./createMenuConnect.js"
import { activeMarked } from "./marked.js";
import { firebaseData } from "./firbaseData.js";

const home = document.querySelector('#site-title');
home.style.cursor = "pointer";
const inputMail = document.querySelector('#user-info');
const inputPass = document.querySelector('#password');
const connectButton = document.querySelector('#submit-info');
const disconnectButton = document.querySelector('#disconect');
const submitButton = document.querySelector('#submit-info');
const accordionContainer = document.querySelector('.menu');

activeMarked('./cours/bienvenu.md');


auth.onAuthStateChanged(user =>{
    if(user){
        connectButton.style.display = "none"
        inputPass.style.display = "none"
        inputMail.style.display = "none"
        disconnectButton.style.display = "block"

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
    }
})

submitButton.addEventListener("click", () => {
    connectWithFirebase() 
});  

home.addEventListener('click', () => {
    activeMarked('./cours/bienvenu.md');
})

disconnectButton.addEventListener('click', () => {
    accordionContainer.innerHTML= "";
    activeMarked('./cours/bienvenu.md');
    auth.signOut().then(() =>{
        console.log("disconnected !")
    })
})