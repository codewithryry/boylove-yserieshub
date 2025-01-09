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
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYvim_kVrJRrkdjiIsan_OXuQahOHM6KI",
  authDomain: "yserieshub.firebaseapp.com",
  projectId: "yserieshub",
  storageBucket: "yserieshub.firebasestorage.app",
  messagingSenderId: "384156684546",
  appId: "1:384156684546:web:74c8ce20af12d2d050b21b",
  measurementId: "G-CLHRWSLY67"
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



