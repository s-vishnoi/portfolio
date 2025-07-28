<template>
  <div class="!bg-gray-900 !text-white min-h-screen">
    <main class="max-w-6xl mx-auto p-6 space-y-6">
      <h1 class="text-2xl font-semibold">Chicago Bikeability Map</h1>
      <p class="text-gray-300">
        This interactive map ranks Bikeability of Chicago communities based on infrastructure.
        Explore bike traffic crashes by location, cause, and severity. Users can glean city-wide
        insights and identify areas for improving safety and equity.
      </p>

      <button
        @click="showFullscreen = true"
        class="btn btn-accent mt-4"
      >
        View Fullscreen Map
      </button>

      <!-- Inline preview iframe -->
      <div class="rounded-lg overflow-hidden shadow mt-6">
        <iframe
          src="https://chicago-bike-dashboard.onrender.com"
          class="w-full"
          height="500"
          style="border: none;"
        ></iframe>
      </div>

      <p class="text-sm text-gray-400 italic">
        Built with Plotly and Dash using data from the City of Chicago.<br />
        Hosted using Docker and Render.
      </p>
    </main>

    <!-- Fullscreen overlay -->
    <div
      v-if="showFullscreen"
      class="fixed inset-0 bg-black z-50"
    >
      <button
        @click="showFullscreen = false"
        class="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 z-10"
      >
        ← Back
      </button>
      <iframe
        src="https://chicago-bike-dashboard.onrender.com"
        class="w-full h-full"
        style="border: none;"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFullscreen = ref(false)
</script>
