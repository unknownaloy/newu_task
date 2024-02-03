// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2QnXkpKrjcguunmuVjjF7-qZ50w8JA08",
    authDomain: "newu-task.firebaseapp.com",
    projectId: "newu-task",
    storageBucket: "newu-task.appspot.com",
    messagingSenderId: "348531298100",
    appId: "1:348531298100:web:fcb49124489b1250045f61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(app);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


