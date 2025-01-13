<template>
    <div class="ymindai-page">
      <h1>YMindAI</h1>
      <p>Your AI-powered assistant for personalized support.</p>
  
      <!-- Show chat interface only for VIP users -->
      <div v-if="userIsVIP" class="chat-container">
        <div class="chat-window" ref="chatWindow">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.role]">
            <div class="message-content">
              {{ message.content }}
            </div>
          </div>
  
          <!-- Typing Indicator -->
          <div v-if="isTyping" class="message assistant">
            <div class="message-content typing-indicator">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
  
        <!-- Input Area -->
        <div class="input-area">
          <p class="questions-left">
            You have <strong>{{ 20 - questionCount }}</strong> questions remaining out of your total allotted 20 questions.
          </p>
  
          <div class="input-wrapper">
            <input
              v-model="userInput"
              @keyup.enter="sendMessage"
              placeholder="Type your message..."
              :disabled="isLoading"
            />
            <button @click="sendMessage" :disabled="isLoading || !userInput.trim()">
              {{ isLoading ? 'Sending...' : 'Send' }}
            </button>
          </div>
  
          <!-- Disclaimer -->
          <p class="disclaimer">
            AI-generated, for reference only.
          </p>
        </div>
      </div>
  
      <!-- Show upgrade message for non-VIP users -->
      <div v-else class="upgrade-message">
        <p>This feature is exclusive to VIP members.</p>
        <button @click="upgradeToVIP" class="btn-upgrade">Upgrade to VIP</button>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';
import { db, auth } from '../firebase'; // Import Firebase
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'YMindAI',
  data() {
    return {
      userInput: '', // User's input message
      messages: [
        { role: 'user', content: 'Can you tell me more about YMindAI?' },
        { role: 'assistant', content: 'YMindAI is an innovative AI-driven platform that offers tailored support through interactive chat. It is designed to provide personalized answers, insights, and guidance to users across various topics, making it easy to get the help you need in real time.' },
        { role: 'user', content: 'Okay, let\'s start!' }
      ], // Array to store chat messages
      isLoading: false, // Loading state
      isTyping: false, // Typing indicator state
      questionCount: 0, // Track the number of questions asked
      userIsVIP: false, // VIP subscription status
    };
  },
  methods: {
    async checkUserSubscription() {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.userIsVIP = userData.subscription === 'vip plan'; // Check for VIP subscription
        }
      }
    },
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading || !this.userIsVIP) return;

      // Remove the initial welcome messages if this is the first user message
      if (this.questionCount === 0) {
        this.messages = [];
      }

      // Check question count
      if (this.questionCount >= 20) {
        this.messages.push({
          role: 'assistant',
          content: 'You have reached the maximum of 20 questions.',
        });
        this.isLoading = false;
        this.isTyping = false;
        this.scrollToBottom();
        return;
      }

      // Add user's message to the chat
      this.messages.push({ role: 'user', content: this.userInput });
      this.userInput = ''; // Clear input field

      // Scroll to the bottom of the chat window
      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // Send the message to the AI API
      this.isLoading = true;
      this.isTyping = true;

      try {
        // Try Hugging Face API first
        const response = await this.getHuggingFaceResponse(this.messages);
        this.messages.push({ role: 'assistant', content: response });
      } catch (huggingFaceError) {
        console.error('Hugging Face API error:', huggingFaceError);
        this.messages.push({
          role: 'assistant',
          content: 'Model use is currently unavailable. Please try again later.',
        });
      } finally {
        this.isLoading = false;
        this.isTyping = false;
        this.questionCount += 1; // Increment question count after response is received
      }

      // Scroll to the bottom after AI responds
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    async getHuggingFaceResponse(messages, retries = 3) {
      const apiUrl = 'https://api-inference.huggingface.co/models/google/flan-t5-large';
      const apiToken = process.env.VUE_APP_HUGGING_FACE_TOKEN;

      // Prepare the input for the model
      const conversationHistory = messages
        .map((msg) => (msg.role === 'user' ? `User: ${msg.content}` : `Assistant: ${msg.content}`))
        .join('\n');

        const prompt = `
You are a helpful and knowledgeable AI assistant. Provide general-purpose responses to the user's questions. provide overly detailed or creative answers.

Below is the conversation history for context:
${conversationHistory}

Please respond in a way that is helpful.
Be concise and avoid any technical jargon.
`;
      try {
        const response = await axios.post(
          apiUrl,
          { inputs: prompt },
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );

        console.log('Hugging Face response data:', response.data);

        // Check if the response contains the generated text
        let generatedText = '';
        if (response.data && response.data.generated_text) {
          generatedText = response.data.generated_text.trim().replace(/^Assistant:\s*/, '');
        } else if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const firstResponse = response.data[0];
          if (firstResponse.generated_text) {
            generatedText = firstResponse.generated_text.trim().replace(/^Assistant:\s*/, '');
          } else if (firstResponse.text) {
            generatedText = firstResponse.text.trim().replace(/^Assistant:\s*/, '');
          }
        }

        // Handle truncated responses
        if (this.isResponseTruncated(generatedText)) {
          if (retries > 0) {
            console.log('Response is truncated. Retrying...');
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before retrying
            return this.getHuggingFaceResponse(messages, retries - 1);
          } else {
            throw new Error('Response is truncated and retries exhausted.');
          }
        }

        return generatedText;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error === 'Model google/flan-t5-large is currently loading') {
          const estimatedTime = error.response.data.estimated_time;
          this.typingMessage = `The AI model is loading. Please wait... (Estimated time: ${Math.ceil(estimatedTime)} seconds)`;
          await new Promise((resolve) => setTimeout(resolve, estimatedTime * 1000));
          return this.getHuggingFaceResponse(messages, retries);
        } else if (retries > 0) {
          console.log(`Retrying... (${retries} attempts left)`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return this.getHuggingFaceResponse(messages, retries - 1);
        } else {
          console.error('Hugging Face API error:', error.response ? error.response.data : error.message);
          throw error;
        }
      }
    },

    // Helper function to check if a response is truncated
    isResponseTruncated(text) {
      // Check for common signs of truncation, such as incomplete sentences or trailing ellipses
      const truncationIndicators = ['.', '!', '?']; // Sentences should end with these
      const lastChar = text.trim().slice(-1);
      return !truncationIndicators.includes(lastChar);
    },

    scrollToBottom() {
      const chatWindow = this.$refs.chatWindow;
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    },
    upgradeToVIP() {
      // Redirect to the subscription page
      this.$router.push({ path: '/get-started', query: { subscription: 'vip' } });
    },
  },
  mounted() {
    // Check user's VIP status on mount
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.checkUserSubscription();
      } else {
        this.userIsVIP = false;
      }
    });
  },
};
</script>


  <style scoped>
  /* Modern Font */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  .ymindai-page {
    padding: 40px 20px;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    min-height: 100vh;
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.25rem;
    color: #555;
    margin-bottom: 20px;
  }
  
  /* Chat Interface Styles */
  .chat-container {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .disclaimer {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 10px;
  opacity: 0.8;
}

  .chat-window {
    height: 400px;
    padding: 16px;
    overflow-y: auto;
    background-color: rgba(249, 249, 249, 0.8); /* Glassmorphism effect */
    border-bottom: 1px solid rgba(224, 224, 224, 0.5);
  }
  
  .message {
    margin-bottom: 12px;
    display: flex;
  }
  
  .message.user {
    justify-content: flex-end;
    text-align: left;
  }
  
  .message.assistant {
    justify-content: flex-start;
    text-align: left;
  }
  
  .message-content {
    max-width: 70%;
    padding: 12px;
    border-radius: 12px;
    background-color: rgba(224, 224, 224, 0.8); /* Glassmorphism effect */
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  
  .message.user .message-content {
    background: linear-gradient(135deg, #6a11cb, #2575fc); /* Gradient for user messages */
    color: white;
  }
  
  /* Typing Indicator */
  .typing-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: #666;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
  }
  
  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
  }
  
  /* Input Area */
  .input-area {
    padding: 16px;
    background-color: rgba(255, 255, 255, 0.9); /* Glassmorphism effect */
  }
  
  .questions-left {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }
  
  .input-wrapper {
    display: flex;
    gap: 8px;
  }
  
  .input-wrapper input {
    flex: 1;
    padding: 10px;
    border: 1px solid rgba(221, 221, 221, 0.5);
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
  }
  
  .input-wrapper input:focus {
    border-color: #6a11cb;
    box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
  }
  
  .input-wrapper button {
    padding: 10px 20px;
    background: linear-gradient(135deg, #6a11cb, #2575fc); /* Gradient button */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .input-wrapper button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .input-wrapper button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  /* Upgrade Message */
  .upgrade-message {
    text-align: center;
    margin-top: 20px;
  }
  
  .upgrade-message p {
    font-size: 1.25rem;
    color: #555;
    margin-bottom: 20px;
  }
  
  .btn-upgrade {
    padding: 10px 20px;
    background: linear-gradient(135deg, #6a11cb, #2575fc); /* Gradient button */
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  
  .btn-upgrade:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }


  /* Responsive Input Area */
.input-wrapper {
  display: flex;
  gap: 8px;
  flex-direction: row; /* Default layout for larger screens */
}

.input-wrapper input {
  flex: 1;
  padding: 10px;
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: rgba(255, 255, 255, 0.8);
}

.input-wrapper button {
  padding: 10px 20px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Media Query for Mobile Devices */
@media (max-width: 480px) {
  .input-wrapper {
    flex-direction: column; /* Stack input and button vertically on small screens */
    gap: 10px; /* Add some spacing between input and button */
  }

  .input-wrapper input {
    width: 100%; /* Full width for input */
    padding: 12px; /* Slightly larger padding for better touch interaction */
  }

  .input-wrapper button {
    width: 100%; /* Full width for button */
    padding: 12px; /* Slightly larger padding for better touch interaction */
  }

  .questions-left {
    font-size: 12px; /* Reduce font size for smaller screens */
  }

  .disclaimer {
    font-size: 10px; /* Reduce font size for smaller screens */
  }
}
  </style>