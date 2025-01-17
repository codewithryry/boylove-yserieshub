<template>
    <div class="chat-room">
      <h1>Global Chat Room</h1>
      <div class="chat-window">
        <div v-for="message in messages" :key="message.id" class="message">
          <strong>{{ message.sender === currentUser ? 'You' : message.sender }}:</strong>
          {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Write a message... (Press Enter to send)"
        />
        <button @click="sendMessage">Send</button>
      </div>
      <div v-if="isAdmin" class="admin-actions">
        <button @click="clearChat">Clear Chat History</button>
      </div>
      <p class="note">Note: Administrators have the ability to clear the chat history at any time.</p>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase';
  import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    deleteDoc,
    doc,
    getDocs,
    getDoc, // Add this import
  } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        newMessage: '',
        messages: [],
        currentUser: this.$store.state.user?.email, // Assuming you're using Vuex for user state
        isAdmin: false, // Set this based on the user's role
      };
    },
    mounted() {
      this.initializeChat();
      this.loadMessages();
      this.checkAdmin();
    },
    methods: {
      async initializeChat() {
        const chatRef = collection(db, 'globalChat');
        const chatSnapshot = await getDocs(chatRef);
        if (chatSnapshot.empty) {
          // Add a default message if the collection is empty
          await addDoc(chatRef, {
            text: 'Welcome to the Global Chat Room!',
            sender: 'System',
            timestamp: new Date(),
          });
        }
      },
      async sendMessage() {
        if (this.newMessage.trim() === '') return;
  
        try {
          await addDoc(collection(db, 'globalChat'), {
            text: this.newMessage,
            sender: this.currentUser,
            timestamp: new Date(),
          });
          this.newMessage = '';
        } catch (error) {
          console.error('Error sending message:', error);
        }
      },
      loadMessages() {
        const q = query(collection(db, 'globalChat'), orderBy('timestamp', 'asc'));
        onSnapshot(q, (snapshot) => {
          this.messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
      },
      async checkAdmin() {
        try {
          const userDoc = await getDoc(doc(db, 'users', this.currentUser));
          if (userDoc.exists()) {
            this.isAdmin = userDoc.data().role === 'admin';
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      },
      async clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
          const messages = await getDocs(collection(db, 'globalChat'));
          messages.forEach(async (msg) => {
            await deleteDoc(doc(db, 'globalChat', msg.id));
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-room {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .chat-window {
    border: 1px solid #ccc;
    padding: 10px;
    height: 400px;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .chat-input {
    display: flex;
    gap: 10px;
  }
  
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369c6e;
  }
  
  .note {
    font-size: 0.9em;
    color: #666;
    margin-top: 10px;
  }
  </style>