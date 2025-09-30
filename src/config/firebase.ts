// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqsjvhcFPPkPPTxlwXD7rZ93BNi8FdPnU",
  authDomain: "meau-78b14.firebaseapp.com",
  projectId: "meau-78b14",
  storageBucket: "meau-78b14.firebasestorage.app",
  messagingSenderId: "7976656313",
  appId: "1:7976656313:web:ffd7dd7c15eaf0278c2a68",
  measurementId: "G-MDQ6HPMS2Y"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);     
export const storage = getStorage(app); 

console.log('✅ Firebase configurado para PRODUÇÃO');
console.log('📦 Storage Bucket:', firebaseConfig.storageBucket);
