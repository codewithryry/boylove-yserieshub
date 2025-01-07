// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { signInWithEmailAndPassword } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ1YV9MuCeso7S_0LJbZzwEQEdUFPAiG8",
  authDomain: "blthai.firebaseapp.com",
  projectId: "blthai",
  storageBucket: "blthai.firebasestorage.app",
  messagingSenderId: "287103774767",
  appId: "1:287103774767:web:53cac64a701af37e1c56da",
  measurementId: "G-EW8V96GF7E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore

// Set up Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export Firebase services
export { auth, googleProvider, signInWithPopup, signOut, db }; // Export Firestore