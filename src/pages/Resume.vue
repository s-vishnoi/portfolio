<template>
    <section class="bg-base-100 p-6 rounded-box shadow max-w-4xl mx-auto my-10">
      <h2 class="text-2xl font-bold mb-4">Resume</h2>
      <div class="aspect-[8.5/11] w-full mb-6">
        <iframe
          src="/resume.pdf"
          class="w-full h-full border rounded"
          type="application/pdf"
        ></iframe>
      </div>
      <a
        href="/resume.pdf"
        download
        class="btn btn-accent"
      >
        Download PDF
      </a>
    </section>
</template>
  