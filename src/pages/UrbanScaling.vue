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
      <h2 class="text-xl font-semibold uppercase tracking-[3px]">Problem → Method → Findings → Impact</h2>
      <div class="space-y-6">
        <article class="border border-smoke/30 bg-cream p-5 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Problem</p>
          <p class="text-sm text-charcoal leading-relaxed">
            The Uniform Crime Reporting program is voluntary, so entire years of arrest data vanish for hundreds of cities. When we ignore that missingness, scaling-law research—and the policy it informs—defaults to the most compliant cities instead of the most vulnerable ones.
          </p>
          <p class="text-sm text-charcoal leading-relaxed">
            My work treats the gap itself as data: understanding why large metros report differently than small ones becomes the first step toward any equitable benchmark.
          </p>
        </article>
        <article class="border border-smoke/30 bg-cream p-5 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Method</p>
          <p class="text-sm text-charcoal leading-relaxed">
            I developed a hierarchical Bayesian scaling model that couples city population, poverty changes, and regional trends to inform priors for every metro’s arrest counts.
          </p>
          <p class="text-sm text-charcoal leading-relaxed">
            The model borrows strength across time and across peer metros, letting me infer missing entries while preserving uncertainty intervals that policymakers can interrogate.
          </p>
        </article>
        <article class="border border-smoke/30 bg-cream p-5 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Findings</p>
          <p class="text-sm text-charcoal leading-relaxed">
            The posterior draws reveal systemic under-reporting tied to city size, and expose how demographic pivots—like rapid suburban poverty growth—distort raw arrest trends.
          </p>
          <p class="text-sm text-charcoal leading-relaxed">
            Because every estimate carries a transparent uncertainty band, researchers can finally compare metros without pretending the data is complete.
          </p>
        </article>
        <article class="border border-smoke/30 bg-cream p-5 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Impact</p>
          <p class="text-sm text-charcoal leading-relaxed">
            The corrected arrest trajectories now feed justice-equity reviews and resource-allocation models, helping partners simulate how enforcement or support programs scale with population.
          </p>
          <p class="text-sm text-charcoal leading-relaxed">
            It also lays the groundwork for future releases: as soon as the Nature Human Behavior study clears peer review, the full code and posterior summaries will ship to the public.
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
