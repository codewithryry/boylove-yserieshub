<template>
  <div class="blog-page py-4">
    <div class="container">
      <h1 class="text-center mb-4 display-5 fw-bold">Latest News on Thailand Boy Love (BL)</h1>
      <div class="row">
        <!-- Blog Posts -->
        <div class="col-lg-8">
          <!-- Display only visible posts -->
          <div v-for="post in visiblePosts" :key="post.id" class="card mb-4 shadow-sm position-relative">
            <img v-if="post.image" :src="post.image" class="card-img-top" alt="Blog Post Image" />
            <div class="overlay">
              <!-- Show "Read More" button for non-VIP posts or VIP users -->
              <router-link
                v-if="!post.vipOnly || isVIP"
                :to="`/blog/${post.id}`"
                class="btn btn-primary"
              >
                Read More
              </router-link>
              <!-- Show "Subscribe to VIP" button for VIP-only posts -->
              <router-link
                v-else
                :to="{ path: '/get-started', query: { subscription: 'vip' } }"
                class="btn btn-warning"
              >
                Subscribe to VIP
              </router-link>
            </div>
            <div class="card-body">
              <h2 class="card-title fw-bold">{{ post.title }}</h2>
              <p class="card-text text-muted small">
                By {{ post.author }} | {{ post.date }}
                <span v-if="post.vipOnly" class="badge bg-warning text-dark ms-2">VIP Only</span>
              </p>
              <p class="card-text">{{ post.excerpt }}</p>
              <!-- Show a message for VIP-only posts -->
              <div v-if="post.vipOnly && !isVIP" class="alert alert-warning mt-3 mb-0">
                <p class="mb-0">
                  This post is exclusive to VIP members. 
                  <router-link 
                    :to="{ path: '/get-started', query: { plan: 'vip' } }" 
                    class="text-decoration-none fw-bold"
                  >
                    Subscribe to VIP
                  </router-link>
                  to access the full content.
                </p>
              </div>
            </div>
          </div>
          <!-- Load More Button -->
          <div class="text-center mt-4" v-if="visiblePosts.length < blogPosts.length">
  <button class="btn btn-load-more" @click="loadMore">
    Load More
  </button>
</div>

<br>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Categories -->
          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <h5 class="card-title fw-bold mb-4">
                <i class="fas fa-tags me-2"></i>Categories
              </h5>
              <ul class="list-unstyled">
                <li v-for="category in categories" :key="category" class="mb-3">
                  <a href="#" class="text-decoration-none text-muted small d-flex align-items-center">
                    <i class="fas fa-circle me-2" style="font-size: 0.5rem;"></i>
                    {{ category }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Recent Posts -->
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title fw-bold mb-4">
                <i class="fas fa-clock me-2"></i>Recent Posts
              </h5>
              <ul class="list-unstyled">
                <li v-for="post in recentPosts" :key="post.id" class="mb-3">
                  <router-link
                    :to="`/blog/${post.id}`"
                    class="text-decoration-none text-muted small d-flex align-items-center"
                  >
                    <i class="fas fa-chevron-right me-2" style="font-size: 0.75rem;"></i>
                    {{ post.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db, auth } from "../firebase"; // Import Firestore and Auth
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import blogPosts from "@/assets/blogPage.json"; // Adjust the path as needed

export default {
  name: 'BlogPage',
  data() {
    return {
      isVIP: false, // Track VIP subscription status
      blogPosts: blogPosts, // Imported blog posts
      visiblePosts: [], // Posts currently visible
      postsPerLoad: 3, // Number of posts to load at a time
      categories: ['BL Dramas', 'GMMTV', 'New Releases', 'Romance', 'Mystery'],
      recentPosts: blogPosts.slice(0, 5).map(post => ({ id: post.id, title: post.title })), // Recent posts from blogPosts
    };
  },
  methods: {
    async checkUserSubscription() {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User data:", userData);
          console.log("User subscription:", userData.subscription);
          // Ensure this matches the value in Firestore
          this.isVIP = userData.subscription === "vip plan"; // Use the exact value from Firestore
        } else {
          console.error("User document does not exist.");
        }
      } else {
        console.error("No user is currently logged in.");
      }
    },
    loadMore() {
      // Calculate the next set of posts to display
      const nextPosts = this.blogPosts.slice(
        this.visiblePosts.length,
        this.visiblePosts.length + this.postsPerLoad
      );
      // Add the next posts to the visiblePosts array
      this.visiblePosts = [...this.visiblePosts, ...nextPosts];
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.checkUserSubscription(); // Check the user's subscription status when the component mounts
      } else {
        this.isVIP = false; // Reset VIP status if the user logs out
      }
    });

    // Initialize visible posts with the first set of posts
    this.visiblePosts = this.blogPosts.slice(0, this.postsPerLoad);
  },
};
</script>



<style scoped>
/* Modern Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.badge.bg-warning {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.alert-warning {
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 8px;
  padding: 1rem;
  color: #856404;
}

.alert-warning a {
  color: #155724;
  text-decoration: underline;
}

.btn-warning {
  background: #ffc107;
  border: none;
  color: #000;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: transform 0.3s ease;
}

.btn-warning:hover {
  transform: scale(1.05);
}

.blog-page {
  font-family: 'Inter', sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
}

.card {
  border: none;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .overlay {
  opacity: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
}

.small {
  font-size: 0.875rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card {
    margin: 0.5rem;
  }

  .card-body {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .card-text {
    font-size: 0.9375rem;
  }

  .btn-primary {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}


.btn-load-more {
  padding: 10px 20px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-load-more:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-load-more:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>