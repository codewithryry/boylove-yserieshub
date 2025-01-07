<template>
  <div class="discussion">
    <h1 class="discussion-title"> User Feedback</h1>
    <p class="discussion-subtitle">We value your feedback! Share your thoughts and suggestions to help us improve.</p>

    <!-- Discussion Form -->
    <div class="discussion-form">
      <textarea
        v-model="newComment"
        placeholder="Write your feedback here..."
        rows="4"
        class="form-control"
        :disabled="isPosting"
      ></textarea>
      <button @click="postComment" class="btn btn-post mt-3" :disabled="isPosting || !newComment.trim()">
        {{ isPosting ? 'Posting...' : 'Post Comment' }}
      </button>
      <small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
    </div>

    <!-- Comments List -->
    <div class="comments mt-5">
      <h2 class="comments-title">Recent Feedback</h2>
      <div v-if="isLoading" class="loading-spinner">
        Loading feedback...
      </div>
      <div v-else>
        <div v-if="comments.length === 0" class="no-comments">
          No feedback yet. Be the first to share your thoughts!
        </div>
        <div v-else>
          <div
            v-for="(comment, index) in comments"
            :key="comment.id"
            class="comment-card animate__animated animate__fadeInUp"
          >
            <p class="comment-text">{{ comment.text }}</p>
            <small class="comment-author">Posted by: {{ comment.author || 'Anonymous' }}</small>
            <small class="comment-timestamp">{{ formatTimestamp(comment.timestamp) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

export default {
  name: 'Discussion',
  data() {
    return {
      newComment: '', // Stores the new comment text
      comments: [], // Comments will be loaded dynamically
      isPosting: false, // Loading state for posting
      isLoading: false, // Loading state for fetching comments
      errorMessage: '', // Error message for user feedback
      user: null, // Logged-in user
    };
  },
  async created() {
    // Fetch comments when the component is created
    await this.fetchComments();

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
    async fetchComments() {
      this.isLoading = true;
      try {
        // Fetch comments from Firestore
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, orderBy("timestamp", "desc")); // Sort by timestamp
        const querySnapshot = await getDocs(q);

        this.comments = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));
      } catch (error) {
        this.errorMessage = 'Failed to load comments. Please try again later.';
        console.error("Error fetching comments:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async postComment() {
      if (this.newComment.trim() === '') {
        this.errorMessage = 'Please write a comment before posting.';
        return;
      }

      if (!this.user) {
        this.errorMessage = 'You must be logged in to post a comment.';
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
          timestamp: serverTimestamp(), // Add a timestamp
        });

        // Clear the input field
        this.newComment = '';

        // Refresh the comments list
        await this.fetchComments();
      } catch (error) {
        this.errorMessage = 'Failed to post your comment. Please try again.';
        console.error("Error posting comment:", error);
      } finally {
        this.isPosting = false;
      }
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return "Just now"; // Fallback if timestamp is missing

      // Convert Firestore timestamp to a JavaScript Date object
      const date = timestamp.toDate();

      // Format the date and time
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
};
</script>

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
  margin-bottom: 10px;
}

.discussion-subtitle {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 30px;
}

.discussion-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9); /* Glassmorphism effect */
}

.btn-post {
  background: linear-gradient(135deg, #2c3e50, #1a252f);
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-post:hover:not(:disabled) {
  background: linear-gradient(135deg, #1a252f, #2c3e50);
  transform: translateY(-2px);
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

.comments {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.comments-title {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
}

.no-comments {
  font-size: 1rem;
  color: #777;
  font-style: italic;
}

.comment-card {
  background: rgba(255, 255, 255, 0.8); /* Glassmorphism effect */
  border: 1px solid rgba(221, 221, 221, 0.5);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  text-align: left;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.comment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.comment-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}

.comment-author {
  font-size: 0.875rem;
  color: #777;
  display: block;
  margin-top: 5px;
}

.comment-timestamp {
  font-size: 0.75rem;
  color: #999;
  display: block;
  margin-top: 5px;
}

.loading-spinner {
  font-size: 1rem;
  color: #777;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .discussion-title {
    font-size: 2.5rem;
  }

  .discussion-subtitle {
    font-size: 1.1rem;
  }

  .comments-title {
    font-size: 1.75rem;
  }
}
</style>