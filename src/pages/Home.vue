<template>
  <main class="max-w-4xl mx-auto p-6 space-y-12">
    <!-- About Section -->
    <section id="about" class="bg-base-100 p-6 rounded-box shadow flex flex-col md:flex-row gap-6 items-start">
      <img src="/images/samvardhan.jpg" alt="Samvardhan Vishnoi" class="w-32 h-32 object-cover rounded-full shadow" />
      <div>
        <h2 class="text-2xl font-bold mb-4">About Me</h2>
        <p v-for="line in profile.description.split('\n\n')" :key="line" class="mb-2">{{ line }}</p>
        <a :href="'mailto:' + profile.email" class="btn btn-outline btn-accent mt-4">Contact Me</a>
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
      <div v-for="post in blogPosts" :key="post.guid" class="mb-4">
          <a
            :href="post.link"
            target="_blank"
            class="text-lg text-green-700 dark:text-green-400 font-semibold flex items-center gap-2"
          >
            <span>{{ post.title }}</span>
            <span class="text-sm text-green-400 dark:text-green-300 flex items-center gap-1">
              <i class="fas fa-sign-language"></i> {{ post.claps || 100 }}
            </span>
          </a>
          <p v-if="post.description" class="text-sm text-gray-500 dark:text-gray-400 italic">
            {{ post.description }}
          </p>
      <div>
      </div>
        <p>Loading latest posts from Medium…</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { onMounted, ref } from 'vue'

const blogPosts = ref([])

onMounted(async () => {
  try {
    const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@s-vishnoi")
    const data = await res.json()

    // Add clap counts manually
    const clapsMap = {
      "Bayesian Linear Regression: A Complete Beginner’s guide": 307,
      "Bayesian Data Science: The What, Why, and How": 480,
      "Spatio-Temporal Data Visualization: My Top 3 techniques by experience": 103
    }

    blogPosts.value = data.items.slice(0, 3).map(post => ({
      ...post,
      claps: clapsMap[post.title] || 100
    }))
  } catch (err) {
    console.error("Failed to load blog posts:", err)
  }
})
</script>
