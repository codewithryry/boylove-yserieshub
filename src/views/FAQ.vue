<template>
    <div class="faq py-5">
      <div class="container">
        <!-- FAQ Heading -->
        <h1 class="text-center mb-5 fw-bold">Frequently Asked Questions</h1>
  
        <!-- FAQ Accordion -->
        <div class="accordion modern-accordion" id="faqAccordion">
          <!-- FAQ 1 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                What is Thai BL?
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Thai BL (Boys' Love) is a genre of television series and films from Thailand that focus on romantic relationships between male characters. 
                These stories often explore themes of love, friendship, and personal growth, captivating audiences with their heartfelt narratives and 
                memorable characters.
              </div>
            </div>
          </div>
  
          <!-- FAQ 2 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                How can I contribute to the website?
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                We welcome contributions from fans! If you'd like to write reviews, suggest new series, or share your thoughts, please contact us at 
                <a href="mailto:info@thaiblrecommendations.com" class="text-decoration-none">info@thaiblrecommendations.com</a>. Your input helps us 
                grow and provide even better content for the community.
              </div>
            </div>
          </div>
  
          <!-- FAQ 3 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Where can I watch Thai BL series?
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Thai BL series are available on various streaming platforms such as YouTube, Viki, LINE TV, and Netflix. Some series may also be 
                available on official channels or websites of the production companies. We recommend checking multiple platforms to find your 
                favorite shows.
              </div>
            </div>
          </div>
  
          <!-- FAQ 4 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Are Thai BL series subtitled in English?
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Yes, most Thai BL series are subtitled in English, especially on international streaming platforms like Viki and Netflix. Fan 
                subtitles are also often available on YouTube, making it easier for global audiences to enjoy these stories.
              </div>
            </div>
          </div>
  
          <!-- FAQ 5 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
              <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                What are some popular Thai BL series?
              </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Some popular Thai BL series include "2gether: The Series," "TharnType: The Series," "Bad Buddy," "I Told Sunset About You," and 
                "Love by Chance." These series have gained international acclaim for their compelling storytelling and unforgettable characters.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FAQ',
  };
  </script>
  
  <style scoped>

  
  .faq {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef); /* Gradient background */
    padding: 60px 0;
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    color: #2c3e50; /* Dark text for better readability */
    margin-bottom: 40px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Modern Accordion Styling */
  .modern-accordion .accordion-item {
    border: none;
    border-radius: 12px;
    margin-bottom: 15px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .modern-accordion .accordion-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  .modern-accordion .accordion-button {
    background-color: #ffffff;
    color: #2c3e50;
    font-weight: 700;
    padding: 20px;
    border: none;
    border-radius: 12px;
    box-shadow: none;
    transition: all 0.3s ease;
  }
  
  .modern-accordion .accordion-button:not(.collapsed) {
    background-color: #ffffff;
    color: #42b983;
  }
  
  .modern-accordion .accordion-button::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%232c3e50'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    transition: transform 0.3s ease;
  }
  
  .modern-accordion .accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2342b983'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    transform: rotate(180deg);
  }
  
  .modern-accordion .accordion-body {
    padding: 20px;
    background-color: #ffffff;
    color: #555;
    line-height: 1.8;
    border-top: 1px solid #e9ecef;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  
    .modern-accordion .accordion-button {
      padding: 15px;
    }
  
    .modern-accordion .accordion-body {
      padding: 15px;
    }
  }
  </style>