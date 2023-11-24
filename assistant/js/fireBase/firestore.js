import { firestore } from "./initFirebase.js";
import { collection, getDocs, addDoc, setDoc, doc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

export async function getCollectionInFirestore(userID) {

    // Déclaration d'une variable pour stocker les résultats
let mesResultats = [];

// Récupération des données depuis Firestore
const querySnapshot = await getDocs(collection(firestore, userID));

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
        characterObject:null,
        pseudo: username,
        drawer:null,
        scene : null,
        camera : null,
        mixer : null,
        characterPosition: {x:null, y:null, z:null},
        isFollowCharacter: false,
        renderer : null,
        message:[]
    });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function updateInFirestoreCollection(userID, docID, dataToUpdate) {
    try {
        const docRef = doc(firestore, userID, docID);
        await setDoc(docRef, dataToUpdate, { merge: true });
        console.log("Document updated successfully!");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export function updateCharacterPosition(userID, docID, characterObject) {
    const positionListener = onSnapshot(doc(firestore, userID, docID), (docSnapshot) => {
        let newPositionData = docSnapshot.data();

        if (newPositionData && newPositionData.characterPosition) {
            newPositionData.characterPosition = characterObject.position;

            const characterDocRef = doc(firestore, userID, docID);
            setDoc(characterDocRef, {
                characterPosition: {
                    x: newPositionData.characterPosition.x,
                    y: newPositionData.characterPosition.y,
                    z: newPositionData.characterPosition.z
                } 
        
            }, { merge: true })
            .then(() => {
                console.log('Character position updated in Firestore.');
            })
            .catch((error) => {
                console.error('Error updating character position: ', error);
            });
        }
    });
    return positionListener;
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