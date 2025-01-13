<template>
  <div class="pricing py-4">
    <h1 class="text-center mb-3 display-4 fw-bold">Subscription</h1>
    <div class="container">
      
      <p class="lead text-center">
        Explore our affordable pricing plans to get the most out of our Thai BL recommendations!
      </p>
      <br>
      <div class="row">
        <!-- Trial Plan -->
        <div class="col-md-4 text-center mb-4">
          <div class="card h-100 shadow">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">Trial Plan</h5>
              <p class="card-text text-muted">Enjoy access for a month. Credit card required.</p>
              <p class="card-text"><strong>Price:</strong> $0.00/month</p>
              <div class="mt-auto"> <!-- Push button to the bottom -->
                <router-link 
                  :to="{ path: '/get-started', query: { subscription: 'trial' } }" 
                  class="btn btn-primary"
                >
                  Get Started
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Premium Plan -->
        <div class="col-md-4 text-center mb-4">
          <div class="card h-100 shadow">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">Premium Plan</h5>
              <p class="card-text text-muted">Get access to exclusive content, advanced filters, and more.</p>
              <p class="card-text"><strong>Price:</strong> $9.99/month</p>
              <div class="mt-auto"> <!-- Push button to the bottom -->
                <router-link 
                  :to="{ path: '/get-started', query: { subscription: 'premium' } }" 
                  class="btn btn-primary"
                >
                  Get Started
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- VIP Plan -->
        <div class="col-md-4 text-center mb-4">
          <div class="card h-100 shadow">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">VIP Plan</h5>
              <p class="card-text text-muted">Enjoy all features, personalized recommendations, and priority support.</p>
              <p class="card-text"><strong>Price:</strong> $19.99/month</p>
              <div class="mt-auto"> <!-- Push button to the bottom -->
                <router-link 
                  :to="{ path: '/get-started', query: { subscription: 'vip' } }" 
                  class="btn btn-primary"
                >
                  Get Started
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pricing',
};
</script>

<style scoped>
/* Custom Styling for Pricing Cards */
.pricing {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.card {
  border: none;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 2rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .card {
    margin: 0.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .btn-primary {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
