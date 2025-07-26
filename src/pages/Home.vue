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
            <p class="text-sm text-gray-700 dark:text-gray-400 mt-2" v-html="role.description"></p>
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
          <p>{{ project.description }}</p>
        </router-link>
      </div>
    </section>


    <!-- Achievements Section -->
    <section id="achievements" class="bg-base-100 p-6 rounded-box shadow">
      <h2 class="text-2xl font-bold mb-4">Achievements</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="bg-base-200 p-4 rounded-lg shadow flex items-center gap-3">
          <span class="text-2xl">🏅</span>
          <div>
            <h3 class="font-semibold text-gray-600">Murray Green Medal</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Outstanding graduate in Physics</p>
          </div>
        </div>
        <div class="bg-base-200 p-4 rounded-lg shadow flex items-center gap-3">
          <span class="text-2xl">🎓</span>
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

        <!-- Statistical Modeling -->
        <div class="bg-base-200 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg mb-2">📐 Statistical Modeling</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            I approach modeling with end-to-end ownership — from framing questions to communicating results. With a physics-trained mindset, I focus on clarity, interpretability, and practical impact. I work closely with domain experts and adapt to evolving goals.
          </p>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="bg-base-300 px-2 py-1 rounded-full">Stan</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">PyMC</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">GLMs</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Bayesian Models</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Forecasting</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Imputation</span>
          </div>
        </div>

        <!-- Data Wrangling & Visualization -->
        <div class="bg-base-200 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg mb-2">📊 Data Wrangling & Visualization</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            I build pipelines that make messy data useful, and design dashboards that surface structure and support decisions.
          </p>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="bg-base-300 px-2 py-1 rounded-full">pandas</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">numpy</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Plotly</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Dash</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Leaflet</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">matplotlib</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">seaborn</span>
          </div>
        </div>

        <!-- Machine Learning & Deployment -->
        <div class="bg-base-200 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg mb-2">🛠️ Machine Learning & Deployment</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            I lead research workflows from data acquisition to deployment. I train explainable models, use domain insight to ensure accountability, and deliver results through reproducible, production-ready pipelines.
          </p>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="bg-base-300 px-2 py-1 rounded-full">scikit-learn</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">XGBoost</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Transformers (LLaMA)</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">SHAP</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Git</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Docker</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Render</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Vercel</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">APIs</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Web Scraping</span>
          </div>
        </div>

        <!-- Communication & Collaboration -->
        <div class="bg-base-200 p-4 rounded-lg shadow">
          <h3 class="font-semibold text-lg mb-2">🔗 Communication & Collaboration</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
            I work across institutions and disciplines, translating ideas between technical and non-technical teams. I prioritize clarity, shared goals, and trust to keep collaborative projects on track.
          </p>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="bg-base-300 px-2 py-1 rounded-full">Interdisciplinary Teams</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Stakeholder Communication</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Scientific Writing</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Research Leadership</span>
            <span class="bg-base-300 px-2 py-1 rounded-full">Collaboration</span>
          </div>
        </div>

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
    <!--
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
    -->


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
  interval = setInterval(nextRole, 10000)

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
