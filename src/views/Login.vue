<template>
    <div>
      <nav class="bg-gradient-to-r from-blue-600 to-purple-700 shadow-xl p-4">
        <div class="container mx-auto flex justify-between items-center">
          <!-- Login/Logout Section -->
          <div>
            <button
              v-if="!user"
              @click="handleGoogleLogin"
              class="flex items-center bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition duration-300 transform hover:scale-105 active:scale-95"
            >
              <i class="fab fa-google mr-2 text-lg"></i>
              <span class="font-semibold">Login with Google</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  import { auth, googleProvider, signInWithPopup, signOut, db } from "../firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    methods: {
      async handleGoogleLogin() {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          this.user = result.user;
  
          // Save user data to Firestore
          await this.saveUserToFirestore(this.user);
  
          // Redirect to the home page after successful login
          this.$router.push("/");
        } catch (error) {
          console.error("Error during Google login:", error.message);
          alert("Login failed: " + error.message);
        }
      },
      async saveUserToFirestore(user) {
        const userRef = doc(db, "users", user.uid); // Reference to the user's document
        const userDoc = await getDoc(userRef);
  
        // If the user document doesn't exist, create it
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date(), // Add a timestamp
          });
          console.log("User data saved to Firestore!");
        } else {
          console.log("User already exists in Firestore.");
        }
      },
      async handleLogout() {
        try {
          await signOut(auth);
          this.user = null;
        } catch (error) {
          console.error("Error during logout:", error.message);
        }
      },
    },
    mounted() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
      });
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles for a modern look */
  nav {
    backdrop-filter: blur(10px); /* Adds a blur effect to the background */
  }
  
  button {
    transition: all 0.3s ease;
  }
  
  button:hover {
    transform: translateY(-2px); /* Adds a slight lift effect on hover */
  }
  
  button:active {
    transform: translateY(0); /* Resets the lift effect when clicked */
  }
  
  img {
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  
  img:hover {
    transform: scale(1.1); /* Slightly enlarges the profile picture on hover */
    border-color: rgba(255, 255, 255, 0.8); /* Changes border color on hover */
  }
  </style>