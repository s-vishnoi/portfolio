<template>
  <section class="max-w-4xl mx-auto p-6 space-y-10">
    <!-- Toggle Header -->
    <h1 class="text-2xl font-bold mb-6 text-left">
      <button
        @click="currentView = 'consultant'"
        :class="currentView === 'consultant' ? activeBtn : inactiveBtn"
        class="mx-2 transition"
      >
        Research Consultant
      </button>
      |
      <button
        @click="currentView = 'ta'"
        :class="currentView === 'ta' ? activeBtn : inactiveBtn"
        class="mx-2 transition"
      >
        Teaching Assistant
      </button>
    </h1>

    <!-- Consultant Section -->
    <div v-if="currentView === 'consultant'" class="space-y-6">
      <div class="flex items-center gap-3 mb-4">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8" />
        <h2 class="text-2xl font-semibold">Research Consulting @ Northwestern IT</h2>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(consult, index) in consults"
          :key="index"
          class="bg-base-100 p-4 rounded-box shadow-md border border-base-200 hover:ring-2 hover:ring-accent transition"
        >
          <h3 class="text-sm font-bold text-accent mb-2">{{ consult.topic }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-snug">{{ consult.description }}</p>
        </div>
      </div>
    </div>

    <!-- Teaching Assistant Section -->
    <div v-else class="space-y-6">
      <div class="flex items-center gap-3">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8" />
        <h2 class="text-2xl font-semibold">Northwestern University</h2>
      </div>

      <div class="bg-base-100 p-4 rounded-box shadow space-y-4">
        <ul class="list-disc list-inside text-gray-700 mb-4">
          <li>General Physics – 2021 Fall | 2022 Winter Spring | 2023 Fall Winter | 2025 Winter</li>
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
import { consults } from '../data/nuConsults'
import { nuTestimonials } from '../data/nuTestimonials'

const currentView = ref('consultant')

const activeBtn = 'text-accent font-semibold underline'
const inactiveBtn = 'text-gray-400 hover:text-accent'
</script>
