<template>
  <div class="not-found">
    <div class="content">
      <h1 class="title">404</h1>
      <p class="subtitle">Oops! Page Not Found</p>
      <p class="description">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <router-link to="/" class="home-link">
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.7), rgba(37, 117, 252, 0.7)); /* Semi-transparent gradient */
  color: #fff;
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

.content {
  text-align: center;
  max-width: 600px;
  animation: fadeIn 1s ease-in-out;
}

.title {
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: float 3s ease-in-out infinite;
}

.subtitle {
  font-size: 2rem;
  font-weight: 600;
  margin: 10px 0;
}

.description {
  font-size: 1.25rem;
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.8);
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #6a11cb;
  background: #fff;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.home-link:hover {
  background: #f0f0f0;
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
</style>