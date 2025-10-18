<template>
  <div class="font-ui text-fg">
    <!-- NAV: minimal, text links, aligned to content column -->
    <nav class="mb-6">
      <div class="max-w-prose mx-auto px-4 sm:px-6 flex justify-between items-center py-3">
        <router-link to="/" class="text-xl font-semibold tracking-tight hover:underline">
          Vishnoi
        </router-link>

        <div class="flex items-center gap-4">
          <!-- Plain text links; underline on hover; subtle active state -->
          <router-link to="/work" class="hover:underline" active-class="underline">Work</router-link>
          <router-link to="/blog" class="hover:underline" active-class="underline">Blog</router-link>
          <router-link to="/contact" class="hover:underline" active-class="underline">Contact</router-link>

          <!-- Theme toggle (kept) -->
          <button class="text-xl leading-none" @click="toggleTheme" aria-label="Toggle theme">
            <span v-if="theme === 'dark'">🌖</span>
            <span v-else>🌘</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- PAGE CONTENT -->
    <transition name="slide" mode="out-in">
      <main class="max-w-prose mx-auto px-4 sm:px-6">
        <router-view />
      </main>
    </transition>

    <!-- FOOTER: minimal, aligned to column -->
    <footer class="mt-8">
      <div class="max-w-prose mx-auto px-4 sm:px-6">
        <hr class="border-t border-neutral-200 my-6" />
        <p class="text-muted text-sm py-2">© {{ year }} Samvardhan Vishnoi</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const theme = ref('pastel')
const year = new Date().getFullYear()

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
/* page transition */
.slide-enter-active, .slide-leave-active { transition: all 1.0s ease; }
.slide-enter-from { opacity: 0; transform: translateX(20px); }
.slide-leave-to   { opacity: 0; transform: translateX(-20px); }
</style>
