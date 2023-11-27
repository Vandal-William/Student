import { firestore } from "./initFirebase.js";
import { collection, getDocs, addDoc, setDoc, doc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { loading } from "../site/loading.js";
import { verifyIfUser } from "./authWithFirebase.js";

export async function getCollectionInFirestore(collectio) {

    // Déclaration d'une variable pour stocker les résultats
let mesResultats = [];

// Récupération des données depuis Firestore
const querySnapshot = await getDocs(collection(firestore, collectio));

// Itération à travers les résultats et stockage dans la variable 'mesResultats'
querySnapshot.forEach((doc) => {
  mesResultats.push({
    id: doc.id,
    data: doc.data()
  });
});

// Vous pouvez maintenant utiliser mesResultats dans votre code
// Par exemple, l'afficher dans la console
return mesResultats;

}

export async function addInFirestoreCollection (userID, username, character){

    // Add a second document with a generated ID.
    try {
    const docRef = await addDoc(collection(firestore, userID), {

        id:userID,
        characterName: character,
        pseudo: username,
        statut : "student",
        message:[]
    });

    if(docRef.id){
        const submit_button = document.getElementById('submit-choose');
        submit_button.setAttribute("disabled", "true");
        loading(submit_button);
        verifyIfUser()
    }

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export function UpdateInfoUser(userID, docID, { characterName, pseudo, message }) {
    const characterDocRef = doc(firestore, userID, docID);

    // Récupérer le document actuel dans Firestore
    getDoc(characterDocRef)
        .then((doc) => {
            if (doc.exists()) {
                // Récupérer le tableau de messages existant ou initialiser un tableau vide
                const currentMessages = doc.data().message || [];

                // Ajouter le nouveau message au tableau
                currentMessages.push(message);

                // Mettre à jour le document avec le tableau de messages mis à jour
                return setDoc(characterDocRef, {
                    characterName: characterName,
                    pseudo: pseudo,
                    message: currentMessages
                }, { merge: true });
            } else {
                console.error('Document does not exist');
                throw new Error('Document not found');
            }
        })
        .then(() => {
            console.log('Character position updated in Firestore.');
        })
        .catch((error) => {
            console.error('Error updating character position: ', error);
        });
}

export function createDataCollectionIfNewUser(userId){
    // Créer une nouvelle collection avec un document contenant les données spécifiées
    const data = {
        character: null,
        drawer: null,
        scene: null,
        camera: null,
        mixer: null,
        characterPosition: { x: null, y: null, z: null },
        followCharacter: false
    };

    // Créer une nouvelle collection nommée "mes_donnees" et y ajouter un document avec les données
    const collection = firestore.collection(userId);

    collection.add(data)
        .then((docRef) => {
            console.log("Document ajouté avec l'ID :", docRef.id);
        })
        .catch((error) => {
            console.error("Erreur lors de l'ajout du document :", error);
        });
}