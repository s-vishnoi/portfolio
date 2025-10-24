<template>
  <div class="min-h-screen bg-cream text-ink">
    <header class="border-b-4 border-ink">
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
            Work
          </router-link>
          <router-link
            to="/blog"
            class="border-b-2 border-transparent pb-1 transition-colors hover:border-ink"
          >
            Blog
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

    <main>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </main>

    <footer class="border-t-4 border-ink mt-16">
      <div class="max-w-5xl mx-auto px-6 py-8 text-sm uppercase tracking-[2px] text-smoke">
        © {{ new Date().getFullYear() }} In God we trust; all others must bring data. - W. Edwards Deming
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
