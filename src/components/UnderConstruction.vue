<template>
  <div class="under-construction">
    <div class="construction-icon">🚧</div>
    <h1 class="title">Under Construction</h1>
    <p class="subtitle">We're building something amazing!</p>
    <p class="description">
      Our team is hard at work creating an incredible experience for you.
      Please check back soon!
    </p>

    <router-link to="/" class="home-link">
      Go Back Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'UnderConstruction',
};
</script>

<style scoped>
/* Base Styles */
.under-construction {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f0f0f0; /* Light gray background */
  color: #333; /* Neutral dark color */
  font-family: 'Inter', sans-serif;
  text-align: center;
}

.construction-icon {
  font-size: 5rem;
  margin-bottom: 2rem;
  color: #f59e0b; /* Vibrant yellow */
  animation: bounce 2s infinite;
}

.title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #6366f1, #38bdf8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  margin: 0.5rem 0 1.5rem;
  color: #4b5563; /* Neutral gray */
  font-weight: 600;
}

.description {
  font-size: clamp(1rem, 3vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #6b7280; /* Neutral lighter gray */
  max-width: 600px;
}

.home-link {
  display: inline-block;
  padding: 0.75em 2.5em; /* Increased padding for better touch targets */
  font-size: clamp(1rem, 3vw, 1.1rem);
  font-weight: 600;
  color: #fff; /* White text color */
  background: linear-gradient(90deg, #6366f1, #38bdf8); /* Gradient background */
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin-top: 1.5rem;
}

.home-link::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: #ffffff; /* White underline */
  transition: transform 0.3s ease;
  transform: scaleX(0);
}

.home-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background: linear-gradient(90deg, #38bdf8, #6366f1); /* Reversed gradient on hover */
}

.home-link:hover::after {
  transform: scaleX(1); /* Show the underline on hover */
}

/* Animations */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Mobile Optimizations */
@media (max-width: 480px) {
  .under-construction {
    padding: 1rem;
  }

  .construction-icon {
    font-size: 4rem;
  }

  .description {
    font-size: 1rem;
  }

  .home-link {
    width: 100%;
    max-width: 300px;
    padding: 0.75em;
  }
}
</style>