<template>
  <div id="app">
    <!-- Modern Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-gradient">
      <div class="container">
        <!-- Logo and Brand Name -->
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img
            src="/images/boylove.png"
            alt="Thai BL Logo"
            class="me-2"
            style="height: 45px; width: auto;"
          />
          <span class="fw-bold">YSeriesHub</span>
        </router-link>

        <!-- Mobile Profile and Hamburger -->
        <div class="d-flex align-items-center d-lg-none">
          <!-- Profile Icon (Mobile Only) -->
          <div v-if="user" class="nav-item dropdown me-3">
            <a
              class="nav-link dropdown-toggle no-arrow"
              href="#"
              id="profileDropdownMobile"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                v-if="user.photoURL"
                :src="user.photoURL"
                alt="Profile Picture"
                class="rounded-circle"
                style="width: 30px; height: 30px; object-fit: cover;"
              />
              <i v-else class="fas fa-user"></i>
            </a>
            <!-- Dropdown Menu for Mobile -->
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdownMobile">
              <li>
                <router-link to="/profile" class="dropdown-item">
                  <i class=""></i>Profile
                </router-link>
              </li>
              <li>
                <a href="#" class="dropdown-item" @click="handleLogout">
                  <i class=""></i>Logout
                </a>
              </li>
            </ul>
          </div>

          <!-- Hamburger Menu -->
          <button class="navbar-toggler" type="button" @click="toggleSidebar">
            <div class="hamburger" :class="{ 'open': isSidebarOpen }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        <!-- Navbar Links (Hidden on Mobile) -->
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
              <router-link to="/songs" class="nav-link">Music</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/blog" class="nav-link">Blogs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pricing" class="nav-link">Pricing</router-link>
            </li>

            <!-- Add YChat Link -->
          <li class="nav-item">
            <router-link to="/ychat" class="nav-link">YChat</router-link>
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
                  <router-link to="/about" class="dropdown-item custom-dropdown-item">
                    <i class=""></i>About
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact" class="dropdown-item custom-dropdown-item">
                    <i class=" "></i>Contact
                  </router-link>
                </li>
                <li>
                  <router-link to="/feedback" class="dropdown-item custom-dropdown-item">
                    <i class=" "></i>Feedback
                  </router-link>
                </li>
                <li>
                  <router-link to="/thailator-ai" class="dropdown-item custom-dropdown-item">
                    <i class=""></i>Thai-Eng
                  </router-link>
                </li>
                <li>
                  <router-link to="/faq" class="dropdown-item custom-dropdown-item">
                    <i class=""></i>FAQs
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Login Link (Shown when user is not logged in) -->
            <li v-if="!user" class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>

            <!-- Profile Dropdown (Hidden on Mobile) -->
            <li v-else class="nav-item dropdown d-none d-lg-block">
              <a
                class="nav-link dropdown-toggle no-arrow"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  alt="Profile Picture"
                  class="rounded-circle"
                  style="width: 30px; height: 30px; object-fit: cover;"
                />
                <i v-else class="fas fa-user"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class=""></i>Profile
                  </router-link>
                </li>
                <li>
                  <a href="#" class="dropdown-item" @click="handleLogout">
                    <i class=""></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ open: isSidebarOpen }">
      <div class="logo_items flex">
        <span class="nav_image">
          <img src="/images/boylove.png" alt="logo_img" />
        </span>
        <span class="logo_name">YSeriesHub</span>
        <i class="bx bx-x" id="sidebar-close" @click="toggleSidebar" style="color: #000000;"></i>
      </div>

      <div class="menu_container">
        <div class="menu_items">
          <ul class="menu_item">
            <div class="menu_title flex">
              <span class="title">Dashboard</span>
            </div>
            <li class="item">
              <router-link to="/" class="link flex" @click="closeSidebar">
                <i class="bx bx-grid-alt"></i>
                <span>Home</span>
              </router-link>
            </li>
          </ul>

          <ul class="menu_item">
            <div class="menu_title flex">
              <span class="title">Content</span>
            </div>
            <li class="item">
              <router-link to="/recommendations" class="link flex" @click="closeSidebar">
                <i class="bx bx-grid-alt"></i>
                <span>All Series</span>
              </router-link>
            </li>
            <li class="item">
              <router-link to="/songs" class="link flex" @click="closeSidebar">
                <i class="bx bx-music"></i>
                <span>Music</span>
              </router-link>
            </li>
            <li class="item">
              <router-link to="/blog" class="link flex" @click="closeSidebar">
                <i class="bx bx-news"></i>
                <span>Blogs</span>
              </router-link>
            </li>
          </ul>

          <ul class="menu_item">
            <div class="menu_title flex">
              <span class="title">Messenges</span>
            </div>
            <li class="item">
              <router-link to="/ychat" class="link flex" @click="closeSidebar">
                <i class="bx bx-grid-alt"></i>
                <span>Ychat</span>
              </router-link>
            </li>
          </ul>

          <ul class="menu_item">
            <div class="menu_title flex">
              <span class="title">Others</span>
            </div>
            <li class="item">
              <router-link to="/about" class="link flex" @click="closeSidebar">
                <i class="bx bx-info-circle"></i>
                <span>About</span>
              </router-link>
            </li>
            <li class="item">
              <router-link to="/pricing" class="link flex" @click="closeSidebar">
                <i class="bx bx-dollar-circle"></i>
                <span>Subscription</span>
              </router-link>
            </li>
            <li class="item">
              <router-link to="/feedback" class="link flex" @click="closeSidebar">
                <i class="bx bx-comment-dots"></i>
                <span>Feedback</span>
              </router-link>
            </li>
            <li class="item">
              <router-link to="/thailator-ai" class="link flex" @click="closeSidebar">
                <i class="bx bx-info-circle"></i>
                <span>ThailatorAI</span>
              </router-link>
            </li>

            <li class="item">
              <router-link to="/faq" class="link flex" @click="closeSidebar">
                <i class="bx bx-question-mark"></i>
                <span>FAQs</span>
              </router-link>
            </li>
          </ul>

          <!-- Login/Logout Section -->
          <ul class="menu_item">
            <div class="menu_title flex">
              <span class="title">Account</span>
            </div>
            <!-- Show Login if user is not logged in -->
            <li v-if="!user" class="item">
              <router-link to="/login" class="link flex" @click="closeSidebar">
                <i class="bx bx-log-in"></i>
                <span>Login</span>
              </router-link>
            </li>
            <!-- Show Logout if user is logged in -->
            <li v-else class="item">
              <a href="#" class="link flex" @click="handleLogout">
                <i class="bx bx-log-out"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Sidebar Profile -->
        <div class="sidebar_profile flex" v-if="user">
          <span class="nav_image">
            <img :src="user.photoURL || '/images/profile.jpg'" alt="logo_img" />
          </span>
          <div class="data_text">
            <span class="name">{{ user.displayName || "User" }}</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Router View -->
    <router-view />

    <!-- Footer -->
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <span class="text-muted">© 2025 YSeriesHub. All rights reserved.</span>
      </div>
    </footer>
  </div>
</template>


<style>
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  cursor: pointer;
}


/* Mobile Profile and Hamburger Alignment */
.d-flex.align-items-center.d-lg-none {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust spacing between profile and hamburger */
}

/* Hide Profile in Navbar Links on Mobile */
.d-none.d-lg-block {
  display: none;
}

@media (min-width: 992px) {
  .d-none.d-lg-block {
    display: block;
  }
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #000000;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
</style>

<script>
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      isSidebarOpen: false, // Sidebar is closed by default
      user: null,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    async handleLogout() {
      try {
        await signOut(auth);
        this.user = null;
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
};
</script>



<style>
/* Import Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

#app {
  font-family: 'Poppins', sans-serif; /* Replace with your preferred font */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Pre css */
.flex {
  display: flex;
  align-items: center;
}


/* Sidebar Close Icon */
#sidebar-close {
  padding: 10px;
  color: #000000; /* Black color */
  font-size: 25px;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.3s ease;
}

#sidebar-close:hover {
  color: #4070f4; /* Highlight color on hover */
}

.nav_image {
  display: flex;
  min-width: 55px;
  justify-content: center;
}

.nav_image img {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
}


#sidebar-close {
  padding: 10px;
  color: #000000; /* Black color */
  font-size: 25px;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.3s ease;
}

#sidebar-close:hover {
  color: #4070f4; /* Highlight color on hover */
}

/* Remove the dropdown arrow */
.no-arrow::after {
  display: none !important;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: -300px; /* Hidden by default */
  height: 100%;
  width: 300px; /* Adjusted width */
  background: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: all 0.4s ease;
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
}

.sidebar.open {
  left: 0; /* Show sidebar */
}

.logo_items {
  gap: 10px;
  padding-left: 10px;
}

.logo_name {
  font-size: 24px;
  color: #2c3e50; /* Dark blue for contrast */
  font-weight: 600;
}

#sidebar-close {
  padding: 10px;
  color: #2c3e50;
  font-size: 25px;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.3s ease;
}

#sidebar-close:hover {
  color: #4070f4; /* Highlight color on hover */
}

.menu_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  overflow-y: auto;
  height: calc(100% - 100px);
}

.menu_container::-webkit-scrollbar {
  display: none;
}

.menu_title {
  position: relative;
  height: 50px;
  width: 100%;
  padding-left: 10px;
}

.menu_title .title {
  font-size: 18px;
  color: #2c3e50;
  font-weight: 600;
}

.menu_title .line {
  position: absolute;
  left: 10px;
  height: 3px;
  width: 30px;
  border-radius: 25px;
  background: #4070f4; /* Blue accent color */
}

.item {
  list-style: none;
  margin: 10px 0;
}

.link {
  text-decoration: none;
  border-radius: 8px;
  padding: 10px 15px;
  color: #2c3e50;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
}

.link:hover {
  color: #ffffff;
  background-color: #4070f4; /* Blue background on hover */
}

.link span {
  white-space: nowrap;
}

.link i {
  height: 50px;
  min-width: 55px;
  display: flex;
  font-size: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.sidebar_profile {
  padding-top: 20px;
  margin-top: 20px;
  gap: 15px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-left: 10px;
}

.sidebar_profile .name {
  font-size: 18px;
  color: #2c3e50;
  font-weight: 600;
}

.sidebar_profile .email {
  font-size: 14px;
  color: #666;
}

.navbar {
  background-color: rgba(255, 255, 255, 0.95); /* Almost white with slight opacity */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 70px; /* Slightly taller navbar */
  font-family: 'Poppins', sans-serif;
}

.navbar-dark .navbar-toggler-icon {
  background-image: none; /* Remove Bootstrap's default icon */
  color: #000000; /* Black color for the toggle icon */
}

.navbar-brand {
  color: #000000 !important; /* Black color for the brand */
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.nav-link {
  color: #000000 !important; /* Black color for the links */
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;

  letter-spacing: 0.4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #4070f4 !important; /* Highlight color on hover */
  transform: translateY(-2px);
}

/* Sidebar Close Icon */
#sidebar-close {
  padding: 10px;
  color: #000000; /* Black color */
  font-size: 25px;
  cursor: pointer;
  margin-left: auto;
  transition: all 0.3s ease;
}

#sidebar-close:hover {
  color: #4070f4; /* Highlight color on hover */
}


/* Footer */
.footer {
  font-family: 'Poppins', sans-serif;
  background-color: #2c3e50; /* Dark background for footer */
  color: #ffffff;
  padding: 20px 0;
}

/* Responsive */
@media screen and (max-width: 800px) {
  .sidebar {
    left: -300px;
  }

  .sidebar.open {
    left: 0;
  }

  #sidebar-close {
    display: block;
  }
}
</style>