<template>
  <div class="bg-base-100 text-base-content min-h-screen pt-0">
    <!-- Content aligned just under navbar -->
    <main class="max-w-6xl mx-auto px-6 pt-6 space-y-6">
      <h1 class="text-2xl font-semibold">Chicago Bikeability Map</h1>
      <p class="text-gray-400">
        This interactive map ranks Bikeability of Chicago communities based on infrastructure.
        Explore bike traffic crashes by location, cause, and severity. Users can glean city-wide
        insights and identify areas for improving safety and equity.
      </p>
    </main>

    <!-- Full-width Iframe Section -->
    <div class="w-full flex justify-center mt-4">
      <div class="w-full max-w-screen-2xl">
        <iframe
          src="https://chicago-bike-dashboard.onrender.com"
          class="w-full"
          height="1080"
          style="border: none;"
        ></iframe>
      </div>
    </div>

    <!-- Footer Text -->
    <footer class="text-sm text-gray-400 italic text-center mt-4 p-4">
      Built with Plotly and Dash using data from the City of Chicago.<br />
      Hosted using Docker and Render.
    </footer>
  </div>
</template>
