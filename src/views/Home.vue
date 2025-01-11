<template>
  <div class="home" @mousemove="onUserActivity" @click="onUserActivity">
    <!-- Video Background -->
    <video ref="videoPlayer" autoplay muted loop playsinline class="video-background">
      <source :src="videoSource" type="video/mp4" />
      <img src="/images/fallback-image.jpg" alt="Fallback Image" />
      Your browser does not support the video tag.
    </video>

    <!-- Hero Section -->
    <div class="hero-section text-center">
      <h1 class="display-3 fw-bold mobile-hide">Heart of Thai Boys' Love!</h1>
      <p class="lead fs-2">Find your next favorite series and immerse yourself in heartfelt tales of romance and connection</p>
      <router-link to="/recommendations" class="btn btn-lg btn-primary mt-3">
        Explore Recommendations
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      inactivityTimer: null, // Timer for resuming video playback
      isMobile: false, // Track if the device is mobile
    };
  },
  computed: {
    // Dynamically set the video source based on screen size
    videoSource() {
      return this.isMobile ? '/images/home-move-bg.mp4' : '/images/home.mp4';
    },
  },
  mounted() {
    // Check if the device is mobile on mount
    this.checkIfMobile();

    // Start playing the video when the component is mounted
    this.playVideo();

    // Set up event listeners for user activity
    window.addEventListener('mousemove', this.onUserActivity);
    window.addEventListener('click', this.onUserActivity);

    // Update the video source on window resize
    window.addEventListener('resize', this.checkIfMobile);
  },
  beforeUnmount() {
    // Clean up event listeners when the component is destroyed
    window.removeEventListener('mousemove', this.onUserActivity);
    window.removeEventListener('click', this.onUserActivity);
    window.removeEventListener('resize', this.checkIfMobile);

    // Clear any existing timers
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    // Pause the video before unmounting
    this.pauseVideo();
  },
  methods: {
    playVideo() {
      const video = this.$refs.videoPlayer;
      if (video) {
        video.play().catch((error) => {
          console.error('Video play failed:', error);
        });
      }
    },
    pauseVideo() {
      const video = this.$refs.videoPlayer;
      if (video) {
        video.pause();
      }
    },
    onUserActivity() {
      // Pause the video when user is active
      this.pauseVideo();

      // Clear any existing timers
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
      }

      // Set a timer to resume playback after 3 seconds of inactivity
      this.inactivityTimer = setTimeout(() => {
        this.playVideo();
      }, 3000);
    },
    checkIfMobile() {
      // Update the isMobile flag based on screen width
      this.isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed
    },
  },
};
</script>

<style scoped>
/* Modern Home Page Styling */
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Required for positioning the video and overlay */
  overflow: hidden; /* Ensure video doesn't overflow */
  color: white; /* White text for better contrast */
  font-family: 'Poppins', sans-serif; /* Modern font */
}

/* Video Background */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure video covers the entire area */
  z-index: -1; /* Place the video behind the content */
}

/* Gradient Overlay */
.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.7), rgba(37, 117, 252, 0.7)); /* Semi-transparent gradient */
  z-index: 0; /* Place the overlay above the video but behind the content */
}

.hero-section {
  max-width: 800px;
  padding: 20px;
  animation: fadeIn 1.5s ease-in-out; /* Fade-in animation */
  z-index: 1; /* Ensure content is above the video and overlay */
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: slideIn 1s ease-in-out; /* Slide-in animation */
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  animation: slideIn 1.2s ease-in-out; /* Slide-in animation */
}

.btn-primary {
  background-color: #ff6f61; /* Coral color for the button */
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  border-radius: 50px; /* Rounded button */
  transition: all 0.3s ease;
  animation: fadeIn 1.5s ease-in-out; /* Fade-in animation */
}

.btn-primary:hover {
  background-color: #ff4a3d; /* Darker coral on hover */
  transform: translateY(-5px); /* Slight lift on hover */
}

/* Keyframe Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.2rem;
  }

  .btn-primary {
    font-size: 1rem;
    padding: 10px 25px;
  }

  /* Hide the <h1> tag on mobile */
  .mobile-hide {
    display: none;
  }
}
</style>