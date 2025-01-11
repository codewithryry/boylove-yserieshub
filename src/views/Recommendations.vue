<template>
  <div class="recommendations py-3">
    <div class="container">
      <br>
      <h2 class="text-center mb-3">Find Your Next Favorite Boy Love (BL) Series Here</h2>
      <p class="text-center mb-5 lead">Discover our collection of popular BL series from Thailand, featuring compelling stories of romance, friendship, and self-discovery.</p>
      <div class="row">
        <!-- Display only visible items -->
        <div v-for="(bl, index) in visibleItems" :key="index" class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-image">
              <!-- Use require if images are in src/assets -->
              <img :src="bl.image" class="card-img-top" :alt="bl.title" @click="goToSeriesDetail(bl.id)">
              <div class="overlay">
                <!-- Show "Buy Plan" button if the series requires a plan and the user doesn't have one -->
                <button v-if="bl.requiresPlan && !userHasPlan" class="btn btn-primary" @click="redirectToPlans(bl.id)">
                  Buy Plan to Access
                </button>
                <!-- Otherwise, show "View Details" button -->
                <button v-else class="btn btn-primary" @click="goToSeriesDetail(bl.id)">View Details</button>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ bl.title }}</h5>
              <p class="card-text text-truncate">{{ bl.shortDescription }}</p>
              <div class="cast mb-3">
                <p class="cast-title"><strong>Cast:</strong></p>
                <ul class="cast-list">
                  <li v-for="(actor, i) in bl.cast" :key="i" class="cast-item">
                    {{ actor.name }} <span class="cast-role">({{ actor.role }})</span>
                  </li>
                </ul>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">{{ bl.releaseDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Load More Button -->
      <div class="text-center mt-4" v-if="visibleItems.length < blList.length">
        <button class="btn btn-load-more" @click="loadMore">Load More</button>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="btn btn-primary back-to-top"
      :class="{ visible: showBackToTop }"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import recommendations from '@/assets/recommendation.json'; // Import the JSON file

export default {
  name: 'Recommendations',
  data() {
    return {
      userHasPlan: false, // Assume the user doesn't have a plan by default
      blList: recommendations, // Use the imported JSON data
      visibleItems: [], // Items currently visible
      itemsPerLoad: 6, // Number of items to load at a time
      showBackToTop: false, // Controls visibility of the "Back to Top" button
    };
  },
  methods: {
    goToSeriesDetail(id) {
      this.$router.push({ path: `/series/${id}` });
    },
    redirectToPlans(seriesId) {
      // Store the series ID in local storage
      localStorage.setItem('redirectSeriesId', seriesId);
      // Redirect to the pricing page
      this.$router.push({ path: '/pricing' }); // Use the existing /pricing route
    },
    async checkUserPlan() {
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Check if the user has a valid subscription
          this.userHasPlan = userData.subscription && userData.subscription !== "none";
        }
      }
    },
    loadMore() {
      // Calculate the next set of items to display
      const nextItems = this.blList.slice(
        this.visibleItems.length,
        this.visibleItems.length + this.itemsPerLoad
      );
      // Add the next items to the visibleItems array
      this.visibleItems = [...this.visibleItems, ...nextItems];
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300; // Show button if scrolled more than 300px
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.checkUserPlan(); // Check if the user has a plan when the component is created
      } else {
        this.userHasPlan = false; // Reset if the user is not logged in
      }
    });

    // Initialize visible items with the first set of items
    this.visibleItems = this.blList.slice(0, this.itemsPerLoad);
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll); // Add scroll event listener
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll); // Clean up the event listener
  },
};
</script>


<style scoped>
/* Existing styles... */

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
  opacity: 0;
  visibility: hidden;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.back-to-top:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }
}
</style>



  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  .recommendations {
    font-family: 'Poppins', sans-serif;
    background-color: #f8f9fa;
    padding: 80px 0;
  }
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 2rem;
  }
  
  .lead {
    color: #6b7280;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .card {
    border: none;
    border-radius: 15px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .card-image {
    position: relative;
    overflow: hidden;
  }
  
  .card-img-top {
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
    padding: 10px 20px;
    border-radius: 25px;
    font-weight: 600;
    transition: transform 0.3s ease;
  }
  
  .btn-primary:hover {
    transform: scale(1.05);
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.75rem;
  }
  
  .card-text {
    font-size: 1rem;
    color: #6b7280;
    margin-bottom: 1rem;
  }
    .cast {
    margin-bottom: 1rem;
    text-align: left;
  }
  
  .cast-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .cast-list {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }
  
  .cast-item {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
    text-align: left;
  }
  
  .cast-role {

    color: #6b7280;
    
  }
  
  .text-muted {
    font-size: 0.9rem;
    color: #6b7280;
  }
  
  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
    }
  
    .card-img-top {
      height: 200px;
    }
  
    .card-title {
      font-size: 1.25rem;
    }
  
    .card-text {
      font-size: 0.9rem;
    }
  }
  </style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.recommendations {
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
  padding: 80px 0;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.lead {
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  overflow: hidden;
}

.card-img-top {
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
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.cast {
  margin-bottom: 1rem;
  text-align: left;
}

.cast-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.cast-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.cast-item {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  text-align: left;
}

.cast-role {
  color: #6b7280;
}

.text-muted {
  font-size: 0.9rem;
  color: #6b7280;
}

/* Load More Button */
.load-more {
  margin-top: 20px;
}

.btn-load-more {
  padding: 10px 20px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-load-more:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
}

@media (max-width: 768px) {
  h2 {
    font-size: 2rem;
  }

  .card-img-top {
    height: 200px;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-text {
    font-size: 0.9rem;
  }
}
</style>