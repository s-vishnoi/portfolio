<template>
    <main class="max-w-6xl mx-auto p-6 space-y-6">
      <h1 class="text-2xl font-semibold">🚲 Chicago Bikeability Dashboard</h1>
        <p class="text-gray-600">
            This dashboard visualizes bike traffic crashes and assigns bikeability scores across Chicago community areas. 
            Users can glean quick insights and help identify areas for improvement.
        </p>
        <div class="-mx-6 sm:-mx-8 md:-mx-12 lg:-mx-20 overflow-x-auto rounded-lg">
          <div class="min-w-[1280px] mx-auto shadow-md rounded-lg">
            <iframe
              src="https://chicago-bike-dashboard.onrender.com"
              class="w-full"
              height="900"
              style="border: none;"
            ></iframe>
          </div>
        </div>
        <p>
            Please allow 1-2 minutes for initial load of the interactive application. 
        </p>
      <p class="text-sm text-gray-500 italic">
            Built with Plotly and Dash using data from the City of Chicago.<br />
            Hosted using Docker and Render.
      </p>

    <!--
    <p class="text-blue-600 hover:underline text-sm">
      <a href="blog link here" target="_blank">
        📖 Read more about the data, methods, and design choices behind this dashboard.
      </a>
    </p>
    -->
    </main>
</template>
  