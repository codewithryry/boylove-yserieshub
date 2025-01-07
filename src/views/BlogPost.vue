<template>
    <div class="blog-post-page">
      <!-- Blog Post Content -->
      <div v-if="post" class="row justify-content-center">
        <div class="col-lg-8">
            <br>
          <div class="blog-post">
            <div class="blog-body">
              <h1 class="blog-title">{{ post.title }}</h1>
              <p class="blog-meta text-muted small">
                By {{ post.author }} | {{ post.date }}
              </p>
              <div class="blog-content" v-html="post.content"></div>
              <div class="blog-actions">
            
                <router-link to="/blog" class="btn btn-outline-secondary btn-sm ms-2">
                  Back to Blog
                </router-link>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
  
      <!-- 403 Error Page -->
      <div v-else class="not-found">
        <div class="content">
          <h1 class="title">403</h1>
          <p class="subtitle">Oops! Blog Not Found</p>
          <p class="description">
            The blog you're looking for doesn't exist or has been moved.
          </p>
          <router-link to="/blog" class="home-link">
            <i class="fas fa-arrow-left"></i> Back to Blogs
          </router-link>
        </div>
      </div>
    </div>
  </template>


  <script>
  export default {
    name: 'BlogPost',
    props: ['id'], // Accept id as a prop
    data() {
      return {
        post: null, // Initialize post as null
      };
    },
    created() {
      this.fetchPost(); // Fetch the post when the component is created
    },
    methods: {
      fetchPost() {
        const blogPosts = [
  {
    id: 1,
    title: 'GMMTV Announces 2025 BL/GL Lineup',
    author: 'Sportskeeda',
    date: '2024-11-27',
    excerpt: 'GMMTV has revealed its 2025 lineup of around 20 BL and GL dramas, set to release throughout next year. Premiere dates are yet to be confirmed.',
    content: `
      <h2 class="h4 fw-bold mb-3">A Stellar Lineup for 2025</h2>
      <p>GMMTV has officially unveiled its 2025 lineup, and fans of Boys' Love (BL) and Girls' Love (GL) dramas are in for a treat. The network has announced approximately 20 new series, spanning a variety of genres, including romance, mystery, comedy, and fantasy. While premiere dates are still under wraps, the anticipation is already building.</p>
      <p>Among the highlights are fan-favorite series like <strong>"Only Friends: Dream On"</strong> and <strong>"Dare You to Death,"</strong> which promise to deliver compelling storylines and unforgettable performances. Popular CPs such as Pond-Phuwin, Gemini-Fourth, and Earth-Mix are set to return, ensuring that fans will have plenty to look forward to.</p>
      <h3 class="h5 fw-bold mt-4 mb-3">What to Expect</h3>
      <p>The 2025 lineup is designed to cater to a wide range of tastes. From lighthearted romantic comedies to intense dramas with a touch of mystery, there's something for everyone. GMMTV has also hinted at exploring new themes and pushing creative boundaries, making this one of their most ambitious lineups to date.</p>
      <blockquote class="blockquote my-4">
        <p class="mb-0">"This is going to be a game-changer for BL and GL dramas in 2025."</p>
        <footer class="blockquote-footer">BL Fanatic</footer>
      </blockquote>
     <h3 class="h5 fw-bold mt-4 mb-3">Key Highlights</h3>
<ul class="my-4">
  <li>20 new BL and GL dramas announced for 2025:</li>
  <ul class="list-unstyled ps-4">
    <li><strong>Only Friends: Dream On</strong></li>
    <li><strong>Dare You to Death</strong></li>
    <li><strong>The Boy Next World</strong></li>
    <li><strong>Boys in Love</strong></li>
    <li><strong>Pit Babe Season 2</strong></li>
    <li><strong>Ticket to Heaven</strong></li>
    <li><strong>My Alien Boyfriend</strong> – A sci-fi BL exploring love between a human and an extraterrestrial visitor.</li>
    <li><strong>Whisper in the Rain</strong> – A romantic mystery set in a rainy countryside town.</li>
    <li><strong>Forbidden Tides</strong> – A GL drama featuring a love story between a marine biologist and a mysterious islander.</li>
    <li><strong>Forever After</strong> – A reincarnation-themed romance spanning centuries.</li>
    <li><strong>Through the Fire</strong> – A firefighter-themed BL with action-packed moments and heartfelt connections.</li>
    <li><strong>Shadow Hearts</strong> – A fantasy BL with a mix of witches, curses, and fateful love.</li>
    <li><strong>Call Me By My Story</strong> – A modern GL tale of two writers whose fictional characters mirror their own love story.</li>
    <li><strong>Moonlit Memories</strong> – A nostalgic BL drama about childhood sweethearts reuniting after a decade apart.</li>
    <li><strong>Game Changers</strong> – A sports-themed BL about rival athletes becoming teammates and lovers.</li>
    <li><strong>Sapphire Skies</strong> – A GL drama exploring first love among college roommates.</li>
    <li><strong>Code of Love</strong> – A tech-centered BL featuring rival app developers discovering unexpected affection.</li>
    <li><strong>His Masterpiece</strong> – A period BL set in the art world of the 19th century.</li>
    <li><strong>Breaking Boundaries</strong> – A GL drama about a lawyer and a free-spirited artist challenging societal norms.</li>
    <li><strong>Hidden Pages</strong> – A BL focusing on a shy librarian and an outgoing book club organizer discovering love through literature.</li>
  </ul>
  <li>Return of popular CPs like Pond-Phuwin, Gemini-Fourth, and Earth-Mix</li>
  <li>Genres include romance, mystery, comedy, fantasy, action, and sci-fi</li>
  <li>Exciting explorations of new themes and creative boundaries</li>
</ul>
      <p>For more details, check out the full lineup on <a :href="post.url" target="_blank">Sportskeeda</a>.</p>
    `,
    url: 'https://www.sportskeeda.com/us/k-pop/from-girl-rules-burnout-syndrome-gmmtv-reveals-2025-bl-gl-thai-drama-lineup',
  },
  {
    id: 2,
title: 'The Boy Next World: A Multiverse Love Story',
author: 'MyDramaList',
date: '2025-01-05',
excerpt: 'Starring Boss Chaikamon and Noeul Nuttarat, "The Boy Next World" explores a multiverse romance where two lovers reunite across parallel worlds. The series is set to premiere on January 5, 2025.',
content: `
  <h2 class="h4 fw-bold mb-3">A Love That Transcends Worlds</h2>
  <p>Prepare to be swept off your feet by <strong>"The Boy Next World,"</strong> a groundbreaking BL drama that explores the concept of multiverse romance. Starring Boss Chaikamon and Noeul Nuttarat, the series follows two lovers who are destined to find each other across parallel worlds.</p>
  <p>The story begins when Pran, a young artist, discovers a mysterious portal that leads to another universe. There, he meets Korn, a musician who bears an uncanny resemblance to his childhood crush. As they navigate the challenges of their respective worlds, Pran and Korn must confront their feelings and decide whether their love is strong enough to transcend reality itself.</p>
  <h3 class="h5 fw-bold mt-4 mb-3">Why You Should Watch</h3>
  <p>With its unique storyline, stunning visuals, and heartfelt performances, <strong>"The Boy Next World"</strong> is poised to become a standout in the 2025 BL lineup. The chemistry between Boss and Noeul is electric, and the show's exploration of love, destiny, and alternate realities is both thought-provoking and emotionally resonant.</p>
  <blockquote class="blockquote my-4">
    <p class="mb-0">"A groundbreaking drama that redefines the BL genre."</p>
    <footer class="blockquote-footer">Drama Critic</footer>
  </blockquote>
  <h3 class="h5 fw-bold mt-4 mb-3">Behind the Scenes</h3>
  <p>The creators of <strong>"The Boy Next World"</strong> have shared their dedication to delivering a visually stunning and narratively compelling story. Director Pavit Prachya explained, "This series is more than just a love story; it's a journey of self-discovery and exploring what truly matters when life gives you infinite possibilities."</p>
  <p>Filmed across multiple locations to bring the multiverse concept to life, the series blends futuristic settings with timeless romance. The costume design and set aesthetics have been meticulously crafted to differentiate each universe, making the experience immersive and visually captivating.</p>
  <h3 class="h5 fw-bold mt-4 mb-3">What Fans Are Saying</h3>
  <p>Anticipation for <strong>"The Boy Next World"</strong> has reached fever pitch. Fans have taken to social media to share their excitement:</p>
  <ul class="my-4">
    <li>"This is the BL drama we've been waiting for! Boss and Noeul are going to blow us away!"</li>
    <li>"The multiverse concept is so fresh and exciting. Can't wait to see how they explore it!"</li>
    <li>"Already in love with the trailers. The visuals are breathtaking!"</li>
  </ul>
  <h3 class="h5 fw-bold mt-4 mb-3">Don’t Miss Out</h3>
  <p>Whether you’re a fan of science fiction, romance, or simply enjoy a well-crafted love story, <strong>"The Boy Next World"</strong> has something for everyone. Mark your calendars and join Pran and Korn on their unforgettable journey starting January 5, 2025.</p>
  <p>For more details, visit <a :href="post.url" target="_blank">MyDramaList</a> or follow the official social media pages for updates, trailers, and behind-the-scenes content.</p>
`,
url: 'https://mydramalist.com/747973-the-boy-next-world',

  },
  {
    id: 3,
title: 'Boys in Love: A Fresh Take on BL Drama',
author: 'Lifestyle Asia India',
date: '2024-11-27',
excerpt: 'GMMTV’s "Boys in Love" introduces rookie actors Mick Metas and Luke Peemsan in a lighthearted romantic comedy. Directed by Waa Waasuthep, the drama is set to release in mid-2025 and promises a fresh perspective on BL storytelling.',
content: `
  <h2 class="h4 fw-bold mb-3">A New Chapter in BL Storytelling</h2>
  <p>GMMTV continues to push boundaries with its much-anticipated release, <strong>"Boys in Love."</strong> This lighthearted romantic comedy, directed by Waa Waasuthep, brings a refreshing narrative to the BL genre while shining the spotlight on rising stars Mick Metas and Luke Peemsan.</p>
  <p>The drama follows <strong>Pete</strong> and <strong>Kao,</strong> two college students from vastly different worlds. Pete, a free-spirited artist with a penchant for creativity, is the complete opposite of Kao, a disciplined and goal-oriented athlete. Their lives collide when they are paired for a challenging class project. What starts as a comedic clash of personalities gradually blossoms into an unexpected connection filled with humor, warmth, and budding romance.</p>
  
  <h3 class="h5 fw-bold mt-4 mb-3">What Sets "Boys in Love" Apart</h3>
  <p><strong>"Boys in Love"</strong> stands out in the crowded BL landscape by prioritizing authenticity and relatability. Unlike dramas that lean heavily into melodrama, this series opts for heartfelt, everyday moments that reflect the joys and struggles of young love. From navigating friendships to discovering one’s identity, the story resonates with audiences across all age groups.</p>
  <p>Rookie actors Mick Metas and Luke Peemsan deliver standout performances, bringing Pete and Kao to life with natural charisma and genuine chemistry. Their nuanced portrayal of two contrasting personalities finding common ground is sure to tug at viewers’ heartstrings.</p>
  
  <h3 class="h5 fw-bold mt-4 mb-3">A Vision from Waa Waasuthep</h3>
  <p>Director Waa Waasuthep shares a passion for telling stories that feel both fresh and meaningful. "This series is about more than romance," Waa explains. "It’s about understanding differences, building connections, and finding love in unexpected places. I hope it inspires viewers to embrace the beauty of diverse relationships."</p>
  <p>The series also features stunning cinematography, capturing the vibrant campus life and intimate moments that shape Pete and Kao’s journey. From lively art studios to bustling sports fields, every setting adds depth to the characters’ evolving bond.</p>
  
  <h3 class="h5 fw-bold mt-4 mb-3">Why You Should Watch</h3>
  <p>Whether you're a seasoned BL fan or new to the genre, <strong>"Boys in Love"</strong> offers something for everyone. Here’s why it’s a must-watch:</p>
  <ul class="my-4">
    <li>A heartwarming narrative that celebrates love in its many forms.</li>
    <li>Strong performances from Mick and Luke, making their debut as leads.</li>
    <li>A perfect blend of comedy, romance, and life lessons that leave a lasting impression.</li>
    <li>Direction by Waa Waasuthep, known for crafting relatable and visually appealing dramas.</li>
  </ul>
  
  <h3 class="h5 fw-bold mt-4 mb-3">What Fans Are Saying</h3>
  <p>Fans are already buzzing about the series:</p>
  <ul class="my-4">
    <li>"The dynamic between Pete and Kao looks amazing! Can’t wait to see how their story unfolds."</li>
    <li>"Finally, a BL drama that feels fresh and grounded in reality."</li>
    <li>"Mick and Luke are so talented—I’m already a fan after seeing the teaser!"</li>
  </ul>
  
  <h3 class="h5 fw-bold mt-4 mb-3">Save the Date</h3>
  <p><strong>"Boys in Love"</strong> is set to premiere in mid-2025, and it’s already shaping up to be a fan favorite. Don’t miss this heartwarming and innovative take on the BL genre. Be sure to follow GMMTV’s official pages for updates, trailers, and exclusive behind-the-scenes content.</p>
  <p>For more details, visit <a :href="post.url" target="_blank">Lifestyle Asia India</a> and stay tuned for the latest news.</p>
`,
url: 'https://www.lifestyleasia.com/ind/entertainment/streaming/romantic-thai-dramas-releasing-in-2025/',

  },
  {
  id: 4,
  title: 'Pit Babe Season 2: What to Expect',
  author: 'The BL Xpress',
  date: '2024-11-27',
  excerpt: 'The highly anticipated second season of "Pit Babe" is set to release in 2025, with Pavel Naret and Pooh Krittin reprising their roles. Fans can expect more drama, romance, and high-speed action in this sequel.',
  content: `
    <h2 class="h4 fw-bold mb-3">The Return of Pit Babe</h2>
    <p>Fans of <strong>"Pit Babe"</strong> are in for a treat as the adrenaline-fueled BL drama returns with its much-awaited second season in 2025. Bringing back the charismatic duo <strong>Pavel Naret</strong> and <strong>Pooh Krittin</strong> as Babe and Charlie, the series promises to amplify everything fans loved about the original. From gripping races to passionate romances, Season 2 raises the stakes while exploring uncharted emotional depths.</p>
    <p>The first season captured hearts with its mix of high-speed action, rivalry, and a tender love story between Babe, an ambitious racer, and Charlie, his loyal mechanic-turned-partner. Now, the sequel dives deeper into their intertwined lives, exploring themes of ambition, loyalty, and love amidst the unforgiving world of competitive racing.</p>
    <h3 class="h5 fw-bold mt-4 mb-3">What's New in Season 2?</h3>
    <p>Season 2 introduces new layers to the story with <strong>fresh characters</strong> who bring new rivalries and alliances. Fans can also expect breathtaking race sequences featuring cutting-edge technology, enhanced visuals, and high-octane drama on and off the track.</p>
    <p>As Babe's ambitions take him to new heights, he faces fierce competition and personal sacrifices that threaten his relationship with Charlie. Meanwhile, Charlie must come to terms with his own aspirations while supporting the man he loves. Will their bond endure, or will the pressures of fame and success drive them apart?</p>
    <blockquote class="blockquote my-4">
      <p class="mb-0">"A thrilling sequel that delivers on all fronts."</p>
      <footer class="blockquote-footer">BL Critic</footer>
    </blockquote>
    <h3 class="h5 fw-bold mt-4 mb-3">Key Highlights</h3>
    <ul class="my-4">
      <li>New characters and rivalries</li>
      <li>More intense racing scenes</li>
      <li>Deeper exploration of Babe and Charlie's relationship</li>
    </ul>
    <p>Don’t miss the return of <strong>"Pit Babe"</strong> in 2025 for another ride filled with passion, drama, and action. For updates, visit <a :href="post.url" target="_blank">The BL Xpress</a>.</p>
  `,
  url: 'https://theblxpress.wordpress.com/2024/11/27/gmmtv-lineup-2025-riding-the-wave/',
},
{
  id: 5,
  title: 'Ticket to Heaven: A Tale of Forbidden Love',
  author: 'Vocal Media',
  date: '2024-11-27',
  excerpt: 'Gemini and Fourth star in "Ticket to Heaven," a BL drama that tackles themes of religion and forbidden love. The series is already generating buzz for its emotional depth and powerful performances.',
  content: `
    <h2 class="h4 fw-bold mb-3">A Story of Love and Sacrifice</h2>
    <p><strong>"Ticket to Heaven"</strong> is set to redefine BL dramas in 2025 with its poignant exploration of forbidden love and faith. Featuring <strong>Gemini</strong> and <strong>Fourth</strong> in lead roles, the series boldly navigates the intricate relationship between religion and love, challenging societal norms with its emotionally charged storytelling.</p>
    <p>The narrative centers on <strong>Kai,</strong> a devout seminary student preparing for priesthood, and <strong>Leo,</strong> a free-spirited artist who lives life on his own terms. Their paths cross in a serendipitous encounter that blossoms into an unexpected bond. Torn between their feelings and their responsibilities, Kai and Leo embark on a journey of self-discovery, testing the boundaries of love and faith.</p>
    <h3 class="h5 fw-bold mt-4 mb-3">Why This Drama Stands Out</h3>
    <p>What makes <strong>"Ticket to Heaven"</strong> remarkable is its willingness to address sensitive topics with authenticity and care. The series doesn’t shy away from the challenges of reconciling love with religious doctrine, making it both thought-provoking and emotionally gripping.</p>
    <p><strong>Gemini and Fourth's performances</strong> have already garnered praise for their ability to convey the nuances of their characters. Critics laud their chemistry and emotional range, making every scene deeply impactful.</p>
    <blockquote class="blockquote my-4">
      <p class="mb-0">"A poignant and unforgettable tale of love, faith, and sacrifice."</p>
      <footer class="blockquote-footer">BL Critic</footer>
    </blockquote>
    <h3 class="h5 fw-bold mt-4 mb-3">Key Highlights</h3>
    <ul class="my-4">
      <li>Exploration of religion and forbidden love</li>
      <li>Powerful performances by Gemini and Fourth</li>
      <li>Emotionally resonant storytelling</li>
    </ul>
    <p>Critics are already calling it a "game-changer" for the BL genre. Mark your calendars for 2025 and prepare to be moved by <strong>"Ticket to Heaven."</strong> For more information, visit <a :href="post.url" target="_blank">Vocal Media</a>.</p>
  `,
  url: 'https://vocal.media/humor/gmmtv-2025-your-guide-to-the-exciting-new-lineup',
},

  // Add more posts as needed...
];
        // Find the post with the matching id
        this.post = blogPosts.find(post => post.id === parseInt(this.id));
      },
    },
  };
  </script>
  
  <style scoped>
  .blog-post-page {
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }
  
  .card {
    border: none;
    border-radius: 8px;
  }
  
  .card-img-top {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .blog-content {
    text-align: justify; /* Justify text */
    line-height: 1.8; /* Improve readability */
  }
  
  .blog-content h2,
  .blog-content h3 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .blog-content p {
    margin-bottom: 1.2rem;
  }
  
  .blog-content ul {
    margin-bottom: 1.2rem;
    padding-left: 1.5rem;
  }
  
  .blog-content ul li {
    margin-bottom: 0.5rem;
  }
  
  .blog-content blockquote {
    border-left: 4px solid #42b983;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #555;
  }
  
  .blog-content blockquote footer {
    font-size: 0.875rem;
    color: #777;
  }
  
  .btn-outline-primary {
    border-color: #42b983;
    color: #42b983;
  }
  
  .btn-outline-primary:hover {
    background-color: #42b983;
    color: #ffffff;
  }
  
  .btn-outline-secondary {
    border-color: #6c757d;
    color: #6c757d;
  }
  
  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #ffffff;
  }

  
  .not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(106, 17, 203, 0.7), rgba(37, 117, 252, 0.7)); /* Semi-transparent gradient */
  color: #fff;
  font-family: 'Inter', sans-serif;
  padding: 20px;
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
/* Responsive Design */
@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }

  .blog-image {
    height: 300px;
  }

  .title {
    font-size: 4rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .description {
    font-size: 1rem;
  }
}

.blog-post {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem; /* Add margin for better spacing on mobile */
}

.blog-body {
  padding: 1.5rem; /* Reduce padding for mobile */
}

.blog-title {
  font-size: 1.75rem; /* Smaller font size for mobile */
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.blog-meta {
  font-size: 0.875rem; /* Smaller font size for mobile */
  margin-bottom: 1rem;
}

.blog-content {
  font-size: 0.9375rem; /* Smaller font size for mobile */
  line-height: 1.6; /* Adjust line height for better readability */
  color: #4a5568;
}

.blog-content >>> img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.blog-content >>> h2 {
  font-size: 1.5rem; /* Smaller heading size for mobile */
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.blog-content >>> h3 {
  font-size: 1.25rem; /* Smaller heading size for mobile */
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.blog-content >>> p {
  margin-bottom: 1rem;
}

.blog-content >>> ul {
  margin-bottom: 1rem;
  padding-left: 1.25rem; /* Adjust padding for mobile */
}

.blog-content >>> ul li {
  margin-bottom: 0.5rem;
}

.blog-content >>> blockquote {
  border-left: 4px solid #42b983;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #555;
}

.blog-content >>> blockquote footer {
  font-size: 0.875rem;
  color: #777;
}

.blog-actions {
  margin-top: 1.5rem; /* Adjust margin for mobile */
  display: flex;
  flex-direction: column; /* Stack buttons vertically on mobile */
  gap: 0.75rem; /* Add gap between buttons */
}

.btn {
  font-weight: 600;
  padding: 0.5rem 1rem; /* Adjust padding for mobile */
  border-radius: 25px;
  transition: all 0.3s ease;
  width: 100%; /* Full width buttons on mobile */
  text-align: center;
}

.btn-outline-primary {
  border-color: #6a11cb;
  color: #6a11cb;
}

.btn-outline-primary:hover {
  background: #6a11cb;
  color: #ffffff;
}

.btn-outline-secondary {
  border-color: #6b7280;
  color: #6b7280;
}

.btn-outline-secondary:hover {
  background: #6b7280;
  color: #ffffff;
}

/* Responsive Design for Larger Screens */
@media (min-width: 768px) {
  .blog-body {
    padding: 2rem; /* Restore padding for larger screens */
  }

  .blog-title {
    font-size: 2.5rem; /* Restore font size for larger screens */
  }

  .blog-meta {
    font-size: 0.9rem; /* Restore font size for larger screens */
  }

  .blog-content {
    font-size: 1rem; /* Restore font size for larger screens */
  }

  .blog-content  h2 {
    font-size: 2rem; /* Restore heading size for larger screens */
  }

  .blog-content h3 {
    font-size: 1.5rem; /* Restore heading size for larger screens */
  }

  .blog-actions {
    flex-direction: row; /* Align buttons horizontally on larger screens */
    gap: 0.5rem; /* Adjust gap between buttons */
  }

  .btn {
    width: auto; /* Auto width for buttons on larger screens */
    padding: 0.5rem 1.5rem; /* Restore padding for larger screens */
  }
}

</style>