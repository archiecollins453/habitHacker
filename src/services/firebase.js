import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsLg9YIAa32tXDOhNeM6Ky-cNrWMNnnYk",
  authDomain: "habit-hacker-9cdbd.firebaseapp.com",
  projectId: "habit-hacker-9cdbd",
  storageBucket: "habit-hacker-9cdbd.firebasestorage.app",
  messagingSenderId: "1954499756",
  appId: "1:1954499756:web:ac9d7c6af558401be4a309",
  measurementId: "G-ZD39J8ECQR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
