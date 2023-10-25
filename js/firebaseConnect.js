export function connectWithFirebase(){
    
    const email = document.querySelector('#user-info').value;
    const password = document.querySelector('#password').value;
    
    auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Connexion réussie
        const userInfo = userCredential.user;
        const userId = userInfo.W.O
        console.log("Utilisateur connecté : ", userId);
    })
    .catch(error => {
        // Gestion des erreurs en cas d'échec de la connexion
        console.error("Code d'erreur : ", errorCode);
        console.error("Message d'erreur : ", errorMessage);
    });

}
