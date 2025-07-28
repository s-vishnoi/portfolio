<template>
    <section class="max-w-3xl mx-auto p-6 space-y-6">
      <h1 class="text-3xl font-bold">Contact Me</h1>
      <p class="text-gray-500 dark:text-gray-400">
        Feel free to reach out with questions, ideas, or to schedule a quick call.
      </p>
  
      <form class="space-y-4" @submit.prevent="submitForm">
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <input v-model="form.name" type="text" required class="input input-bordered w-full" />
        </div>
  
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" required class="input input-bordered w-full" />
        </div>
  
        <div>
          <label class="block text-sm font-medium mb-1">Message or Call Request</label>
          <textarea v-model="form.message" required rows="5" class="textarea textarea-bordered w-full"></textarea>
        </div>
  
        <button type="submit" class="btn btn-accent">Send</button>
      </form>
  
      <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
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
  