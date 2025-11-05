<template>
  <section class="max-w-4xl mx-auto px-6 py-12 space-y-12">
    <div class="flex flex-wrap gap-4">
      <button
        @click="currentView = 'consultant'"
        :class="[
          'w-60 px-4 py-3 border border-smoke/40 uppercase tracking-[2px] transition-transform duration-200 bg-cream',
          currentView === 'consultant'
            ? '-translate-x-1 -translate-y-1 shadow-outline text-ink'
            : 'text-smoke hover:-translate-y-0.5'
        ]"
      >
        Consulting
      </button>
      <button
        @click="currentView = 'ta'"
        :class="[
          'w-60 px-4 py-3 border border-smoke/40 uppercase tracking-[2px] transition-transform duration-200 bg-cream',
          currentView === 'ta'
            ? '-translate-x-1 -translate-y-1 shadow-outline text-ink'
            : 'text-smoke hover:-translate-y-0.5'
        ]"
      >
        Teaching
      </button>
    </div>

    <div
      v-if="currentView === 'consultant'"
      class="border-4 border-ink bg-paper p-6 space-y-10"
    >
      <h2 class="text-lg font-semibold uppercase tracking-[2px] flex flex-wrap items-center gap-3">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8 border border-smoke/30 bg-cream p-0" />
        NU Research Computing & Data Services
      </h2>

      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 class="text-base font-semibold uppercase tracking-[2px] text-ink">Lead Consultations</h3>
        <a
          href="https://www.it.northwestern.edu/departments/it-services-support/teaching/learning.html"
          target="_blank"
          class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 uppercase tracking-[1px] hover:-translate-y-0.5 transition-transform"
        >
          Request a Consult (NU) ↗
        </a>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="(consult, index) in consults"
          :key="index"
          class="perspective"
        >
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front border border-smoke/30 bg-paper flex items-center justify-center text-center">
                <h3 class="text-sm font-semibold uppercase tracking-[1px] text-ink">
                  {{ consult.topic }}
                </h3>
              </div>
              <div class="flip-card-back border border-smoke/30 bg-cream text-xs text-charcoal flex items-center justify-center text-center p-4 leading-relaxed">
                {{ consult.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2">
          <h3 class="text-base font-semibold uppercase tracking-[2px] text-ink">Workshops</h3>
        </div>
        <div class="border border-smoke/30 bg-paper p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-charcoal">
              <span class="font-semibold text-ink uppercase tracking-[1px]">Bayesian Inference</span> — Winter 2024 | Winter 2025
            </p>
            <p class="text-xs text-smoke uppercase tracking-[1px]">
              Intro to Bayesian regression, information metrics, and model comparison.
            </p>
          </div>
          <a
            href="https://github.com/s-vishnoi/Bayesian_Regression/blob/main/stan_workshop.ipynb"
            target="_blank"
            class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 uppercase tracking-[1px] hover:-translate-y-0.5 transition-transform whitespace-nowrap"
          >
            Open-source code ↗
          </a>
        </div>
      </div>
    </div>

    <div
      v-else
      class="border-4 border-ink bg-paper p-6 space-y-8"
    >
      <h2 class="text-lg font-semibold uppercase tracking-[2px] flex flex-wrap items-center gap-3">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8 border border-smoke/30 bg-cream p-0" />
        NU Department of Physics &amp; Astronomy
      </h2>

      <div class="border border-smoke/30 bg-paper p-6 space-y-4">
        <ul class="list-disc list-inside text-sm text-charcoal leading-relaxed">
          <li>General Physics — 2021 Fall | 2022 Winter, Spring | 2023 Fall, Winter | 2025 Winter</li>
        </ul>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 border border-smoke/30 bg-cream p-4">
          <span
            v-for="(quote, index) in displayedTestimonials"
            :key="index"
            class="testimonial-tile"
          >
            “{{ quote }}”
          </span>
        </div>
        <button
          v-if="nuTestimonials.length > initialTestimonialCount"
          @click="toggleTestimonials"
          class="w-full border border-smoke/30 bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-ink transition-transform duration-200 hover:-translate-y-0.5"
          :aria-expanded="showAllTestimonials"
        >
          {{ showAllTestimonials ? 'Collapse reviews' : 'All reviews ever' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { nuTestimonials } from '../data/nuTestimonials.js'
import { consults } from '../data/nuConsults.js'

const currentView = ref('consultant')

const initialTestimonialCount = 3
const showAllTestimonials = ref(false)
const displayedTestimonials = computed(() =>
  showAllTestimonials.value ? nuTestimonials : nuTestimonials.slice(0, initialTestimonialCount)
)
const toggleTestimonials = () => {
  showAllTestimonials.value = !showAllTestimonials.value
}
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.testimonial-tile {
  @apply italic text-sm text-charcoal px-3 py-2 border border-smoke/30 bg-paper transition-transform duration-300;
}

.testimonial-tile:hover {
  @apply -translate-y-1 shadow-outline;
}

.flip-card {
  width: 100%;
  height: 140px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.25rem;
  padding: 1.25rem;
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>
