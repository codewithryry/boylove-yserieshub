<template>
  <div class="profile-container">
    <div v-if="user" class="profile-layout">
      <!-- Left Section with Profile Info -->
      <div class="profile-header">
        <div class="profile-picture-section">
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            alt="Profile Picture"
            class="profile-picture"
          />
          <i v-else class="fas fa-user-circle profile-icon"></i>
          <div class="profile-info">
            <h2 class="profile-name">{{ user.displayName || "User" }}</h2>
            <p class="profile-email">{{ user.email }}</p>
            <div class="subscription-status">
              <div v-if="isSubscriptionExpired" class="status-none">
                No Subscription (Expired)
              </div>
              <div v-else-if="subscription.toLowerCase() === 'vip plan'" class="status-vip">
                <i class="fas fa-crown"></i> VIP Plan
              </div>
              <div v-else-if="subscription.toLowerCase() === 'premium plan'" class="status-premium">
                <i class="fas fa-gem"></i> Premium Plan
              </div>
              <div v-else-if="subscription.toLowerCase() === 'free trial'" class="status-trial">
                <i class="fas fa-star"></i> Free Trial
              </div>
              <div v-else class="status-none">No Subscription</div>
            </div>
            <button @click="openEditModal" class="btn-edit-profile">
              <i class="fas fa-edit"></i> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Section -->
      <div class="main-content">
        <!-- Subscription Details -->
        <div class="subscription-details">
          <h3>Subscription Details</h3>
          <div class="subscription-info">
            <p><strong>Plan:</strong> {{ subscription || 'No Subscription' }}</p>
            <p><strong>Expiry Date:</strong> {{ formattedExpiryDate || 'N/A' }}</p>
            <br>
            <button @click="upgradeSubscription" class="btn-upgrade">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading user data...</p>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="isEditModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <!-- Alert Message -->
        <div v-if="alertMessage" :class="['alert', alertType]">
          {{ alertMessage }}
        </div>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              v-model="editDisplayName"
              placeholder="Enter your display name"
              required
            />
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn-save">Save Changes</button>
            <button type="button" class="btn-cancel" @click="closeEditModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>











  <script>
  import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
  import { onAuthStateChanged } from "firebase/auth";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import { updateProfile } from "firebase/auth";
  
  export default {
    name: 'Profile',
    data() {
      return {
        user: null, // Logged-in user
        subscription: '', // User's subscription plan
        subscriptionExpiry: null, // Subscription expiry date (Firestore timestamp)
        isEditModalOpen: false, // Controls the visibility of the edit modal
        editDisplayName: '', // Temporary display name for editing
        alertMessage: '', // Message to display in the modal
        alertType: '', // Type of alert (success or error)
      };
    },
    computed: {
  formattedExpiryDate() {
    if (!this.subscriptionExpiry) return 'N/A'; // Fallback if expiry date is missing

    // Convert Firestore timestamp to a JavaScript Date object
    const expiryDate = this.subscriptionExpiry.toDate();

    // Format the date and time
    return expiryDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      
    });
  },
  isSubscriptionExpired() {
    if (!this.subscriptionExpiry) return true; // If no expiry date, assume expired

    const expiryDate = this.subscriptionExpiry.toDate();
    const currentDate = new Date();

    return currentDate > expiryDate; // Return true if expired
  },
},



    async created() {
      // Fetch user data when the component is created
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          this.editDisplayName = user.displayName || ''; // Initialize editDisplayName
          await this.fetchSubscription(); // Fetch subscription data
        } else {
          this.user = null;
        }
      });
    },
    methods: {
      // Fetch subscription data from Firestore
      async fetchSubscription() {
  const userDoc = await getDoc(doc(db, "users", this.user.uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    this.subscription = userData.subscription || '';
    this.subscriptionExpiry = userData.expiryDate || null;

    console.log("Fetched Subscription:", this.subscription);
    console.log("Fetched Expiry Date:", this.subscriptionExpiry?.toDate());

    // Check if the subscription has expired
    if (this.subscriptionExpiry) {
      const expiryDate = this.subscriptionExpiry.toDate();
      const currentDate = new Date();

      if (currentDate > expiryDate) {
        console.log("Subscription has expired. Removing...");

        // Subscription has expired, remove it from Firestore
        await updateDoc(doc(db, "users", this.user.uid), {
          subscription: '', // Remove the subscription
          expiryDate: null, // Clear the expiry date
        });

        // Update local state
        this.subscription = '';
        this.subscriptionExpiry = null;

        console.log("Subscription removed.");
    }
        }
      }
    },
      // Open the edit profile modal
      openEditModal() {
        this.isEditModalOpen = true; // Open the modal
        this.alertMessage = ''; // Clear any previous alert messages
      },
      // Close the edit profile modal
      closeEditModal() {
        this.isEditModalOpen = false; // Close the modal
        this.alertMessage = ''; // Clear any alert messages
      },
      // Update the user's profile
      async updateProfile() {
        try {
          const user = auth.currentUser;
  
          if (!user) {
            this.showAlert("You must be logged in to update your profile.", "error");
            return;
          }
  
          // Update display name in Firebase Authentication
          await updateProfile(user, {
            displayName: this.editDisplayName,
          });
  
          // Update display name in Firestore
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, {
            displayName: this.editDisplayName,
          });
  
          // Update the local user data
          this.user.displayName = this.editDisplayName;
  
          // Show success message
          this.showAlert("Username updated successfully!", "success");
  
          // Close the modal after 2 seconds
          setTimeout(() => {
            this.closeEditModal();
          }, 2000);
        } catch (error) {
          console.error("Error updating profile:", error);
          this.showAlert("Failed to update username. Please try again.", "error");
        }
      },
      // Show an alert message in the modal
      showAlert(message, type) {
        this.alertMessage = message;
        this.alertType = type;
      },
      // Redirect to the subscription upgrade page
      upgradeSubscription() {
        this.$router.push({ path: '/pricing' });
      },
    },
  };
  </script>
















  
  <style scoped>
  /* Add your existing styles here */
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .modal-content h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .btn-save {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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
  }
  
  .btn-cancel:hover {
    background-color: #5a6268;
  }
  
  /* Alert Styles */
  .alert {
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .alert.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .alert.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  </style>

  


  <style scoped>
  /* Modern Font */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  .profile-container {
   
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    height: 100vh; /* Full viewport height */
    overflow: hidden; /* Prevent scrolling */
    height: 100vh; 
    font-family: 'Poppins', sans-serif;
    padding: 50px; /* Remove padding */
  }
  
  .profile-layout {
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .profile-header {
    flex: 1;
    background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
    border-radius: 15px;
    padding: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .profile-picture-section {
    text-align: center;
  }
  
  .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .profile-icon {
    font-size: 150px;
    color: #2c3e50;
  }
  
  .profile-info {
    margin-top: 20px;
  }
  
  .profile-name {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .profile-email {
    font-size: 1rem;
    color: #555;
    margin-bottom: 20px;
  }
  
  .subscription-status {
    margin-bottom: 20px;
  }
  
  .status-vip,
  .status-premium,
  .status-trial,
  .status-none {
    padding: 10px;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    text-align: center;
  }
  
  .status-vip {
    background: linear-gradient(135deg, #ffd700, #ffa500);
  }
  
  .status-premium {
    background: linear-gradient(135deg, #4caf50, #45a049);
  }
  
  .status-trial {
    background: linear-gradient(135deg, #2196f3, #1e88e5);
  }
  
  .status-none {
    background: linear-gradient(135deg, #777, #555);
  }
  
  .btn-edit-profile {
    width: 100%;
    padding: 10px;
    background: linear-gradient(135deg, #2c3e50, #1a252f);
    border: none;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-edit-profile:hover {
    background: linear-gradient(135deg, #1a252f, #2c3e50);
  }
  
  .main-content {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .subscription-details,
  .activity-feed,
  .favorite-content {
    background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
    border-radius: 15px;
    padding: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .subscription-details h3,
  .activity-feed h3,
  .favorite-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .subscription-info p {
    font-size: 1rem;
    color: #333;
    margin-bottom: 10px;
  }
  
  .btn-upgrade {
    padding: 10px 20px;
    background: linear-gradient(135deg, #4caf50, #45a049);
    border: none;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-upgrade:hover {
    background: linear-gradient(135deg, #45a049, #4caf50);
  }
  
  .activity-list,
  .favorites-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .activity-item,
  .favorite-item {
    background: rgba(255, 255, 255, 0.9); /* Glassmorphism effect */
    border: 1px solid rgba(221, 221, 221, 0.5);
    border-radius: 10px;
    padding: 10px;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .activity-item i {
    margin-right: 10px;
    color: #2c3e50;
  }
  
  .favorite-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .favorite-image {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .no-activity,
  .no-favorites {
    font-size: 1rem;
    color: #777;
    font-style: italic;
  }
  
  .loading {
    text-align: center;
    font-size: 1.25rem;
    color: #555;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .profile-layout {
      flex-direction: column;
    }
  
    .profile-header {
      margin-bottom: 20px;
    }
  }
  </style>