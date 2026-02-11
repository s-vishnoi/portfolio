<template>
  <main class="max-w-3xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold mt-4">Chicago Bikeability Map</h1>
    <p>
      I bike across Chicago a lot, mostly on a fixed gear, and I wanted a clearer, public picture
      of where riding feels safe versus stressful. This project tracks biking safety across
      neighborhoods in a freely accessible data map, so anyone can explore how infrastructure
      and crash patterns vary across the city.
    </p>
    <div class="flex flex-wrap gap-3">
      <a
        :href="mapUrl"
        target="_blank"
        rel="noreferrer"
        class="px-4 py-2 border border-black text-sm"
      >
        See Map
      </a>
      <a
        :href="githubProfile"
        target="_blank"
        rel="noreferrer"
        class="px-4 py-2 border border-black text-sm"
      >
        GitHub
      </a>
    </div>

    <h2 class="text-1.5xl font-bold mt-2">Data Sources</h2>
    <ul class="list-disc pl-6">
      <li>CRASH DATA — Chicago Open Data Portal</li>
      <li>COMMUNITY DATA — U.S. Census</li>
      <li>BIKE LANES — Chicago Department of Transportation (CDOT)</li>
      <li>ROAD LENGTH — Derived from Census geometries</li>
    </ul>

    <h2 class="text-1.5xl font-bold mt-2">Technical Summary</h2>
    <p>
      The map is built with Plotly Dash and a Python data pipeline (Pandas, GeoPandas, Shapely),
      then containerized with Docker for deployment. If you want the full technical breakdown,
      the repo has all the implementation details.
    </p>
    <p>
      <a
        :href="githubRepo"
        target="_blank"
        rel="noreferrer"
        class="underline"
      >
        View GitHub Repo
      </a>
    </p>
  </main>
</template>

<script setup lang="ts">
const mapUrl = 'https://chicago-bike-dashboard.onrender.com';
const githubRepo = 'https://github.com/s-vishnoi/chicago-bikeability-map';
const githubProfile = 'https://github.com/s-vishnoi';
</script>
