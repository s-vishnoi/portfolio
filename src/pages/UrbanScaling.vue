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

    <h1 class="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4">City Scaling Laws</h1>
    <p>
      Most cities grow, but they don't grow evenly. Larger cities exhibit disproportionate increases in
      income, innovation, and crime.
    </p>
    <p>
      I study the dynamics of scaling laws — mathematical relationships that describe
      how various urban indicators grow with city population. These relationships have enormous potential in not 
      only filling the gaps in our understanding of present but also preparing us for future resource needs. 
    </p>
    <h2 class="text-lg sm:text-xl font-semibold mt-2">Fixing Historical U.S. Arrest Data</h2>
    <p>
      Arrest data collected from law agencies acorss the U.S. is heavily missing due to a voluntary reporting program (Uniform Crime Reporting, FBI).
      Current criminology research often ignores this missingness, leading to biased conclusions.
      Identfying missing/underreported values remains a major statistical challenge, preventing reliable research and weakening policy initiatives for equitable policing. 
        </p>
      
    <img src="/images/projects/urban-scaling.jpg" alt="Missing Arrest Data" class="w-full rounded shadow" />
    <figcaption class="text-sm text-charcoal mt-1">
    </figcaption>
    <p>
      I leverage scaling laws to inform corrected arrest rates as well as uncertainty for 300 U.S. cities. 
      Bayesian methods allow modeling for time and regional variations heirarchically while maintaining transparency, delivering state-of-the-art estimates.
    </p>

    <h2 class="text-lg sm:text-xl font-semibold mt-2">Publications</h2>
    <p class="italic">
      Changes in poverty and ethnic diversity predict the murder rate of US metropolitan statistical areas over a 60-year period <br>
      <span class="not-italic">(Second author, 2025, <em>Nature Human Behavior</em> — in review)</span>
    </p>

    <h2 class="text-lg sm:text-xl font-semibold mt-2">Code</h2>
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
