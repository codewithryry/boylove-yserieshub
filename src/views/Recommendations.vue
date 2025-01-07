<template>
  <div class="recommendations py-3">
    <div class="container">
      <h2 class="text-center mb-3">About the Series</h2>
      <p class="text-center mb-5 lead">Discover our collection of popular BL series from Thailand, featuring compelling stories of romance, friendship, and self-discovery.</p>
      <div class="row">
        <div v-for="(bl, index) in blList" :key="index" class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-image">
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
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  name: 'Recommendations',
  data() {
    return {
      userHasPlan: false, // Assume the user doesn't have a plan by default
      blList: [
        {
          id: 1,
          title: "Bad Buddy",
          image: "/images/bad-buddy.jpg",
          shortDescription: "A story of rivalry turned friendship and love.",
          synopsis: "Ever since they were young, Pran and Pat's families feuded...",
          cast: [
            { name: "Nanon Korapat", role: "Pran" },
            { name: "Ohm Pawat", role: "Pat" },
          ],
          releaseDate: "October 29, 2021",
          genre: ["Romance", "Comedy", "Drama"],
          trailer: "https://www.youtube.com/embed/2uVHJN8S7X8",
        },
        {
          id: 2,
          title: "2gether: The Series",
          image: "/images/2gether.jpg",
          shortDescription: "A fake relationship turns into something real.",
          synopsis: "Tine is a popular college student who is pursued by...",
          cast: [
            { name: "Bright Vachirawit", role: "Sarawat" },
            { name: "Win Metawin", role: "Tine" },
          ],
          releaseDate: "February 21, 2020",
          genre: ["Romance", "Comedy", "School"],
          trailer: "https://www.youtube.com/embed/6G3OXYtJQ1E",
        },
        {
          id: 3,
          title: "TharnType: The Series",
          image: "/images/tharntype.jpg",
          shortDescription: "A story of love and acceptance between two very different men.",
          synopsis: "Tharn, a gay man, and Type, a homophobic man, end up as roommates...",
          cast: [
            { name: "Gulf Kanawut", role: "Type" },
            { name: "Mew Suppasit", role: "Tharn" },
          ],
          releaseDate: "November 7, 2019",
          genre: ["Romance", "Drama", "LGBTQ+"],
          trailer: "https://www.youtube.com/embed/5qap5aO4i9A",
        },
        {
          id: 4,
          title: "My School President",
          image: "/images/myschoolpresident.jpg",
          shortDescription: "A heartwarming tale of leadership, friendship, and young love.",
          synopsis: "Tinn, a diligent and responsible student, is elected as the school president...",
          cast: [
            { name: "Gemini Norawit", role: "Tinn" },
            { name: "Fourth Nattawat", role: "Gun" },
          ],
          releaseDate: "December 2, 2022",
          genre: ["Drama", "Youth", "School Life"],
          trailer: "https://www.youtube.com/embed/xyz12345678",
        },
        {
          id: 5,
          title: "Fish upon the Sky",
          image: "/images/fish.jpg",
          shortDescription: "A lighthearted story of love and self-discovery.",
          synopsis: "Pi, a college student, navigates love and friendship while trying to win the heart of his crush, Mork.",
          cast: [
            { name: "Phuwin Tangsakyuen", role: "Pi" },
            { name: "Pond Naravit", role: "Mork" },
          ],
          releaseDate: "April 9, 2021",
          genre: ["Romance", "Comedy", "Youth"],
          trailer: "https://www.youtube.com/embed/7X8II6J6u4w",
        },
        {
          id: 6,
          title: "A Tale of Thousand Stars",
          image: "/images/1000stars.jpg",
          shortDescription: "A heartwarming story of love and self-discovery in the mountains.",
          synopsis: "A city boy moves to a rural village and finds love and purpose.",
          cast: [
            { name: "Earth Pirapat", role: "Phupha" },
            { name: "Mix Sahaphap", role: "Tian" },
          ],
          releaseDate: "January 29, 2021",
          genre: ["Romance", "Drama", "LGBTQ+"],
          trailer: "https://www.youtube.com/embed/8XZ9ZQZQZQZ",
          requiresPlan: true, // Plan required
        },
        {
          id: 7,
          title: "Love in the Air",
          image: "/images/love-in-the-air.png",
          shortDescription: "A steamy romance between a pilot and a flight attendant.",
          synopsis: "Prapai, a confident pilot, and Sky, a reserved flight attendant, find themselves drawn to each other despite their differences.",
          cast: [
            { name: "Boss Chaikamon", role: "Prapai" },
            { name: "Noeul Nuttarat", role: "Sky" },
          ],
          releaseDate: "August 18, 2022",
          genre: ["Romance", "Drama", "LGBTQ+"],
          trailer: "https://www.youtube.com/embed/abc12345678",
          requiresPlan: true, // Plan required
        },
        {
          id: 13,
          title: "KinnPorsche: The Series",
          image: "/images/kinnporsche.jpg",
          shortDescription: "A mafia romance filled with danger, passion, and intrigue.",
          synopsis: "Kinn, a mafia heir, hires Porsche as his bodyguard. As they navigate the dangerous underworld, their relationship evolves into something deeper.",
          cast: [
            { name: "Mile Phakphum", role: "Kinn" },
            { name: "Apo Nattawin", role: "Porsche" },
          ],
          releaseDate: "April 2, 2022",
          genre: ["Romance", "Action", "Drama"],
          trailer: "https://www.youtube.com/embed/abc12345678",
          requiresPlan: true, // Plan required
        },
        {
          id: 14,
          title: "Cutie Pie",
          image: "/images/cutie-pie.jpg",
          shortDescription: "A sweet and fluffy romance between two young men bound by an arranged marriage.",
          synopsis: "Lian and Kuea are engaged due to a family arrangement. As they spend time together, they discover genuine feelings for each other.",
          cast: [
            { name: "Zee Pruk", role: "Lian" },
            { name: "NuNew Chawarin", role: "Kuea" },
          ],
          releaseDate: "February 18, 2022",
          genre: ["Romance", "Comedy", "Drama"],
          trailer: "https://www.youtube.com/embed/def12345678",
          requiresPlan: true, // Plan required
        },
      ],
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
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.checkUserPlan(); // Check if the user has a plan when the component is created
      } else {
        this.userHasPlan = false; // Reset if the user is not logged in
      }
    });
  },
};
</script>









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