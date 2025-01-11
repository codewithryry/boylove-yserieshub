<template>
    <div class="blocked">
      <div class="content">
        <!-- Icon -->
        <div class="icon">
          <i class="fas fa-ban"></i> <!-- Font Awesome ban icon -->
        </div>
        <h1 class="title">Access Denied</h1>
        <p class="subtitle">Oops! You don't have permission to access this page.</p>
        <p class="description">
          If you believe this is an error, please contact support.
        </p>
        <router-link to="/" class="home-link">
          Go Back Home
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Blocked',
  };
  </script>
  
  <style scoped>
  .blocked {
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
  
  .icon {
    font-size: 6rem;
    margin-bottom: 20px;
    color: #ff6b6b; /* Red color for the icon */
    animation: float 3s ease-in-out infinite;
  }
  
  .title {
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .subtitle {
    font-size: 1.5rem;
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