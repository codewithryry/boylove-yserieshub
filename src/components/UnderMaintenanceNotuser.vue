<template>
  <div class="maintenance">
    <div class="maintenance__icon">🚧</div>
    <h1 class="maintenance__title">Under Maintenance!</h1>
    <h1 class="maintenance__subtitle">Site Update in Progress!</h1>
    <p class="maintenance__description">
      Our website is currently undergoing scheduled maintenance to bring you an improved experience.
    </p>
    <p class="maintenance__description">
      Please check back later.
    </p>
  </div>
</template>

<script>
export default {
  name: 'UnderMaintenanceModern',
};
</script>

<style scoped>
/* Base Styles */
.maintenance {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5; /* Light grey background */
  color: #333; /* Text color */
  font-family: 'Inter', sans-serif;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
  margin-top: -6%; /* Added margin-top for mobile */
  margin-bottom: -4%; /* Added margin-bottom for mobile */
}

.maintenance__icon {
  font-size: 6rem;
  margin-bottom: 1.5rem;
  color: #f59e0b; /* Vibrant yellow */
  animation: float 3s ease-in-out infinite;
}

.maintenance__title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #6366f1, #38bdf8); /* Gradient text */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.maintenance__subtitle {
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  margin: 0.75rem 0 1.5rem;
  color: #4b5563; /* Neutral gray */
  font-weight: 600;
}

.maintenance__description {
  font-size: clamp(1rem, 3vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #6b7280; /* Neutral lighter gray */
  max-width: 600px;
}

.home-link {
  display: inline-block;
  padding: 0.75em 2.5em;
  font-size: clamp(1rem, 3vw, 1.1rem);
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #6366f1, #38bdf8); /* Gradient background */
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin-top: 1.5rem;
}

.home-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background: linear-gradient(90deg, #38bdf8, #6366f1); /* Reversed gradient on hover */
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Mobile Optimizations */
@media (max-width: 480px) {
  .maintenance__icon {
    margin-top: -30%; /* Added margin-top for mobile */
    padding: 1.5rem;
  }

  .maintenance__icon {
    font-size: 4rem;
  }

  .maintenance__description {
    font-size: 1rem;
  }

  .home-link {
    width: 100%;
    max-width: 300px;
    padding: 0.75em;
  }
}
</style>