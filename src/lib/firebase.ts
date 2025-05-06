// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create mock storage implementation to avoid compatibility issues
const mockStorage = {
  ref: () => ({
    put: async () => ({ ref: { getDownloadURL: async () => "https://placeholder-image.com/image.jpg" } }),
    getDownloadURL: async () => "https://placeholder-image.com/image.jpg",
    delete: async () => true,
    listAll: async () => ({ items: [], prefixes: [] }),
  }),
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKXnOLm_m7CmHjxrFP8-3UQauG3xPqiZE",
  authDomain: "devrajsinh-portfolio.firebaseapp.com",
  projectId: "devrajsinh-portfolio",
  storageBucket: "devrajsinh-portfolio.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:1234567890abcdef123456",
  measurementId: "G-ABCDEFGHIJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = mockStorage;

export { app, db, storage };