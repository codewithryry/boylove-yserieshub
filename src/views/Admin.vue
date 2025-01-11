<template>
  <div class="admin-dashboard">
    <!-- Analytics Cards Grid -->
    <div class="analytics-grid">
      <!-- User Statistics -->
      <div class="analytics-group">
        <h2>User Statistics</h2>
        <div class="analytics-cards">
          <div class="analytics-card">
            <div class="card-icon">👥</div>
            <div class="card-content">
              <h3>Total Users</h3>
              <p class="card-value">{{ totalUsers }}</p>
            </div>
          </div>
          <div class="analytics-card">
            <div class="card-icon">👑</div>
            <div class="card-content">
              <h3>Total Admins</h3>
              <p class="card-value">{{ totalAdmins }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Engagement Metrics -->
      <div class="analytics-group">
        <h2>Engagement Metrics</h2>
        <div class="analytics-cards">
          <div class="analytics-card">
            <div class="card-icon">💬</div>
            <div class="card-content">
              <h3>Total Comments</h3>
              <p class="card-value">{{ totalComments }}</p>
            </div>
          </div>
          <div class="analytics-card">
            <div class="card-icon">📨</div>
            <div class="card-content">
              <h3>Contact Submissions</h3>
              <p class="card-value">{{ totalContactSubmissions }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Overview -->
      <div class="analytics-group">
        <h2>Financial Overview</h2>
        <div class="analytics-cards">
          <div class="analytics-card">
            <div class="card-icon">💳</div>
            <div class="card-content">
              <h3>Total Payments</h3>
              <p class="card-value">{{ totalPayments }}</p>
            </div>
          </div>
          <div class="analytics-card">
            <div class="card-icon">💰</div>
            <div class="card-content">
              <h3>Total Revenue</h3>
              <p class="card-value">${{ totalRevenue.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
        <!-- Engagement Metrics -->
        <div class="analytics-group">
        <h2>Messenges</h2>
        <div class="analytics-cards">
            <div class="analytics-card">
            <div class="card-icon">✉️</div>
            <div class="card-content">
              <h3>Chat Messages</h3>
              <p class="card-value">{{ totalChatMessages }}</p>
            </div>
          </div>
        </div>
    </div>
    </div>

    <!-- Revenue Growth Line Graph -->
    <div class="revenue-graph">
      <h2>Revenue Growth Over Time</h2>
      <canvas ref="revenueChart"></canvas>
    </div>

    <br>
    <!-- Admin Features -->
    <div class="admin-features">
      <!-- User Management Section -->
      <section class="user-management">
        <h2>User Management</h2>
        <button @click="fetchUsers" class="btn btn-primary">Refresh User List</button>
        <div class="table-responsive">
          <table v-if="users.length > 0" class="data-table">
            <thead>
              <tr>
                <th>UID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.uid">
                <td>{{ user.uid }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <button @click="promoteToAdmin(user.uid)" v-if="user.role !== 'admin'" class="btn btn-sm btn-success">
                    Promote to Admin
                  </button>
                  <button @click="deleteUser(user.uid)" class="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No users found.</p>
        </div>
      </section>
      <br>
      <!-- Comments Section -->
      <section class="comments">
        <h2>Comments</h2>
        <button @click="fetchComments" class="btn btn-primary">Refresh Comments</button>
        <div class="table-responsive">
          <table v-if="comments.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Text</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comment in comments" :key="comment.id">
                <td>{{ comment.author }}</td>
                <td>{{ comment.text }}</td>
                <td>{{ formatDate(comment.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No comments found.</p>
        </div>
      </section>
      <br>
      <!-- Contact Submissions Section -->
      <section class="contact-submissions">
        <h2>Contact Submissions</h2>
        <button @click="fetchContactSubmissions" class="btn btn-primary">Refresh Submissions</button>
        <div class="table-responsive">
          <table v-if="contactSubmissions.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="submission in contactSubmissions" :key="submission.id">
                <td>{{ submission.name }}</td>
                <td>{{ submission.email }}</td>
                <td>{{ submission.message }}</td>
                <td>{{ formatDate(submission.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No contact submissions found.</p>
        </div>
      </section>
      <br>
      <!-- Payments Section -->
      <section class="payments">
        <h2>Payments</h2>
        <button @click="fetchPayments" class="btn btn-primary">Refresh Payments</button>
        <div class="table-responsive">
          <table v-if="payments.length > 0" class="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Created At</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in payments" :key="payment.id">
                <td>{{ payment.shortUserId }}</td>
                <td>{{ payment.plan }}</td>
                <td>${{ payment.amount.toFixed(2) }}</td>
                <td>{{ payment.transactionId }}</td>
                <td>{{ formatDate(payment.createdAt) }}</td>
                <td>{{ formatDate(payment.expiryDate) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No payments found.</p>
        </div>
      </section>
  <br>
      <!-- Chat Messages Section -->
      <section class="chat-messages">
        <h2>Chat Messages</h2>
        <button @click="fetchChatMessages" class="btn btn-primary">Refresh Chat Messages</button>
        <div class="table-responsive">
          <table v-if="chatMessages.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Sender ID</th>
                <th>Receiver ID</th>
                <th>Text</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="message in chatMessages" :key="message.id">
                <td>{{ message.shortSenderId }}</td>
                <td>{{ message.shortReceiverId }}</td>
                <td>{{ message.text }}</td>
                <td>{{ formatDate(message.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No chat messages found.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'AdminDashboard',
  data() {
    return {
      users: [],
      comments: [],
      contactSubmissions: [],
      payments: [],
      chatMessages: [],
      totalUsers: 0,
      totalAdmins: 0,
      totalComments: 0,
      totalContactSubmissions: 0,
      totalPayments: 0,
      totalChatMessages: 0,
      totalRevenue: 0,
      revenueData: [],
      isLoading: false,
      error: null,
    };
  },
  async created() {
    await this.fetchAllData();
    this.renderRevenueChart();
  },
  methods: {
    async fetchAllData() {
      this.isLoading = true;
      this.error = null;
      try {
        await Promise.all([
          this.fetchUsers(),
          this.fetchComments(),
          this.fetchContactSubmissions(),
          this.fetchPayments(),
          this.fetchChatMessages(),
        ]);
      } catch (error) {
        this.error = 'Failed to fetch data. Please try again later.';
        console.error('Error fetching data:', error);
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return '';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    },
    getShortUid(uid) {
      if (!uid) return '';
      return `${uid.slice(0, 4)}...${uid.slice(-6)}`;
    },
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        this.users = querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }));
        this.totalUsers = this.users.length;
        this.totalAdmins = this.users.filter(user => user.role === 'admin').length;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    async fetchComments() {
      try {
        const querySnapshot = await getDocs(collection(db, 'comments'));
        this.comments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.totalComments = this.comments.length;
      } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
    },
    async fetchContactSubmissions() {
      try {
        const querySnapshot = await getDocs(collection(db, 'contactSubmissions'));
        this.contactSubmissions = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        this.totalContactSubmissions = this.contactSubmissions.length;
      } catch (error) {
        console.error('Error fetching contact submissions:', error);
        throw error;
      }
    },
    async fetchPayments() {
      try {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        this.payments = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const amount = parseFloat(data.price.replace(/[^0-9.]/g, ''));
          return { ...data, id: doc.id, amount, shortUserId: this.getShortUid(data.userId) };
        });
        this.totalPayments = this.payments.length;
        this.totalRevenue = this.payments.reduce((sum, payment) => sum + payment.amount, 0);
        // Prepare revenue data for the graph
        this.revenueData = this.payments.map(payment => ({
          date: this.formatDate(payment.createdAt),
          amount: payment.amount,
        }));
      } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
      }
    },
    async fetchChatMessages() {
      try {
        const querySnapshot = await getDocs(collection(db, 'yChatMessages'));
        this.chatMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            shortSenderId: this.getShortUid(data.senderId),
            shortReceiverId: this.getShortUid(data.receiverId),
          };
        });
        this.totalChatMessages = this.chatMessages.length;
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
      }
    },
    async promoteToAdmin(uid) {
      if (!confirm('Are you sure you want to promote this user to admin?')) return;
      try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, { role: 'admin' });
        alert('User promoted to admin successfully!');
        await this.fetchUsers();
      } catch (error) {
        console.error('Error promoting user:', error);
        alert('Failed to promote user');
      }
    },
    async deleteUser(uid) {
      if (!confirm('Are you sure you want to delete this user?')) return;
      try {
        const userRef = doc(db, 'users', uid);
        await deleteDoc(userRef);
        alert('User deleted successfully!');
        await this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    },
    renderRevenueChart() {
      const ctx = this.$refs.revenueChart.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.revenueData.map(data => data.date),
          datasets: [{
            label: 'Revenue',
            data: this.revenueData.map(data => data.amount),
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue ($)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  max-width: 100vw; /* Use full width of the viewport */
  margin: 0; /* No margin */
  background-color: #f5f7fb;
}

/* Layout for desktop */
@media only screen and (min-width: 768px) {
  .analytics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three columns for larger screens */
    gap: 20px; /* Spacing between cards */
    margin-bottom: 30px;
    padding: 0; /* Remove padding to prevent overflow */
    width: 100%; /* Ensure full width */
  }

  .analytics-group {
    overflow: hidden; /* Prevents overflow from causing scrollbars */
    width: 100%; /* Ensure full width */
  }

  .admin-features {
    display: block; /* Make it a single column layout for desktop */
    margin-top: 30px; /* Add spacing from the graph */
    width: 100%; /* Ensure full width */
  }

  .revenue-graph {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    width: 100%; /* Ensure full width */
  }
}

/* Mobile styles */
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive for mobile */
}

.analytics-group {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.analytics-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.card-icon {
  font-size: 24px;
  margin-right: 15px;
}

.card-content h3 {
  margin: 0;
  font-size: 16px;
  color: #6b7280;
}

.card-value {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.revenue-graph h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #1f2937;
  font-size: 1.5rem;
}

.revenue-graph canvas {
  width: 100% !important; /* Ensures the graph is responsive */
  height: 400px !important; /* Fixed height */
}

.table-responsive {
  overflow-x: auto; /* Allow horizontal scrolling on mobile */
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background: white;
}

.data-table th,
.data-table td {
  padding: 12px;
  border: 1px solid #eee;
  text-align: left;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 500;
}

.data-table tr:hover {
  background-color: #f8f9ff;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover {
  background-color: #059669;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>