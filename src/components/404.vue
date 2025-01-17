<template>
  <div class="not-found">
    <div class="content">
      <h1 class="title">404</h1>
      <p class="subtitle">Oops! Page Not Found</p>
      <p class="description">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundModern',
};
</script>

<style scoped>
/* Base Styles */
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb); /* Light grey gradient */
  color: #1f2937; /* Neutral dark color for text */
  font-family: 'Inter', sans-serif;
  padding: 20px;
  animation: fadeIn 0.8s ease-in-out;
  margin-top: -2%; /* Added margin-top for mobile */
  margin-bottom: -4%; /* Added margin-bottom for mobile */
}

.content {
  text-align: center;
  max-width: 600px;
}

.title {
  font-size: clamp(6rem, 15vw, 10rem); /* Responsive font size */
  font-weight: 900;
  margin: 0;
  background: linear-gradient(45deg, #6366f1, #38bdf8); /* Gradient for title text */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: float 3s ease-in-out infinite;
}

.subtitle {
  font-size: clamp(1.5rem, 5vw, 2.5rem); /* Responsive font size */
  font-weight: 600;
  margin: 10px 0;
  color: #4b5563; /* Neutral color for subtitle */
}

.description {
  font-size: clamp(1rem, 4vw, 1.5rem); /* Responsive font size */
  margin: 20px 0;
  color: #6b7280; /* Grey color for description */
  line-height: 1.5; /* Improved readability through line spacing */
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #6366f1, #38bdf8); /* Gradient background */
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.home-link:hover {
  background: linear-gradient(90deg, #38bdf8, #6366f1); /* Reversed gradient on hover */
  transform: translateY(-2px);
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
  .not-found{
    margin-top: -30%; /* Added margin-top for mobile */
  }
  .title {
    font-size: 5rem; /* Adjust title size for smaller screens */
  }

  .description {
    font-size: 1rem; /* Ensure readability on mobile */
  }

  .home-link {
    width: 100%;
    max-width: 300px;
    padding: 1em; /* Easier tap interaction for mobile users */
    font-size: 1.1rem; /* Slightly larger text for better readability */
  }
}
</style>