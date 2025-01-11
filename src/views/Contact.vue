<template>
  <div class="contact py-5">
    <h1 class="text-center mb-4 display-4 fw-bold animate__animated animate__fadeInDown">Contact Us</h1>
    <div class="container">
      <p class="lead text-center animate__animated animate__fadeInUp animate__delay-1s">
        Have questions? We'd love to hear from you!
      </p>
      <form @submit.prevent="submitForm" class="mt-4 animate__animated animate__fadeInUp animate__delay-2s">
        <div class="mb-4">
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="formData.name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="mb-4">
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-4">
          <textarea
            class="form-control"
            id="message"
            rows="5"
            v-model="formData.message"
            placeholder="Enter your message"
            maxlength="500"
            required
          ></textarea>
          <small class="char-counter">{{ formData.message.length }}/500</small>
        </div>
        <div class="d-flex justify-content-end">
  <button type="submit" class="btn btn-modern btn-lg" :disabled="isSubmitting">
    {{ isSubmitting ? 'Submitting...' : 'Submit' }}
  </button>
</div>
        <small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
      </form>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Success!</h3>
        <p>{{ successMessage }}</p>
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
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
      isSubmitting: false, // Loading state for form submission
      errorMessage: '', // Error message for user feedback
      successMessage: '', // Success message for user feedback
      showSuccessModal: false, // Control success modal visibility
      user: null, // Logged-in user
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
    async submitForm() {
      if (!this.formData.name || !this.formData.email || !this.formData.message) {
        this.errorMessage = 'Please fill out all fields.';
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        // Add the form data to Firestore
        const contactRef = collection(db, "contactSubmissions");
        await addDoc(contactRef, {
          name: this.formData.name,
          email: this.formData.email,
          message: this.formData.message,
          uid: this.user ? this.user.uid : null, // Include the user's UID if logged in
          timestamp: serverTimestamp(), // Add a timestamp
        });

        // Clear the form and show success message
        this.formData = { name: '', email: '', message: '' };
        this.successMessage = 'Thank you for contacting us! We will get back to you soon.';
        this.showSuccessModal = true; // Show success modal
      } catch (error) {
        this.errorMessage = 'Failed to submit your message. Please try again.';
        console.error("Error submitting form:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>


<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.contact {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef); /* Gradient background */
  padding: 80px 0;
}

h1 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #2c3e50; /* Dark text for better readability */
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.lead {
  font-size: 1.3rem;
  color: #555;
  line-height: 1.8; /* Improved readability */
  margin-bottom: 40px;
}

.form-control {
  border-radius: 12px; /* Rounded corners */
  border: 1px solid #ced4da;
  padding: 12px 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-control:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 0.2rem rgba(66, 185, 131, 0.25); /* Focus effect */
}

textarea.form-control {
  resize: vertical; /* Allow vertical resizing */
}

/* Character Counter */
.char-counter {
  display: block;
  text-align: right;
  font-size: 0.875rem;
  color: #777;
  margin-top: 5px;
}

.btn-modern {
  padding: 10px 20px; /* Same padding as .btn-load-more */
  background: linear-gradient(135deg, #6a11cb, #2575fc); /* Same gradient background */
  border: none; /* Remove border */
  color: #fff; /* White text color */
  border-radius: 8px; /* Same border radius */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition */
  font-size: 1rem; /* Adjust font size if needed */
  font-weight: 600; /* Bold text */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
}

.btn-modern:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb); /* Reverse gradient on hover */
  transform: translateY(-2px); /* Optional: Lift effect on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Optional: Enhanced shadow on hover */
}

.btn-modern:active {
  transform: translateY(0); /* Reset lift effect on click */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Reset shadow on click */
}


/* Error and Success Messages */
.error-message {
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 10px;
  display: block;
  text-align: center;
}

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

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.75rem;
  }

  .lead {
    font-size: 1.15rem;
  }

  .form-control {
    font-size: 0.95rem;
    padding: 10px 14px;
  }

  .btn-modern {
    font-size: 1rem;
    padding: 12px 24px;
  }
}

/* Animation Delays */
.animate__delay-1s {
  animation-delay: 0.5s;
}

.animate__delay-2s {
  animation-delay: 1s;
}
</style>