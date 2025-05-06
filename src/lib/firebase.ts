
// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create a complete mock for storage to avoid using undici
const storage = {
  ref: (path) => ({
    put: async (file) => ({ 
      ref: { 
        getDownloadURL: async () => `https://placeholder-image.com/${file?.name || 'image.jpg'}` 
      } 
    }),
    getDownloadURL: async () => "https://placeholder-image.com/image.jpg",
    delete: async () => true,
    listAll: async () => ({ items: [], prefixes: [] }),
    child: (childPath) => ({
      put: async (file) => ({ 
        ref: { 
          getDownloadURL: async () => `https://placeholder-image.com/${childPath}/${file?.name || 'image.jpg'}` 
        } 
      }),
      getDownloadURL: async () => `https://placeholder-image.com/${childPath}/image.jpg`,
      delete: async () => true
    })
  })
};

// Create a mock data service function to avoid Firebase errors
const mockDataFetch = () => {
  console.log("Using mock data instead of Firebase");
  const localData = localStorage.getItem('portfolioData');
  if (localData) {
    return JSON.parse(localData);
  }
  // If no local data, return null to use the initial data
  return null;
};

export { app, db, storage, mockDataFetch };
