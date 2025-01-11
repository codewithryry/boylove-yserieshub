<template>
  <div class="about py-4">
    <div class="container">
      <!-- Main Heading -->
      <h1 class="mb-4 fw-bold text-left">About</h1>
      
      <!-- About Us Section -->
      <section class="about-section mb-5">
        <div class="row align-items-stretch">
          <!-- Text Content -->
          <div class="col-md-8 order-md-1 order-2">
            <div class="h-100 d-flex flex-column justify-content-center">
              <p class="lead text-justify">
                Welcome to <strong>YSeriesHub</strong>, your ultimate platform for exploring, discussing, and celebrating the captivating world of Boys' Love series! Created by passionate fans for fans, this platform offers a seamless and engaging experience where you can discover new shows and connect with like-minded enthusiasts.
              </p>
              <p class="lead text-justify">
                Join us and dive deeper into Boys' Love series, share your favorite moments, and be part of a growing community that celebrates storytelling, inclusivity, and connection!
              </p>
              <p class="lead text-justify">
                YSeriesHub isn't just a platform; it's a thriving community. We aim to provide a safe, inclusive, and engaging space where people from all walks of life can come together to appreciate the diverse world of Boys' Love series.
              </p>
            </div>
          </div>
          <!-- Image or Illustration (Hidden on Mobile) -->
          <div class="col-md-4 text-center order-md-2 order-1 d-none d-md-block">
            <div class="card border-0 shadow-lg h-100" style="max-width: 300px; margin: 0 auto;">
              <img src="images/about.jpg" class="card-img-top" alt="About YSeriesHub">
            </div>
          </div>
        </div>
      </section>

      <!-- Mission and Vision Section -->
      <section class="mission-vision mb-5">
        <div class="row">
          <!-- Mission -->
          <div class="col-md-6 mb-4 mb-md-0">
            <h2 class="fw-bold mb-4 text-left">Our Mission</h2>
            <p class="lead text-justify">
              To create a vibrant and inclusive community where fans of Boys' Love series can connect, share, and celebrate their love for storytelling. We strive to provide a platform that empowers fans to discover new series, engage in meaningful discussions, and feel a sense of belonging.
            </p>
          </div>
          <!-- Vision -->
          <div class="col-md-6">
            <h2 class="fw-bold mb-4 text-left">Our Vision</h2>
            <p class="lead text-justify">
              To become the go-to platform for Boys' Love fans worldwide, offering a seamless and enriching experience that fosters creativity, inclusivity, and connection. We envision a future where every fan feels valued and inspired to share their passion.
            </p>
          </div>
        </div>
      </section>

      <!-- Why Choose Us Section -->
      <section class="why-choose-us mb-5">
        <h2 class="fw-bold mb-4 text-left">Why Choose YSeriesHub?</h2>
        <div class="row">
          <!-- Reason 1 -->
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-people-fill fs-1 text-primary mb-3"></i>
                <h5 class="fw-bold">Passionate Community</h5>
                <p class="text-muted">
                  Join a vibrant community of BL fans who share your love for storytelling and inclusivity.
                </p>
              </div>
            </div>
          </div>
          <!-- Reason 2 -->
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-collection-play-fill fs-1 text-primary mb-3"></i>
                <h5 class="fw-bold">Extensive Library</h5>
                <p class="text-muted">
                  Explore a vast collection of Boys' Love series, from classics to the latest releases.
                </p>
              </div>
            </div>
          </div>
          <!-- Reason 3 -->
          <div class="col-md-4 mb-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i class="bi bi-chat-dots-fill fs-1 text-primary mb-3"></i>
                <h5 class="fw-bold">Engaging Discussions</h5>
                <p class="text-muted">
                  Participate in meaningful discussions, episode breakdowns, and fan theories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Importing fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

/* General Styling */
.about {
  font-family: 'Poppins', sans-serif;
  background: #ffffff;
  padding: 60px 0;
}

h1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: left;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: left;
}

.lead {
  font-size: 1rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: justify;
}

/* About Section */
.about-section img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Mission and Vision Section */
.mission-vision h2 {
  font-size: 1.75rem;
  color: #2c3e50;
}

.mission-vision p {
  font-size: 1rem;
  color: #555;
}

/* Why Choose Us Section */
.why-choose-us .card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.why-choose-us .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.why-choose-us .card-body {
  padding: 2rem;
}

.why-choose-us i {
  color: #6a11cb;
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .lead {
    font-size: 0.95rem;
  }

  .about-section img {
    margin-top: 20px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .lead {
    font-size: 0.9rem;
  }
}
</style>

<script>
export default {
  name: 'About',
};
</script>