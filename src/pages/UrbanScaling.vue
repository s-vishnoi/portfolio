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

    <section class="space-y-4">
      <h2 class="text-xl font-semibold uppercase tracking-[3px]">Problem · Method · Findings · Impact</h2>
      <p class="text-sm text-charcoal leading-relaxed">
        <span class="font-semibold text-ink uppercase tracking-[1px]">Problem —</span>
        For decades, the FBI’s Uniform Crime Reporting program has been voluntary, so the historical arrest record looks like Swiss cheese—whole years disappear for the very metros where policing outcomes are most contested. Any scaling-law analysis that ignores those holes simply models who filled out the paperwork, not how crime or enforcement truly scales with population.
      </p>
      <p class="text-sm text-charcoal leading-relaxed">
        <span class="font-semibold text-ink uppercase tracking-[1px]">Method —</span>
        I built a hierarchical Bayesian framework that treats missingness as a feature, not an inconvenience. Population size, poverty shifts, and regional peer groups inform city-specific priors, while temporal random effects capture how reporting culture drifts. The result is a generative model that can infer absent arrest counts and, just as importantly, express the uncertainty around every fill.
      </p>
      <p class="text-sm text-charcoal leading-relaxed">
        <span class="font-semibold text-ink uppercase tracking-[1px]">Findings —</span>
        Posterior estimates reveal a consistent pattern: fast-growing metros under-report precisely when their demographics change the fastest, and the naive “observed” scaling curves mislead researchers about where crime is actually falling or rising. The model also surfaces regional fingerprints—Great Lakes cities, for instance, share similar noise structures that vanish once we properly share information across them.
      </p>
      <p class="text-sm text-charcoal leading-relaxed">
        <span class="font-semibold text-ink uppercase tracking-[1px]">Impact —</span>
        These corrected arrest trajectories now underpin equity reviews for partner criminologists and inform how agencies stress-test future resource allocations. When the Nature Human Behavior manuscript clears review, the full codebase plus posterior summaries will be released so any city—or watchdog group—can audit the numbers they rely on to debate public safety.
      </p>
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
