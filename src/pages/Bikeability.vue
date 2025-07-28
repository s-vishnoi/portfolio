<template>
  <div class="!bg-gray-900 !text-white min-h-screen">
    <main class="max-w-6xl mx-auto p-6 space-y-6">
      <h1 class="text-2xl font-semibold">Chicago Bikeability Map</h1>
      <p class="text-gray-300">
        This interactive map ranks Bikeability of Chicago communities based on infrastructure.
        Explore bike traffic crashes by location, cause, and severity. Users can glean city-wide
        insights and identify areas for improving safety and equity.
      </p>

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

      <p class="text-sm text-gray-400 italic">
        Built with Plotly and Dash using data from the City of Chicago.<br />
        Hosted using Docker and Render.
      </p>
    </main>
  </div>
</template>
