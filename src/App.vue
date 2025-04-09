<template>
  <div>
    <nav class="navbar bg-base-100 shadow mb-6">
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost text-xl">Samvardhan</router-link>
      </div>
      <div class="flex gap-4 px-2">
        <router-link to="/" class="btn btn-ghost">Home</router-link>
        <router-link to="/demographics" class="btn btn-ghost">Demographics</router-link>
        <router-link to="/urban-scaling" class="btn btn-ghost">Urban Scaling</router-link>
        <router-link to="/blog" class="btn btn-ghost">Blog</router-link>
        <button class="btn btn-sm" @click="toggleTheme"><i class="fas fa-moon"></i></button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
const toggleTheme = () => {
  const root = document.documentElement
  const current = root.getAttribute('data-theme')
  root.setAttribute('data-theme', current === 'dark' ? 'pastel' : 'dark')
}
</script>