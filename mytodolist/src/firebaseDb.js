// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdr5ARhce2sgkPhQ2Xhncs3tgVIu_mgn0",
  authDomain: "my-todolist-1072f.firebaseapp.com",
  projectId: "my-todolist-1072f",
  storageBucket: "my-todolist-1072f.appspot.com",
  messagingSenderId: "619446818670",
  appId: "1:619446818670:web:4a29e31c3315354335537f",
};

// Initialize Firebase
const app = firebase(firebaseConfig);

export const db = app.firestore();
