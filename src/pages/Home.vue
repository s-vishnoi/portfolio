<template>
  <main class="max-w-4xl mx-auto px-6 py-12 space-y-16">
    <!-- Profile -->
    <section id="about" class="border-4 border-ink bg-paper p-8">
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
          </div>
          <div class="mt-6 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-[2px]">
            <a
              href="mailto:svishnoi@u.northwestern.edu"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              Email ↗
            </a>
            <a
              href="https://www.linkedin.com/in/samvardhan-vishnoi/"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/s-vishnoi"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.instagram.com/vishhnnoi/"
              target="_blank"
              class="inline-flex items-center gap-2 border border-smoke/40 px-4 py-2 hover:-translate-y-0.5 transition-transform"
            >
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="border-4 border-ink bg-paper p-8">
      <h2 class="text-2xl font-bold uppercase tracking-[4px] mb-8">Projects</h2>
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
          <span class="mt-4 inline-block text-xs uppercase tracking-[2px]">Explore ↗</span>
        </component>
      </div>
    </section>

    <!-- Roles -->
    <section id="roles" class="border-4 border-ink bg-paper p-8">
      <h2 class="text-2xl font-bold uppercase tracking-[4px] mb-8">Active Roles</h2>
      <div class="grid gap-4">
        <a
          v-for="role in roles"
          :key="role.title"
          :href="role.link"
          target="_blank"
          class="border border-smoke/30 bg-paper p-6 flex flex-col md:flex-row gap-4 items-start transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline"
        >
          <img :src="role.logo" class="h-12 border border-smoke/30 bg-cream p-1" />
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
    </section>

    <!-- Skills -->
    <section id="skills" class="border-4 border-ink bg-paper p-8">
      <h2 class="text-2xl font-bold uppercase tracking-[4px] mb-8">Skills</h2>
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
    </section>

    <!-- Achievements -->
    <section id="achievements" class="border-4 border-ink bg-paper p-8">
      <h2 class="text-2xl font-bold uppercase tracking-[4px] mb-8">Achievements</h2>
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
