<template>
    <section class="max-w-3xl mx-auto p-6 space-y-6">
      <h1 class="text-3xl font-bold uppercase tracking-[3px]">Contact</h1>
      <p class="text-smoke">
        Feel free to reach out with questions, ideas, or to schedule a quick call.
      </p>
  
      <form class="space-y-4" @submit.prevent="submitForm">
        <div>
          <label class="block text-sm font-medium uppercase tracking-[1px] mb-2">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full border border-smoke/30 bg-paper px-4 py-3 focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline transition-transform"
          />
        </div>
  
        <div>
          <label class="block text-sm font-medium uppercase tracking-[1px] mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full border border-smoke/30 bg-paper px-4 py-3 focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline transition-transform"
          />
        </div>
  
        <div>
          <label class="block text-sm font-medium uppercase tracking-[1px] mb-2">Message or Call Request</label>
          <textarea
            v-model="form.message"
            required
            rows="5"
            class="w-full border border-smoke/30 bg-paper px-4 py-3 focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline transition-transform"
          ></textarea>
        </div>
  
        <button
          type="submit"
          class="inline-flex items-center gap-2 border border-ink bg-cream px-4 py-2 uppercase tracking-[2px] transition-transform hover:-translate-y-1"
        >
          Send ↗
        </button>
      </form>
  
      <p v-if="success" class="text-sm text-ink mt-4">{{ success }}</p>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    name: '',
    email: '',
    message: ''
  })
  
  const success = ref('')
  
  const submitForm = () => {
    // Simulate a successful submission
    console.log('Submitted:', form.value)
    success.value = '✅ Message sent! I’ll get back to you soon.'
    form.value = { name: '', email: '', message: '' }
  }
  </script>
  
