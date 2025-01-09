<template>
  <div class="faq py-5">
    <div class="container">
      <!-- FAQ Heading -->
      <h1 class="text-center mb-5 fw-bold">Frequently Asked Questions</h1>

      <!-- FAQ Accordion -->
      <div class="accordion modern-accordion" id="faqAccordion">
        <!-- Dynamically render FAQ items -->
        <div
          v-for="(faq, index) in faqData"
          :key="faq.id"
          class="accordion-item"
        >
          <h2 class="accordion-header" :id="faq.id">
            <button
              class="accordion-button fw-bold"
              :class="{ collapsed: index !== 0 }"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#${faq.id}Collapse`"
              :aria-expanded="index === 0 ? 'true' : 'false'"
              :aria-controls="`${faq.id}Collapse`"
            >
              {{ faq.question }}
            </button>
          </h2>
          <div
            :id="`${faq.id}Collapse`"
            class="accordion-collapse collapse"
            :class="{ show: index === 0 }"
            :aria-labelledby="faq.id"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body" v-html="faq.answer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faqData from '@/assets/faq.json'; // Adjust the path as needed

export default {
  name: 'FAQ',
  data() {
    return {
      faqData: faqData,
    };
  },
};
</script>

<style scoped>
/* Your existing styles */
.faq {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 60px 0;
}

h1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: #2c3e50;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

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