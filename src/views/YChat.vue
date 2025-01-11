<template>
  <div class="app-container">
    <div class="messenger-app">

  
      <!-- Desktop Sidebar Section -->
      <div class="sidebar-section" v-if="!isChatSelected || !isMobileView">
        <!-- User Profile -->
        <div class="user-profile">
          <div class="avatar">
            <img v-if="photoURL" :src="photoURL" alt="Profile Picture" class="avatar-image" />
            <span v-else>{{ currentUserId?.charAt(0)?.toUpperCase() }}</span>
          </div>
          <div class="user-info">
            <div class="user-name">{{ displayName || 'You' }}</div>
            <div class="user-id">{{ currentUserId }}</div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search by UID or name"
            v-model="searchQuery"
            class="search-input"
            aria-label="Search for users"
            @input="handleSearch"
          />
        </div>

        <!-- Search Results -->
        <div class="search-results" v-if="searchQuery">
          <div v-if="searchResults.length > 0">
            <div
              v-for="user in searchResults"
              :key="user.userId"
              class="search-result-item"
              @click="selectChat(user.userId)"
            >
              <div class="chat-avatar">
                <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="avatar-image" />
                <span v-else>{{ user.userId.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="chat-info">
                <div class="chat-name">{{ user.displayName || `User ${user.userId.slice(0, 6)}` }}</div>
                <div class="chat-preview">Start a conversation</div>
              </div>
            </div>
          </div>
          <div v-else class="empty-search">
            <p>No users found.</p>
          </div>
        </div>

        <!-- Chats List -->
        <div class="chats-list">
          <div
            v-for="chat in sortedRecentChats"
            :key="chat.userId"
            :class="['chat-item', { active: chat.userId === receiverId, unread: chat.unread }]"
            @click="selectChat(chat.userId)"
          >
            <div class="chat-avatar">
              <img v-if="chat.photoURL" :src="chat.photoURL" alt="Profile Picture" class="avatar-image" />
              <span v-else>{{ chat.userId.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="chat-info">
              <div class="chat-name">{{ chat.displayName || `User ${chat.userId.slice(0, 6)}` }}</div>
              <div class="chat-preview" v-if="!chat.isPrivate">
                {{ chat.hasConversation ? chat.lastMessage : "Hey! Let's be friends!" }}
              </div>
            </div>
            <div class="chat-meta">
  <div class="chat-time">{{ formatLastMessageTime(chat.lastMessageTime) }}</div>
</div>
          </div>

          <!-- Empty State for Chats List -->
          <div v-if="recentChats.length === 0" class="empty-chats">
            <div class="empty-icon">💬</div>
            <p>No recent chats.</p>
          </div>
        </div>
      </div>

      <!-- Mobile Sidebar Section (Visible only on mobile when no chat is selected) -->
      <div class="mobile-sidebar-section" v-if="isMobileView && !isChatSelected">
        <!-- User Profile -->
        <div class="user-profile">
          <div class="avatar">
            <img v-if="photoURL" :src="photoURL" alt="Profile Picture" class="avatar-image" />
            <span v-else>{{ currentUserId?.charAt(0)?.toUpperCase() }}</span>
          </div>
          <div class="user-info">
            <div class="user-name">{{ displayName || 'You' }}</div>
            <div class="user-id">{{ currentUserId }}</div>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search by UID or name"
            v-model="searchQuery"
            class="search-input"
            aria-label="Search for users"
            @input="handleSearch"
          />
        </div>

        <!-- Search Results -->
        <div class="search-results" v-if="searchQuery">
          <div v-if="searchResults.length > 0">
            <div
              v-for="user in searchResults"
              :key="user.userId"
              class="search-result-item"
              @click="selectChat(user.userId)"
            >
              <div class="chat-avatar">
                <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="avatar-image" />
                <span v-else>{{ user.userId.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="chat-info">
                <div class="chat-name">{{ user.displayName || `User ${user.userId.slice(0, 6)}` }}</div>
                <div class="chat-preview">Start a conversation</div>
              </div>
            </div>
          </div>

          
          <div v-else class="empty-search">
            <p>No users found.</p>
          </div>
        </div>

        <!-- Chats List -->
        <div class="chats-list">
          <div
            v-for="chat in sortedRecentChats"
            :key="chat.userId"
            :class="['chat-item', { active: chat.userId === receiverId, unread: chat.unread }]"
            @click="selectChat(chat.userId)"
          >
            <div class="chat-avatar">
              <img v-if="chat.photoURL" :src="chat.photoURL" alt="Profile Picture" class="avatar-image" />
              <span v-else>{{ chat.userId.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="chat-info">
              <div class="chat-name">{{ chat.displayName || `User ${chat.userId.slice(0, 6)}` }}</div>
              <div class="chat-preview" v-if="!chat.isPrivate">
                {{ chat.hasConversation ? chat.lastMessage : "Hey! Let's be friends!" }}
              </div>
            </div>
            <div class="chat-meta">
          <div class="chat-time">{{ formatLastMessageTime(chat.lastMessageTime) }}</div>
        </div>
          </div>
          
          <!-- Empty State for Chats List -->
          <div v-if="recentChats.length === 0" class="empty-chats">
            <div class="empty-icon">💬</div>
            <p>No recent chats.</p>
          </div>
        </div>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
        <div class="development-banner">
        <p>YChat is currently under development and may not work 100% as expected. Thank you for your patience!</p>
      </div>
      </div>
      

      <!-- Chat Content Section (Visible when a chat is selected on mobile or desktop) -->
      <div class="chat-content-section" v-if="isChatSelected || !isMobileView">

        
        <!-- Chat Header -->
        <div class="chat-header" v-if="receiverId">
          <div class="header-content">
            <!-- Chat Contact -->
            <div class="chat-contact">
              <div class="contact-avatar">
                <img v-if="receiverPhotoURL" :src="receiverPhotoURL" alt="Profile Picture" class="avatar-image" />
                <span v-else>{{ receiverId.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="contact-info">
                <div class="contact-name">{{ receiverDisplayName || `User ${receiverId.slice(0, 6)}` }}</div>
                <div class="contact-status">
                  <span :class="{ 'status-online': isReceiverValid }"></span>
                  {{ isReceiverValid ? 'Online' : 'Offline' }}
                </div>
              </div>
            </div>

            <!-- Back Button on Mobile View -->
            <button v-if="isMobileView" @click="goBackToSidebar" class="back-button">
              <i class="fas fa-home"></i> <!-- Font Awesome home icon -->
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="messages-area" ref="chatWindow" v-if="receiverId">
          <!-- End-to-End Encryption Message -->
          <div class="encryption-message">
            <div class="encryption-notice">
              <span class="encryption-info">Messages are secured with end-to-end encryption.</span>
            </div>
          </div>
          <br>

          <!-- Messages -->
          <div
            v-for="message in filteredMessages"
            :key="message.id"
            class="message"
            :class="{ 'message-sent': message.senderId === currentUserId }"
          >
            <div class="message-bubble">
              {{ message.text }}
              <span class="message-time">{{ formatTimestamp(message.timestamp) }}</span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">💭</div>
          <h3>Start a Conversation</h3>
          <p>Select a chat or search for someone to message</p>
        </div>

        <!-- Message Input -->
        <div class="message-input" v-if="receiverId">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type a message..."
            :disabled="!isReceiverValid"
          />
          <button
            @click="sendMessage"
            class="send-button"
            :disabled="!isReceiverValid || !newMessage.trim()"
          >
            <!-- Desktop: Show "Send" text -->
            <span class="send-text">Send</span>
            <!-- Mobile: Show send icon -->
            <i class="fas fa-paper-plane send-icon"></i>
          </button>
        </div>
        <div class="development-banner">
        <p>YChat is currently under development and may not work 100% as expected. Thank you for your patience!</p>
      </div>

      </div>
      
    </div>
  </div>
</template>
<style scoped>
/* Under Development Banner */
.development-banner {
  background-color: #ffffff; /* Light yellow background */
  color: #000000; /* Dark yellow text */
  padding: 12px;
  text-align: center;
  font-size: 14px; /* Default font size */
  font-weight: 500;

  position: fixed; /* Fixed positioning */
  bottom: 0; /* Stick to the bottom */
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it stays on top */
}

.development-banner p {
  margin: 0;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .development-banner {
    font-size: 12px; /* Smaller font size for mobile */
    padding: 8px; /* Reduce padding for mobile */
  }

  /* Adjust the messenger-app container to account for the banner */
  .messenger-app {
    padding-bottom: 60px; /* Add padding to avoid overlap with the banner */
  }
}
</style>

<script>
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, getDoc, where, getDocs } from "firebase/firestore";
import { debounce } from 'lodash';

export default {
  name: 'YChat',
  data() {
    return {
      newMessage: '',
      receiverId: '',
      messages: [],
      currentUserId: null,
      isReceiverValid: false,
      searchQuery: '',
      recentChats: [],
      isMobileView: false,
      displayName: '',
      photoURL: '',
      receiverDisplayName: '',
      receiverPhotoURL: '',
      isChatSelected: false,
      searchResults: [], // New property to store search results
    };
  },
  computed: {
    // Filter messages for the selected chat
    filteredMessages() {
      return this.messages.filter(
        (message) =>
          (message.senderId === this.currentUserId && message.receiverId === this.receiverId) ||
          (message.senderId === this.receiverId && message.receiverId === this.currentUserId)
      );
    },
    // Sort chats by last message time (most recent first)
    sortedRecentChats() {
      return this.recentChats.slice().sort((a, b) => {
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      });
    },
  },
  methods: {
    // Send a new message
    async sendMessage() {
      if (this.newMessage.trim() === '' || !this.receiverId || !this.isReceiverValid) return;

      try {
        const messagesRef = collection(db, "yChatMessages");
        const messageData = {
          text: this.newMessage,
          senderId: this.currentUserId,
          receiverId: this.receiverId,
          timestamp: serverTimestamp(),
        };

        await addDoc(messagesRef, messageData);
        this.updateRecentChats(this.receiverId, this.newMessage);
        this.newMessage = '';
      } catch (error) {
        console.error("Error sending message:", error);
        this.$toast.error("Failed to send message. Please try again.");
      }
    },
    // Format timestamp for display
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const date = timestamp.toDate();
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    // Format last message time dynamically
    formatLastMessageTime(timestamp) {
      if (!timestamp) return '';

      // Convert Firestore Timestamp to Date if necessary
      const date = timestamp instanceof Date ? timestamp : timestamp.toDate();

      // Format the time (e.g., "10:30 AM")
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    // Scroll to the bottom of the chat window
    scrollToBottom() {
      setTimeout(() => {
        const chatWindow = this.$refs.chatWindow;
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 50);
    },
    // Check if the receiver exists in the database
    async checkReceiverExists() {
      if (this.receiverId) {
        try {
          const userDoc = await getDoc(doc(db, "users", this.receiverId));
          this.isReceiverValid = userDoc.exists();
          if (userDoc.exists()) {
            this.receiverDisplayName = userDoc.data().displayName;
            this.receiverPhotoURL = userDoc.data().photoURL;
          } else {
            this.receiverDisplayName = `User ${this.receiverId.slice(0, 6)}`;
            this.receiverPhotoURL = '';
          }
        } catch (error) {
          console.error("Error checking receiver:", error);
          this.isReceiverValid = false;
          this.receiverDisplayName = `User ${this.receiverId.slice(0, 6)}`;
          this.receiverPhotoURL = '';
        }
      } else {
        this.isReceiverValid = false;
        this.receiverDisplayName = '';
        this.receiverPhotoURL = '';
      }
    },
    // Select a chat and mark it as read
    async selectChat(userId) {
      this.receiverId = userId;
      this.isChatSelected = true; // Show chat content on mobile
      this.searchQuery = ''; // Clear search query after selecting a chat
      this.searchResults = []; // Clear search results
      await this.checkReceiverExists();

      // Mark the chat as read
      const chat = this.recentChats.find(chat => chat.userId === userId);
      if (chat) {
        chat.unread = false;
      }
    },
    // Go back to the sidebar on mobile
    goBackToSidebar() {
      this.isChatSelected = false; // Show sidebar on mobile
      this.receiverId = ''; // Clear the selected chat
    },
    // Update recent chats when a new message is sent or received
    async updateRecentChats(userId, message) {
      const existingChat = this.recentChats.find(chat => chat.userId === userId);
      const now = new Date();

      const { displayName, photoURL } = await this.getUserProfile(userId);

      // Check if both accounts have sent at least one message
      const hasMutualMessages = this.messages.some(
        msg =>
          (msg.senderId === this.currentUserId && msg.receiverId === userId) ||
          (msg.senderId === userId && msg.receiverId === this.currentUserId)
      );

      if (existingChat) {
        // Update the last message and time
        existingChat.lastMessage = message;
        existingChat.lastMessageTime = now; // Update the timestamp to the current time
        // Mark as unread if the message is received (not sent by the current user)
        if (this.messages.some(msg => msg.senderId === userId && msg.receiverId === this.currentUserId)) {
          existingChat.unread = true;
        }
      } else {
        // Add a new chat to the list
        this.recentChats.unshift({
          userId,
          lastMessage: message,
          lastMessageTime: now, // Set the timestamp to the current time
          displayName: displayName || `User ${userId.slice(0, 6)}`,
          photoURL: photoURL || '',
          hasConversation: hasMutualMessages,
          unread: true, // Mark as unread for new messages
        });
      }
    },
    // Fetch user profile (displayName and photoURL)
    async getUserProfile(userId) {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          return {
            displayName: userDoc.data().displayName,
            photoURL: userDoc.data().photoURL,
          };
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
      return { displayName: null, photoURL: null };
    },
    // Handle search for users by UID or displayName
    handleSearch: debounce(async function () {
      if (this.searchQuery.trim() === '') {
        this.searchResults = [];
        return;
      }

      try {
        const usersRef = collection(db, "users");

        // Query for UID
        const uidQuery = query(
          usersRef,
          where("userId", ">=", this.searchQuery),
          where("userId", "<=", this.searchQuery + "\uf8ff")
        );

        // Query for displayName
        const nameQuery = query(
          usersRef,
          where("displayName", ">=", this.searchQuery),
          where("displayName", "<=", this.searchQuery + "\uf8ff")
        );

        // Execute both queries
        const [uidSnapshot, nameSnapshot] = await Promise.all([
          getDocs(uidQuery),
          getDocs(nameQuery),
        ]);

        // Combine results and remove duplicates
        const combinedResults = [...uidSnapshot.docs, ...nameSnapshot.docs];
        const uniqueResults = Array.from(new Set(combinedResults.map(doc => doc.id)))
          .map(id => {
            const doc = combinedResults.find(doc => doc.id === id);
            return {
              userId: doc.id,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
            };
          });

        this.searchResults = uniqueResults;
      } catch (error) {
        console.error("Error searching users:", error);
        this.$toast.error("Failed to search users. Please try again.");
      }
    }, 300), // Debounce for 300ms
    // Check if the view is mobile
    checkMobileView() {
      this.isMobileView = window.innerWidth <= 768;
    },
    // Handle window resize (debounced)
    handleResize: debounce(function () {
      this.checkMobileView();
    }, 200),
  },
  watch: {
    // Scroll to the bottom when filtered messages change
    filteredMessages() {
      this.scrollToBottom();
    },
    // Check if the receiver exists when receiverId changes
    receiverId() {
      this.checkReceiverExists();
    },
    // Re-sort the chat list when messages change
    messages() {
      this.recentChats.forEach(chat => {
        // Find the last message in the chat
        const lastMessage = this.messages
          .filter(
            msg =>
              (msg.senderId === this.currentUserId && msg.receiverId === chat.userId) ||
              (msg.senderId === chat.userId && msg.receiverId === this.currentUserId)
          )
          .sort((a, b) => b.timestamp - a.timestamp)[0]; // Sort by timestamp and get the latest message

        // Update the lastMessageTime for the chat
        if (lastMessage) {
          chat.lastMessageTime = lastMessage.timestamp;
        }
      });
    },
  },
  mounted() {
    // Check if the view is mobile
    this.checkMobileView();

    // Listen for authentication state changes
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserId = user.uid;
        this.displayName = user.displayName || 'You';
        this.photoURL = user.photoURL || '';

        // Fetch messages from Firestore
        const messagesRef = collection(db, "yChatMessages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        onSnapshot(q, (snapshot) => {
          this.messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Update recent chats with unique users
          const uniqueUsers = new Set();
          [...this.messages].reverse().forEach(message => {
            const otherUser = message.senderId === this.currentUserId ? message.receiverId : message.senderId;
            if (!uniqueUsers.has(otherUser)) {
              uniqueUsers.add(otherUser);
              this.updateRecentChats(otherUser, message.text);
            }
          });
        });
      }
    });

    // Listen for window resize events
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // Remove the window resize event listener
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>



<style scoped>
/* Messenger App Container */
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

/* Messenger App Styles */
.messenger-app {
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
}

/* Sidebar Section */
.sidebar-section {
  width: 300px;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
}

/* Mobile Sidebar Section */
.mobile-sidebar-section {
  display: none;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  overflow-y: auto;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b983, #2f855a);
  color: white;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  text-align: left;
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-id {
  font-size: 0.85rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Search Bar */
.search-bar {
  padding: 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8f9fa;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
  background: white;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

/* Search Results */
.search-results {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: #f0f2f5;
}

.search-result-item .chat-avatar {
  margin-right: 10px;
}

.search-result-item .chat-info {
  flex: 1;
}

.search-result-item .chat-name {
  font-weight: 500;
  color: #2c3e50;
}

.search-result-item .chat-preview {
  font-size: 12px;
  color: #666;
}

/* Chats List */
.chats-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.chat-item {
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;
  border-left: 3px solid transparent;
}

.chat-item:hover {
  background: #f8f9fa;
}

.chat-item.active {
  background: #e8f5fe;
  border-left-color: #42b983;
}

.chat-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #42b983, #2f855a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
  flex-shrink: 0;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
}

.chat-preview {
  font-size: 0.9rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  text-align: right;
  margin-left: 8px;
}

.chat-time {
  font-size: 0.75rem;
  color: #718096;
  white-space: nowrap;
}

/* Chat Content Section */
.chat-content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

/* Chat Header */
.chat-header {
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.chat-contact {
  display: flex;
  align-items: center;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #42b983, #2f855a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2px;
}

.contact-status {
  font-size: 0.85rem;
  color: #718096;
  display: flex;
  align-items: center;
}

.status-online {
  width: 8px;
  height: 8px;
  background: #42b983;
  border-radius: 50%;
  margin-right: 6px;
}

/* Messages Area */
.messages-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* End-to-End Encryption Message */
.encryption-message {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.encryption-notice {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f1f1f1;
  border-radius: 20px;
}

.encryption-info {
  color: #616161;
}

/* Messages */
.message {
  margin-bottom: 12px;
  display: flex;
}

.message-sent {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
}

.message-sent .message-bubble {
  background: #dcf8c6;
}

.message-time {
  font-size: 0.75rem;
  color: #718096;
  margin-left: 8px;
}

/* Empty State */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #718096;
  background: #f8f9fa;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* Message Input */
.message-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-right: 10px;
  font-size: 14px;
}

.message-input button {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Send Text and Icon */
.send-text {
  display: inline;
}

.send-icon {
  display: none;
}













</style>

<style>
/* Messages */
.message {
  margin-bottom: 12px;
  display: flex;
}

.message-sent {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;
}

.message-sent .message-bubble {
  background: #dcf8c6;
}

.message-time {
  font-size: 0.75rem;
  color: #718096;
  margin-left: 8px;
}

/* Empty State */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #718096;
  background: #f8f9fa;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* Message Input */
.message-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-right: 10px;
  font-size: 14px;
}

.message-input button {
  padding: 10px 20px;
  background-color: #fafafa;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Send Text and Icon */
.send-text {
  display: inline;
}

.send-icon {
  display: none;
}
</style>


<style>
 /* Mobile Styles */
 @media (max-width: 768px) {
   .sidebar-section {
     position: absolute;
     left: -350px;
     top: 0;
     bottom: 0;
     z-index: 1000;
     transition: left 0.3s ease;
   }
 
   .sidebar-section.sidebar-mobile {
     left: 0;
   }
 
   .chat-content-section {
     width: 100%;
   }
 }

</style>


<style scoped>
/* Messenger App Container */
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

/* Messenger App Styles */
.messenger-app {
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
}

/* Sidebar Section */
.sidebar-section {
  width: 300px;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
}

/* Mobile Sidebar Section */
.mobile-sidebar-section {
  display: none;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  overflow-y: auto;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b983, #2f855a);
  color: white;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
  text-align: left;
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-id {
  font-size: 0.85rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Search Bar */
.search-bar {
  padding: 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8f9fa;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
  background: white;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

/* Search Results */
.search-results {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: #f0f2f5;
}

.search-result-item .chat-avatar {
  margin-right: 10px;
}

.search-result-item .chat-info {
  flex: 1;
}

.search-result-item .chat-name {
  font-weight: 500;
  color: #2c3e50;
}

.search-result-item .chat-preview {
  font-size: 12px;
  color: #666;
}

/* Chats List */
.chats-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.chat-item {
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;
  border-left: 3px solid transparent;
}

.chat-item:hover {
  background: #f8f9fa;
}

.chat-item.active {
  background: #e8f5fe;
  border-left-color: #42b983;
}

.chat-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #42b983, #2f855a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
  flex-shrink: 0;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
}

.chat-preview {
  font-size: 0.9rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-meta {
  text-align: right;
  margin-left: 8px;
}

.chat-time {
  font-size: 0.75rem;
  color: #718096;
  white-space: nowrap;
}



/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-sidebar-section {
    display: block;
  }

  .sidebar-section {
    display: none;
  }

  .message-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #e9ecef;
  position: sticky;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}

.message-input input {
    flex: 1;
    padding: 8px 12px; /* Reduced padding */
    border: 1px solid #e0e0e0;
    border-radius: 16px; /* Smaller border radius */
    font-size: 14px; /* Smaller font size */
    background-color: #ffffff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

  .message-input input:focus {
    outline: none;
    border-color: #000000;
    box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
  }

  .message-input button {
    padding: 12px;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, #2950ff, #284fff);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .message-input button:hover {
    background: linear-gradient(135deg, #2950ff, #284fff);
    transform: translateY(-1px);
  }

  .message-input button:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .send-text {
    display: none;
  }

  /* Messenger-like send icon */
  .send-icon {
    display: inline-block;
    font-size: 20px;
    color: white;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    transform: rotate(18deg); /* Tilt the icon slightly to the right */
  }
}




</style>











<style scoped>
.search-results {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-result-item:hover {
  background-color: #f0f2f5;
}

.search-result-item .chat-avatar {
  margin-right: 10px;
}

.search-result-item .chat-info {
  flex: 1;
}

.search-result-item .chat-name {
  font-weight: 500;
  color: #2c3e50;
}

.search-result-item .chat-preview {
  font-size: 12px;
  color: #666;
}
</style>


 <style scoped>




.user-info {
  flex: 1;
  text-align: left; /* Align text to the left */
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 2px; /* Add spacing between name and ID */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for overflow */
}

.user-id {
  font-size: 0.85rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for overflow */
}
 /* Sidebar Section */
 .sidebar-section {
   width: 350px;
   height: 100%;
   background: white;
   border-right: 1px solid #e0e0e0;
   display: flex;
   flex-direction: column;
   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
   flex-shrink: 0;
 }
 
 .user-profile {
   padding: 20px;
   display: flex;
   align-items: center;
   background: #f8f9fa;
   border-bottom: 1px solid #e0e0e0;
 }
 

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.chat-item:hover {
  background: #f8f9fa;
}

.chat-item.active {
  background: #e8f5fe;
  border-left-color: #42b983;
}

.chat-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b983, #2f855a);
  color: white;
  font-weight: bold;
  margin-right: 12px;
  flex-shrink: 0;
  overflow: hidden; /* Ensure the image fits inside the circle */
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the avatar area */
}

.chat-info {
  flex: 1;
  min-width: 0; /* Prevent overflow */
  text-align: left; /* Align text to the left */
}

.chat-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for overflow */
}

.chat-preview {
  font-size: 0.9rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for overflow */
}

.chat-meta {
  margin-left: 8px;
  text-align: right; /* Align meta info (time) to the right */
  flex-shrink: 0; /* Prevent shrinking */
}

.chat-time {
  font-size: 0.75rem;
  color: #718096;
  white-space: nowrap;
}



 .avatar {
   width: 45px;
   height: 45px;
   background: linear-gradient(135deg, #42b983, #2f855a);
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   color: white;
   font-weight: bold;
   margin-right: 12px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }
 
 .user-info {
   flex: 1;
 }



.avatar, .chat-avatar, .contact-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #42b983, #2f855a);
  color: white;
  font-weight: bold;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensure the image fits inside the circle */
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the avatar area */
}

 .user-name {
   font-weight: 600;
   font-size: 1.1rem;
   color: #2d3748;
 }
 
 .user-id {
   font-size: 0.85rem;
   color: #718096;
   margin-top: 2px;
 }
 
 .search-bar {
   padding: 16px;
   background: white;
   border-bottom: 1px solid #e0e0e0;
 }
 
 .chats-list {
   flex: 1;
   overflow-y: auto;
   padding: 8px 0;
 }
 
 .chat-item {
   display: flex;
   padding: 12px 16px;
   cursor: pointer;
   transition: all 0.2s ease;
   align-items: center;
   border-left: 3px solid transparent;
 }
 .chat-item:hover {
   background: #f8f9fa;
 }
 
 .chat-item.active {
   background: #e8f5fe;
   border-left-color: #42b983;
 }
 
 .chat-avatar {
   width: 48px;
   height: 48px;
   background: linear-gradient(135deg, #42b983, #2f855a);
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   color: white;
   font-weight: bold;
   margin-right: 12px;
   flex-shrink: 0;
 }
 
 
 .contact-status {
   font-size: 0.85rem;
   color: #718096;
   display: flex;
   align-items: center;
 }
 
 .status-online {
   width: 8px;
   height: 8px;
   background: #42b983;
   border-radius: 50%;
   margin-right: 6px;
 }
 

 </style>
<style>
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; 
}

.back-button {
  background: none;
  border: none;
  font-size: 24px; /* Larger size for the icon */
  cursor: pointer;
  margin-left: 10px; /* Move to the right */
  color: #2c3e50; /* Darker color for better visibility */
  font-weight: 500; /* Slightly bold */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* Fixed width for better alignment */
  height: 40px; /* Fixed height for better alignment */
  border-radius: 50%; /* Circular button */
  transition: background-color 0.3s ease; /* Smooth hover effect */
}

.back-button:hover {
  background-color: #f0f2f5; /* Light background on hover */
  color: #1a73e8; /* Change color on hover for better interaction feedback */
}

</style>
