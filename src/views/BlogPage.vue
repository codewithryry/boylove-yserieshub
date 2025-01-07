<template>
  <div class="blog-page py-4">
    <div class="container">
      <h1 class="text-center mb-4 display-5 fw-bold">Latest News on Thailand Boy Love (BL)</h1>
      <div class="row">
        <!-- Blog Posts -->
        <div class="col-lg-8">
          <div v-for="post in blogPosts" :key="post.id" class="card mb-4 shadow-sm position-relative">
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
              :to="{ path: '/get-started', query: {subscription: 'vip' } }"
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

export default {
  name: 'BlogPage',
  data() {
    return {
      isVIP: false, // Track VIP subscription status
      blogPosts: [
  {
    id: 1,
    title: 'GMMTV Announces 2025 BL/GL Lineup',
    author: 'Sportskeeda',
    date: '2024-11-27',
    excerpt: 'GMMTV has revealed its 2025 lineup of around 20 BL and GL dramas, set to release throughout next year. Premiere dates are yet to be confirmed.',
    image: 'images/gmmtv-2025.png',
    content: 'GMMTV has revealed its 2025 lineup of around 20 BL and GL dramas, set to release throughout next year. Premiere dates are yet to be confirmed. The lineup includes fan-favorite series like "Only Friends: Dream On" and "Dare You to Death," featuring popular CPs like Pond-Phuwin, Gemini-Fourth, and Earth-Mix. The genres range from romance to mystery and comedy, ensuring something for every fan.',
    url: 'https://www.sportskeeda.com/us/k-pop/from-girl-rules-burnout-syndrome-gmmtv-reveals-2025-bl-gl-thai-drama-lineup',
    vipOnly: false, // Available to all users
  },
  {
    id: 2,
    title: 'The Boy Next World: A Multiverse Love Story',
    author: 'MyDramaList',
    date: '2025-01-05',
    excerpt: 'Starring Boss Chaikamon and Noeul Nuttarat, "The Boy Next World" explores a multiverse romance where two lovers reunite across parallel worlds. The series is set to premiere on January 5, 2025.',
    image: 'images/the-boy-next-world.jpg',
    content: 'Starring Boss Chaikamon and Noeul Nuttarat, "The Boy Next World" explores a multiverse romance where two lovers reunite across parallel worlds. The series is set to premiere on January 5, 2025. The show has already generated buzz for its unique storyline and stunning visuals, promising to be a standout in the 2025 BL lineup.',
    url: 'https://mydramalist.com/747973-the-boy-next-world',
    vipOnly: true, // VIP-only content
  },
  {
    id: 3,
    title: 'Boys in Love: A Fresh Take on BL Drama',
    author: 'Lifestyle Asia India',
    date: '2024-11-27',
    excerpt: 'GMMTV’s "Boys in Love" introduces rookie actors Mick Metas and Luke Peemsan in a lighthearted romantic comedy. Directed by Waa Waasuthep, the drama is set to release in mid-2025 and promises a fresh perspective on BL storytelling.',
    image: 'images/Boys.jpg',
    content: 'GMMTV’s "Boys in Love" introduces rookie actors Mick Metas and Luke Peemsan in a lighthearted romantic comedy. Directed by Waa Waasuthep, the drama is set to release in mid-2025 and promises a fresh perspective on BL storytelling. The series follows two young men navigating love and friendship, offering a mix of humor and heartfelt moments.',
    url: 'https://www.lifestyleasia.com/ind/entertainment/streaming/romantic-thai-dramas-releasing-in-2025/',
    vipOnly: false, // Available to all users
  },
  {
    id: 4,
    title: 'Pit Babe Season 2: What to Expect',
    author: 'The BL Xpress',
    date: '2024-11-27',
    excerpt: 'The highly anticipated second season of "Pit Babe" is set to release in 2025, with Pavel Naret and Pooh Krittin reprising their roles. Fans can expect more drama, romance, and high-speed action in this sequel.',
    image: 'images/pit-babes2.jpg',
    content: 'The highly anticipated second season of "Pit Babe" is set to release in 2025, with Pavel Naret and Pooh Krittin reprising their roles. Fans can expect more drama, romance, and high-speed action in this sequel. The first season left viewers on the edge of their seats, and the second season promises to deliver even more thrilling moments.',
    url: 'https://theblxpress.wordpress.com/2024/11/27/gmmtv-lineup-2025-riding-the-wave/',
    vipOnly: true, // VIP-only content
  },
  {
    id: 5,
    title: 'Ticket to Heaven: A Tale of Forbidden Love',
    author: 'Vocal Media',
    date: '2024-11-27',
    excerpt: 'Gemini and Fourth star in "Ticket to Heaven," a BL drama that tackles themes of religion and forbidden love. The series is already generating buzz for its emotional depth and powerful performances.',
    image: 'images/Ticket.jpeg',
    content: 'Gemini and Fourth star in "Ticket to Heaven," a BL drama that tackles themes of religion and forbidden love. The series is already generating buzz for its emotional depth and powerful performances. The story follows two young men who must navigate societal expectations and their own feelings, creating a poignant and unforgettable narrative.',
    url: 'https://vocal.media/humor/gmmtv-2025-your-guide-to-the-exciting-new-lineup',
    vipOnly: false, // Available to all users
  },
],
       
      categories: ['BL Dramas', 'GMMTV', 'New Releases', 'Romance', 'Mystery'],
      recentPosts: [
        { id: 1, title: 'GMMTV Announces 2025 BL/GL Lineup' },
        { id: 2, title: 'The Boy Next World: A Multiverse Love Story' },
        { id: 3, title: 'Boys in Love: A Fresh Take on BL Drama' },
        { id: 4, title: 'Pit Babe Season 2: What to Expect' },
        { id: 5, title: 'Ticket to Heaven: A Tale of Forbidden Love' },
      ],
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
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.checkUserSubscription(); // Check the user's subscription status when the component mounts
      } else {
        this.isVIP = false; // Reset VIP status if the user logs out
      }
    });
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
</style>