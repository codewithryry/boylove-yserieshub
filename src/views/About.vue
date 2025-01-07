<template>
    <div class="about py-5">
      <div class="container">
        <!-- Main Heading with Animation -->
        <h1 class="text-center mb-4 fw-bold animate__animated animate__fadeInDown">About Us</h1>
  
        <!-- Audio for Background Sound -->
        <audio autoplay loop>
          <source src="/sounds/about.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
  
        <!-- Split Layout for About Us and Project Details -->
        <div class="row align-items-center">
          <!-- About Us Section (Left Side with Video) -->
          <div class="col-md-6">
            <section class="mb-5">
              <div class="about-video animate__animated animate__fadeInLeft">
                <video autoplay loop muted class="img-fluid rounded shadow-lg">
                  <source src="/images/about.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          </div>
  
          <!-- Project Details Section (Right Side) -->
          <div class="col-md-6">
            <section class="mb-5">
              <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-1s">
                Welcome to <strong>Thai BL Recommendations</strong>, your ultimate destination for all things related to Thai Boys' Love (BL) series! 
                We are a group of passionate fans dedicated to celebrating the captivating stories, unforgettable characters, and heartfelt 
                relationships that define this beloved genre.
              </p>
              <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-2s">
                Our mission is to create a vibrant community where fans can explore, discuss, and fall in love with Thai BL series. Whether you're 
                a long-time enthusiast or new to the genre, we aim to provide you with comprehensive recommendations, in-depth reviews, and the 
                latest updates on your favorite shows.
              </p>
              <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-3s">
                Join us as we dive into the world of Thai BL, share our favorite moments, and connect with like-minded fans from around the globe. 
                Together, let's celebrate the beauty of love and storytelling!
              </p>
            </section>
          </div>
        </div>
  
        <!-- Technical Details and Contributors Section -->
        <div class="row mt-5">
          <div class="col-md-12">
            <section class="mb-5">
              <h2 class="text-center mb-4 fw-bold animate__animated animate__fadeInDown animate__delay-4s">Project Details</h2>
              <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-4s">
                This project is built using <strong>Vue.js</strong>, a progressive JavaScript framework for building user interfaces. The source code is available on GitHub, and we encourage contributions from the community.
              </p>
              <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-5s">
                Special thanks to <strong>DeepSeek Chat</strong> for providing AI-powered assistance in developing this project. The AI has been instrumental in generating code snippets, debugging, and offering suggestions to improve the overall quality of the application.
              </p>
              <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-6s">
                This project is maintained by <strong>codewithryry</strong>, who is passionate about both technology and Thai BL series. Feel free to reach out if you have any questions or suggestions!
              </p>
  
              <br>
             
            </section>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'About',
  };
  </script>
  
  <style scoped>
  /* Modern Font */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
  
  .about {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef); /* Gradient background */
    padding: 80px 0;
  }
  
  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    color: #2c3e50; /* Dark text for better readability */
    margin-bottom: 40px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 2.75rem;
    font-weight: 800;
    color: #2c3e50;
    margin-bottom: 30px;
  }
  
  .lead {
    font-size: 1.3rem;
    color: #555;
    line-height: 1.8; /* Improved readability */
    margin-bottom: 25px;
    text-align: justify; /* Justify text */
  }
  
  .about-video video {
    max-width: 90%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .about-video video:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
  
  /* Align Video and Text Vertically */
  .row.align-items-center {
    display: flex;
    align-items: center;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    h1 {
      font-size: 2.75rem;
    }
  
    h2 {
      font-size: 2.25rem;
    }
  
    .lead {
      font-size: 1.15rem;
    }
  
    .row {
      flex-direction: column;
    }
  
    .col-md-6 {
      width: 100%;
    }
  }
  
  /* Button Styling */
  .btn-primary {
    background-color: #2c3e50;
    border-color: #2c3e50;
    transition: all 0.3s ease;
    padding: 12px 24px;
    font-size: 1.25rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .btn-primary:hover {
    background-color: #1a252f;
    border-color: #1a252f;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
    transition: all 0.3s ease;
    padding: 12px 24px;
    font-size: 1.25rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .btn-success:hover {
    background-color: #218838;
    border-color: #218838;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  /* Animation Delays */
  .animate__delay-1s {
    animation-delay: 0.5s;
  }
  
  .animate__delay-2s {
    animation-delay: 1s;
  }
  
  .animate__delay-3s {
    animation-delay: 1.5s;
  }
  
  .animate__delay-4s {
    animation-delay: 2s;
  }
  
  .animate__delay-5s {
    animation-delay: 2.5s;
  }
  
  .animate__delay-6s {
    animation-delay: 3s;
  }
  
  .animate__delay-7s {
    animation-delay: 3.5s;
  }
  </style>