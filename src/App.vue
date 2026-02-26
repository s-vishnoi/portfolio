<template>
  <div class="min-h-screen bg-cream text-ink">
    <header class="border-b border-smoke/40 bg-cream">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
        <nav class="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-6 text-xs sm:text-sm uppercase tracking-[1px] sm:tracking-[2px]">
          <router-link
            to="/"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-smoke/60"
          >
            Home
          </router-link>
          <router-link
            to="/work"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-smoke/60"
          >
            Teaching
          </router-link>
          <router-link
            to="/blog"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-smoke/60"
          >
            Writing
          </router-link>
          <router-link
            to="/contact"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-smoke/60"
          >
            Contact
          </router-link>
        </nav>
      </div>
    </header>

    <main class="bg-cream">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </main>

    <footer class="border-t border-smoke/40 mt-12 sm:mt-16 bg-cream">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-xs sm:text-sm uppercase tracking-[1px] sm:tracking-[2px] text-smoke">
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
