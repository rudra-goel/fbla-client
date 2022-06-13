// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjDGlBPU1qKwh9gJp9vQfA--iMO0ZSmxc",
  authDomain: "viewrado-e0652.firebaseapp.com",
  projectId: "viewrado-e0652",
  storageBucket: "viewrado-e0652.appspot.com",
  messagingSenderId: "87552897261",
  appId: "1:87552897261:web:3bc6b8f14fb58f61541ce4",
  measurementId: "G-Y9P3QQM9KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)


export const auth = getAuth(app)

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

