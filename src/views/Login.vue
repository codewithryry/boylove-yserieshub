<template>
  <div>
    <!-- Navbar with Google Login Button -->
    <section class="py-3 py-md-5 py-xl-8" style="background: linear-gradient(135deg, rgba(106, 17, 203, 0.7), rgba(37, 117, 252, 0.7));">
      <div class="container">
        <div class="row gy-4 align-items-center">
          <!-- Left Column: Notification Message -->
          <div class="col-12 col-md-6 col-xl-7">
            <div class="notification-message text-white p-4 rounded-4">
              <p class="lead mb-4">
                Please note that <strong>only Google login</strong> is currently available. 
                Other login methods are under development and will be available soon.
              </p>
            </div>
          </div>

          <!-- Right Column: Login Form -->
          <div class="col-12 col-md-6 col-xl-5">
            <div class="card border-0 rounded-4">
              <div class="card-body p-3 p-md-4 p-xl-5">
                <div class="row">
                  <div class="col-12">
                    <div class="mb-4">
                      <h3>Login</h3>
                    </div>
                  </div>
                </div>
                <form action="#!">
                  <div class="row gy-3 overflow-hidden">
                    <!-- Disabled email input -->
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          required
                          disabled
                        />
                        <label for="email" class="form-label">Email</label>
                      </div>
                    </div>
                    <!-- Disabled password input -->
                    <div class="col-12">
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          id="password"
                          value=""
                          placeholder="Password"
                          required
                          disabled
                        />
                        <label for="password" class="form-label">Password</label>
                      </div>
                    </div>
                    <div class="col-12">
                    </div>
                    <div class="col-12">
                      <div class="d-grid">
                        <button class="btn btn-primary btn-lg" type="submit" disabled>Log in now</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="row">
                  <div class="col-12">
                    <p class="mt-4 mb-4">Or continue with</p>
                    <div class="d-flex gap-2 gap-sm-3 justify-content-center">
                      <!-- Google Login Button -->
                      <a
                        href="#!"
                        class="btn btn-outline-danger bsb-btn-circle bsb-btn-circle-2xl"
                        @click="handleGoogleLogin"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-google"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                          />
                        </svg>
                      </a>
                      <!-- Disabled Facebook Login Button -->
                      <a href="#!" class="btn btn-outline-primary bsb-btn-circle bsb-btn-circle-2xl" disabled>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-facebook"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                          />
                        </svg>
                      </a>
                      <!-- Disabled Apple Login Button -->
                      <a href="#!" class="btn btn-outline-dark bsb-btn-circle bsb-btn-circle-2xl" disabled>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          class="bi bi-apple"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.031-.496-.19-.14-.228-.468-.391-.74-.473-.951-.703-.854-.698-1.094.005-.292.266-.399.7-.288.008-.266 0-.52-.26-.754-.194-.281-.351-.215-.587-.53-.133-.146-.337-.55-.572-.295-.058.011-.251-.009-.585.243-.351.261-.591.824-.464 1.236a3.125 3.125 0 0 0 2.513 2.37c-.079.318-.195.484-.37.61-.536.314-.941-.23-.744-.699.63-2.426.099-2.73.596-3.246-.288-.197-.574-.421-.832-.643-.133-.199-.093-.5-.007-.732.268-.473-.453-.307-.67-.652a2.088 2.088 0 0 0-.704-.348l-.306-.438-.362-.45Z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </section>
  </div>
</template>










<script>
import { auth, googleProvider, signInWithPopup, signOut, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      user: null,
      isAdmin: false, // Add a flag to track admin status
    };
  },
  methods: {
    async handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    this.user = result.user;

    // Save user data to Firestore
    await this.saveUserToFirestore(this.user);

    // Check if the user is an admin
    await this.checkIfAdmin(this.user.uid);

    // Redirect based on admin status
    if (this.isAdmin) {
      this.$router.push("/"); // Redirect to admin dashboard
    } else {
      this.$router.push("/"); // Redirect to home page for regular users
    }
  } catch (error) {
    console.error("Error during Google login:", error.message);
    alert("Login failed: " + error.message); // Fallback for toast notification
  }
},
    async saveUserToFirestore(user) {
  const userRef = doc(db, "users", user.uid); // Reference to the user's document
  const userDoc = await getDoc(userRef);

  // If the user document doesn't exist, create it with a default role of "user"
  if (!userDoc.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(), // Add a timestamp
      role: "user", // Set default role as "user"
    });
    console.log("User data saved to Firestore with default role 'user'!");
  } else {
    console.log("User already exists in Firestore.");
  }
},
    async checkIfAdmin(uid) {
      try {
        const userRef = doc(db, "users", uid); // Reference to the user's document
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().role === "admin") {
          this.isAdmin = true; // User is an admin
          console.log("User is an admin.");
        } else {
          this.isAdmin = false; // User is not an admin
          console.log("User is not an admin.");
        }
      } catch (error) {
        console.error("Error checking admin status:", error.message);
        this.isAdmin = false; // Default to non-admin on error
      }
    },
    async handleLogout() {
      try {
        await signOut(auth);
        this.user = null;
        this.isAdmin = false; // Reset admin status on logout
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user) {
        this.checkIfAdmin(user.uid); // Check admin status on page load
      }
    });
  },
};
</script>



<style scoped>
/* Custom styles for a modern look */
nav {
  backdrop-filter: blur(10px); /* Adds a blur effect to the background */
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px); /* Adds a slight lift effect on hover */
}

button:active {
  transform: translateY(0); /* Resets the lift effect when clicked */
}

img {
  transition: transform 0.3s ease, border-color 0.3s ease;
}

img:hover {
  transform: scale(1.1); /* Slightly enlarges the profile picture on hover */
  border-color: rgba(255, 255, 255, 0.8); /* Changes border color on hover */
}

section {
  background-size: cover; /* Ensure the background image covers the entire section */
  background-position: center center; /* Center the background image */
  height: 100vh; /* Make sure the section takes the full height of the viewport */
}

/* Notification Message */
.notification-message {
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Light border */
  backdrop-filter: blur(10px); /* Blur effect */
  animation: fadeIn 0.5s ease-in-out;
  margin-top: 20rem; /* Move the notification up */
}

.notification-message h2 {
  font-size: 2rem;
  font-weight: 700;
}

.notification-message p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.notification-message i {
  color: #ffffff; /* Icon color */
}


/* Responsive Design */
@media (max-width: 767px) {
  .notification-message {
    margin-top: 0; /* Reset margin for mobile */
    order: -1; /* Move the notification to the top on mobile */
  }
}
</style>
