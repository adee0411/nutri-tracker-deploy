import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZZIpr1J7e490LDLdBPbDET1AESh1Rxc8",
  authDomain: "nutri-tracker-4665a.firebaseapp.com",
  projectId: "nutri-tracker-4665a",
  storageBucket: "nutri-tracker-4665a.firebasestorage.app",
  messagingSenderId: "372784416357",
  appId: "1:372784416357:web:779e8484b937e64f4a288c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);
