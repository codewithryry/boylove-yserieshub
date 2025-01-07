<template>
  <div class="pricing py-5">
    <h1 class="text-center mb-4 display-4 fw-bold">Pricing</h1>
    <div class="container">
      <p class="lead text-center">
        Explore our affordable pricing plans to get the most out of our Thai BL recommendations!
      </p>
      <div class="row">
        <div class="col-md-4 text-center mb-4">
          <div class="card h-100 shadow">
            <div class="card-body">
              <h5 class="card-title fw-bold">Trial Plan</h5>
              <p class="card-text text-muted">Enjoy full access to all features for a day. Credit card required.</p>
              <p class="card-text"><strong>Price:</strong> $0.00/day</p>
              <router-link 
                :to="{ path: '/get-started', query: { subscription: 'trial' } }" 
                class="btn btn-primary"
              >
                Get Started
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center mb-4">
          <div class="card h-100 shadow">
            <div class="card-body">
              <h5 class="card-title fw-bold">Premium Plan</h5>
              <p class="card-text text-muted">Get access to exclusive content, advanced filters, and more.</p>
              <p class="card-text"><strong>Price:</strong> $9.99/month</p>
              <router-link 
                :to="{ path: '/get-started', query: { subscription: 'premium' } }" 
                class="btn btn-primary"
              >
                Get Started
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-center mb-4">
          <div class="card h-100 shadow">
            <div class="card-body">
              <h5 class="card-title fw-bold">VIP Plan</h5>
              <p class="card-text text-muted">Enjoy all features, personalized recommendations, and priority support.</p>
              <p class="card-text"><strong>Price:</strong> $19.99/month</p>
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
  </div>
</template>
  
  <script>
  export default {
    name: 'Pricing',
  };
  </script>
