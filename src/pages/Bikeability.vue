<template>
  <div class="!bg-gray-900 !text-white min-h-screen">
    <!-- Remove top padding from <main> -->
    <main class="max-w-6xl mx-auto pt-0">
      <!-- Optional: Move this below the iframe if desired -->
      <div class="-mx-6 sm:-mx-8 md:-mx-12 lg:-mx-20 rounded-lg">
        <div class="min-w-[1280px] mx-auto shadow-md rounded-lg">
          <iframe
            src="https://chicago-bike-dashboard.onrender.com"
            class="w-full"
            height="1080"
            width="1000"
            style="border: none;"
          ></iframe>
        </div>
      </div>

      <!-- Keep this description below the iframe -->
      <h1 class="text-2xl font-semibold mt-6">Chicago Bikeability Map</h1>
      <p class="text-gray-300">
        This interactive map ranks Bikeability of Chicago communities based on infrastructure.
        Explore bike traffic crashes by location, cause, and severity. Users can glean city-wide
        insights and identify areas for improving safety and equity.
      </p>

      <p class="text-sm text-gray-400 italic">
        Built with Plotly and Dash using data from the City of Chicago.<br />
        Hosted using Docker and Render.
      </p>
    </main>
  </div>
</template>
