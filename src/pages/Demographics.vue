<template>
  <main class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
    <section class="border border-smoke/40 bg-[#e7dcc8] p-5 sm:p-8 space-y-6">
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="goBack"
          class="px-4 py-2 border border-smoke/40 bg-[#dfd2bc] text-sm uppercase tracking-[1px]"
        >
          ← Back
        </button>
        <RouterLink to="/" class="px-4 py-2 border border-smoke/40 bg-[#dfd2bc] text-sm uppercase tracking-[1px]">
          Home
        </RouterLink>
      </div>

    <!--  <img src="/images/projects/demography-map.jpg" alt="Demography Visualization" class="w-full rounded shadow" />
    <figcaption class="text-sm text-gray-500 mt-1">
      Visualizing researcher migration and publication networks across 95M+ papers.
    </figcaption> 
    -->

    <h1 class="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4">Gobal Research Equality</h1>
    <p>
      While representation in academia has been studied extensively from isolated lenses
      i.e. seniority, productivity, mobility etc., comprehensive  
      ground truth data informing global equality remains missing.  
    </p>
    <p>
      We leverage 45M+ publication records to extract the career trajectories of 30M+ researchers (anonymized) across ~200 countries.
      We define and measure population growth, migration networks, and demographic parity- providing a novel global outlook for policy.
      
    </p>

    <h2 class="text-1.5xl font-bold mt-2 mb-1">Publications</h2>
    <p>
      Global Improvements in the Representation of Women in Science Are Stalling <br>
      <span class="not-italic">(First author, 2025, <em>Science</em> — in review)</span>
    </p>

    <h2 class="text-1.5xl font-bold mt-2 mb-1">Code</h2>
    <p>
      The open-source data and code repository will be made available after publication.
    </p>
    </section>
  </main>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push('/')
}
</script>
