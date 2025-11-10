<template>
  <main class="max-w-3xl mx-auto p-6 space-y-6">
    

    <h1 class="text-3xl font-bold mt-4">City Scaling Laws</h1>
    <p>
      Most cities grow, but they don't grow evenly. Larger cities exhibit disproportionate increases in
      income, innovation, and crime.
    </p>
    <p>
      I study the dynamics of scaling laws — mathematical relationships that describe
      how various urban indicators grow with city population. These relationships have enormous potential in not 
      only filling the gaps in our understanding of present but also preparing us for future resource needs. 
    </p>

    <section class="border-4 border-ink bg-paper p-6 space-y-4">
      <h2 class="text-xl font-semibold uppercase tracking-[3px]">Problem → Impact</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <article class="border border-smoke/30 bg-cream p-4 space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Problem</p>
          <p class="text-sm text-charcoal leading-relaxed">
            National arrest data is voluntary and chronically incomplete, making it impossible to evaluate policing equity across U.S. cities.
          </p>
        </article>
        <article class="border border-smoke/30 bg-cream p-4 space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Method</p>
          <p class="text-sm text-charcoal leading-relaxed">
            Built a hierarchical Bayesian scaling model with city-specific priors that borrow strength across time, metro size, and region to impute missing arrests.
          </p>
        </article>
        <article class="border border-smoke/30 bg-cream p-4 space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Findings</p>
          <p class="text-sm text-charcoal leading-relaxed">
            Uncovered systematic under-reporting tied to population size and demographic change while quantifying the full posterior uncertainty for every estimate.
          </p>
        </article>
        <article class="border border-smoke/30 bg-cream p-4 space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Impact</p>
          <p class="text-sm text-charcoal leading-relaxed">
            Provides corrected arrest trajectories that partner criminologists and agencies now plug into federal equity reviews and resource-allocation models.
          </p>
        </article>
      </div>
    </section>

    <h2 class="text-1.5xl font-bold mt-2">Fixing Historical U.S. Arrest Data</h2>
    <p>
      Arrest data collected from law agencies acorss the U.S. is heavily missing due to a voluntary reporting program (Uniform Crime Reporting, FBI).
      Current criminology research often ignores this missingness, leading to biased conclusions.
      Identfying missing/underreported values remains a major statistical challenge, preventing reliable research and weakening policy initiatives for equitable policing. 
        </p>
      
    <img src="/images/projects/urban-scaling.jpg" alt="Missing Arrest Data" class="w-full rounded shadow" />
    <figcaption class="text-sm text-gray-500 mt-1">
    </figcaption>
    <p>
      I leverage scaling laws to inform corrected arrest rates as well as uncertainty for 300 U.S. cities. 
      Bayesian methods allow modeling for time and regional variations heirarchically while maintaining transparency, delivering state-of-the-art estimates.
    </p>

    <h2 class="text-1.5xl font-bold mt-2">Publications</h2>
    <p class="italic">
      Changes in poverty and ethnic diversity predict the murder rate of US metropolitan statistical areas over a 60-year period <br>
      <span class="not-italic">(Second author, 2025, <em>Nature Human Behavior</em> — in review)</span>
    </p>

    <h2 class="text-1.5xl font-bold mt-2">Code</h2>
    <p>
      The open-source data and code repository will be made available after publication.
    </p>

    
  </main>
</template>
