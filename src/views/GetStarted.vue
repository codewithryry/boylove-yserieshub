<template>
  <div class="full-width-content">
    <br>
    <h1 class="text-center mb-3 display-5 fw-bold">Subscription Details</h1>
    <div class="card-wrapper">
      <div class="card shadow-sm p-3 border-0">
        <div v-if="isLoading" class="text-center">
          <p class="text-muted">Loading subscription details...</p>
        </div>
        <div v-else-if="subscriptionDetails" class="text-center d-flex flex-column h-100">
          <h3 class="fw-bold mb-2">{{ subscriptionDetails.title }}</h3>
          <p class="text-muted mb-3">{{ subscriptionDetails.description }}</p>
          <p class="h4 fw-bold text-primary mb-3">{{ subscriptionDetails.price }}</p>

          <!-- Additional Subscription Details -->
          <div class="subscription-features text-start mb-3">
            <h4 class="fw-bold mb-2">Features</h4>
            <ul class="list-unstyled">
              <li v-for="(feature, index) in subscriptionDetails.features" :key="index" class="mb-1">
                <i class="fas fa-check-circle text-success me-2"></i>{{ feature }}
              </li>
            </ul>
          </div>

          <!-- Call to Action Buttons -->
          <div class="mt-auto d-flex flex-column flex-md-row justify-content-center gap-2">
            <router-link 
              v-if="isAuthenticated"
              :to="{ path: '/payment', query: { subscription: $route.query.subscription } }" 
              class="btn btn-primary"
            >
              Go to Payment
            </router-link>
            <router-link to="/pricing" class="btn btn-outline-primary">
              Back to Pricing
            </router-link>
            <button v-if="!isAuthenticated" @click="redirectToLogin" class="btn btn-warning">
              Login to Purchase
            </button>
          </div>
        </div>
        <div v-else class="text-center">
          <p class="text-muted">No subscription selected.</p>
          <router-link to="/pricing" class="btn btn-outline-primary">
            Back to Pricing
          </router-link>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import { db, auth } from "../firebase"; // Import Firestore and Auth
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: 'GetStarted',
  data() {
    return {
      subscriptions: {
        trial: {
          title: 'Free',
          description: 'Limited access to series and exclusive features.',
          price: '$0.00/month',
          features: [
            'Unlock access to series',
            'Exclusive content for Watch Party ',
            'Basic filters for easier navigation',
            'Standard support during the trial',
          ],
        },
        premium: {
          title: 'Premium Subscription',
          description: 'Get access to exclusive content, advanced filters, and more.',
          price: '$9.99/month',
          features: [
            'Exclusive content access',
            'Access to the premium song ',
            'Advanced filters and search',
            'Ad-free experience',
            'Priority customer support',
          ],
        },
        vip: {
          title: 'VIP Subscription',
          description: 'Enjoy all features, personalized recommendations, and priority support.',
          price: '$19.99/month',
          features: [
            'Access to all subscription',
            'Access to English-Thai Translator',
            'Personalized recommendations',
            '24/7 priority support',
            'Early access to new content',
          ],
        },
      },
      subscriptionDetails: null,
      isLoading: true,
      isAuthenticated: false, // Track authentication status
      userId: null, // Store the user's UID
    };
  },
  created() {
    this.checkAuthState(); // Check if the user is authenticated
    const subscription = this.$route.query.subscription;
    if (!subscription || !this.subscriptions[subscription]) {
      this.$router.push({ path: '/pricing' }); // Redirect to pricing page
      alert("Invalid subscription selected. Please choose a valid subscription.");
    } else {
      this.fetchSubscriptionDetails();
    }
  },
  methods: {
    async fetchSubscriptionDetails() {
      const subscription = this.$route.query.subscription;
      console.log("Subscription query parameter:", subscription); // Debugging
      if (subscription && this.subscriptions[subscription]) {
        this.subscriptionDetails = this.subscriptions[subscription];
        if (this.isAuthenticated) {
          await this.saveSubscriptionToFirestore(subscription); // Save the subscription to Firestore
        }
      } else {
        alert("Invalid subscription selected. Please choose a valid subscription.");
      }
      this.isLoading = false;
    },
    async saveSubscriptionToFirestore(subscription) {
      try {
        const subscriptionsRef = collection(db, "userSubscriptions"); // Reference to the "userSubscriptions" collection
        await addDoc(subscriptionsRef, {
          subscription: subscription,
          userId: this.userId, // Use the authenticated user's UID
          timestamp: serverTimestamp(), // Add a timestamp
        });
        console.log("Subscription saved to Firestore successfully!");
      } catch (error) {
        console.error("Error saving subscription to Firestore:", error);
        alert("Failed to save subscription. Please try again.");
      }
    },
    checkAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.isAuthenticated = true;
          this.userId = user.uid; // Set the user's UID
        } else {
          this.isAuthenticated = false;
          this.userId = null;
        }
      });
    },
    redirectToLogin() {
      this.$router.push("/login"); // Redirect to the login page
    },
  },
  watch: {
    '$route.query.subscription': 'fetchSubscriptionDetails',
  },
};
</script>

<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');


.card-wrapper {
  max-width: 500px;
  margin: 0 auto;
}

.card {
  border: none;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 2rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.subscription-features {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn:hover {
  transform: scale(1.05);
}

.btn-primary {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
}

.btn-outline-primary {
  border: 2px solid #6a11cb;
  color: #6a11cb;
}

.btn-outline-primary:hover {
  background: #6a11cb;
  color: #fff;
}

.btn-warning {
  background: #ffc107;
  border: none;
  color: #000;
}

.btn-warning:hover {
  background: #e0a800;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
  }

  
}
</style>