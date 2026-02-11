<template>
  <main class="max-w-4xl mx-auto px-6 py-12 space-y-16">
    <!-- Profile -->
    <section id="about" class="border border-ink bg-paper p-8">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <img
          src="/images/samvardhan.png"
          alt="Samvardhan Vishnoi"
          class="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border border-smoke/40"
        />
        <div>
          <h1 class="text-4xl font-bold tracking-tight uppercase">
            {{ profile.name }}
          </h1>
          <p class="mt-2 text-sm uppercase tracking-[3px] text-smoke">
            {{ profile.title }}
          </p>
          <div class="mt-6 space-y-3 text-base text-charcoal">
            <p v-for="line in profile.description.split('\n\n')" :key="line">{{ line }}</p>
            <div
              v-if="profile.availability"
              class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-emerald-600"
            >
              <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span
                  class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"
                ></span>
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              {{ profile.availability.label }}
            </div>
          </div>
          <div class="mt-6 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[2px]">
            <a
              href="mailto:svishnoi@u.northwestern.edu"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
              <span aria-hidden="true">↗</span>
              <span class="sr-only">Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/samvardhan-vishnoi/"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span aria-hidden="true">↗</span>
              <span class="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com/s-vishnoi"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M15 22v-4a4 4 0 0 0-1-3.5c3 0 6-2 6-5.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.5 11.5 0 0 0-6 0C6 2.3 5 2.6 5 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.6 9c0 3.5 3 5.5 6 5.5A4 4 0 0 0 9 18v4"
                />
                <path d="M9 18c-4.5 2-5-2-7-2" />
              </svg>
              <span aria-hidden="true">↗</span>
              <span class="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/vishhnnoi/"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
              <span aria-hidden="true">↗</span>
              <span class="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
      <div class="mt-10 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          class="border border-smoke/30 bg-paper p-6 flex items-center justify-between transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline"
          :class="{ 'border-ink bg-cream shadow-outline -translate-x-1 -translate-y-1': isOpen('roles') }"
          @click="toggleSection('roles')"
          :aria-expanded="isOpen('roles')"
          aria-controls="roles-panel"
        >
          <span class="text-lg font-semibold uppercase tracking-[1px]">Active Roles</span>
          <span class="text-xs uppercase tracking-[2px] text-smoke" aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          class="border border-smoke/30 bg-paper p-6 flex items-center justify-between transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline"
          :class="{ 'border-ink bg-cream shadow-outline -translate-x-1 -translate-y-1': isOpen('projects') }"
          @click="toggleSection('projects')"
          :aria-expanded="isOpen('projects')"
          aria-controls="projects-panel"
        >
          <span class="text-lg font-semibold uppercase tracking-[1px]">Projects</span>
          <span class="text-xs uppercase tracking-[2px] text-smoke" aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          class="border border-smoke/30 bg-paper p-6 flex items-center justify-between transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline"
          :class="{ 'border-ink bg-cream shadow-outline -translate-x-1 -translate-y-1': isOpen('skills') }"
          @click="toggleSection('skills')"
          :aria-expanded="isOpen('skills')"
          aria-controls="skills-panel"
        >
          <span class="text-lg font-semibold uppercase tracking-[1px]">Skills</span>
          <span class="text-xs uppercase tracking-[2px] text-smoke" aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          class="border border-smoke/30 bg-paper p-6 flex items-center justify-between transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline"
          :class="{ 'border-ink bg-cream shadow-outline -translate-x-1 -translate-y-1': isOpen('achievements') }"
          @click="toggleSection('achievements')"
          :aria-expanded="isOpen('achievements')"
          aria-controls="achievements-panel"
        >
          <span class="text-lg font-semibold uppercase tracking-[1px]">Achievements</span>
          <span class="text-xs uppercase tracking-[2px] text-smoke" aria-hidden="true">↗</span>
        </button>
      </div>
      <transition
        name="collapse"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div v-show="isOpen('roles')" id="roles-panel" class="overflow-hidden mt-6">
          <div class="border border-smoke/30 bg-paper p-6">
            <h2 class="text-xl font-bold uppercase tracking-[4px] mb-6">Active Roles</h2>
            <div class="grid gap-4">
              <a
                v-for="role in roles"
                :key="role.title"
                :href="role.link"
                target="_blank"
                class="border border-smoke/30 bg-paper p-6 flex flex-col md:flex-row gap-4 items-start transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline"
              >
                <img :src="role.logo" class="h-12 border border-smoke/30 bg-cream p-0" />
                <div>
                  <h3 class="text-lg font-semibold uppercase tracking-[1px]">
                    {{ role.title }}
                  </h3>
                  <p class="text-sm text-smoke">
                    {{ role.institution }}
                  </p>
                  <p class="text-xs text-smoke mt-1 uppercase tracking-[2px]">
                    {{ role.duration }}
                  </p>
                  <p class="text-sm text-charcoal mt-3" v-html="role.description"></p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </transition>
      <transition
        name="collapse"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div v-show="isOpen('projects')" id="projects-panel" class="overflow-hidden mt-6">
          <div class="border border-smoke/30 bg-paper p-6">
            <h2 class="text-xl font-bold uppercase tracking-[4px] mb-6">Projects</h2>
            <div class="grid gap-6 md:grid-cols-2">
              <component
                v-for="project in projects"
                :key="project.title"
                :is="project.external ? 'a' : RouterLink"
                v-bind="projectAttrs(project)"
                class="block border border-smoke/30 bg-paper p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline outline-none"
              >
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-48 object-cover border border-smoke/30 mb-4"
                />
                <h3 class="text-xl font-semibold uppercase tracking-tight mb-3">
                  {{ project.title }}
                </h3>
                <p class="text-sm text-smoke leading-relaxed">
                  {{ project.description }}
                </p>
                <span class="sr-only">Explore</span>
                <span class="mt-4 inline-block text-xs uppercase tracking-[2px]" aria-hidden="true">↗</span>
              </component>
            </div>
          </div>
        </div>
      </transition>
      <transition
        name="collapse"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div v-show="isOpen('skills')" id="skills-panel" class="overflow-hidden mt-6">
          <div class="border border-smoke/30 bg-paper p-6">
            <h2 class="text-xl font-bold uppercase tracking-[4px] mb-6">Skills</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <div
                v-for="(skill, index) in skills"
                :key="index"
                class="border border-smoke/30 bg-paper p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline group"
                @mouseenter="hoverToggles[index] = true"
                @mouseleave="hoverToggles[index] = false"
              >
                <button
                  class="w-full flex justify-between items-center text-left text-lg font-semibold uppercase tracking-[1px]"
                  @click="toggleSkill(index)"
                  :aria-expanded="skillToggles[index] || hoverToggles[index]"
                >
                  <span class="transition group-hover:text-smoke">
                    {{ skill.icon }} {{ skill.title }}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="lucide lucide-chevron-down w-4 h-4 transition-transform duration-300 group-hover:text-smoke"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    :class="{ 'rotate-180': skillToggles[index] || hoverToggles[index] }"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <transition
                  name="collapse"
                  @enter="onEnter"
                  @after-enter="onAfterEnter"
                  @leave="onLeave"
                >
                  <div
                    v-show="skillToggles[index] || hoverToggles[index]"
                    ref="collapsibles"
                    class="overflow-hidden mt-3"
                  >
                    <p class="text-sm text-charcoal mb-3">
                      {{ skill.description }}
                    </p>
                    <div class="flex flex-wrap gap-2 text-xs">
                      <span
                        v-for="tag in skill.tags"
                        :key="tag"
                        class="inline-block border border-smoke/20 bg-cream px-2 py-1 uppercase tracking-[1px]"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition
        name="collapse"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @leave="onLeave"
      >
        <div v-show="isOpen('achievements')" id="achievements-panel" class="overflow-hidden mt-6">
          <div class="border border-smoke/30 bg-paper p-6">
            <h2 class="text-xl font-bold uppercase tracking-[4px] mb-6">Achievements</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <div class="border border-smoke/30 bg-paper p-4 flex items-start gap-3">
                <span class="text-2xl">🥇</span>
                <div>
                  <h3 class="font-semibold uppercase tracking-[1px] text-ink">Murray Green Medal</h3>
                  <p class="text-sm text-smoke">
                    Top graduate in Physics — <span class="text-smoke">2020</span>
                  </p>
                </div>
              </div>
              <div class="border border-smoke/30 bg-paper p-4 flex items-start gap-3">
                <span class="text-2xl">🏛️</span>
                <div>
                  <h3 class="font-semibold uppercase tracking-[1px] text-ink">Presidential Scholarship</h3>
                  <p class="text-sm text-smoke">
                    Full academic scholarship — <span class="text-smoke">2016</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { profile } from '../data/profile'
import { roles } from '../data/roles'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

const activeSection = ref(null)

const isOpen = (key) => activeSection.value === key

const toggleSection = (key) => {
  activeSection.value = activeSection.value === key ? null : key
}

const skillToggles = ref(skills.map(() => false))
const hoverToggles = ref(skills.map(() => false))

const toggleSkill = (index) => {
  skillToggles.value[index] = !skillToggles.value[index]
}

const onEnter = (el) => {
  el.style.maxHeight = '0px'
  setTimeout(() => (el.style.maxHeight = el.scrollHeight + 'px'), 0)
}

const onAfterEnter = (el) => {
  el.style.maxHeight = null
}

const onLeave = (el) => {
  el.style.maxHeight = el.scrollHeight + 'px'
  setTimeout(() => (el.style.maxHeight = '0px'), 0)
}

const projectAttrs = (project) =>
  project.external
    ? { href: project.link, target: '_blank', rel: 'noreferrer noopener' }
    : { to: project.link }
</script>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.5s ease;
}
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
}
</style>
