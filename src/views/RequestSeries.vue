<template>
  <div class="request-series-page">
    <div class="content-container">
      <div class="form-card">
        <div class="form-header">
          <div class="header-decoration"></div>
          <h1>Request a Series</h1>
          <p class="subtitle">Share your favorite series with the community</p>
        </div>

        <form @submit.prevent="submitRequest" class="request-form">
          <div class="form-content">
            <div class="input-section">
              <!-- Series Name Input -->
              <div class="floating-input">
                <input
                  type="text"
                  id="seriesName"
                  v-model="seriesName"
                  required
                  placeholder=" "
                  maxlength="100"
                />
                <label for="seriesName">Series Name</label>
                <div class="input-line"></div>
              </div>

              <!-- Message Input -->
              <div class="floating-input">
                <textarea
                  id="message"
                  v-model="message"
                  rows="4"
                  placeholder=" "
                  maxlength="500"
                ></textarea>
                <label for="message">Tell us about this series</label>
                <div class="input-line"></div>
              </div>
            </div>

            <div class="preview-section">
              <!-- YouTube Trailer Input -->
              <div class="floating-input">
                <input
                  type="url"
                  id="youtubeTrailer"
                  v-model="youtubeTrailer"
                  @input="debouncedUpdateYouTubePreview"
                  placeholder=" "
                />
                <label for="youtubeTrailer">Trailer URL</label>
                <div class="input-line"></div>
              </div>

              <!-- YouTube Preview -->
              <div class="preview-container">
                <div v-if="youtubeEmbedUrl" class="youtube-preview">
                  <iframe
                    width="100%"
                    height="100%"
                    :src="youtubeEmbedUrl"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <div v-else class="preview-placeholder">
                  <div class="placeholder-content">
                    <div class="placeholder-icon">
                      <div class="play-button"></div>
                    </div>
                    <p>Share a trailer to bring your request to life</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="submit-button" :disabled="isLoading">
            <span v-if="!isLoading">Submit Request</span>
            <span v-else>Submitting...</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content success-modal">
        <div class="modal-header">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2>Request Submitted!</h2>
        </div>
        <div class="modal-body">
          <p>Thank you for your series request. We'll review it shortly.</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="btn-close">Got it!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { debounce } from 'lodash';

export default {
  name: 'RequestSeries',
  setup() {
    const seriesName = ref('');
    const youtubeTrailer = ref('');
    const youtubeEmbedUrl = ref('');
    const message = ref('');
    const isLoading = ref(false);
    const isModalVisible = ref(false);

    const extractYouTubeId = (url) => {
      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    const updateYouTubePreview = () => {
      if (youtubeTrailer.value) {
        const videoId = extractYouTubeId(youtubeTrailer.value);
        if (videoId) {
          youtubeEmbedUrl.value = `https://www.youtube.com/embed/${videoId}`;
        } else {
          youtubeEmbedUrl.value = '';
        }
      } else {
        youtubeEmbedUrl.value = '';
      }
    };

    const debouncedUpdateYouTubePreview = debounce(updateYouTubePreview, 300);

    const resetForm = () => {
      seriesName.value = '';
      youtubeTrailer.value = '';
      youtubeEmbedUrl.value = '';
      message.value = '';
    };

    const submitRequest = async () => {
      if (!seriesName.value.trim()) {
        alert('Please enter a series name.');
        return;
      }

      isLoading.value = true;

      try {
        await addDoc(collection(db, 'requests'), {
          seriesName: seriesName.value,
          youtubeTrailer: youtubeTrailer.value,
          message: message.value,
          timestamp: new Date(),
        });

        isModalVisible.value = true;
        resetForm();
      } catch (error) {
        console.error('Error adding document: ', error);
        alert('An error occurred. Please try again.');
      } finally {
        isLoading.value = false;
      }
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    return {
      seriesName,
      youtubeTrailer,
      youtubeEmbedUrl,
      message,
      isLoading,
      isModalVisible,
      debouncedUpdateYouTubePreview,
      submitRequest,
      closeModal,
    };
  },
};
</script>

<style scoped>
.request-series-page {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 10% 20%, rgba(255, 200, 124, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(124, 200, 255, 0.15) 0%, transparent 25%),
    radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f4f8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content-container {
  width: 100%;
  max-width: 1200px;
}

.form-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-header {
  padding: 3rem 2rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.header-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(
    90deg,
    #FF6B6B 0%,
    #4ECDC4 33%,
    #45B7D1 66%,
    #96C93D 100%
  );
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1f36;
  margin: 0;
  letter-spacing: -0.03em;
}

.subtitle {
  color: #64748b;
  margin-top: 0.5rem;
  font-size: 1.1rem;
}

.form-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem 3rem;
}

.floating-input {
  position: relative;
  margin-bottom: 2rem;
}

.floating-input input,
.floating-input textarea {
  width: 100%;
  padding: 1rem 0;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1a1f36;
  outline: none;
}

.floating-input label {
  position: absolute;
  left: 0;
  top: 1rem;
  color: #64748b;
  transition: all 0.2s ease;
  pointer-events: none;
}

.floating-input input:focus ~ label,
.floating-input input:not(:placeholder-shown) ~ label,
.floating-input textarea:focus ~ label,
.floating-input textarea:not(:placeholder-shown) ~ label {
  top: -0.5rem;
  font-size: 0.875rem;
  color: #2563eb;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #e2e8f0;
  transition: all 0.2s ease;
}

.floating-input input:focus ~ .input-line,
.floating-input textarea:focus ~ .input-line {
  background: #2563eb;
  height: 2px;
}

.preview-container {
  margin-top: 1rem;
  aspect-ratio: 16/9;
  border-radius: 20px;
  overflow: hidden;
  background: #f8fafc;
  position: relative;
}

.youtube-preview {
  height: 100%;
}

.preview-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
  border: 2px dashed #e2e8f0;
  border-radius: 20px;
}

.placeholder-content {
  text-align: center;
  color: #64748b;
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0 15px 25px;
  border-color: transparent transparent transparent #2563eb;
  margin-left: 5px;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #2563eb;
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;
  margin: 2rem auto 3rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.submit-button:active {
  transform: translateY(0);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

.success-modal {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  transform: translateY(0);
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
}

.success-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 1rem;
  background: #ecfdf5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #059669;
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
}

.success-icon svg {
  width: 40px;
  height: 40px;
  animation: checkmark 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.modal-body {
  padding: 1rem 2rem;
  text-align: center;
}

.modal-body p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.5;
}

.modal-footer {
  padding: 1.5rem 2rem 2rem;
  text-align: center;
}

.btn-close {
  background: #059669;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-close:hover {
  background: #047857;
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(5, 150, 105, 0.2);
}

.btn-close:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes checkmark {
  from {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .request-series-page {
    padding: 1rem;
  }

  .form-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .submit-button {
    width: calc(100% - 3rem);
    margin: 1.5rem;
  }
}
</style>