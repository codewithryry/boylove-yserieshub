<template>
  <div class="payment-page min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container py-5">
      <div class="row justify-content-center g-4">
        <!-- Mobile Only: Premium Features Section -->
        <div class="col-12 d-lg-none">
          <div class="visual-section card shadow-lg border-0 mb-4">
            <div class="card-body p-4 text-white text-center">
              <h2 class="fw-bold mb-3">Unlock Premium Features</h2>
              <p class="lead">Join thousands of users enjoying exclusive content and personalized recommendations.</p>
              <img src="images/hero-unlock-premium-features.png" alt="Subscription Illustration" class="img-fluid rounded hero-image" />
            </div>
          </div>
        </div>

        <!-- Payment Form (Centered on Desktop) -->
        <div class="col-12 col-lg-6">
          <div class="payment-card card shadow-lg border-0">
            <div class="card-body p-4 p-lg-5">
              <div v-if="planDetails">
                <div class="plan-header mb-5">
                  <span class="badge bg-primary-subtle text-primary mb-3 px-3 py-2">Selected Plan</span>
                  <h3 class="fw-bold mb-3 text-center">{{ planDetails.title }}</h3>
                  <p class="text-muted mb-3 text-center">{{ planDetails.description }}</p>
                  <p class="display-6 fw-bold text-primary text-center">{{ planDetails.price }}</p>
                </div>

                <form @submit.prevent="processPayment">
                  <div class="mb-4">
                    <!-- Cardholder Name -->
                    <div class="d-flex flex-column mb-4">
                      <label for="cardholderName" class="form-label fw-medium text-start">Cardholder Name</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="cardholderName" 
                        placeholder="Enter cardholder name" 
                        required 
                      />
                    </div>

                    <!-- Card Number -->
                    <div class="d-flex flex-column mb-4">
                      <label for="cardNumber" class="form-label fw-medium text-start">Card Number</label>
                      <div class="input-group">
                        <input 
                          type="text" 
                          class="form-control" 
                          id="cardNumber" 
                          placeholder="Enter card number" 
                          maxlength="19"
                          required 
                        />
                        <span class="input-group-text"><i class="fas fa-credit-card"></i></span>
                      </div>
                    </div>

                    <!-- Expiry Date and CVV -->
                    <div class="row mb-4">
                      <div class="col-6 d-flex flex-column">
                        <label for="expiryDate" class="form-label fw-medium text-start">Expiry Date</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          id="expiryDate" 
                          placeholder="MM/YY" 
                          maxlength="5"
                          required 
                        />
                      </div>
                      <div class="col-6 d-flex flex-column">
                        <label for="cvv" class="form-label fw-medium text-start">CVV</label>
                        <input 
                          type="text" 
                          class="form-control" 
                          id="cvv" 
                          placeholder="CVV" 
                          maxlength="4"
                          required 
                        />
                      </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="d-grid">
                      <button type="submit" class="btn btn-primary">
                        <i class="fas fa-lock me-2"></i>Pay Securely Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div v-else class="text-center">
                <p class="text-muted">No plan selected.</p>
                <router-link to="/pricing" class="btn btn-outline-primary btn-lg">
                  Back to Pricing
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Success Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="success-icon mb-4">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 class="modal-title mb-3">Payment Successful!</h3>
        <div class="receipt-card">
          <div class="receipt-header mb-4">
            <div class="d-flex align-items-center justify-content-between">
              <h4 class="mb-0">Payment Receipt</h4>
              <span class="badge bg-success">Paid</span>
              <br>
            </div>
            <p class="text-muted mb-0 mt-2">Transaction ID: {{ transactionId }}</p>
          </div>
          
          <div class="receipt-details">
            <div class="receipt-row">
              <span>Plan</span>
              <strong>{{ planDetails.title }}</strong>
            </div>
            <div class="receipt-row">
              <span>Amount</span>
              <strong>{{ planDetails.price }}</strong>
            </div>
            <div class="receipt-row">
              <span>Valid Until</span>
              <strong>{{ formattedExpiryDate }}</strong>
            </div>
          </div>
          
          <div class="receipt-footer mt-4">
            <button class="btn btn-primary w-100" @click="closeModal">Done</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Side Notification -->
    <div v-if="showNotification" class="notification-toast">
  <div class="toast-content">
    <i class="me-2"></i>
    <div>
      <p class="mb-0">This is a demonstration of a payment form. You can input any data here, and it won't be processed. No real transactions are performed.</p>
    </div>
    
  </div>
</div>

  </div>
</template>

<script>
import { db, auth } from "../firebase";
import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: 'PaymentPage',
  data() {
    return {
      planDetails: null,
      showModal: false,
      userId: null,
      expiryDate: null,
      transactionId: null,
      showNotification: true, // Control visibility of the notification
    };
  },
  computed: {
    formattedExpiryDate() {
      if (!this.expiryDate) return 'N/A';
      return this.expiryDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  created() {
    this.fetchPlanDetails();
    this.checkAuthState();
  },
  mounted() {
    // Auto-close the notification after 5 seconds
    setTimeout(() => {
      this.showNotification = false;
    }, 10000);
  },
  methods: {
    fetchPlanDetails() {
      const subscription = this.$route.query.subscription;
      const plans = {
        trial: {
          title: 'Free Trial',
          description: 'Enjoy full access to all features.',
          price: '$0.00/month',
        },
        premium: {
          title: 'Premium Plan',
          description: 'Get access to exclusive content, advanced filters, and more.',
          price: '$9.99/month',
        },
        vip: {
          title: 'VIP Plan',
          description: 'Enjoy all features, personalized recommendations, and priority support.',
          price: '$19.99/month',
        },
      };
      this.planDetails = plans[subscription];
    },
    generateTransactionId() {
      const randomNumber = Math.floor(Math.random() * 10000000000000000);
      return randomNumber.toString().padStart(16, '0');
    },
    async processPayment() {
      if (!this.userId) {
        alert("You must be logged in to complete the payment.");
        return;
      }
      try {
        const db = getFirestore();
        const createdAt = serverTimestamp();
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        const transactionId = this.generateTransactionId();

        const paymentsRef = collection(db, "payments");
        await addDoc(paymentsRef, {
          plan: this.planDetails.title,
          price: this.planDetails.price,
          userId: this.userId,
          createdAt: createdAt,
          expiryDate: expiryDate,
          transactionId: transactionId,
        });

        const userDocRef = doc(db, "users", this.userId);
        await updateDoc(userDocRef, {
          subscription: this.planDetails.title.toLowerCase(),
          createdAt: createdAt,
          expiryDate: expiryDate,
        });

        const receiptsRef = collection(db, "receipts");
        await addDoc(receiptsRef, {
          userId: this.userId,
          plan: this.planDetails.title,
          price: this.planDetails.price,
          expiryDate: expiryDate,
          createdAt: createdAt,
          transactionId: transactionId,
        });

        this.expiryDate = expiryDate;
        this.transactionId = transactionId;
        this.showModal = true;

        setTimeout(() => {
          if (this.showModal) {
            this.$router.push('/');
          }
        }, 60000);
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Failed to process payment. Please try again.");
      }
    },
    closeModal() {
      this.showModal = false;
    },
    checkAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userId = user.uid;
        } else {
          this.userId = null;
        }
      });
    },
    closeNotification() {
      this.showNotification = false;
    },
  },
};
</script>

<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.payment-page {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.visual-section {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(106, 17, 203, 0.15);
}

.hero-image {
  max-width: 80%;
  margin: 0 auto;
}

/* Center payment form on desktop */
@media (min-width: 992px) {
  .payment-card {
    max-width: 550px;
    margin: 0 auto;
  }
}

.payment-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.form-control {
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  height: auto;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.input-group .form-control {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group-text {
  background: white;
  border: 2px solid #e9ecef;
  border-left: none;
  border-radius: 0 12px 12px 0;
  padding: 0.75rem 1rem;
}

.form-control:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 0 0.2rem rgba(106, 17, 203, 0.15);
}

.input-group .form-control:focus + .input-group-text {
  border-color: #6a11cb;
}

.btn-primary {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(106, 17, 203, 0.2);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.success-icon {
  font-size: 4rem;
  color: #28a745;
}

.receipt-card {
  background-color: #f8f9fa;
  border-radius: 16px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
}

.receipt-row:last-child {
  border-bottom: none;
}

.receipt-row span {
  color: #6c757d;
}

.receipt-row strong {
  color: #212529;
}
/* Notification Toast */
.notification-toast {
  position: fixed;
  top: 80px; /* Changed from bottom to top */
  right: 40px;
  background-color: #ffffff;
  border: 1px solid #fffdfd;
  outline-color: #000000;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  text-align: left; /* Ensures text aligns to the left */
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 300px;
  animation: slideIn 0.5s ease-in-out;
}

.toast-content {
  display: flex;
  text-align: justify; /* Justifies the text for better readability */
  align-items: center;
  font-size: 0.9rem;
  color: #000000;
}

.close-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0;
}

.close-btn:hover {
  color: #212529;
}

/* Slide-in Animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .notification-toast {
    top: 120px; /* Adjusted for smaller screens */
    right: 15px;
    max-width: 94%;
  }
}
</style>