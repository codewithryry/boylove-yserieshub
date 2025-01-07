<template>
    <div class="watch-party">
        <br>
      <h1 class="watch-party__title">Watch Party: {{ title }}</h1>
  
      <!-- YouTube Playlist Embed -->
      <div class="video-container">
        <iframe
          width="100%"
          height="100%"
          :src="`https://www.youtube.com/embed/videoseries?list=${playlistId}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LiveWatchParty',
    props: {
      playlistId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  

  
  .watch-party {
    padding: 1.5rem;
    font-family: 'Inter', sans-serif;
    margin: 0 auto;
    max-width: 1200px; /* Adjusted for better responsiveness */
  }
  
  .watch-party__title {
    font-size: 2.5rem;
    font-weight: 490;
    color: #2c3e50; /* Dark text for better readability */
    margin-bottom: 40px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  
  .video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio (9 / 16 * 100) */
    border-radius: 12px;
    overflow: hidden;
    background: #000; /* Black background for better contrast */
  }
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .watch-party {
      padding: 1rem;
    }
  
    .watch-party__title {
      font-size: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .watch-party {
      padding: 0.75rem;
    }
  
    .watch-party__title {
      font-size: 1.25rem;
    }
  }
  </style>