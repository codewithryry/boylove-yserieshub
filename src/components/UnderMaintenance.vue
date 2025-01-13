<template>
  <div class="maintenance">
    <div class="maintenance__icon">🔧</div>
    <h1 class="maintenance__title">We'll Be Back Soon</h1>
    <p class="maintenance__subtitle">Improving your experience</p>
    <div class="maintenance__description">
      We're performing some updates to make things better. Thank you for your patience. We'll be back shortly!
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeWillBeBackSoon',
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
  background: #ffffff; /* White background */
  color: #1f2937; /* Neutral dark color */
  font-family: 'Inter', sans-serif;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

.maintenance__icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  color: #f59e0b; /* Vibrant yellow */
  animation: float 3s ease-in-out infinite;
}

.maintenance__title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #6366f1, #38bdf8);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
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

.maintenance__button {
  display: inline-block;
  padding: 0.75em 2.5em; /* Adjusted padding */
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

.maintenance__button:hover {
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
  .maintenance {
    padding: 1.5rem;
  }

  .maintenance__icon {
    font-size: 4rem;
  }

  .maintenance__description {
    font-size: 1rem;
  }

  .maintenance__button {
    width: 100%;
    max-width: 300px;
    padding: 1em;
  }
}
</style>