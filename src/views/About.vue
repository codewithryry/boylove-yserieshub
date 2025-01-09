<template>
  <div class="about py-4">
    <div class="container">
      <!-- Main Heading with Animation -->
      <h1 class="text-center mb-4 fw-bold animate__animated animate__fadeInDown">About YSeriesHub</h1>
      
      <!-- Split Layout for About Us and Project Details -->
      <div class="row align-items-center">
        <!-- About Us Section (Text Only) -->
        <div class="col-md-12">
          <section class="mb-5">
            <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-1s">
              Welcome to YSeriesHub, your ultimate platform for exploring, discussing, and celebrating the captivating world of Boys' Love series! Created by passionate fans for fans, this platform offers a seamless and engaging experience where you can discover new shows and connect with like-minded enthusiasts.
            </p>
            <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-3s">
              Join us and dive deeper into Boys' Love series, share your favorite moments, and be part of a growing community that celebrates storytelling, inclusivity, and connection!
            </p>
            <!-- Additional About Us Section -->
            <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-4s">
              YSeriesHub isn't just a platform; it's a thriving community. We aim to provide a safe, inclusive, and engaging space where people from all walks of life can come together to appreciate the diverse world of Boys' Love series.
            </p>

            <p class="lead text-justify animate__animated animate__fadeInUp animate__delay-6s">
              Stay tuned for future updates as we evolve and work on making YSeriesHub the best place for all things Boys' Love!
            </p>
            <!-- Team Section -->
            <div class="team-section mt-5 text-center animate__animated animate__fadeInUp animate__delay-8s">
              <h2 class="fw-bold">Meet the Founder</h2>
              <p class="founder-text">
                YSeriesHub is brought to you by a passionate of fans who are dedicated to creating the best experience for our community.
              </p>
              <!-- Team Members (Placeholder) -->
              <div class="row mt-4 justify-content-center">
                <div class="col-md-4 text-center">
                  <img src="images/profile.jpg" alt="Team Member 1" class="rounded-circle img-fluid mb-3 team-member">
                  <h5>Codewithryry | Reymel Mislang </h5>
                  <p>BL Fan & Programmer</p>
                </div>
              </div>
            </div>
            <!-- Upcoming Features Section -->
            <div class="upcoming-features mt-5 text-center animate__animated animate__fadeInUp animate__delay-7s">
              <h2 class="fw-bold">Upcoming Features</h2>
              <ul class="list-unstyled">
                <li><i class="bi bi-check-circle"></i> User-driven content creation and reviews</li>
                <li><i class="bi bi-check-circle"></i> Episode guides and discussions</li>
                <li><i class="bi bi-check-circle"></i> Exclusive member-only events</li>
                <li><i class="bi bi-check-circle"></i> Improved recommendation algorithms</li>
              </ul>
            </div>
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
/* Importing fonts and animation */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

/* General Styling */
.about {
  font-family: 'Poppins', sans-serif;
  background: #ffffff; /* White background */
  padding: 80px 0;
}

h1 {
  font-size: 3.5rem;
  font-weight: 900;
  color: #2c3e50;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
}

.lead {
  font-size: 1.2rem; /* Font size for About Us section */
  color: #555;
  line-height: 1.8;
  margin-bottom: 25px;
  text-align: justify;
}

/* Team Section Styling */
.team-section h2 {
  color: #2c3e50;
}

.team-section p.founder-text {
  font-size: 1rem; /* Smaller font size for Meet the Founder text */
  color: #555;
  line-height: 1.6;
  margin-bottom: 25px;
}

.team-section img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-section img:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Upcoming Features Styling */
.upcoming-features ul {
  list-style-type: none;
  padding: 0;
  font-size: 1.2rem; /* Match font size with About Us section */
  color: #2c3e50;
}

.upcoming-features li {
  margin: 10px 0;
  display: flex;
  align-items: center;
}

.upcoming-features i {
  color: #2c3e50;
  margin-right: 10px;
  font-size: 1.3rem;
}

/* Responsive Design for Upcoming Features */
@media (max-width: 768px) {
  .upcoming-features h2 {
    font-size: 2rem; /* Smaller heading on medium screens */
  }

  .upcoming-features ul {
    font-size: 1rem; /* Smaller text on medium screens */
  }

  .upcoming-features li {
    margin: 8px 0; /* Reduce spacing between list items */
  }
}

@media (max-width: 576px) {
  .upcoming-features h2 {
    font-size: 1.75rem; /* Even smaller heading on small screens */
  }

  .upcoming-features ul {
    font-size: 0.95rem; /* Smaller text on small screens */
  }

  .upcoming-features li {
    margin: 6px 0; /* Further reduce spacing between list items */
  }
}

/* Deepseek Mention Styling */
.deepseek-mention {
  font-size: 0.375rem; /* Smaller font size */
  color: #000000; /* Light gray color */
  margin-top: 40px; /* Add some spacing above */
}

.deepseek-mention a {
  color: #888; /* Light gray color for the link */
  text-decoration: none; /* Remove underline */
  transition: color 0.3s ease;
}

.deepseek-mention a:hover {
  color: #555; /* Slightly darker on hover */
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  .lead {
    font-size: 1.2rem; /* Ensure consistent font size for .lead on mobile */
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .row {
    flex-direction: column;
    padding-left: 15px;
    padding-right: 15px;
  }

  .col-md-12 {
    width: 100%;
  }

  .container {
    padding: 0 15px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .lead {
    font-size: 1.2rem; /* Ensure consistent font size for .lead on small screens */
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .about {
    padding: 60px 0;
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