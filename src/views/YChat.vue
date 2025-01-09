<template>
    <div class="app-container">
      <div class="messenger-app">
        <!-- Desktop Sidebar Section (Visible on desktop and when no chat is selected on mobile) -->
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
              placeholder="Start new chat"
              v-model="searchQuery"
              class="search-input"
              aria-label="Search for chats"
            />
          </div>
  
          <!-- Chats List -->
          <div class="chats-list">
            <div
              v-for="chat in recentChats"
              :key="chat.userId"
              class="chat-item"
              :class="{ active: chat.userId === receiverId }"
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
                <div class="chat-time">{{ chat.lastMessageTime }}</div>
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
              placeholder="Start new chat"
              v-model="searchQuery"
              class="search-input"
              aria-label="Search for chats"
            />
          </div>
  
          <!-- Chats List -->
          <div class="chats-list">
            <div
              v-for="chat in recentChats"
              :key="chat.userId"
              class="chat-item"
              :class="{ active: chat.userId === receiverId }"
              @click="selectChat(chat.userId)"
            >
              <div class="chat-avatar">
                <img v-if="chat.photoURL" :src="chat.photoURL" alt="Profile Picture" class="avatar-image" />
                <span v-else>{{ chat.userId.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="chat-info">
                <div class="chat-name">{{ chat.displayName || `User ${chat.userId.slice(0, 6)}` }}</div>
                <div class="chat-preview" v-if="!chat.isPrivate">
                  {{ chat.hasConversation ? chat.lastMessage : "Hey, what's up? Wanna chat?" }}
                </div>
              </div>
              <div class="chat-meta">
                <div class="chat-time">{{ chat.lastMessageTime }}</div>
              </div>
            </div>
  
            <!-- Empty State for Chats List -->
            <div v-if="recentChats.length === 0" class="empty-chats">
              <div class="empty-icon">💬</div>
              <p>No recent chats.</p>
            </div>
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
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>


<style scoped>
/* Chat Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
}


encryption-message {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.encryption-notice {
  display: inline-block;
  padding: 8px 16px;
 
  border-radius: 20px;
  font-size: 12px;
  color: #666;
}


.encryption-info {
  color: #616161;
}
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


<style scoped>

.mobile-sidebar-section {
  display: none; /* Hidden by default */
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  overflow-y: auto;
}

/* Show Mobile Sidebar Section on mobile */
@media (max-width: 768px) {
  .mobile-sidebar-section {
    display: block; /* Show on mobile */
  }

  .sidebar-section {
    display: none; /* Hide desktop sidebar on mobile */
  }
}


/* Container to center the app and give it a box-like appearance */
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5; /* Background color for the entire page */
  padding: 20px; /* Add some padding around the app */
}

/* Messenger app styles */
.messenger-app {
  width: 100%;
  max-width: 1200px; /* Set a max-width for the app */
  height: 90vh; /* Set a fixed height for the app */
  background-color: white; /* Background color for the app */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  overflow: hidden; /* Ensure content doesn't overflow */
  display: flex;
}

/* Sidebar Section */
.sidebar-section {
  width: 300px;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
}

/* Chat Content Section */
.chat-content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Chat Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
}

/* Messages Area */
.messages-area {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

/* Message Input */
.message-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #e9ecef;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-right: 10px;
}

.message-input button {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.message-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Back Button for Mobile */
.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
}

/* Responsive Design for Mobile */
@media (max-width: 768px) {
  .app-container {
    padding: 0; /* Remove padding for full-width layout */
  }

  .messenger-app {
    height: 100vh; /* Full height */
    border-radius: 0; /* Remove border radius */
    flex-direction: column; /* Stack sidebar and chat content vertically */
  }

  .sidebar-section {
    width: 100%; /* Full width */
    border-right: none; /* Remove border */
    border-bottom: 1px solid #e9ecef; /* Add bottom border */
    flex: 0 0 40%; /* Fixed height for sidebar */
    overflow-y: auto; /* Allow scrolling */
  }

  .chat-content-section {
    flex: 1; /* Allow chat content to take up remaining space */
  }

  .mobile-hidden {
    display: none; /* Hide sidebar or chat content based on visibility */
  }

  .empty-state {
    display: none; /* Hide empty state on mobile */
  }

  .message-input {
    position: fixed; /* Fix message input at the bottom */
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #e9ecef;
  }
}
</style>
<script>
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, getDoc } from "firebase/firestore";
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
      isChatSelected: false, // Track if a chat is selected
    };
  },
  computed: {
    filteredMessages() {
      return this.messages.filter(
        (message) =>
          (message.senderId === this.currentUserId && message.receiverId === this.receiverId) ||
          (message.senderId === this.receiverId && message.receiverId === this.currentUserId)
      );
    },
  },
  methods: {
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
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const date = timestamp.toDate();
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    scrollToBottom() {
      setTimeout(() => {
        const chatWindow = this.$refs.chatWindow;
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 50);
    },
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
    async selectChat(userId) {
      this.receiverId = userId;
      this.isChatSelected = true; // Show chat content on mobile
      await this.checkReceiverExists();
    },
    goBackToSidebar() {
      this.isChatSelected = false; // Show sidebar on mobile
      this.receiverId = ''; // Clear the selected chat
    },
    async updateRecentChats(userId, message) {
      const existingChat = this.recentChats.find(chat => chat.userId === userId);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const { displayName, photoURL } = await this.getUserProfile(userId);

      // Check if both accounts have sent at least one message
      const hasMutualMessages = this.messages.some(
        msg =>
          (msg.senderId === this.currentUserId && msg.receiverId === userId) ||
          (msg.senderId === userId && msg.receiverId === this.currentUserId)
      );

      if (existingChat) {
        // Only update the last message if there are mutual messages
        if (hasMutualMessages) {
          existingChat.lastMessage = message;
          existingChat.lastMessageTime = now;
        }
        existingChat.displayName = displayName || `User ${userId.slice(0, 6)}`;
        existingChat.photoURL = photoURL || '';
        existingChat.hasConversation = hasMutualMessages; // Mark as having a conversation
      } else {
        this.recentChats.unshift({
          userId,
          lastMessage: hasMutualMessages ? message : '', // Only set last message if mutual messages exist
          lastMessageTime: hasMutualMessages ? now : '', // Only set time if mutual messages exist
          displayName: displayName || `User ${userId.slice(0, 6)}`,
          photoURL: photoURL || '',
          hasConversation: hasMutualMessages, // Mark as having a conversation if mutual messages exist
        });
      }
    },
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
    checkMobileView() {
      this.isMobileView = window.innerWidth <= 768;
    },
    handleResize: debounce(function () {
      this.checkMobileView();
    }, 200),
  },
  watch: {
    filteredMessages() {
      this.scrollToBottom();
    },
    receiverId() {
      this.checkReceiverExists();
    },
  },
  mounted() {
    this.checkMobileView();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserId = user.uid;
        this.displayName = user.displayName || 'You';
        this.photoURL = user.photoURL || '';

        const messagesRef = collection(db, "yChatMessages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        onSnapshot(q, (snapshot) => {
          this.messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

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

    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>



<style scoped>
/* Back Button */
.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
}

/* Mobile Layout */
@media (max-width: 768px) {
  .sidebar-section {
    display: block; /* Show sidebar by default */
  }

  .chat-content-section {
    display: none; /* Hide chat content by default */
  }

  .chat-content-section.active {
    display: block; /* Show chat content when a chat is selected */
  }
}
</style>


 <style scoped>
.sidebar-toggle {
  display: none; /* Hide by default */
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-right: 10px;
}

/* Show the toggle button only on mobile */
@media (max-width: 768px) {
  .sidebar-toggle {
    display: block;
  }
}

.notification-badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-left: 8px;
}


.messenger-app {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
}

.main-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  display: none; /* Hidden by default */
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
  background: #42b983;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  transition: transform 0.3s ease;
}

/* Chat Content Section */
.chat-content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  height: 100%;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .sidebar-toggle {
    display: block; /* Show toggle button on mobile */
  }

  .sidebar-section {
    position: fixed;
    left: -350px;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transition: left 0.3s ease;
  }

  .sidebar-section.sidebar-mobile {
    left: 0; /* Show sidebar when toggled */
  }

  .chat-content-section {
    width: 100%;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}


.messenger-app {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
}

.main-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  display: none; /* Hidden by default */
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
  background: #42b983;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  transition: transform 0.3s ease;
}

/* Chat Content Section */
.chat-content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  height: 100%;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .sidebar-toggle {
    display: block; /* Show toggle button on mobile */
  }

  .sidebar-section {
    position: fixed;
    left: -350px;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transition: left 0.3s ease;
  }

  .sidebar-section.sidebar-mobile {
    left: 0; /* Show sidebar when toggled */
  }

  .chat-content-section {
    width: 100%;
  }
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
  overflow: hidden; /* Ensure the image fits inside the circle */
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the avatar area */
}

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
 
 .messages-area {
   flex: 1;
   padding: 20px;
   overflow-y: auto;
 }
 
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
 
 .message-input {
   padding: 16px 20px;
   background: white;
   border-top: 1px solid #e0e0e0;
   display: flex;
   gap: 12px;
 }
 
 .message-input input {
   flex: 1;
   padding: 12px 16px;
   border: 1px solid #e2e8f0;
   border-radius: 24px;
   background: #f8f9fa;
   font-size: 0.95rem;
   transition: all 0.3s ease;
 }
 
 .message-input input:focus {
   outline: none;
   border-color: #42b983;
   background: white;
   box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
 }
 
 .send-button {
   padding: 8px 24px;
   background: linear-gradient(135deg, #42b983, #2f855a);
   color: white;
   border: none;
   border-radius: 24px;
   cursor: pointer;
   transition: all 0.3s ease;
   font-weight: 500;
 }
 
 .send-button:hover {
   background: linear-gradient(135deg, #3aa876, #2a7a4f);
   transform: translateY(-1px);
 }
 
 .send-button:disabled {
   background: #cbd5e0;
   cursor: not-allowed;
   transform: none;
 }
 
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