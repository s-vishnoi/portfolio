<template>
  <div>
    <nav class="navbar bg-base-100 shadow mb-6">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">Samvardhan</a>
      </div>
      <div class="flex gap-4 px-2">
        <a href="#about" class="btn btn-ghost">About</a>
        <a href="#projects" class="btn btn-ghost">Projects</a>
        <a href="#blog" class="btn btn-ghost">Blog</a>
        <button class="btn btn-sm" @click="toggleTheme"><i class="fas fa-moon"></i></button>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto p-6 space-y-12">
      <section id="about" class="bg-base-100 p-6 rounded-box shadow flex flex-col md:flex-row gap-6 items-start">
        <img src="/images/samvardhan.jpg" alt="Samvardhan Vishnoi" class="w-32 h-32 object-cover rounded-full shadow" />
        <div>
          <h2 class="text-2xl font-bold mb-4">About Me</h2>
          <p v-for="line in profile.description.split('\n\n')" :key="line" class="mb-2">{{ line }}</p>
          <a :href="'mailto:' + profile.email" class="btn btn-outline btn-accent mt-4">Contact Me</a>
        </div>
      </section>

      <section id="projects" class="bg-base-100 p-6 rounded-box shadow">
        <h2 class="text-2xl font-bold mb-4">Projects</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="project in projects"
            :key="project.title"
            class="card bg-base-200 p-4 hover:shadow-lg transition"
            data-aos="fade-up"
          >
            <a :href="project.link" target="_blank">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-48 object-cover rounded mb-3"
              />
              <h3 class="font-bold text-lg">{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </a>
          </div>
        </div>
      </section>

      <section id="blog" class="bg-base-100 p-6 rounded-box shadow">
        <h2 class="text-2xl font-bold mb-4">Blog</h2>
        <div v-if="blogPosts.length" class="space-y-4">
          <div v-for="post in blogPosts" :key="post.guid" class="mb-4">
            <a :href="post.link" target="_blank" class="link link-hover text-lg text-accent font-semibold">
              {{ post.title }}
            </a>
            <p class="text-sm text-secondary italic">{{ post.description }}</p>
            <p class="text-sm text-gray-500">{{ new Date(post.pubDate).toLocaleDateString() }}</p>
          </div>
        </div>
        <div v-else>
          <p>Loading latest posts from Medium…</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { profile } from './data/profile'
import { projects } from './data/projects'
import { onMounted, ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const blogPosts = ref([])

    onMounted(async () => {
      try {
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@s-vishnoi")
        const data = await res.json()
        blogPosts.value = data.items.slice(0, 1)
      } catch (err) {
        console.error("Failed to load blog posts:", err)
      }
    })

    const toggleTheme = () => {
      const root = document.documentElement
      const current = root.getAttribute('data-theme')
      root.setAttribute('data-theme', current === 'dark' ? 'pastel' : 'dark')
    }

    return {
      profile,
      projects,
      blogPosts,
      toggleTheme
    }
  }
}
</script>
