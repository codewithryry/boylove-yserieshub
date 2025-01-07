<template>
  <div class="full-width-content">
    <br>
    <h1 class="text-center mb-3 display-4 fw-bold">Subscription Details</h1>
    <div class="card-wrapper">
      <div class="card shadow-sm p-3 border-0">
        <div v-if="isLoading" class="text-center">
          <p class="text-muted">Loading subscription details...</p>
        </div>
        <div v-else-if="subscriptionDetails" class="text-center">
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
          <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
            <router-link 
              v-if="isAuthenticated"
              :to="{ path: '/payment', query: { subscription: $route.query.subscription } }" 
              class="btn btn-modern btn-primary"
            >
              Go to Payment
            </router-link>
            <router-link to="/pricing" class="btn btn-modern btn-outline-primary">
              Back to Pricing
            </router-link>
            <button v-if="!isAuthenticated" @click="redirectToLogin" class="btn btn-modern btn-warning">
              Login to Purchase
            </button>
          </div>
        </div>
        <div v-else class="text-center">
          <p class="text-muted">No subscription selected.</p>
          <router-link to="/pricing" class="btn btn-modern btn-outline-primary">
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
          price: '$0.00/day',
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
  
  .get-started {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .full-width-content {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: -0.025em;
  }
  
  .lead {
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
  }
  
  .card-wrapper {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .card {
    border: none;
    border-radius: 12px;
    background: #ffffff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 1.5rem;
  }
  
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    letter-spacing: -0.025em;
  }
  
  .text-primary {
    color: #42b983 !important;
  }
  
  /* Modern Button Styles */
  .btn-modern {
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: 2px solid transparent;
  }
  
  .btn-modern.btn-primary {
    background-color: #42b983;
    color: #ffffff;
    border-color: #42b983;
  }
  
  .btn-modern.btn-primary:hover {
    background-color: #369c6f;
    border-color: #369c6f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .btn-modern.btn-outline-primary {
    background-color: transparent;
    color: #42b983;
    border-color: #42b983;
  }
  
  .btn-modern.btn-outline-primary:hover {
    background-color: #42b983;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .plan-features,
  .plan-limitations {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  
  .plan-features h4,
  .plan-limitations h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.75rem;
  }
  
  .plan-features ul,
  .plan-limitations ul {
    padding-left: 0;
  }
  
  .plan-features li,
  .plan-limitations li {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.25rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }
  
    h3 {
      font-size: 1.25rem;
    }
  
    .lead {
      font-size: 0.9rem;
    }
  
    .plan-features,
    .plan-limitations {
      padding: 0.75rem;
    }
  }
  </style>