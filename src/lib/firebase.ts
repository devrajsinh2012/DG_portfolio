
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYUw_B5PWAGr12VjqfLKydIgBo_LekBmE",
  authDomain: "devrajsinh-portoflio.firebaseapp.com",
  projectId: "devrajsinh-portoflio",
  storageBucket: "devrajsinh-portoflio.appspot.com",
  messagingSenderId: "601094406610",
  appId: "1:601094406610:web:9c5ead01a8b37a1c0bc80b",
  measurementId: "G-8FC2XPGWS4",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
