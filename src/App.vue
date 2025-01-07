<template>
  <div id="app">
    <!-- Modern Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-gradient">
      <div class="container">
        <!-- Logo and Brand Name -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img
            src="/images/boylovelogo.png"
            alt="Thai BL Logo"
            class="me-2"
            style="height: 35px; width: auto;"
          />
          <span class="fw-bold">Thai BL</span>
        </router-link>

        <!-- Toggle Button for Mobile -->
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleSidebar"
        >
          <i class="fas fa-bars navbar-toggler-icon-black"></i>
        </button>

        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Other Nav Items -->
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recommendations" class="nav-link">Series</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/songs" class="nav-link">Ost</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/blog" class="nav-link">Blogs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pricing" class="nav-link">Pricing</router-link>
            </li>

            <!-- More Dropdown -->
<li class="nav-item dropdown">
  <a
    class="nav-link dropdown-toggle"
    href="#"
    id="navbarDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    More
  </a>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
    <li>
      <router-link to="/about" class="dropdown-item custom-dropdown-item">About</router-link>
    </li>
    <li>
      <router-link to="/contact" class="dropdown-item custom-dropdown-item">Contact</router-link>
    </li>
    <li>
      <router-link to="/feedback" class="dropdown-item custom-dropdown-item">Feedback</router-link>
    </li>
    <li>
      <router-link to="/thailator-ai" class="dropdown-item custom-dropdown-item">Thai-Eng</router-link>
    </li>
    <li>
      <router-link to="/faq" class="dropdown-item custom-dropdown-item">View FAQs</router-link>
    </li>
  </ul>
</li>

            <!-- Login Link (Shown when user is not logged in) -->
            <li v-if="!user" class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>

      
      <!-- Profile Dropdown (Shown when user is logged in) -->
<li v-else class="nav-item dropdown">
  <a
    class="nav-link dropdown-toggle no-arrow" 
    href="#"
    id="profileDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <!-- Display User's Profile Picture -->
    <img
      v-if="user.photoURL"
      :src="user.photoURL"
      alt="Profile Picture"
      class="rounded-circle"
      style="width: 30px; height: 30px; object-fit: cover;"
    />
    <!-- Fallback to User Icon if No Profile Picture -->
    <i v-else class="fas fa-user"></i>
  </a>
  <ul class="dropdown-menu" aria-labelledby="profileDropdown">
    <li>
      <router-link to="/profile" class="dropdown-item">View Profile</router-link>
    </li>
    <li>
      <a href="#" class="dropdown-item" @click="handleLogout">Logout</a>
    </li>
  </ul>
</li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sidebar for Mobile -->
    <div class="sidebar-overlay" :class="{ show: isSidebarOpen }" @click="closeSidebar"></div>
    <div class="sidebar" :class="{ show: isSidebarOpen }">
      <button class="sidebar-close" @click="closeSidebar">
        <i class="fas fa-times"></i>
      </button>
      <br>
      <ul class="sidebar-nav">
        <!-- Sidebar Links -->
        <li class="sidebar-item">
          <router-link to="/" class="sidebar-link" @click="closeSidebar">Home</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/recommendations" class="sidebar-link" @click="closeSidebar">Series</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/blog" class="sidebar-link" @click="closeSidebar">Blogs</router-link>
        </li>
  
        <!-- Profile Links in Sidebar (Shown when user is logged in) -->
        <template v-if="user">
          <li class="sidebar-item">
            <a href="#" class="sidebar-link" @click="handleLogout">Logout</a>
          </li>
        </template>

        <!-- Login Link in Sidebar (Shown when user is not logged in) -->
        <li v-else class="sidebar-item">
          <router-link to="/login" class="sidebar-link" @click="closeSidebar">Login</router-link>
        </li>
      </ul>
    </div>

    <!-- Router View -->
    <router-view />

    <!-- Footer -->
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2025 Thai BL Recommendations. All rights reserved.</span>
      </div>
    </footer>
  </div>
</template>


<script>
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      isSidebarOpen: false, // Track sidebar state
      user: null, // Tracks the logged-in user
    };
  },
  methods: {
    // Toggle sidebar
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    // Close sidebar
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    // Logout method
    async handleLogout() {
      try {
        await signOut(auth);
        this.user = null; // Clear the user state
        this.$router.push("/login"); // Redirect to login page
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    },
  },
  mounted() {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      this.user = user; // Update the user state
    });
  },
};
</script>



<style>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.no-arrow::after {
  display: none !important;
}

/* Navbar Styling */
.navbar {
  background: linear-gradient(135deg, #2c3e50, #1a252f); /* Gradient background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.5rem;
  color: #000000 !important;
}

.nav-link {
  color: rgba(0, 0, 0, 0.8) !important;
  font-weight: 600;
  margin: 0 10px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #000000 !important;
  transform: translateY(-2px); /* Lift effect on hover */
}

/* Dropdown Menu Styling */
.dropdown-menu {
  border: none;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.dropdown-item {
  color: #000000 !important;
  font-weight: 600;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  color: #3d3636 !important;
  background: transparent;
  transform: translateX(5px); /* Slide effect on hover */
}
.navbar-toggler-icon-black {
  color: #000000; /* Black color */
}

/* Sidebar Styling */
.sidebar {
  position: fixed;
  top: 0;
  right: -280px; /* Hide sidebar by default on the right */
  width: 280px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1); /* Shadow on the left side */
  transition: all 0.3s ease;
  z-index: 1000;
}

.sidebar.show {
  right: 0; /* Show sidebar when toggled */
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
  transition: all 0.3s ease;
}

.sidebar-overlay.show {
  display: block; /* Show overlay when sidebar is open */
}

.sidebar-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #000000;
  cursor: pointer;
}

.sidebar-nav {
  list-style: none;
  padding: 20px;
  margin: 0;

}

.sidebar-item {
  margin: 15px 0;
}

.sidebar-link {
  color: #000000;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: block;
}

.sidebar-link:hover {
  background-color: #ffffff;
  color: #000000;
  transform: translateX(5px);
}
</style>