<template>
    <div>
      <h2>{{ isLogin ? "Login" : "Sign Up" }}</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">{{ isLogin ? "Login" : "Sign Up" }}</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <button @click="toggleMode">
        {{ isLogin ? "Create an account" : "Already have an account? Login" }}
      </button>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { auth } from "../firebase";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  
  export default {
    setup() {
      const email = ref("");
      const password = ref("");
      const isLogin = ref(true);
      const error = ref("");
  
      const handleSubmit = async () => {
        error.value = ""; // Clear previous errors
        try {
          if (isLogin.value) {
            // Login
            await signInWithEmailAndPassword(auth, email.value, password.value);
            alert("Login successful!");
          } else {
            // Signup
            await createUserWithEmailAndPassword(auth, email.value, password.value);
            alert("Signup successful!");
          }
        } catch (err) {
          error.value = err.message;
        }
      };
  
      const toggleMode = () => {
        isLogin.value = !isLogin.value;
      };
  
      return {
        email,
        password,
        isLogin,
        error,
        handleSubmit,
        toggleMode,
      };
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>