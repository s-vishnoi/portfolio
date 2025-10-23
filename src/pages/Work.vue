<template>
  <section class="max-w-4xl mx-auto px-6 py-12 space-y-12">
    <div class="border-4 border-ink bg-paper p-6">
      <h1 class="text-2xl font-bold uppercase tracking-[4px] mb-6">Work</h1>
      <div class="flex flex-wrap gap-4">
        <button
          @click="currentView = 'consultant'"
          :class="[
            'w-60 px-4 py-3 border-2 border-smoke uppercase tracking-[2px] transition-transform duration-200',
            currentView === 'consultant'
              ? '-translate-x-1 -translate-y-1 shadow-outline bg-paper text-ink'
              : 'bg-cream text-smoke hover:-translate-y-0.5'
          ]"
        >
          Research Consultant
        </button>
        <button
          @click="currentView = 'ta'"
          :class="[
            'w-60 px-4 py-3 border-2 border-smoke uppercase tracking-[2px] transition-transform duration-200',
            currentView === 'ta'
              ? '-translate-x-1 -translate-y-1 shadow-outline bg-paper text-ink'
              : 'bg-cream text-smoke hover:-translate-y-0.5'
          ]"
        >
          Teaching Assistant
        </button>
      </div>
    </div>

    <div
      v-if="currentView === 'consultant'"
      class="border-4 border-ink bg-paper p-6 space-y-10"
    >
      <h2 class="text-lg font-semibold uppercase tracking-[2px] flex flex-wrap items-center gap-3">
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8 border-2 border-smoke bg-cream p-1" />
        Data Science, Statistics, and Visualization Consultant @ Northwestern IT
      </h2>

      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h3 class="text-base font-semibold uppercase tracking-[2px] text-ink">Lead Consultations</h3>
        <a
          href="https://www.it.northwestern.edu/departments/it-services-support/teaching/learning.html"
          target="_blank"
          class="inline-flex items-center gap-2 border-2 border-smoke px-4 py-2 uppercase tracking-[1px] hover:-translate-y-0.5 transition-transform"
        >
          Request a Consult ↗
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
              <div class="flip-card-front border-3 border-smoke bg-paper flex items-center justify-center text-center">
                <h3 class="text-sm font-semibold uppercase tracking-[1px] text-ink">
                  {{ consult.topic }}
                </h3>
              </div>
              <div class="flip-card-back border-3 border-smoke bg-cream text-xs text-charcoal flex items-center justify-center text-center p-4 leading-relaxed">
                {{ consult.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2">
          <h3 class="text-base font-semibold uppercase tracking-[2px] text-ink">Lead Workshops</h3>
        </div>
        <div class="border-3 border-smoke bg-paper p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-charcoal">
              <span class="font-semibold text-ink uppercase tracking-[1px]">Bayesian Inference</span> — Winter 2024 | Winter 2025.
            </p>
            <p class="text-xs text-smoke uppercase tracking-[1px]">
              Intro to Bayesian regression, information metrics, and model comparison.
            </p>
          </div>
          <a
            href="https://github.com/s-vishnoi/Bayesian_Regression/blob/main/stan_workshop.ipynb"
            target="_blank"
            class="inline-flex items-center gap-2 border-2 border-smoke px-4 py-2 uppercase tracking-[1px] hover:-translate-y-0.5 transition-transform whitespace-nowrap"
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
        <img src="/logos/NU_PA_logo.svg" alt="NU logo" class="h-8 border-2 border-smoke bg-cream p-1" />
        Northwestern University Physics and Astronomy
      </h2>

      <div class="border-3 border-smoke bg-paper p-6 space-y-4">
        <ul class="list-disc list-inside text-sm text-charcoal leading-relaxed">
          <li>General Physics — 2021 Fall | 2022 Winter, Spring | 2023 Fall, Winter | 2025 Winter</li>
        </ul>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 border-3 border-smoke bg-cream p-4">
          <span
            v-for="(quote, index) in nuTestimonials"
            :key="index"
            class="testimonial-tile"
          >
            “{{ quote }}”
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { nuTestimonials } from '../data/nuTestimonials.js'
import { consults } from '../data/nuConsults.js'

const currentView = ref('consultant')
</script>

<style scoped>
.perspective {
  perspective: 1000px;
}

.testimonial-tile {
  @apply italic text-sm text-charcoal px-3 py-2 border border-smoke bg-paper transition-transform duration-300;
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
