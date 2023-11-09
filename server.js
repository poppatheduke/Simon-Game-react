
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQfJRr3oWawEbul0-nPIgAmTyBcipS3m4",
    authDomain: "simon-game-1e053.firebaseapp.com",
    projectId: "simon-game-1e053",
    storageBucket: "simon-game-1e053.appspot.com",
    messagingSenderId: "346514027341",
    appId: "1:346514027341:web:4f76e17e0c4738addabd04",
    measurementId: "G-16T9TB0XJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);