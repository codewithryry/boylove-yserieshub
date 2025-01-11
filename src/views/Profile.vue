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
            <br>
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
            <button v-if="isAdmin" @click="goToAdminDashboard" class="btn-admin-dashboard">
              <i class="fas fa-tachometer-alt"></i> Admin Dashboard
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
  <h3>Activity Log</h3>
  <p class="activity-description">
    All your contact submissions and feedback are displayed here.
  </p>

  <div v-if="recentActivity.length > 0" class="activity-list">
    <div v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
      <div class="activity-icon">
        <!-- <i v-if="activity.type === 'comment'" class="fas fa-comment"></i>
        <i v-if="activity.type === 'contact'" class="fas fa-envelope"></i> -->
      </div>
      <div class="activity-content">
        <p class="activity-text">{{ activity.text }}</p>
      </div>
      <div class="activity-timestamp">
        {{ formatTimestamp(activity.timestamp) }}
      </div>
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
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
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
      isAdmin: false, // Whether the user is an admin
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
        await this.fetchRecentActivity(); // Fetch recent activity
        await this.checkIfAdmin(); // Check if the user is an admin
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
    async fetchRecentActivity() {
      this.recentActivity = [];

      try {
        // Fetch comments made by the logged-in user
        const commentsQuery = query(
          collection(db, "comments"),
          where("uid", "==", this.user.uid) // Filter by the logged-in user's UID
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        commentsSnapshot.forEach((doc) => {
          const comment = doc.data();
          const timestamp = comment.timestamp?.toDate();
          this.recentActivity.push({
            type: "comment",
            text: `"${comment.text}"`,
            timestamp,
          });
        });

        // Fetch contact submissions made by the logged-in user
        const submissionsQuery = query(
          collection(db, "contactSubmissions"),
          where("uid", "==", this.user.uid) // Filter by the logged-in user's UID
        );
        const submissionsSnapshot = await getDocs(submissionsQuery);
        submissionsSnapshot.forEach((doc) => {
          const submission = doc.data();
          const timestamp = submission.timestamp?.toDate();
          this.recentActivity.push({
            type: "contact",
            text: `"${submission.message}"`,
            timestamp,
          });
        });

        // Sort activities by timestamp (if available)
        this.recentActivity.sort((a, b) => b.timestamp - a.timestamp);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        this.showAlert("Failed to fetch recent activity. Please try again.", "error");
      }
    },
    formatTimestamp(timestamp) {
      const now = new Date();
      const activityDate = new Date(timestamp);
      const diffInSeconds = Math.floor((now - activityDate) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        return activityDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    },
    async checkIfAdmin() {
      const userDoc = await getDoc(doc(db, "users", this.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.isAdmin = userData.role === "admin";
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
    goToAdminDashboard() {
      this.$router.push({ path: '/admin' });
    },
  },
};
</script>


<style scoped>
.activity-description {
  font-size: 0.9rem;
  color: #666; /* Subtle gray color */
  margin-bottom: 20px; /* Space below the description */
  text-align: center; /* Center-align the text */
}
</style>

<style scoped>
.recent-activity {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 10px;
  padding: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activity-icon {
  font-size: 1.5rem;
  color: #4caf50;
}

.activity-content {
  flex: 1; /* Takes up remaining space */
  text-align: left; /* Ensures text is aligned to the left */
}

.activity-text {
  font-size: 1rem;
  color: #333;
  margin: 0;
}

.activity-timestamp {
  font-size: 0.875rem;
  color: #777;
  white-space: nowrap; /* Prevents timestamp from wrapping */
  margin-left: auto; /* Pushes timestamp to the right */
}

.no-activity {
  font-size: 1rem;
  color: #777;

}

/* Responsive Design */
@media (max-width: 768px) {
  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .activity-icon {
    font-size: 1.25rem;
  }

  .activity-text {
    font-size: 0.875rem;
  }

  .activity-timestamp {
    font-size: 0.75rem;
    margin-left: 0; /* Reset margin for mobile */
  }
}
</style>

<style scoped>
/* Admin Badge */
.admin-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 10px;
}

.admin-icon {
  color: #4caf50; /* Green color for admin */
  font-size: 1.2rem;
}

.admin-text {
  display: none; /* Hide text by default */
}

/* Show text on desktop */
@media (min-width: 768px) {
  .admin-text {
    display: inline; /* Show text on desktop */
  }
}

/* Admin Dashboard Button */
.btn-admin-dashboard {
  width: 100%;
  padding: 10px;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  margin-top: 10px;
}

.btn-admin-dashboard:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
}

/* Activity Items */
.activity-item {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 10px;
  padding: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
}

.activity-item i {
  color: #4caf50;
}

.no-activity {
  font-size: 1rem;
  color: #777;

}
</style>


















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