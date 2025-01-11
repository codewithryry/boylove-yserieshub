<template>
  <div class="discussion">
    <h1 class="discussion-title">User Feedback</h1>
    <p class="discussion-subtitle">Share your thoughts and suggestions to help us improve.</p>

    <!-- Discussion Form -->
    <div class="discussion-form">
      <textarea
        v-model="newComment"
        placeholder="Write your feedback here..."
        rows="4"
        class="form-control"
        :disabled="isPosting"
        maxlength="500"
      ></textarea>
      <small class="char-counter">{{ newComment.length }}/500</small>
      <button @click="handlePostClick" class="btn btn-post mt-3" :disabled="isPosting || !newComment.trim()">
        {{ isPosting ? 'Posting...' : 'Post Comment' }}
      </button>
      <small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Login Required</h3>
        <p>You must be logged in to post feedback.</p>
        <div class="modal-actions">
          <button @click="redirectToLogin" class="btn btn-confirm">Log In</button>
          <button @click="showLoginModal = false" class="btn btn-cancel">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Success!</h3>
        <p>Thank you for sharing your thoughts with us.</p>
        <div class="modal-actions">
          <button @click="showSuccessModal = false" class="btn btn-confirm">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>






<script>
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  name: 'Discussion',
  data() {
    return {
      newComment: '', // Stores the new comment text
      isPosting: false, // Loading state for posting
      errorMessage: '', // Error message for user feedback
      user: null, // Logged-in user
      showLoginModal: false, // Control login modal visibility
      showSuccessModal: false, // Control success modal visibility
    };
  },
  async created() {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user; // Set the logged-in user
      } else {
        this.user = null; // Reset if the user is not logged in
      }
    });
  },
  methods: {
    handlePostClick() {
      if (!this.user) {
        this.showLoginModal = true; // Show login modal if user is not logged in
        return;
      }
      this.postComment(); // Proceed to post if user is logged in
    },
    async postComment() {
      if (this.newComment.trim() === '') {
        this.errorMessage = 'Please write a comment before posting.';
        return;
      }

      this.isPosting = true;
      this.errorMessage = '';

      try {
        // Add the new comment to Firestore
        const commentsRef = collection(db, "comments");
        await addDoc(commentsRef, {
          text: this.newComment,
          author: this.user.displayName || this.user.email, // Use displayName or email
          uid: this.user.uid, // Include the user's UID
          timestamp: serverTimestamp(), // Add a timestamp
        });

        // Clear the input field
        this.newComment = '';

        // Show success modal
        this.showSuccessModal = true;
      } catch (error) {
        this.errorMessage = 'Failed to post your feedback. Please try again.';
        console.error("Error posting feedback:", error);
      } finally {
        this.isPosting = false;
      }
    },
    redirectToLogin() {
      // Redirect to your login page or open a login modal
      this.$router.push('/login'); // Example: Redirect to login route
    },
  },
};
</script>



<style scoped>
/* Success Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.btn-confirm {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-confirm:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-cancel {
  background: #ccc;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.discussion {
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.discussion-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 17px;
  animation: fadeInDown 1s ease;
}

.discussion-subtitle {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 30px;
  animation: fadeInUp 1s ease;
}

.discussion-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1.5s ease;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9); /* Glassmorphism effect */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: #2c3e50;
  box-shadow: 0 0 8px rgba(44, 62, 80, 0.2);
  outline: none;
}

.char-counter {
  display: block;
  text-align: right;
  font-size: 0.875rem;
  color: #777;
  margin-top: 5px;
}

.btn-post {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-post:hover:not(:disabled) {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-post:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 10px;
  display: block;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.btn-confirm {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-confirm:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-cancel {
  background: #ccc;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .discussion-title {
    font-size: 2.5rem;
  }

  .discussion-subtitle {
    font-size: 1.1rem;
  }
}
</style>