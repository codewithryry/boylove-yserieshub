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
            required
          ></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-modern btn-lg" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
        </div>
        <small v-if="errorMessage" class="error-message">{{ errorMessage }}</small>
        <small v-if="successMessage" class="success-message">{{ successMessage }}</small>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase"; // Import Firestore
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
    };
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
          timestamp: serverTimestamp(), // Add a timestamp
        });

        // Clear the form and show success message
        this.formData = { name: '', email: '', message: '' };
        this.successMessage = 'Thank you for contacting us! We will get back to you soon.';
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

/* Modern Button Styling */
.btn-modern {
  background: linear-gradient(135deg, #42b983, #369b6e); /* Gradient background */
  border: none;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  border-radius: 50px; /* Rounded button */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: all 0.3s ease;
}

.btn-modern:hover {
  background: linear-gradient(135deg, #369b6e, #42b983); /* Gradient hover effect */
  transform: translateY(-2px); /* Lift effect on hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
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

.success-message {
  color: #28a745;
  font-size: 0.875rem;
  margin-top: 10px;
  display: block;
  text-align: center;
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