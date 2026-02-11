<template>
  <div class="min-h-screen bg-cream text-ink">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <section class="border border-ink bg-paper p-8 space-y-5">
        <p class="text-xs uppercase tracking-[3px] text-smoke">Project</p>
        <h1 class="text-3xl font-bold uppercase tracking-[4px]">Chicago Bikeability Map</h1>
        <p class="text-charcoal leading-relaxed text-lg">
          I bike across Chicago a lot, mostly on a fixed gear, and I wanted a clearer, public picture
          of where riding feels safe versus stressful. This project tracks biking safety across
          neighborhoods in a freely accessible data map, so anyone can explore how infrastructure
          and crash patterns vary across the city.
        </p>
        <div class="flex flex-wrap gap-3 pt-2">
          <a
            :href="mapUrl"
            target="_blank"
            rel="noreferrer"
            class="border border-ink bg-ink text-paper px-5 py-2 text-xs uppercase tracking-[2px] transition-transform hover:-translate-y-1"
          >
            See Map
          </a>
          <a
            :href="githubProfile"
            target="_blank"
            rel="noreferrer"
            class="border border-ink px-5 py-2 text-xs uppercase tracking-[2px] transition-transform hover:-translate-y-1"
          >
            GitHub
          </a>
        </div>
      </section>

      <section class="border border-ink bg-paper p-8 space-y-4">
        <h2 class="text-xl font-semibold uppercase tracking-[3px]">Data Sources</h2>
        <p class="text-sm text-charcoal">
          I combined multiple public datasets to build the map:
        </p>
        <ul class="text-sm text-smoke space-y-2">
          <li>CRASH DATA — Chicago Open Data Portal</li>
          <li>COMMUNITY DATA — U.S. Census</li>
          <li>BIKE LANES — Chicago Department of Transportation (CDOT)</li>
          <li>ROAD LENGTH — Derived from Census geometries</li>
        </ul>
      </section>

      <section class="border border-ink bg-paper p-8 space-y-4">
        <h2 class="text-xl font-semibold uppercase tracking-[3px]">Technical Summary</h2>
        <p class="text-sm text-charcoal leading-relaxed">
          The map is built with Plotly Dash and a Python data pipeline (Pandas, GeoPandas, Shapely),
          then containerized with Docker for deployment. If you want the full technical breakdown,
          the repo has all the implementation details.
        </p>
        <a
          :href="githubRepo"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-ink"
        >
          View GitHub Repo
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const mapUrl = 'https://chicago-bike-dashboard.onrender.com';
const githubRepo = 'https://github.com/s-vishnoi/chicago-bikeability-map';
const githubProfile = 'https://github.com/s-vishnoi';
</script>
