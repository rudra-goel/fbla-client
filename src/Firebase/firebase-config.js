// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";

/**
 * This is an import used to access the storage variables in our Firebase application
 * We pass in the app varible as is contains all of the config file
 */
import { getStorage } from "firebase/storage"

/**
 * This is the method imported from firebase that gives us access to our Firestore instance
 * We pass in the app variable as is contains all of the config file
 */
import { getFirestore } from "@firebase/firestore"

/**
 * Both Get auth and GoogleAuthProvider are functions imported from the auth service of firebase
 * It offers the ability create and authenticate usrs into our system
 * All of this information is done throught google cloud services
 */
import { getAuth, GoogleAuthProvider } from "firebase/auth"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-4HQTDEXtXTWzMsXhWq5sGTfPqTJN0q0",
  authDomain: "viewradotestting.firebaseapp.com",
  projectId: "viewradotestting",
  storageBucket: "viewradotestting.appspot.com",
  messagingSenderId: "817836503159",
  appId: "1:817836503159:web:c57715fb24951ca8159672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * Storeage instance called through the imported function
 */
export const storage = getStorage(app)

/**
 * Auth instance called through the imported function
 */
export const auth = getAuth(app)

/**
 * Provider instance called through the imported function
 */
export const provider = new GoogleAuthProvider();

/**
 * Database instance called through the imported function
 */
export const db = getFirestore(app);

