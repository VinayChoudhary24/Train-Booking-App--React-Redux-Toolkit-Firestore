// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAe9QOdV9AMN9PdbPikSt6Vh8GJqlhKVY",
  authDomain: "train-booking-app-80fd3.firebaseapp.com",
  projectId: "train-booking-app-80fd3",
  storageBucket: "train-booking-app-80fd3.firebasestorage.app",
  messagingSenderId: "335105394838",
  appId: "1:335105394838:web:90f3a70ef5ad091dc59ab7",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
