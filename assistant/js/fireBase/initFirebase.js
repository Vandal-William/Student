import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

const firebaseConfig = {
            
    apiKey: "AIzaSyDXDGJkiUMg2w1CBD-oIfmNCwfr4ZllxTM",
    authDomain: "students-117c7.firebaseapp.com",
    databaseURL: "https://students-117c7-default-rtdb.firebaseio.com",
    projectId: "students-117c7",
    storageBucket: "students-117c7.appspot.com",
    messagingSenderId: "586492384664",
    appId: "1:586492384664:web:68defbe6c018e7397247ed",
    measurementId: "G-N5Z3T6KEK1"
    
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

console.log(app);
export { app, firestore };