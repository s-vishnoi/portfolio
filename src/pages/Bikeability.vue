<template>
    <main class="max-w-6xl mx-auto p-6 space-y-6">
      <h1 class="text-2xl font-semibold">🚲 Chicago Bike Dashboard</h1>
        <p class="text-gray-600">
            This dashboard visualizes bike crash data, lane types, and bikeability scores across Chicago neighborhoods.
            It provides insights into cycling safety and infrastructure, helping to identify areas for improvement.
        </p>
      <div class="rounded-lg overflow-hidden shadow-md border border-gray-200">
        <iframe
          src="https://chicago-bike-dashboard.onrender.com" 
          width="100%"
          height="900"
          style="border: none;"
        ></iframe>
      </div>
      <p class="text-sm text-gray-500 italic">
            Built with Dash and Plotly using data from the City of Chicago.<br />
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
  