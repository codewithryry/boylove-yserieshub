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
              <i class="fas fa-edit"></i> Edit Display Name
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

        <!-- Recent Activity Section -->
        <div class="recent-activity">
          <h3>Recent Activity</h3>
          <div v-if="recentActivity.length > 0" class="activity-list">
            <div v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
              <i class="fas fa-clock"></i>
              <span>{{ activity }}</span>
            </div>
          </div>
          <div v-else class="no-activity">
            No recent activity.
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
  
        <h2>Edit Display Name</h2>
        <!-- Alert Message -->
        <div v-if="alertMessage" :class="['alert', alertType]">
          {{ alertMessage }}
        </div>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
           
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
      recentActivity: [], // Array to store recent user activity
    };
  },
  computed: {
    formattedExpiryDate() {
      if (!this.subscriptionExpiry) return 'N/A';
      const expiryDate = this.subscriptionExpiry.toDate();
      return expiryDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    isSubscriptionExpired() {
      if (!this.subscriptionExpiry) return true;
      const expiryDate = this.subscriptionExpiry.toDate();
      const currentDate = new Date();
      return currentDate > expiryDate;
    },
  },
  async created() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.editDisplayName = user.displayName || '';
        await this.fetchSubscription();
        this.fetchRecentActivity(); // Fetch recent activity
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    async fetchSubscription() {
      const userDoc = await getDoc(doc(db, "users", this.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.subscription = userData.subscription || '';
        this.subscriptionExpiry = userData.expiryDate || null;
      }
    },
    openEditModal() {
      this.isEditModalOpen = true;
      this.alertMessage = '';
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.alertMessage = '';
    },
    async updateProfile() {
      try {
        const user = auth.currentUser;
        if (!user) {
          this.showAlert("You must be logged in to update your profile.", "error");
          return;
        }
        await updateProfile(user, {
          displayName: this.editDisplayName,
        });
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          displayName: this.editDisplayName,
        });
        this.user.displayName = this.editDisplayName;
        this.showAlert("Display Name updated successfully!", "success");
        setTimeout(() => {
          this.closeEditModal();
        }, 2000);
      } catch (error) {
        console.error("Error updating profile:", error);
        this.showAlert("Failed to update username. Please try again.", "error");
      }
    },
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;
    },
    upgradeSubscription() {
      this.$router.push({ path: '/pricing' });
    },
    fetchRecentActivity() {

    },
  },
};
</script>













<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.profile-container {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

.profile-layout {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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

.btn-edit-profile,
.btn-upgrade {
  width: 100%;
  padding: 10px;
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit-profile {
  background: linear-gradient(135deg, #2c3e50, #1a252f);
}

.btn-upgrade {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
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
.recent-activity {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.subscription-details h3,
.recent-activity h3 {
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

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-item {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 10px;
  padding: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-activity {
  font-size: 1rem;
  color: #777;
  font-style: italic;
}

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
  position: relative;
}

.btn-close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #555;
}

.btn-close-modal:hover {
  color: #000;
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
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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

/* Responsive Design */
@media (max-width: 768px) {
  .profile-layout {
    flex-direction: column;
  }

  .profile-header {
    margin-bottom: 20px;
  }

  .profile-picture {
    width: 100px;
    height: 100px;
  }

  .profile-icon {
    font-size: 100px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .profile-email {
    font-size: 0.875rem;
  }

  .subscription-details h3,
  .recent-activity h3 {
    font-size: 1.25rem;
  }

  .subscription-info p {
    font-size: 0.875rem;
  }

  .activity-item {
    font-size: 0.875rem;
  }
}
</style>