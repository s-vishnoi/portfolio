<template>
  <div class="font-ui text-fg text-[15.5px] leading-relaxed">
    <!-- HEADER: name + tiny inline nav -->
    <header class="max-w-prose mx-auto px-4 sm:px-6 py-6">
      <h1 class="text-[28px] sm:text-[30px] font-semibold tracking-tight">
        SAMVARDHAN VISHNOI
      </h1>
      <nav class="mt-2 text-[15px]">
        <RouterLink to="/work" class="navlink" active-class="underline">Work</RouterLink>
        <span class="mx-2">·</span>
        <RouterLink to="/blog" class="navlink" active-class="underline">Blog</RouterLink>
        <span class="mx-2">·</span>
        <RouterLink to="/contact" class="navlink" active-class="underline">Contact</RouterLink>
      </nav>
    </header>

    <!-- CONTENT -->
    <main class="max-w-prose mx-auto px-4 sm:px-6">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </main>

    <!-- FOOTER: thin rule + small text -->
    <footer class="max-w-prose mx-auto px-4 sm:px-6 py-10">
      <hr class="border-neutral-200 my-6" />
      <p class="text-muted text-sm">sam [at] vishnoi [dot] site</p>
      <p class="text-muted text-sm mt-2">© {{ year }} Samvardhan Vishnoi</p>
    </footer>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style>
/* Minimal page transition (optional) */
.slide-enter-active, .slide-leave-active { transition: all 0.8s ease; }
.slide-enter-from { opacity: 0; transform: translateY(6px); }
.slide-leave-to   { opacity: 0; transform: translateY(-6px); }

/* Charlie-style links: plain text, underline on hover, active underlined */
.navlink { text-decoration: none; }
.navlink:hover { text-decoration: underline; }

/* If using Vue Router's default active class instead, you can style it globally: */
/* .router-link-active { text-decoration: underline; } */
</style>
