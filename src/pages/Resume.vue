<template>
  <section class="relative bg-base-100 p-6 rounded-box shadow max-w-4xl mx-auto my-10">
    <!-- Download Button -->
    <a
      href="/resume.pdf"
      download
      class="btn btn-accent absolute top-4 right-4"
      aria-label="Download Resume PDF"
    >
      Download PDF
    </a>

    <!-- Header -->
    <h2 class="text-2xl font-bold mb-4">Resume</h2>

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
