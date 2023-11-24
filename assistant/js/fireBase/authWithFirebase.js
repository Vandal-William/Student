import { app } from "./initFirebase.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getCollectionInFirestore } from "./firestore.js";
import { addCharacterToscene } from "../addCharacterToScene.js";
import { global } from "../global.js";
import { moveCharacter } from '../moveCharacter.js';


let hasData;

export  function authWithFirebase(email, password) {
    
    // Utilisez votre instance Firebase existante 'app'
    const auth = getAuth(app);
    
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // L'utilisateur s'est connecté avec succès
        const user = userCredential.user;
        if(user){
            const userData = await getCollectionInFirestore(user.uid);
            if(userData.length === 0){
                hasData = false;
                const choose_div = document.getElementById('choose-div');
                choose_div.style.display = "flex";
            }else{
                hasData = true;
            }
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorP = document.getElementById('error');
        errorP.textContent = "Mot de passe ou email incorrect !"
        errorP.style.color = "orange"
        errorP.style.marginTop = "10px"
      });
    
}

export function signOutWithFirebase() {
    
    // Utilisez votre instance Firebase existante 'app'
    const auth = getAuth(app);
    // Déconnexion de l'utilisateur actuel
    auth.signOut().then(() => {

    if (global.scene && global.characterObject) {
        global.scene.remove(global.characterObject);
        global.characterObject = null
    }
    console.log('Utilisateur déconnecté');
    }).catch((error) => {
    // Une erreur s'est produite lors de la déconnexion
    console.error('Erreur lors de la déconnexion:', error);
    });
}

export function verifyIfUser(){

    const auth = getAuth(app);

    // Écouteur d'événements pour détecter les changements d'état d'authentification
    auth.onAuthStateChanged(async user => {
        if (user) {

            global.userId = user.uid;
            const connect_div = document.getElementById('connexion');
            connect_div.style.display = "none";
            const userData = await getCollectionInFirestore(user.uid);
            console.log(userData)
            if(userData.length === 0){
                const choose_div = document.getElementById('choose-div');
                choose_div.style.display = "flex";
            }else{
                
                
                await addCharacterToscene(
                    userData[0].data.pseudo,
                    userData[0].data.characterName,
                    global.scene, 
                    global.camera,
                    global.renderer  
                );
                moveCharacter();
            }
          
        } else {
            const connect_div = document.getElementById('connexion');
            connect_div.style.display = "flex";
           
        }
    });

}