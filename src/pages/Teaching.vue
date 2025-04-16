<template>
  <section class="max-w-4xl mx-auto p-6 space-y-10">
    <!-- Toggle Header -->
    <h1 class="text-1xl text-gray-500 mb-6 text-left">
      <button
        @click="currentView = 'consultant'"
        :class="currentView === 'consultant' ? 'bg-accent text-white' : 'bg-base-300 text-gray-700 hover:text-accent'"
        class="mx-2 px-4 py-2 rounded shadow transition"
      >
        Research Consultant
      </button>
    
      <button
        @click="currentView = 'ta'"
        :class="currentView === 'ta' ? 'bg-accent text-white' : 'bg-base-300 text-gray-700 hover:text-accent'"
        class="mx-2 px-4 py-2 rounded shadow transition"
      >
        Teaching Assistant
      </button>
      
    </h1>

    

    <!-- Consultant Section -->
    <div v-if="currentView === 'consultant'" class="space-y-8">
      <h2 class="text-1xl font-semibold text-black-400 flex items-center gap-3 mb-2">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8" />
        Research Consulting @ Northwestern IT
      </h2>

      <!-- One-on-One Consultations -->
      <div>
        <h3 class="text-lg font-bold text-accent mb-2">One-on-One Consultations</h3>
        <p class="text-sm text-gray-600 mb-4">
          Independent consultations I led with Northwestern research teams, focused on technical and methodological challenges.
        </p>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="(consult, index) in consults"
            :key="index"
            class="perspective"
          >
            <div class="flip-card">
              <div class="flip-card-inner">
                <!-- Front -->
                <div class="flip-card-front bg-base-200 p-4 rounded shadow hover:ring-2 hover:ring-accent transition flex items-center justify-center text-center">
                  <h3 class="text-sm font-bold text-accent">{{ consult.topic }}</h3>
                </div>
                <!-- Back -->
                <div class="flip-card-back bg-base-100 p-4 rounded shadow text-xs text-gray-600 flex items-center justify-center text-center">
                  {{ consult.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Workshops -->
      <div>
        <h3 class="text-lg font-bold text-accent mt-8 mb-2">Workshops</h3>
        <div class="bg-base-200 p-4 rounded shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-gray-700">
              <span class="font-semibold">Bayesian Modeling Workshop</span> — Taught in Winter 2024 and Winter 2025.
            </p>
            <p class="text-xs text-gray-500">Hosted by Northwestern IT | Open-source Jupyter Notebook on GitHub</p>
          </div>
          <a
            href="https://github.com/s-vishnoi/Bayesian_Regression/blob/main/stan_workshop.ipynb"
            target="_blank"
            class="text-sm bg-accent text-white px-4 py-2 rounded hover:bg-accent-focus transition"
          >
            View Workshop Repo ↗
          </a>
        </div>
      </div>

      <!-- Request Consult Button -->
      <div class="mt-4 text-right">
        <a
          href="https://www.it.northwestern.edu/departments/it-services-support/teaching/learning.html"
          target="_blank"
          class="text-sm bg-base-300 hover:bg-base-200 px-4 py-2 rounded shadow transition"
        >
          Request a Consult →
        </a>
      </div>
    </div>


    <!-- Teaching Assistant Section -->
    <div v-else class="space-y-6">
      <h2 class="text-1xl font-semibold text-black-400 flex items-center gap-3">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8" />
        Northwestern University Physics and Astronomy
      </h2>
      <div class="bg-base-100 p-4 rounded-box shadow space-y-2">
        <ul class="list-disc list-inside text-gray-700 mb-4">
          <li>General Physics - 2021 Fall | 2022 Winter Spring | 2023 Fall Winter | 2025 Winter</li>
        </ul>

        <!-- Scrollable Testimonials -->
        <div class="max-h-64 overflow-y-auto space-y-4 p-4 border rounded bg-base-200">
          <blockquote
            v-for="(quote, index) in nuTestimonials"
            :key="index"
            class="italic text-sm text-gray-600 border-l-4 border-accent pl-4"
          >
            “{{ quote }}”
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { nuTestimonials } from '../data/nuTestimonials.js'
import { consults } from '../data/nuConsults.js'

const currentView = ref('consultant') 
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.flip-card {
  width: 100%;
  height: 120px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.5rem;
  padding: 1rem;
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>
