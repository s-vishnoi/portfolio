<template>
  <main class="max-w-4xl mx-auto p-6 space-y-12">

    <!-- About Section -->
    <section id="about" class="bg-base-100 p-6 rounded-box shadow flex flex-col md:flex-row gap-6 items-start">
      <img src="/images/samvardhan.png" alt="Samvardhan Vishnoi" class="w-32 h-32 object-cover rounded-full shadow" />
      <div>
        <h2 class="text-2xl font-bold mb-4">About Me</h2>
        <p v-for="line in profile.description.split('\n\n')" :key="line" class="mb-2">{{ line }}</p>
        <div class="flex gap-4 mt-4 text-2xl">
          <a href="mailto:svishnoi@u.northwestern.edu" target="_blank" aria-label="Email">
            <i class="fas fa-envelope"></i>
          </a>
          <a href="https://www.linkedin.com/in/samvardhan-vishnoi/" target="_blank" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/s-vishnoi" target="_blank" aria-label="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="https://www.instagram.com/vishhnnoi/" target="_blank" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </section>


    <!-- Active Roles Section (Stacked Cards) -->
    <section id="roles" class="bg-base-100 p-6 rounded-box shadow text-left">
      <h2 class="text-2xl font-bold mb-6">Active Roles</h2>
      <div class="grid gap-4 px-4">
        <a
          v-for="role in roles"
          :key="role.title"
          :href="role.link"
          target="_blank"
          class="bg-base-200 p-6 rounded-lg shadow w-full flex gap-4 items-start hover:ring-2 hover:ring-accent transition relative"
        >
          <img :src="role.logo" class="h-10 mt-1" />
          <div>
            <h3 class="font-bold text-lg text-accent dark:text-accent-content">{{ role.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ role.institution }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ role.duration }}</p>
            <p class="text-sm text-gray-800 dark:text-gray-300 mt-2" v-html="role.description"></p>
          </div>
        </a>
      </div>
    </section>



    <!-- Projects Section -->
    <section id="projects" class="bg-base-100 p-6 rounded-box shadow">
      <h2 class="text-2xl font-bold mb-4">Projects</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <router-link
          v-for="project in projects"
          :key="project.title"
          :to="project.link"
          class="card bg-base-200 p-4 hover:shadow-lg transition block"
          data-aos="fade-up"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-48 object-cover rounded mb-3"
          />
          <h3 class="font-bold text-lg">{{ project.title }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ project.description }}</p>
        </router-link>
      </div>
    </section>


    <!-- Achievements Section -->
    <section id="achievements" class="bg-base-100 p-6 rounded-box shadow">
      <h2 class="text-2xl font-bold mb-4">Achievements</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="bg-base-200 p-4 rounded-lg shadow flex items-center gap-3">
          <span class="text-2xl">🥇</span>
          <div>
            <h3 class="font-semibold text-gray-600">Murray Green Medal</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Outstanding graduate in Physics</p>
          </div>
        </div>
        <div class="bg-base-200 p-4 rounded-lg shadow flex items-center gap-3">
          <span class="text-2xl">🏛️</span>
          <div>
            <h3 class="font-semibold text-gray-600">Presidential Scholarship</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Full academic scholarship</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="bg-base-100 p-6 rounded-box shadow">
      <h2 class="text-2xl font-bold mb-4">Skills</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="bg-base-200 p-4 rounded-lg shadow transition hover:shadow-xl hover:ring-2 hover:ring-accent group"
          @mouseenter="hoverToggles[index] = true"
          @mouseleave="hoverToggles[index] = false"
        >
          <!-- Toggle Button -->
          <button
            class="w-full flex justify-between items-center text-left text-lg font-semibold mb-2"
            @click="toggleSkill(index)"
            :aria-expanded="skillToggles[index] || hoverToggles[index]"
          >
            <span class="transition group-hover:text-accent">
              {{ skill.icon }} {{ skill.title }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg"
                class="lucide lucide-chevron-down w-4 h-4 transition-transform duration-300 group-hover:text-accent"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                :class="{ 'rotate-180': skillToggles[index] || hoverToggles[index] }">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <!-- Animated Transition -->
          <transition
            name="collapse"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
          >
            <div
              v-show="skillToggles[index] || hoverToggles[index]"
              ref="collapsibles"
              class="overflow-hidden"
            >
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-2 mt-1">
                {{ skill.description }}
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span v-for="tag in skill.tags" :key="tag" class="bg-base-300 px-2 py-1 rounded-full">
                  {{ tag }}
                </span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>




  </main>
</template>

<script setup>
import { profile } from '../data/profile'
import { roles } from '../data/roles'
import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { onMounted, onBeforeUnmount, ref } from 'vue'


const skillToggles = ref(skills.map(() => false))
const hoverToggles = ref(skills.map(() => false))

const toggleSkill = (index) => {
  skillToggles.value[index] = !skillToggles.value[index]
}

const onEnter = (el) => {
  el.style.maxHeight = "0px"
  setTimeout(() => el.style.maxHeight = el.scrollHeight + "px", 0)
}

const onAfterEnter = (el) => {
  el.style.maxHeight = null
}

const onLeave = (el) => {
  el.style.maxHeight = el.scrollHeight + "px"
  setTimeout(() => el.style.maxHeight = "0px", 0)
}


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
