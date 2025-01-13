<template>
  <div class="admin-dashboard">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2 class="sidebar-title">Dashboard</h2>
      <ul class="sidebar-menu">
        <li
          v-for="item in menuItems"
          :key="item.section"
          @click="setActiveSection(item.section)"
          :class="{ active: activeSection === item.section }"
        >
          {{ item.icon }} {{ item.label }}
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Sticky Header -->
      <div class="sticky-header">
        <div class="header-actions">
          <button @click="refreshAllData" class="btn btn-refresh">🔄 Refresh All Data</button>
          <button @click="goToProfile" class="btn btn-profile">🏠 Back to Home</button>
        </div>
        <div class="maintenance-box">
          <div class="maintenance-mode-toggle">
            <label>
              <input
                type="checkbox"
                v-model="underConstruction"
                @change="toggleMaintenanceMode"
                :disabled="isMaintenanceLoading"
              />
              🛠️ Maintenance Mode
            </label>
            <span v-if="isMaintenanceLoading" class="loading-spinner"></span>
          </div>
        </div>
      </div>

      <!-- Analytics Section -->
      <div v-if="activeSection === 'analytics'" class="analytics-section">
        <div class="analytics-grid">
          <!-- User Statistics -->
          <div class="analytics-group">
            <h2>📊 User Statistics</h2>
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
            <h2>📈 Engagement Metrics</h2>
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
              <div class="analytics-card">
                <div class="card-icon">✉️</div>
                <div class="card-content">
                  <h3>Chat Messages</h3>
                  <p class="card-value">{{ totalChatMessages }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Financial Overview -->
          <div class="analytics-group">
            <h2>💰 Financial Overview</h2>
            <div class="analytics-cards">
              <div class="analytics-card">
                <div class="card-icon">💰</div>
                <div class="card-content">
                  <h3>Total Revenue</h3>
                  <p class="card-value">${{ totalRevenue.toFixed(2) }}</p>
                </div>
              </div>
              <div class="analytics-card">
                <div class="card-icon">💳</div>
                <div class="card-content">
                  <h3>Total Payments</h3>
                  <p class="card-value">{{ totalPayments }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Revenue Growth Line Graph -->
        <div class="revenue-graph">
          <h2>📈 Revenue Growth Over Time</h2>
          <select v-model="selectedTimeFrame" @change="updateRevenueChart">
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>

      <!-- User Management Section -->
      <section v-if="activeSection === 'users'" class="user-management">
        <div class="section-header">
          <h2>User Management</h2>
          <button @click="toggleSection('users')" class="btn btn-more">
            {{ showMore.users ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="table-responsive" :class="{ expanded: showMore.users }">
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
              <tr v-for="user in showMore.users ? users : users.slice(0, 5)" :key="user.uid">
                <td>{{ user.uid }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td class="actions">
                  <button
                    @click="promoteToAdmin(user.uid)"
                    v-if="user.role !== 'admin'"
                    class="btn btn-promote"
                  >
                    Promote
                  </button>
                  <button @click="deleteUser(user.uid)" class="btn btn-delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">No users found.</p>
        </div>
      </section>

      <!-- Comments Section -->
      <section v-if="activeSection === 'comments'" class="comments">
        <div class="section-header">
          <h2>Comments</h2>
          <button @click="toggleSection('comments')" class="btn btn-more">
            {{ showMore.comments ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="table-responsive" :class="{ expanded: showMore.comments }">
          <table v-if="comments.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Text</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comment in showMore.comments ? comments : comments.slice(0, 5)" :key="comment.id">
                <td>{{ comment.author }}</td>
                <td>{{ comment.text }}</td>
                <td>{{ formatDate(comment.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">No comments found.</p>
        </div>
      </section>

      <!-- Requests Section -->
      <section v-if="activeSection === 'requests'" class="requests">
        <div class="section-header">
          <h2>Requests</h2>
          <button @click="toggleSection('requests')" class="btn btn-more">
            {{ showMore.requests ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="table-responsive" :class="{ expanded: showMore.requests }">
          <table v-if="requests.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Series Name</th>
                <th>Message</th>
                <th>YouTube Trailer</th>
                <th>Requested At</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in showMore.requests ? requests : requests.slice(0, 5)" :key="request.id">
                <td>{{ request.seriesName }}</td>
                <td>{{ request.message }}</td>
                <td>
                  <a :href="request.youtubeTrailer" target="_blank" rel="noopener noreferrer" class="btn btn-trailer">
                    Watch Trailer
                  </a>
                </td>
                <td>{{ formatDate(request.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">No requests found.</p>
        </div>
      </section>

      <!-- Contact Submissions Section -->
      <section v-if="activeSection === 'contactSubmissions'" class="contact-submissions">
        <div class="section-header">
          <h2>Contact Submissions</h2>
          <button @click="toggleSection('contactSubmissions')" class="btn btn-more">
            {{ showMore.contactSubmissions ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="table-responsive" :class="{ expanded: showMore.contactSubmissions }">
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
              <tr
                v-for="submission in showMore.contactSubmissions ? contactSubmissions : contactSubmissions.slice(0, 5)"
                :key="submission.id"
              >
                <td>{{ submission.name }}</td>
                <td>{{ submission.email }}</td>
                <td>{{ submission.message }}</td>
                <td>{{ formatDate(submission.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">No contact submissions found.</p>
        </div>
      </section>

      <!-- Payments Section -->
      <section v-if="activeSection === 'payments'" class="payments">
        <div class="section-header">
          <h2>Payments</h2>
          <button @click="toggleSection('payments')" class="btn btn-more">
            {{ showMore.payments ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="table-responsive" :class="{ expanded: showMore.payments }">
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
              <tr v-for="payment in showMore.payments ? payments : payments.slice(0, 5)" :key="payment.id">
                <td>{{ payment.shortUserId }}</td>
                <td>{{ payment.plan }}</td>
                <td>${{ payment.amount.toFixed(2) }}</td>
                <td>{{ payment.transactionId }}</td>
                <td>{{ formatDate(payment.createdAt) }}</td>
                <td>{{ formatDate(payment.expiryDate) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">No payments found.</p>
        </div>
      </section>

      <!-- Chat Messages Section -->
      <section v-if="activeSection === 'chatMessages'" class="chat-messages">
        <div class="section-header">
          <h2>Chat Messages</h2>
          <button @click="toggleSection('chatMessages')" class="btn btn-more">
            {{ showMore.chatMessages ? 'Show Less' : 'Show More' }}
          </button>
        </div>
        <div class="table-responsive" :class="{ expanded: showMore.chatMessages }">
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
              <tr
                v-for="message in showMore.chatMessages ? chatMessages : chatMessages.slice(0, 5)"
                :key="message.id"
              >
                <td>{{ message.shortSenderId }}</td>
                <td>{{ message.shortReceiverId }}</td>
                <td>{{ message.text }}</td>
                <td>{{ formatDate(message.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-data">No chat messages found.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'AdminDashboard',
  data() {
    return {
      activeSection: 'analytics',
      menuItems: [
        { section: 'analytics', icon: '📊', label: 'Analytics' },
        { section: 'users', icon: '👥', label: 'User Management' },
        { section: 'comments', icon: '💬', label: 'Comments' },
        { section: 'requests', icon: '📥', label: 'Requests' },
        { section: 'contactSubmissions', icon: '📨', label: 'Contact' },
        { section: 'payments', icon: '💳', label: 'Payments' },
        { section: 'chatMessages', icon: '✉️', label: 'Chat Messages' },
      ],
      showMore: {
        users: false,
        comments: false,
        requests: false,
        contactSubmissions: false,
        payments: false,
        chatMessages: false,
      },
      users: [],
      comments: [],
      requests: [],
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
      selectedTimeFrame: 'day',
      underConstruction: false,
      revenueChart: null,
      isMaintenanceLoading: false,
    };
  },
  async created() {
    await this.fetchMaintenanceMode();
    await this.fetchAllData();
    this.updateRevenueChart();
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    toggleSection(section) {
      this.showMore[section] = !this.showMore[section];
    },
    async fetchAllData() {
      try {
        await Promise.all([
          this.fetchUsers(),
          this.fetchComments(),
          this.fetchContactSubmissions(),
          this.fetchPayments(),
          this.fetchChatMessages(),
          this.fetchRequests(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async refreshAllData() {
      try {
        await this.fetchAllData();
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    },
    async promoteToAdmin(uid) {
      if (!confirm('Are you sure you want to promote this user to admin?')) return;
      try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, { role: 'admin' });
        await this.fetchUsers();
      } catch (error) {
        console.error('Error promoting user:', error);
      }
    },
    async deleteUser(uid) {
      if (!confirm('Are you sure you want to delete this user?')) return;
      try {
        const userRef = doc(db, 'users', uid);
        await deleteDoc(userRef);
        await this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    goToProfile() {
      this.$router.push('/');
    },
    async fetchMaintenanceMode() {
      try {
        const maintenanceRef = doc(db, 'config', 'maintenance');
        const docSnap = await getDoc(maintenanceRef);
        if (docSnap.exists()) {
          this.underConstruction = docSnap.data().underConstruction;
        }
      } catch (error) {
        console.error('Error fetching maintenance mode:', error);
      }
    },
    async toggleMaintenanceMode() {
      this.isMaintenanceLoading = true;
      try {
        const maintenanceRef = doc(db, 'config', 'maintenance');
        await updateDoc(maintenanceRef, { underConstruction: this.underConstruction });
      } catch (error) {
        console.error('Error toggling maintenance mode:', error);
      } finally {
        this.isMaintenanceLoading = false;
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
        this.users = querySnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
        this.totalUsers = this.users.length;
        this.totalAdmins = this.users.filter((user) => user.role === 'admin').length;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchComments() {
      try {
        const querySnapshot = await getDocs(collection(db, 'comments'));
        this.comments = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        this.totalComments = this.comments.length;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async fetchContactSubmissions() {
      try {
        const querySnapshot = await getDocs(collection(db, 'contactSubmissions'));
        this.contactSubmissions = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        this.totalContactSubmissions = this.contactSubmissions.length;
      } catch (error) {
        console.error('Error fetching contact submissions:', error);
      }
    },
    async fetchPayments() {
      try {
        const querySnapshot = await getDocs(collection(db, 'payments'));
        this.payments = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const amount = parseFloat(data.price.replace(/[^0-9.]/g, ''));
          return { ...data, id: doc.id, amount, shortUserId: this.getShortUid(data.userId) };
        });
        this.totalPayments = this.payments.length;
        this.totalRevenue = this.payments.reduce((sum, payment) => sum + payment.amount, 0);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    },
    async fetchChatMessages() {
      try {
        const querySnapshot = await getDocs(collection(db, 'yChatMessages'));
        this.chatMessages = querySnapshot.docs.map((doc) => {
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
      }
    },
    async fetchRequests() {
      try {
        const querySnapshot = await getDocs(collection(db, 'requests'));
        this.requests = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    },
    renderRevenueChart() {
      const ctx = this.$refs.revenueChart.getContext('2d');
      if (this.revenueChart) {
        this.revenueChart.destroy();
      }
      this.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.revenueData.map((data) => data.date),
          datasets: [
            {
              label: 'Revenue',
              data: this.revenueData.map((data) => data.amount),
              borderColor: '#4f46e5',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
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
    updateRevenueChart() {
      this.revenueData = this.aggregateRevenueData(this.payments, this.selectedTimeFrame);
      this.renderRevenueChart();
    },
    aggregateRevenueData(payments, timeFrame = 'day') {
      const aggregatedData = {};
      payments.forEach((payment) => {
        const date = payment.createdAt.toDate();
        let key;
        switch (timeFrame) {
          case 'day':
            key = date.toISOString().split('T')[0];
            break;
          case 'week':
            key = `${date.getFullYear()}-W${this.getWeekNumber(date)}`;
            break;
          case 'month':
            key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            break;
          default:
            key = date.toISOString().split('T')[0];
        }
        if (!aggregatedData[key]) {
          aggregatedData[key] = { date: key, amount: 0 };
        }
        aggregatedData[key].amount += payment.amount;
      });
      return Object.values(aggregatedData).sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    getWeekNumber(date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      const yearStart = new Date(d.getFullYear(), 0, 1);
      return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    },
  },
};
</script>



<style scoped>
/* General Styles */
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 250px;
  background-color: #ffffff;
  color: black;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 250px;
  overflow-y: auto;
  position: relative;
  min-height: 100vh;
}

/* Sidebar Styles */
.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.sidebar-menu li {
  padding: 10px;
  cursor: pointer;
  display: flex;
  color: black;
  border-radius: 6px;
  margin-bottom: 10px;
  transition: background-color 0.2s, transform 0.2s;
}

.sidebar-menu li:hover {
  background-color: #e0e0e0;
  transform: translateX(5px);
}

.sidebar-menu li.active {
  background-color: #4f46e5;
  color: white;
}

/* Sticky Header */
.sticky-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 999;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-refresh {
  background-color: #4f46e5;
  color: white;
}

.btn-refresh:hover {
  background-color: #4338ca;
}

.btn-profile {
  background-color: #10b981;
  color: white;
}

.btn-profile:hover {
  background-color: #059669;
}

.btn-more {
  background-color: #3b82f6;
  color: white;
}

.btn-more:hover {
  background-color: #2563eb;
}

.btn-promote {
  background-color: #10b981;
  color: white;
}

.btn-promote:hover {
  background-color: #059669;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
}

.btn-delete:hover {
  background-color: #dc2626;
}

/* Maintenance Mode Toggle */
.maintenance-box {
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

.maintenance-mode-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.maintenance-mode-toggle label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.maintenance-mode-toggle input[type="checkbox"] {
  cursor: pointer;
}

.loading-spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #4f46e5;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Analytics Section */
.analytics-section {
  margin-top: 20px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.analytics-group {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.analytics-group:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.analytics-group h2 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #1f2937;
}

.analytics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.analytics-card {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;
}

.analytics-card:hover {
  background-color: #e9ecef;
}

.card-icon {
  font-size: 20px;
  color: #4f46e5;
}

.card-content h3 {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.card-value {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.revenue-graph {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.revenue-graph h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #1f2937;
  font-size: 1.5rem;
}

.revenue-graph canvas {
  width: 100% !important;
  height: 300px !important;
}

/* Table Styles */
.table-responsive {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 500;
  color: #6b7280;
}

.data-table tr:hover {
  background-color: #f8f9ff;
}

.actions {
  display: flex;
  gap: 8px;
}

.no-data {
  text-align: center;
  color: #6b7280;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Mobile Styles */
@media only screen and (max-width: 767px) {
  .admin-dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    box-shadow: none;
    padding: 10px;
    order: 1;
  }

  .main-content {
    margin-left: 0;
    padding: 10px;
    order: 2;
  }

  .sidebar-menu li {
    padding: 8px;
    font-size: 14px;
  }

  .sidebar-title {
    font-size: 1.2rem;
    padding: 8px;
  }

  .sticky-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
    gap: 5px;
  }

  .btn {
    width: 100%;
  }

  .maintenance-box {
    width: 100%;
    padding: 10px;
  }

  .maintenance-mode-toggle {
    justify-content: flex-start;
  }

  .analytics-grid {
    grid-template-columns: 1fr;
  }

  .analytics-card {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }

  .card-icon {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .revenue-graph {
    padding: 15px;
  }

  .data-table th,
  .data-table td {
    padding: 8px;
    font-size: 14px;
  }

  .actions {
    flex-direction: column;
    gap: 5px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>