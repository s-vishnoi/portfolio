<template>
  <section class="max-w-4xl mx-auto p-6 space-y-10">
    <!-- Toggle Header -->
    <h1 class="text-3xl font-bold mb-6 text-center">
      <button
        @click="currentView = 'ta'"
        :class="currentView === 'ta' ? 'text-accent underline' : 'text-gray-400 hover:text-accent'"
        class="mx-2"
      >
        Teaching Assistant
      </button>
      |
      <button
        @click="currentView = 'consultant'"
        :class="currentView === 'consultant' ? 'text-accent underline' : 'text-gray-400 hover:text-accent'"
        class="mx-2"
      >
        Research Consultant
      </button>
    </h1>

    <!-- Teaching Assistant Section -->
    <div v-if="currentView === 'ta'" class="space-y-6">
      <h2 class="text-2xl font-semibold text-black-400 flex items-center gap-3">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8" />
        Northwestern University
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

    <!-- Consultant Section -->
    <div v-else>
      <h2 class="text-2xl font-semibold text-black-400 flex items-center gap-3 mb-4">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8" />
        Research Consulting @ Northwestern IT
      </h2>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(consult, index) in consults"
          :key="index"
          class="bg-base-200 p-4 rounded shadow hover:ring-2 hover:ring-accent transition"
        >
          <h3 class="text-sm font-bold text-accent mb-2">{{ consult.topic }}</h3>
          <p class="text-xs text-gray-600">{{ consult.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { nuTestimonials } from '../data/nuTestimonials.js'
import { consults } from '../data/nuConsults.js'

const currentView = ref('ta')
</script>
