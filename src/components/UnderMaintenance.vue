<template>
  <div class="maintenance">
    <div class="maintenance__icon">🚀</div>
    <h1 class="maintenance__title">We're Upgrading!</h1>
    <p class="maintenance__subtitle">We'll be back soon!</p>
    <div class="maintenance__description">
      We're working hard to bring you a better experience. Please check back soon!
    </div>
  </div>
</template>

<script>
export default {
  name: 'maintenance__progress-bar',
};
</script>

<style scoped>
/* Base Styles */
.maintenance {
  min-height: 100vh; /* Fill the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0); /* Light grey gradient */
  color: #333; /* Text color */
  font-family: 'Inter', sans-serif; /* Modern font */
  text-align: center; /* Center text alignment */
  padding: 2rem; /* Padding around content */
  animation: fadeIn 0.8s ease-out;
  margin-top: -6%; /* Added margin-top for mobile */
  margin-bottom: -4%; /* Added margin-bottom for mobile */
}

.maintenance__icon {
  font-size: 6rem; /* Icon size */
  margin-bottom: 1.5rem; /* Spacing under icon */
  color: #007BFF; /* Primary color for icon */
  animation: float 3s ease-in-out infinite; /* Floating animation */
}

.maintenance__title {
  font-size: clamp(2.5rem, 8vw, 4rem); /* Responsive title size */
  font-weight: 900; /* Bold title */
  margin: 0; /* Remove default margins */
  background: linear-gradient(135deg, #007BFF, #00C6FF); /* Gradient text */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

.maintenance__subtitle {
  font-size: clamp(1.25rem, 4vw, 1.75rem); /* Responsive subtitle size */
  margin: 0.75rem 0 1.5rem; /* Margins for spacing */
  font-weight: 600; /* Medium weight for subtitle */
  color: #555; /* Subtitle color */
}

.maintenance__description {
  font-size: clamp(1rem, 3.5vw, 1.25rem); /* Responsive description size */
  line-height: 1.6; /* Better readability */
  margin-bottom: 2rem; /* Spacing at the bottom */
  color: #666; /* Description text color */
  max-width: 800px; /* Maximum width for readability */
  padding: 0 1rem; /* Side padding for mobile */
}

.maintenance__progress {
  width: 100%;
  max-width: 400px;
  height: 8px;
  background-color: #e0e0e0; /* Light grey background for progress bar */
  border-radius: 4px;
  overflow: hidden;
  margin-top: 2rem;
}

.maintenance__progress-bar {
  width: 60%; /* Progress bar width */
  height: 100%;
  background: linear-gradient(90deg, #007BFF, #00C6FF); /* Gradient progress bar */
  animation: progress 2s ease-in-out infinite; /* Progress bar animation */
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

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Mobile Optimization */
@media (max-width: 480px) {
  .maintenance {
    padding: 1.5rem;
    margin-top: -30%; /* Added margin-top for mobile */
  }

  .maintenance__icon {
    font-size: 4rem; /* Smaller icon on mobile */
  }

  .maintenance__description {
    font-size: 0.9rem; /* Smaller text for mobile */
  }

  .maintenance__title {
    font-size: 2rem; /* Adjust title size for mobile */
  }

  .maintenance__subtitle {
    font-size: 1.5rem; /* Adjust subtitle size for mobile */
  }

  .maintenance__progress {
    height: 6px; /* Thinner progress bar on mobile */
  }
}
</style>