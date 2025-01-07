<template>
  <div class="payment-page min-vh-10 d-flex align-items-center justify-content-center">
    <div class="p-4 border-0">
      <div v-if="planDetails">
        <h3 class="fw-bold mb-3 text-center">{{ planDetails.title }}</h3>
        <p class="text-muted mb-4 text-center">{{ planDetails.description }}</p>
        <p class="h4 fw-bold text-primary mb-4 text-center">{{ planDetails.price }}</p>

        <!-- Payment Form -->
        <form @submit.prevent="processPayment">
          <div class="mb-3">
            <label for="cardNumber" class="form-label">Card Number</label>
            <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" required />
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="expiryDate" class="form-label">Expiry Date</label>
              <input type="text" class="form-control" id="expiryDate" placeholder="MM/YY" required />
            </div>
            <div class="col-md-6">
              <label for="cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cvv" placeholder="123" required />
            </div>
          </div>
          <div class="mb-3">
            <label for="cardholderName" class="form-label">Cardholder Name</label>
            <input type="text" class="form-control" id="cardholderName" placeholder="John Doe" required />
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-lg btn-success">Pay Now</button>
          </div>
        </form>
      </div>
      <div v-else class="text-center">
        <p class="text-muted">No plan selected.</p>
        <router-link to="/pricing" class="btn btn-lg btn-outline-primary">
          Back to Pricing
        </router-link>
      </div>
    </div>

    <!-- Custom Modal for Payment Success -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Payment Successful!</h3>
        <p class="modal-message">Thank you for subscribing. Here's your receipt:</p>

        <!-- Receipt Details -->
        <div class="receipt-details">
          <p><strong>User ID:</strong> {{ userId }}</p>
          <p><strong>Plan:</strong> {{ planDetails.title }}</p>
          <p><strong>Price:</strong> {{ planDetails.price }}</p>
          <p><strong>Expiry Date:</strong> {{ formattedExpiryDate }}</p>
          <p><strong>Transaction ID:</strong> {{ transactionId }}</p> <!-- Display Transaction ID -->
        </div>

        <button class="btn btn-success" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase"; // Import Firestore and Auth
import { getFirestore, collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: 'PaymentPage',
  data() {
    return {
      planDetails: null,
      showModal: false,
      userId: null,
      expiryDate: null, // Store expiry date for the receipt
      transactionId: null, // Store Transaction ID for the receipt
    };
  },
  computed: {
    // Format the expiry date for display
    formattedExpiryDate() {
      if (!this.expiryDate) return 'N/A'; // Fallback if expiry date is missing

      // Format the date and time
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
  methods: {
    // Fetch plan details from the route query
    fetchPlanDetails() {
      const subscription = this.$route.query.subscription;
      const plans = {
        trial: {
          title: 'Free Trial',
          description: 'Enjoy full access to all features.',
          price: '$0.00/day',
          features: [
            'Unlock access to series',
            'Exclusive content for Watch Party',
            'Basic filters for easier navigation',
            'Standard support during the trial',
          ],
        },
        premium: {
          title: 'Premium Plan',
          description: 'Get access to exclusive content, advanced filters, and more.',
          price: '$9.99/month',
          features: [
            'Unlock all series',
            'Exclusive content',
            'Advanced filters',
            'Priority support',
          ],
        },
        vip: {
          title: 'VIP Plan',
          description: 'Enjoy all features, personalized recommendations, and priority support.',
          price: '$19.99/month',
          features: [
            'Unlock all series',
            'Exclusive content',
            'Advanced filters',
            'Personalized recommendations',
            'Priority support',
          ],
        },
      };
      this.planDetails = plans[subscription];
    },

    // Generate a random 16-digit Transaction ID
    generateTransactionId() {
      const randomNumber = Math.floor(Math.random() * 10000000000000000); // 16 digits
      return randomNumber.toString().padStart(16, '0'); // Ensure it's always 16 digits
    },

    // Process the payment
    async processPayment() {
      if (!this.userId) {
        alert("You must be logged in to complete the payment.");
        return;
      }

      try {
        const db = getFirestore();

        // Get the current timestamp
        const createdAt = serverTimestamp();

        // Calculate the expiry date based on the plan
        const expiryDate = new Date(); // JavaScript Date object
        if (this.planDetails.title.toLowerCase() === 'trial plan') {
          expiryDate.setDate(expiryDate.getDate() + 1); // 1 day for trial plan
        } else {
          expiryDate.setDate(expiryDate.getDate() + 29); // 29 days for other plans
        }

        // Generate a random 16-digit Transaction ID
        const transactionId = this.generateTransactionId();

        // Save payment details to Firestore
        const paymentsRef = collection(db, "payments");
        await addDoc(paymentsRef, {
          plan: this.planDetails.title,
          price: this.planDetails.price,
          userId: this.userId,
          createdAt: createdAt,
          expiryDate: expiryDate, // Save as JavaScript Date object
          transactionId: transactionId, // Save the Transaction ID
        });

        // Update the user's subscription in the 'users' collection
        const userDocRef = doc(db, "users", this.userId);
        await updateDoc(userDocRef, {
          subscription: this.planDetails.title.toLowerCase(),
          createdAt: createdAt,
          expiryDate: expiryDate, // Save as JavaScript Date object
        });

        // Save receipt details to the 'receipts' collection
        const receiptsRef = collection(db, "receipts");
        await addDoc(receiptsRef, {
          userId: this.userId,
          plan: this.planDetails.title,
          price: this.planDetails.price,
          features: this.planDetails.features,
          expiryDate: expiryDate,
          createdAt: createdAt,
          transactionId: transactionId, // Save the Transaction ID
        });

        // Store expiry date and transaction ID in component data for the receipt
        this.expiryDate = expiryDate; // Already a Date object
        this.transactionId = transactionId; // Store the Transaction ID

        this.showModal = true; // Show the modal
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Failed to process payment. Please try again.");
      }
    },

    // Close the modal
    closeModal() {
      this.showModal = false;
    },

    // Check the user's authentication state
    checkAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userId = user.uid;
        } else {
          this.userId = null;
        }
      });
    },
  },
};
</script>








<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.payment-page {
  font-family: 'Inter', sans-serif;
}

.btn-success {
  background-color: #42b983;
  border-color: #42b983;
  font-weight: 600;
}

.btn-success:hover {
  background-color: #369f6e;
  border-color: #369f6e;
}

.btn-outline-primary {
  border-color: #42b983;
  color: #42b983;
}

.btn-outline-primary:hover {
  background-color: #42b983;
  color: #ffffff;
}

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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.modal-message {
  font-size: 1rem;
  margin-bottom: 20px;
}

.receipt-details {
  text-align: left;
  margin-bottom: 20px;
}

.receipt-details p {
  margin: 5px 0;
}

.features-list {
  margin-top: 10px;
}

.features-list h4 {
  margin-bottom: 5px;
}

.features-list ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
}
</style>









<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.payment-page {
  font-family: 'Inter', sans-serif;
}

.btn-success {
  background-color: #42b983;
  border-color: #42b983;
  font-weight: 600;
}

.btn-success:hover {
  background-color: #369f6e;
  border-color: #369f6e;
}

.btn-outline-primary {
  border-color: #42b983;
  color: #42b983;
}

.btn-outline-primary:hover {
  background-color: #42b983;
  color: #ffffff;
}





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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.modal-message {
  font-size: 1rem;
  margin-bottom: 20px;
}
</style>