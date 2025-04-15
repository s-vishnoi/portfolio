<template>
  <section class="max-w-4xl mx-auto p-6 space-y-10">
    <h1 class="text-3xl font-bold mb-6">Teaching Assistant</h1>

    <!-- Northwestern University Section -->
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold text-accent">Northwestern University</h2>
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
import { nuTestimonials } from '../data/nuTestimonials.js'
</script>