<template>
    <div class="songs" :style="dynamicBackground">
      <h1 class="songs-title">Original Soundtracks (Ost)</h1>
      <p class="songs-subtitle">Explore the amazing soundtracks from your favorite Thai BL series!</p>
  
      <!-- Search Bar -->
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for a song..."
          class="search-input"
        />
      </div>
  
      <!-- Featured Playlist -->
      <div class="featured-playlist" v-if="featuredSongs.length > 0">
        <h2>Featured Playlist</h2>
        <div class="song-list">
  <div
    class="song-card"
    v-for="(song, index) in visibleSongs"
    :key="index"
    @mouseenter="setDynamicBackground(song.color)"
  >
    <!-- YouTube Embed -->
    <div class="youtube-embed">
      <iframe
        width="100%"
        height="200"
        :src="`https://www.youtube.com/embed/${song.youtubeId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div v-if="song.premium && !userHasAccess" class="premium-overlay" @click="upgradeToPremium">
  <p>This is a premium song. Upgrade for exclusive benefits!</p>
  <button class="btn-upgrade">Upgrade to Premium</button>
</div>

    </div>

    <div class="song-details">
  <h3>{{ song.title }}</h3> <!-- Song Title -->
  <p>{{ song.artist }}</p> <!-- Artist Name -->
  <div class="song-stats">
    <span class="play-count">
      <i class="fas fa-play"></i> {{ song.playCount }} plays
    </span>
    <button class="like-button" @click="toggleLike(song)">
      <i :class="['fas', 'fa-heart', { liked: song.liked }]"></i>
      {{ song.likes }}
    </button>
    <button class="share-button" @click="shareSong(song)">
      <i class="fas fa-share"></i> Share
    </button>
  </div>
</div>
    </div>
  </div>


</div>
      <!-- Song List -->
      <div class="song-list">
        <div
          class="song-card"
          v-for="(song, index) in visibleSongs"
          :key="index"
          @mouseenter="setDynamicBackground(song.color)"
        >
        <div class="youtube-embed">
  <iframe
    width="100%"
    height="200"
    :src="`https://www.youtube.com/embed/${song.youtubeId}`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>

  <!-- Premium Overlay for Non-Premium Users -->
  <div v-if="song.premium && !userHasAccess" class="premium-overlay" @click="upgradeToPremium">
  <p>This is a premium song. Upgrade for exclusive benefits!</p>
  <button class="btn-upgrade">Upgrade to Premium</button>
</div>
</div>



<div class="song-details">
  <h3>{{ song.title }}</h3> <!-- Song Title -->
  <p>{{ song.artist }}</p> <!-- Artist Name -->
  <div class="song-stats">
    <span class="play-count">
      <i class="fas fa-play"></i> {{ song.playCount }} plays
    </span>
    <button class="like-button" @click="toggleLike(song)">
      <i :class="['fas', 'fa-heart', { liked: song.liked }]"></i>
      {{ song.likes }}
    </button>
    <button class="share-button" @click="shareSong(song)">
      <i class="fas fa-share"></i> Share
    </button>
  </div>
</div>
        </div>
      </div>
  
      <!-- Load More Button -->
      <div class="load-more" v-if="visibleSongs.length < filteredSongs.length">
        <button @click="loadMore" class="btn-load-more">Load More</button>
      </div>
    
    </div>
  </template>
  
  <script>
  import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
  import { doc, getDoc } from 'firebase/firestore';
  
  export default {
    name: 'Songs',
    data() {
      return {
        searchQuery: '',
        visibleSongsCount: 6,
        userIsPremium: false, // Initialize as false
        userIsVIP: false, // Initialize as false
        songs: [
          {
            title: 'TharnType The Series - อาบน้ำร้อนมาก่อน',
            artist: 'Toptap Jirakit',
            src: '/songs/tharntype.mp3',
            youtubeId: 'GErIL_x2ucw',
            playCount: 1234,
            likes: 56,
            liked: false,
            premium: false, // Free access
          },
          {
            title: 'LOVE IS EVERYWHERE OST. FOUREVER YOU',
            artist: 'Boy Sompob',
            src: '/songs/love-is-everywhere.mp3',
            youtubeId: 'ezFpjYrBo3c',
            playCount: 987,
            likes: 34,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: '2gether: The Series - Tit Gub',
            artist: 'Bright Vachirawit',
            src: '/songs/tit-gub.mp3',
            youtubeId: 'dQaI3VkSCi0',
            playCount: 4567,
            likes: 120,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'SOTUS: The Series - ขอให้โชคดี',
            artist: 'Getsunova',
            src: '/songs/sotus.mp3',
            youtubeId: 'zWBpVWuMBQE',
            playCount: 3456,
            likes: 89,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'Dark Blue Kiss - ไม่ปล่อยมือ',
            artist: 'Boy Sompob',
            src: '/songs/dark-blue-kiss.mp3',
            youtubeId: 'b9T6hF0WoAc',
            playCount: 2345,
            likes: 78,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'Theory of Love - แค่ไหนก็ใกล้',
            artist: 'Getsunova',
            src: '/songs/theory-of-love.mp3',
            youtubeId: 'sJwCwbk3YVw',
            playCount: 5678,
            likes: 150,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'I Told Sunset About You - Skyline',
            artist: 'Billkin',
            src: '/songs/skyline.mp3',
            youtubeId: 'hJeEOzEZstU',
            playCount: 6789,
            likes: 200,
            premium: true, // Premium access
          },
          {
            title: 'I Promised You The Moon - แค่เธอ',
            artist: 'Billkin',
            src: '/songs/kae-ther.mp3',
            youtubeId: 'zbvSieQdNpY',
            playCount: 7890,
            likes: 250,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'A Tale of Thousand Stars - 1000stars',
            artist: 'Gun Napat',
            src: '/songs/1000stars.mp3',
            youtubeId: 'O-QWKCcbRFg',
            playCount: 8901,
            likes: 300,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'Bad Buddy - เพลงรัก',
            artist: 'Nanon Korapat',
            src: '/songs/bad-buddy.mp3',
            youtubeId: 'bGsQLF2b3y4',
            playCount: 9012,
            likes: 350,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'Not Me - ไม่มีนิยาม',
            artist: 'Khaotung Thanawat',
            src: '/songs/not-me.mp3',
            youtubeId: 'd5rGW310K-I',
            playCount: 10123,
            likes: 400,
            liked: false,
            premium: true, // Premium access
          },
          {
            title: 'KinnPorsche - เพลงรัก',
            artist: 'Karinyawat (Foet) Durongjirakan',
            src: '/songs/kinnporsche.mp3',
            youtubeId: 'kmyysYijJ2Y',
            playCount: 11234,
            likes: 450,
            liked: false,
            premium: true, // Premium access
          },
        ],
        dynamicBackground: {
          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        },
        showBackToTop: false,
      };
    },
    computed: {
    filteredSongs() {
      return this.songs.filter((song) =>
        song.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    visibleSongs() {
      return this.filteredSongs.slice(0, this.visibleSongsCount);
    },
    featuredSongs() {
      return this.songs.filter((song) => song.featured).slice(0, 3);
    },
    userHasAccess() {
      return this.userIsPremium || this.userIsVIP; // Allow access for Premium or VIP users
    },
  },
  methods: {
    async checkUserSubscription() {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Check for both Premium and VIP plans
          this.userIsPremium = userData.subscription === 'premium plan';
          this.userIsVIP = userData.subscription === 'vip plan';
        }
      }
    },
    upgradeToPremium() {
      // Redirect to the subscription page
      this.$router.push({ path: '/get-started', query: { subscription: 'premium' } });
    },
    toggleLike(song) {
      song.liked = !song.liked;
      song.likes += song.liked ? 1 : -1;
    },
    shareSong(song) {
      const url = `https://www.youtube.com/watch?v=${song.youtubeId}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    },
    loadMore() {
      this.visibleSongsCount += 6;
    },
    setDynamicBackground(color) {
      this.dynamicBackground.background = `linear-gradient(135deg, ${color}, #e9ecef)`;
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },
  },
  mounted() {
    this.checkUserSubscription(); // Fetch the user's subscription status
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>





















































  
  <style scoped>
  /* Modern Font */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  








  .premium-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer; /* Make it clickable */
  border-radius: 8px;
}

.premium-overlay p {
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
}

.btn-upgrade {
  background: #ff5722;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.btn-upgrade:hover {
  background: #e64a19;
} 


  .songs {
    padding: 40px 20px;
    text-align: center;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
    transition: background 0.5s ease;
  }
  
  .songs-title {
    font-size: 3rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .songs-subtitle {
    font-size: 1.25rem;
    color: #555;
    margin-bottom: 30px;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
  }
  
  .featured-playlist {
    margin-bottom: 40px;
  }
  
  .featured-playlist h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .song-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .song-card {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(221, 221, 221, 0.5);
    border-radius: 15px;
    padding: 20px;
    text-align: left;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .song-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .youtube-embed {
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
  }
  
  iframe {
    width: 100%;
    height: 200px;
    border-radius: 10px;

  }

  .premium-overlay {
  position: absolute; /* Position the overlay relative to the parent */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  color: #fff;
  font-size: 1.2rem;
  border-radius: 10px; /* Match the parent's border radius */
  z-index: 10; /* Ensure the overlay is above other elements */
  pointer-events: auto; /* Allow clicks on the overlay and its children */
}

.btn-upgrade {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  pointer-events: auto; /* Ensure the button is clickable */
}

.btn-upgrade:hover {
  background-color: #ff4c4c;
}

.youtube-embed {
  position: relative; /* Ensure the overlay is positioned relative to this container */
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  pointer-events: auto; /* Allow clicks on the container and its children */
}
  
  .song-details {
    padding: 10px;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 5px;
  }
  
  p {
    font-size: 1rem;
    color: #555;
  }
  
  .song-stats {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .play-count,
  .like-button,
  .share-button {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.875rem;
    color: #555;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .like-button .fa-heart {
    color: #ccc;
    transition: color 0.3s ease;
  }
  
  .like-button .fa-heart.liked {
    color: #ff6b6b;
  }
  
  .share-button .fa-share {
    color: #2c3e50;
  }
  
  .load-more {
    margin-top: 20px;
  }
  
  .btn-load-more {
    padding: 10px 20px;
    background-color: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-load-more:hover {
    background-color: #1a252f;
  }
  
  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background-color: #2c3e50;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .back-to-top:hover {
    background-color: #1a252f;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .songs-title {
      font-size: 2.5rem;
    }
  
    .songs-subtitle {
      font-size: 1.1rem;
    }
  
    .song-list {
      grid-template-columns: 1fr;
    }
  
    iframe {
      height: 150px;
    }
  }

  </style>