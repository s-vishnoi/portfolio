<template>
  <section class="bg-base-100 p-4 sm:p-6 rounded-box shadow max-w-4xl mx-auto my-6 sm:my-10">
    <!-- Download Button -->
    <a
      href="/resume.pdf"
      download
      class="btn btn-accent mb-4 sm:mb-6 inline-flex"
      aria-label="Download Resume PDF"
    >
      Download PDF
    </a>

    <!-- Header -->
    <h2 class="text-xl sm:text-2xl font-bold mb-4">Resume</h2>

    <!-- Embedded Resume -->
    <div class="aspect-[8.5/11] w-full mb-6">
      <iframe
        src="/resume.pdf"
        class="w-full h-full border rounded"
        type="application/pdf"
        title="Embedded Resume PDF"
      ></iframe>
    </div>
  </section>
</template>
