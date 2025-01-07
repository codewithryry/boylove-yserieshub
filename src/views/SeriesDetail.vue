<template>
    <div class="series-detail">
      <div v-if="series" class="hero-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 mb-4 mb-md-0">
              <div class="video-container">
                <iframe
                  :src="getEmbedUrl(series.trailer)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  @load="iframeLoaded"
                ></iframe>
              </div>
              <br>
              <router-link
                v-if="series.fullplaylist"
                :to="{
                  name: 'WatchParty',
                  params: {
                    playlistId: extractPlaylistId(series.fullplaylist),
                    title: series.title.replace(/\s+/g, ' '), // Replace spaces with hyphens for URL
                  },
                }"
                class="playlist-link mt-2 d-inline-block"
              >
                Watch Full Playlist
              </router-link>
              <p v-else class="text-muted mt-2">No playlist available.</p>
            </div>
            <div class="col-md-6">
              <div class="text-start">
                <h1 class="display-4 mb-4 fw-bold text-dark">{{ series.title }}</h1>
                <p class="lead mb-4 text-muted" style="font-size: 1.25rem;">
                  {{ series.shortDescription }}
                </p>
              </div>
  
              <div class="details mb-4 text-start">
                <p class="mb-2 text-dark"><strong>Release Date:</strong> {{ series.releaseDate }}</p>
                <p class="mb-2 text-dark"><strong>Genre:</strong> {{ series.genre.join(", ") }}</p>
              </div>
  
              <div class="synopsis mb-4 text-start">
                <h2 class="h4 fw-bold mb-3 text-dark">Synopsis</h2>
                <p class="text-dark">{{ series.synopsis }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else class="not-found">
        <div class="content">
          <h1 class="title">403</h1>
          <p class="subtitle">Oops! Series Not Found</p>
          <p class="description">
            The series you're looking for doesn't exist or has been moved.
          </p>
          <router-link to="/recommendations" class="home-link">
            <i class="fas fa-arrow-left"></i> Back to Series
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SeriesDetail',
    props: ['id'],
    data() {
      return {
        series: {},
      };
    },
    created() {
  this.fetchSeriesDetail();
  this.checkUserPlan();
},
methods: {
  fetchSeriesDetail() {
    const seriesList = [
          {
            id: 1,
            title: "Bad Buddy",
            image: "/images/bad-buddy.jpg",
            shortDescription: "A story of rivalry turned friendship and love.",
            synopsis: "Ever since they were young, Pran and Pat's families feuded, leaving no stone unturned to outshine the other. As expected of them, the two boys also became rivals - until they grew tired and became friends. But are they only friends?",
            releaseDate: "October 29, 2021",
            genre: ["Romance", "Comedy", "Drama"],
            trailer: "https://www.youtube.com/embed/_F_9KRrmkqo",
            fullplaylist: "https://www.youtube.com/playlist?list=PLYYyUhZKiEj5_rzfoSNCcJQgtao9GIQFX",
          },
          {
            id: 2,
            title: "2gether: The Series",
            image: "/images/2gether.jpg",
            shortDescription: "A fake relationship turns into something real.",
            synopsis: "Tine is a popular college student who is pursued by a persistent admirer. To get rid of him, Tine enlists the help of Sarawat, a cool and aloof musician, to pretend to be his boyfriend.",
            releaseDate: "February 21, 2020",
            genre: ["Romance", "Comedy", "School"],
            trailer: "https://www.youtube.com/embed/6OQl08Weel4",
            fullplaylist: "https://www.youtube.com/playlist?list=PLVt9mZLtnOAkAwx2qr9vwNxVPXymoLfnY",
          },
          {
            id: 3,
            title: "TharnType: The Series",
            image: "/images/tharntype.jpg",
            shortDescription: "A story of love and acceptance between two very different men.",
            synopsis: "Tharn, a gay man, and Type, a homophobic man, end up as roommates. Despite their differences, they develop a deep connection and learn to accept each other.",
            releaseDate: "November 7, 2019",
            genre: ["Romance", "Drama", "LGBTQ+"],
            trailer: "https://www.youtube.com/embed/2sEJnOQFa2Q",
            fullplaylist: "https://youtube.com/playlist?list=PL5P0-hGbCM_4AG-XG9VzLpWz0XT_WTUl8",
          },
          {
            
  id: 4,
  title: "My School President",
  image: "/images/myschoolpresident.jpg",
  shortDescription: "A heartwarming tale of leadership, friendship, and young love.",
  synopsis: "Tinn, a diligent and responsible student, is elected as the school president. As he navigates the challenges of his new role, he forms an unexpected bond with Gun, a carefree and popular classmate. Together, they tackle school issues, organize events, and discover the true meaning of teamwork and love. Along the way, they learn valuable lessons about responsibility, friendship, and following their hearts.",
  releaseDate: "December 2, 2022",
  genre: ["Romance", "Drama", "Youth", "School Life"],

            trailer: "https://www.youtube.com/watch?v=5MfQ9Npm2-w",
            fullplaylist: "https://youtube.com/playlist?list=PLYYyUhZKiEj6dHwmZAAUuD3jbA9Kmc02B",
          },
          {
            id: 5,
            title: "Fish upon the Sky",
            image: "/images/fish-upon-the-sky.jpg",
            shortDescription: "A lighthearted story of love and self-discovery.",
            synopsis: "Pi, a college student, navigates love and friendship while trying to win the heart of his crush, Mork.",
            releaseDate: "April 9, 2021",
            genre: ["Romance", "Comedy", "LGBTQ+"],
            trailer: "https://www.youtube.com/watch?v=nwtaq56pgIo",
            fullplaylist: "https://www.youtube.com/playlist?list=PLszepnkojZI4rYdmvANDXm4Dx6_xi4Xfi",
          },
          {
            id: 6,
            title: "A Tale of Thousand Stars",
            image: "/images/1000stars.jpg",
            shortDescription: "A heartwarming story of love and self-discovery in the mountains.",
            synopsis: "Tian, a young man diagnosed with a terminal illness, is sent to a remote village as part of his treatment. There, he meets Phupha, a forest ranger with a mysterious past. Together, they embark on a journey to fulfill Tian’s wish of finding a missing person's belongings. As they grow closer, their relationship evolves into a deep bond, filled with love and healing. Amid emotional struggles, they learn to live in the moment and discover the transformative power of love.",
            releaseDate: "January 29, 2021",
            genre: ["Romance", "Drama", "LGBTQ+"],
            trailer: "https://www.youtube.com/watch?v=o-gaRz2AE_Y",
            fullplaylist: "https://www.youtube.com/playlist?list=PLszepnkojZI4DTG4wQ60bVOgIkN6ZjW2s",
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
          trailer: "https://www.youtube.com/watch?v=HTTVO7IMVf0",
          fullplaylist: "https://www.youtube.com/playlist?list=PLYYyUhZKiEj4n5ha7Llxx7dkb21x0h6tw",
        
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
          trailer: "https://www.youtube.com/watch?v=dZvpNreGVOc",
          fullplaylist: "https://www.youtube.com/playlist?list=PLXopbKxiivxoY5GPjP6hhKVmcYsaBHGWj",
        
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
          trailer: "https://www.youtube.com/watch?v=J9_kF-esM0w",
          fullplaylist: "https://www.youtube.com/playlist?list=PLYYyUhZKiEj4__l--wuWGyCQOzT1bj7Cd",
        },
        ];
       this.series = seriesList.find(series => series.id === parseInt(this.id));

    // Check if the series requires a plan and the user doesn't have one
    if (this.series.requiresPlan && !this.userHasPlan) {
      this.$router.push({ path: '/pricing' });
    }
  },
  checkUserPlan() {
    const userPlan = localStorage.getItem('userPlan'); // Check if the user has a plan
    this.userHasPlan = !!userPlan; // Set to true if the user has a plan
  },

      getEmbedUrl(url) {
        if (!url) return '';
        if (url.includes('watch?v=')) {
          return url.replace('watch?v=', 'embed/');
        }
        return url;
      },
      extractPlaylistId(url) {
        // Extract the playlist ID from the URL
        const match = url.match(/list=([^&]+)/);
        return match ? match[1] : '';
      },
      iframeLoaded() {
        console.log('Iframe loaded successfully');
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  .series-detail {
    font-family: 'Poppins', sans-serif;
    background-color: #ffffff;
    min-height: 100vh; /* Ensure the container takes up the full viewport height */
    display: flex;
    flex-direction: column;
  }
  
  .hero-section {
    flex: 1; /* Take up remaining space */
    padding: 80px 0;
    background-color: #f8f9fa;
    color: #333;
  }
  
  .video-container {
    position: relative;
    padding-bottom: 70%;
    height: 0;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    margin: 0 auto;
  }
  
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .playlist-link {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }
  
  .playlist-link:hover {
    color: #3498db;
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.3;
    color: #2c3e50;
  }
  
  .lead {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #555;
  }
  
  .details p {
    font-size: 1rem;
    color: #555;
  }
  
  .synopsis {
    margin-bottom: 2rem;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  
    .lead {
      font-size: 1rem;
    }
  
    .details p {
      font-size: 0.9rem;
    }
  
    .hero-section .row {
      flex-direction: column;
    }
  
    .hero-section .col-md-6 {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  
  .not-found {
    flex: 1; /* Take up remaining space */
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgba(106, 17, 203, 0.7), rgba(37, 117, 252, 0.7)); /* Semi-transparent gradient */
    color: #fff;
    font-family: 'Inter', sans-serif;
    padding: 20px;
    box-sizing: border-box; /* Ensure padding is included in height calculation */
  }
  
  .content {
    text-align: center;
    max-width: 600px;
    animation: fadeIn 1s ease-in-out;
  }
  
  .title {
    font-size: 8rem;
    font-weight: 900;
    margin: 0;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: float 3s ease-in-out infinite;
  }
  
  .subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin: 10px 0;
  }
  
  .description {
    font-size: 1.25rem;
    margin: 20px 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .home-link {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    color: #6a11cb;
    background: #fff;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .home-link:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
  
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  </style>