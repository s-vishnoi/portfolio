<template>
  <div class="min-h-screen bg-[#e7dcc8] text-ink">
    <header class="border-b border-ink bg-[#e7dcc8]">
      <div class="max-w-5xl mx-auto px-6 py-8">
        <nav class="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-[2px]">
          <router-link
            to="/"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-ink"
          >
            Home
          </router-link>
          <router-link
            to="/work"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-ink"
          >
            Teaching
          </router-link>
          <router-link
            to="/blog"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-ink"
          >
            Writing
          </router-link>
          <router-link
            to="/contact"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-ink"
          >
            Contact
          </router-link>
        </nav>
      </div>
    </header>

    <main class="bg-[#2b2b2b]">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </main>

    <footer class="border-t border-ink mt-16 bg-[#e7dcc8]">
      <div class="max-w-5xl mx-auto px-6 py-8 text-sm uppercase tracking-[2px] text-smoke">
        © {{ new Date().getFullYear() }}
      </div>
    </footer>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
</style>
