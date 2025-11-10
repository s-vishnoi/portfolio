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

    <section class="border-4 border-ink bg-paper p-6 space-y-6">
      <h2 class="text-xl font-semibold uppercase tracking-[3px]">Problem · Method · Findings · Impact</h2>
      <article class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Problem</p>
        <p class="text-sm text-charcoal leading-relaxed">
          The FBI’s Uniform Crime Reporting program is voluntary, so entire years vanish for hundreds of jurisdictions. Scaling-law research that relies on those figures ends up modeling the reliability of paperwork—not the reality of policing. For cities fighting for equitable resources, that missingness is a policy failure hiding in plain sight.
        </p>
      </article>
      <article class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Method</p>
        <p class="text-sm text-charcoal leading-relaxed">
          I treat the gap itself as data. A hierarchical Bayesian scaling model links population size, poverty shifts, and regional clusters to build priors for every metro’s arrest counts. The framework borrows strength across time and similar cities, letting us infer missing entries while keeping uncertainty explicit.
        </p>
      </article>
      <article class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Findings</p>
        <p class="text-sm text-charcoal leading-relaxed">
          Posterior draws reveal systemic under-reporting among fast-growing metros and highlight how demographic pivots—suburban poverty spikes, for instance—warp raw arrest trends. Because every estimate carries a transparent uncertainty band, criminologists can finally compare trajectories without pretending the dataset was ever whole.
        </p>
      </article>
      <article class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Impact</p>
        <p class="text-sm text-charcoal leading-relaxed">
          Those corrected arrest series now anchor justice-equity reviews and inform resource-allocation models for partner agencies. Once the Nature Human Behavior manuscript clears peer review, the full code and posterior summaries will be released publicly so cities can audit—and improve—the data that underpins their policies.
        </p>
      </article>
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
