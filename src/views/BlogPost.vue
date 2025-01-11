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

    <!-- 404 Error Page -->
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
import blogPosts from '@/assets/blogPosts.json'; // Adjust the path as needed

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
.blog-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.blog-content :deep(h2) {
  font-size: 1.5rem; /* Smaller heading size for mobile */
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.blog-content :deep(h3) {
  font-size: 1.25rem; /* Smaller heading size for mobile */
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.blog-content :deep(p) {
  margin-bottom: 1rem;
}

.blog-content :deep(ul) {
  margin-bottom: 1rem;
  padding-left: 1.25rem; /* Adjust padding for mobile */
}

.blog-content :deep(ul li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #42b983;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #555;
}
.blog-content :deep(blockquote footer) {
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