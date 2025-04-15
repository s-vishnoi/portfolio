<template>
  <main class="max-w-4xl mx-auto p-6 space-y-12">
    <!-- About Section -->
    <section id="about" class="bg-base-100 p-6 rounded-box shadow flex flex-col md:flex-row gap-6 items-start">
      <img src="/images/samvardhan.jpg" alt="Samvardhan Vishnoi" class="w-32 h-32 object-cover rounded-full shadow" />
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


    <!-- Active Roles Carousel -->
    <section id="roles" class="bg-base-100 p-6 rounded-box shadow text-left relative">
      <h2 class="text-2xl font-bold mb-6">Active Roles</h2>
      <div class="relative max-w-xl mx-auto overflow-hidden">
        <!-- Slide container -->
        <transition name="slide-fade" mode="out-in">
          <a
            :key="roles[currentIndex].title"
            :href="roles[currentIndex].link"
            target="_blank"
            class="bg-base-200 p-6 rounded-lg shadow w-full flex gap-4 items-start hover:ring-2 hover:ring-accent transition relative z-10"
          >
            <img :src="roles[currentIndex].logo" class="h-10 mt-1" />
            <div>
              <h3 class="font-bold text-lg text-accent dark:text-accent-content">
                {{ roles[currentIndex].title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ roles[currentIndex].institution }}
              </p>
              <p class="text-xs text-gray-400 mt-1">{{ roles[currentIndex].duration }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-2" v-html="roles[currentIndex].description" />
            </div>
          </a>
        </transition>

        <!-- Left Button -->
        <button
          @click="prevRole"
          class="btn btn-circle absolute -left-5 top-1/2 -translate-y-1/2 z-20 shadow"
        >
          ‹
        </button>

        <!-- Right Button -->
        <button
          @click="nextRole"
          class="btn btn-circle absolute -right-5 top-1/2 -translate-y-1/2 z-20 shadow"
        >
          ›
        </button>
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
          <p>{{ project.description }}</p>
        </router-link>
      </div>
    </section>

    <!-- Blog Section -->
    <section id="blog" class="bg-base-100 p-6 rounded-box shadow">
      <h2 class="text-2xl font-bold mb-4">Blog</h2>
      <div v-if="blogPosts.length" class="space-y-4">
        <div v-for="post in blogPosts" :key="post.guid" class="mb-4">
          <a
            :href="post.link"
            target="_blank"
            class="text-lg light:text-accent-content dark:text-accent font-semibold flex items-center gap-2"
          >
            <span>{{ post.title }}</span>
            <span class="text-sm text-gray-400 flex items-center gap-1">
              <i class="fas fa-sign-language"></i> {{ post.claps || 100 }}
            </span>
          </a>
          <p v-if="post.subtitle" class="text-sm text-gray-500 dark:text-gray-400 italic">
            {{ post.subtitle }}
          </p>
        </div>
      </div>
      <div v-else>
        <p>Loading latest posts from Medium…</p>
      </div>
    </section>

    <!-- Associations Section -->
    <section id="associations" class="bg-base-100 p-6 rounded-box shadow">
      <h2 class="text-2xl font-bold mb-4">Associations</h2>
      <div class="flex flex-wrap gap-6">
        <a href="https://physics.northwestern.edu" target="_blank">
          <img src="/logos/NU_PA_logo.svg" alt="Northwestern University" class="h-12" />
        </a>
        <a href="https://www.demogr.mpg.de/en" target="_blank">
          <img src="/logos/max_planck_logo.jpeg" alt="Max Planck Institute for Demographic Research" class="h-12" />
        </a>
        <a href="https://towardsdatascience.com" target="_blank" >
          <img src="/logos/tds_logo.jpeg" alt="Towards Data Science" class="h-12" />
        </a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { profile } from '../data/profile'
import { roles } from '../data/roles'
import { projects } from '../data/projects'
import { onMounted, onBeforeUnmount, ref } from 'vue'


const currentIndex = ref(0)
const nextRole = () => currentIndex.value = (currentIndex.value + 1) % roles.length
const prevRole = () => currentIndex.value = (currentIndex.value - 1 + roles.length) % roles.length

// Auto-scroll every 5 seconds
let interval
onMounted(() => {
  interval = setInterval(nextRole, 5000)

  // Swipe support
  let startX = 0
  const el = document.getElementById("roles")
  if (el) {
    el.addEventListener('touchstart', e => startX = e.touches[0].clientX)
    el.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - startX
      if (delta > 50) prevRole()
      if (delta < -50) nextRole()
    })
  }
})

onBeforeUnmount(() => {
  clearInterval(interval)
})


const blogPosts = ref([])

function extractFirstLine(html) {
  const textOnly = html.replace(/<[^>]+>/g, '')
  const firstLine = textOnly.split('\n').find(line => line.trim() !== '')
  return firstLine || null
}

onMounted(async () => {
  try {
    const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@s-vishnoi")
    const data = await res.json()

    const clapsMap = {
      "Bayesian Linear Regression: A Complete Beginner’s guide": 307,
      "Bayesian Data Science: The What, Why, and How": 480,
      "Spatio-Temporal Data Visualization: My Top 3 techniques by experience": 103
    }

    blogPosts.value = data.items.slice(0, 3).map(post => ({
      ...post,
      claps: clapsMap[post.title] || 100,
      subtitle: extractFirstLine(post.description)
    }))
  } catch (err) {
    console.error("Failed to load blog posts:", err)
  }
})
</script>

<style scoped>
#roles {
  overflow: hidden;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

</style>
