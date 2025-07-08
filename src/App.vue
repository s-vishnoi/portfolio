<template>
  <div>
    <nav class="navbar bg-base-100 shadow mb-6">
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost text-xl">Vishnoi</router-link>
      </div>
      <div class="flex gap-4 px-2 items-center">
        <router-link to="/" class="btn btn-ghost">Home</router-link>
        <router-link to="/work" class="btn btn-ghost">Work</router-link>
        <router-link to="/blog" class="btn btn-ghost">Blog</router-link>
        <router-link to="/resume" class="btn btn-ghost">Resume</router-link>
        <button class="text-xl" @click="toggleTheme">
          <span v-if="theme === 'dark'">🌖</span>
          <span v-else>🌘</span>
        </button>
      </div>

    </nav>
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>

    <footer class="navbar bg-base-100 shadow mt-6">
      <div class="flex-1"></div>
      <div class="flex gap-4 px-2 items-center"></div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const theme = ref('pastel')

const toggleTheme = () => {
  const root = document.documentElement
  const current = root.getAttribute('data-theme')
  const next = current === 'dark' ? 'pastel' : 'dark'
  theme.value = next
  root.setAttribute('data-theme', next)
}

onMounted(() => {
  theme.value = document.documentElement.getAttribute('data-theme') || 'pastel'
})
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: all 1.0s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>