<template>
  <div class="translator">
    <h1>English-Thai Translator</h1>
    <p>Translate text between English and Thai instantly!</p>

    <!-- Show translator only for VIP users -->
    <div v-if="userIsVIP">
      <!-- Language Selection -->
      <div class="language-swap">
        <button @click="swapLanguages" class="btn-swap">
          <span>{{ sourceLanguage }} ⇄ {{ targetLanguage }}</span>
        </button>
      </div>

      <!-- Translation Form -->
      <div class="translation-form">
        <div class="input-container">
          <textarea
            v-model="inputText"
            :placeholder="`Enter text in ${sourceLanguage}...`"
            rows="10"
            class="input-text"
            :disabled="isLoading"
            maxlength="500" 
          ></textarea>
          <p class="char-counter">{{ inputText.length }}/500</p> <!-- Character counter -->
        </div>
        <div class="output-container">
          <textarea
            v-model="translatedText"
            :placeholder="isLoading ? 'Translating...' : `Translated text in ${targetLanguage}...`"
            rows="10"
            class="output-text"
            readonly
          ></textarea>
          <button @click="speakTranslatedText" class="btn-speak" :disabled="!translatedText || isLoading">
            🔊
          </button>
        </div>
      </div>
    </div>

    <!-- Show upgrade message for non-VIP users -->
    <div v-else class="upgrade-message">
      <p>This feature is exclusive to VIP members.</p>
      <button @click="upgradeToVIP" class="btn-upgrade">Upgrade to VIP</button>
    </div>

    <!-- Modal for Messages -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <p>{{ modalMessage }}</p>
          <button @click="closeModal" class="modal-close-btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { doc, getDoc } from 'firebase/firestore';

export default {
  name: 'EngThaiTranslator',
  data() {
    return {
      inputText: '', // Input text
      translatedText: '', // Translated text
      isLoading: false, // To show loading state
      showModal: false, // Control modal visibility
      modalMessage: '', // Message to display in the modal
      sourceLanguage: 'English', // Source language
      targetLanguage: 'Thai', // Target language
      debounceTimer: null, // Timer for debouncing
      userIsVIP: false, // Track VIP subscription status
    };
  },
  watch: {
    // Watch for changes in inputText and trigger auto-translation after a delay
    inputText(newText) {
      if (newText.trim()) {
        this.debounceTranslate();
      } else {
        this.translatedText = ''; // Clear translated text if input is empty
      }
    },
  },
  methods: {
    // Check the user's subscription status
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
    // Debounce function to delay translation
    debounceTranslate() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.translateText();
      }, 1000); // 1000ms delay after typing stops
    },
    async translateText() {
      if (!this.inputText.trim()) {
        this.translatedText = ''; // Clear translated text if input is empty
        return;
      }

      this.isLoading = true;

      try {
        // Determine the language pair based on the current source and target languages
        const langPair =
          this.sourceLanguage === 'English' ? 'en|th' : 'th|en';

        // MyMemory Translation API endpoint
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
            this.inputText
          )}&langpair=${langPair}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch translation.');
        }

        const data = await response.json();
        if (data.responseData) {
          this.translatedText = data.responseData.translatedText;
        } else {
          throw new Error('Translation not found.');
        }
      } catch (error) {
        console.error('Translation error:', error);
        this.showModal = true;
        this.modalMessage = 'An error occurred while translating. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    swapLanguages() {
      // Swap source and target languages
      [this.sourceLanguage, this.targetLanguage] = [
        this.targetLanguage,
        this.sourceLanguage,
      ];

      // Clear input and output fields
      this.inputText = '';
      this.translatedText = '';
    },
    closeModal() {
      this.showModal = false;
      this.modalMessage = '';
    },
    speakTranslatedText() {
      if (!this.translatedText) return;

      const utterance = new SpeechSynthesisUtterance(this.translatedText);
      utterance.lang = this.targetLanguage === 'Thai' ? 'th-TH' : 'en-US';
      speechSynthesis.speak(utterance);
    },
    upgradeToVIP() {
      // Redirect to the subscription page
      this.$router.push({ path: '/get-started', query: { subscription: 'vip' } });
    },
  },
  mounted() {
    this.checkUserSubscription(); // Check the user's subscription status
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>





<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.translator {
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

.language-swap {
  margin-bottom: 20px;
}

.btn-swap {
  padding: 10px 20px;
  background: linear-gradient(135deg, #6a11cb, #2575fc); /* Updated gradient */
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-swap:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.translation-form {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.input-container,
.output-container {
  flex: 1;
  position: relative;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  resize: vertical;
  background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

textarea:focus {
  border-color: #6a11cb; /* Updated to match gradient */
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3); /* Updated to match gradient */
}

.output-text {
  background: rgba(248, 249, 250, 0.8); /* Glassmorphism effect */
}

.btn-speak {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(255, 255, 255, 0.9); /* Glassmorphism effect */
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-speak:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
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

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9); /* Glassmorphism effect */
}

.modal-content {
  text-align: center;
}

.modal-close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #6a11cb, #2575fc); /* Updated gradient */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  .translation-form {
    flex-direction: column;
  }

  .btn-swap {
    font-size: 0.875rem;
  }
}

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
  background: linear-gradient(135deg, #6a11cb, #2575fc); /* Updated gradient */
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

/* Character Counter */
.char-counter {
  text-align: right;
  font-size: 0.875rem;
  color: #666;
  margin-top: 5px;
}
</style>