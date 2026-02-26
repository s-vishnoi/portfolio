<template>
  <section class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
    <div class="border border-smoke/40 bg-[#e7dcc8] p-5 sm:p-8 space-y-6">
      <a
        href="/resume.pdf"
        download
        class="inline-flex items-center gap-2 border border-smoke/40 bg-[#dfd2bc] px-4 py-2 uppercase tracking-[1px] sm:tracking-[2px] transition-transform hover:-translate-y-0.5"
        aria-label="Download Resume PDF"
      >
        Download PDF ↗
      </a>

      <h2 class="text-xl sm:text-2xl font-bold uppercase tracking-[1px]">Resume</h2>

      <div class="aspect-[8.5/11] w-full">
        <iframe
          src="/resume.pdf"
          class="w-full h-full border border-smoke/30 bg-paper"
          type="application/pdf"
          title="Embedded Resume PDF"
        ></iframe>
      </div>
    </div>
  </section>
</template>
