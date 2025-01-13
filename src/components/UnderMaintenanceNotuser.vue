<template>
  <div class="maintenance">
    <div class="maintenance__icon">🔧</div>
    <h1 class="maintenance__title">We're Improving!</h1>
    <p class="maintenance__subtitle"></p>
    <p class="maintenance__description">
      Our website is currently undergoing essential updates to enhance your experience. We appreciate your understanding during this time.
    </p>
  </div>
</template>

<script>
export default {
  name: 'UnderMaintenanceNoBox',
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
  background: linear-gradient(135deg, #e0f7fa, #fce4ec); /* Soft gradient background */
  color: #333; /* Text color */
  font-family: 'Inter', sans-serif; /* Modern font */
  text-align: center; /* Center text alignment */
  padding: 2rem; /* Padding around content */
}

.maintenance__icon {
  font-size: 6rem; /* Icon size */
  margin-bottom: 1rem; /* Spacing under icon */
  animation: bounce 2s infinite; /* Bouncing animation for the icon */
}

.maintenance__title {
  font-size: clamp(2.5rem, 8vw, 4rem); /* Responsive title size */
  font-weight: 900; /* Bold title */
  margin: 0; /* Remove default margins */
  color: #007BFF; /* Primary color for title */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1); /* Subtle text shadow */
}

.maintenance__subtitle {
  font-size: clamp(1.5rem, 5vw, 2rem); /* Responsive subtitle size */
  margin: 0.5rem 0; /* Margins for spacing */
  font-weight: 500; /* Medium weight for subtitle */
  color: #555; /* Subtitle color */
}

.maintenance__description {
  font-size: clamp(1rem, 3.5vw, 1.25rem); /* Responsive description size */
  line-height: 1.5; /* Better readability */
  margin-bottom: 2rem; /* Spacing at the bottom */
  color: #666; /* Description text color */
  max-width: 800px; /* Maximum width for readability */
  padding: 0 1rem; /* Side padding for mobile */
}

/* Animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px); /* More exaggerated bounce */
  }
}

/* Mobile Optimization */
@media (max-width: 480px) {
  .maintenance__icon {
    font-size: 5rem; /* Smaller icon on mobile */
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
}
</style>