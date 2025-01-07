<template>
    <div class="edit-profile-container">
      <h2>Edit Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            v-model="displayName"
            placeholder="Enter your display name"
            required
          />
        </div>
        <button type="submit" class="btn-save">Save Changes</button>
        <button type="button" class="btn-cancel" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
  import { updateProfile } from "firebase/auth";
  import { doc, updateDoc } from "firebase/firestore";
  
  export default {
    name: 'EditProfile',
    data() {
      return {
        displayName: '', // Current display name
      };
    },
    async created() {
      // Fetch the current user's display name
      if (auth.currentUser) {
        this.displayName = auth.currentUser.displayName || '';
      }
    },
    methods: {
      async updateProfile() {
        try {
          const user = auth.currentUser;
  
          if (!user) {
            alert("You must be logged in to update your profile.");
            return;
          }
  
          // Update display name in Firebase Authentication
          await updateProfile(user, {
            displayName: this.displayName,
          });
  
          // Update display name in Firestore
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            displayName: this.displayName,
          });
  
          alert("Profile updated successfully!");
          this.$router.push({ path: '/profile' }); // Redirect to the profile page
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Failed to update profile. Please try again.");
        }
      },
      cancelEdit() {
        this.$router.push({ path: '/profile' }); // Redirect to the profile page
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-profile-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .btn-save {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
  }
  
  .btn-save:hover {
    background-color: #0056b3;
  }
  
  .btn-cancel {
    background-color: #6c757d;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn-cancel:hover {
    background-color: #5a6268;
  }
  </style>