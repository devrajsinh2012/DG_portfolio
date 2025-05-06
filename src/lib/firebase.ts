// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYUw_B5PWAGr12VjqfLKydIgBo_LekBmE",
  authDomain: "devrajsinh-portoflio.firebaseapp.com",
  projectId: "devrajsinh-portoflio",
  storageBucket: "devrajsinh-portoflio.firebasestorage.app",
  messagingSenderId: "601094406610",
  appId: "1:601094406610:web:9c5ead01a8b37a1c0bc80b",
  measurementId: "G-8FC2XPGWS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
