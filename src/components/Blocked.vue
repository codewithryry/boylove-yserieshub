<template>
  <div class="blocked">
    <div class="content">
      <!-- Icon -->
      <div class="icon">
        <i class="fas fa-ban"></i> <!-- Font Awesome ban icon -->
      </div>
      <h1 class="title">Access Denied</h1>
      <p class="subtitle">Oops! You don't have permission to access this page.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockedModern',
};
</script>

<style scoped>
/* Base Styles */
.blocked {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9fafb, #e5e7eb); /* Light grey gradient */
  color: #1f2937; /* Neutral dark text color */
  font-family: 'Inter', sans-serif;
  padding: 20px;
  animation: fadeIn 0.8s ease-in-out;
  margin-top: -5%; /* Added margin-top for mobile */
  margin-bottom: -4%; /* Added margin-bottom for mobile */
}

.content {
  text-align: center;
  max-width: 600px;
}

.icon {
  font-size: 6rem;
  margin-bottom: 20px;
  color: #dc2626; /* Red color for icon indicating an error */
  animation: float 3s ease-in-out infinite;
}

.title {
  font-size: clamp(2.5rem, 6vw, 4rem); /* Responsive title size */
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #ef4444, #fca5a1); /* Gradient for the title */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: clamp(1.25rem, 4vw, 2rem); /* Responsive subtitle size */
  font-weight: 400;
  margin: 10px 0;
  color: #4b5563; /* Neutral subtitle color */
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #3b82f6, #60a5fa); /* Blue gradient background */
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.home-link:hover {
  background: linear-gradient(90deg, #2563eb, #3b82f6); /* Darker gradient on hover */
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
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

/* Mobile Optimization */
@media (max-width: 480px) {
  .blocked{
    margin-top: -30%; /* Added margin-top for mobile */
  }
  .icon {
    font-size: 4rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .home-link {
    width: 100%;
    padding: 1em;
    font-size: 1.1rem; /* Slightly larger text on mobile for better readability */
  }
}
</style>