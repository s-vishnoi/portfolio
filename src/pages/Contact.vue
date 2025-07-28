<template>
    <main class="max-w-3xl mx-auto p-6 space-y-12 bg-base-100 rounded-box shadow mt-6">
  
      <h1 class="text-3xl font-bold text-center mb-6">Contact Me</h1>
  
      <!-- Contact Form -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">📧 Send a Message</h2>
        <form @submit.prevent="submitEmail">
          <div class="grid gap-4">
            <input v-model="emailForm.name" type="text" placeholder="Your Name" class="input input-bordered w-full" required />
            <input v-model="emailForm.email" type="email" placeholder="Your Email" class="input input-bordered w-full" required />
            <textarea v-model="emailForm.message" placeholder="Your Message" class="textarea textarea-bordered w-full h-32" required></textarea>
            <button type="submit" class="btn btn-primary w-fit">Send Message</button>
          </div>
        </form>
      </section>
  
      <div class="divider">OR</div>
  
      <!-- Call Request Form -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">📞 Request a Call</h2>
        <form @submit.prevent="submitCallRequest">
          <div class="grid gap-4">
            <input v-model="callForm.name" type="text" placeholder="Your Name" class="input input-bordered w-full" required />
            <input v-model="callForm.phone" type="tel" placeholder="Phone Number" class="input input-bordered w-full" required />
            <input v-model="callForm.time" type="datetime-local" class="input input-bordered w-full" required />
            <button type="submit" class="btn btn-secondary w-fit">Request Call</button>
          </div>
        </form>
      </section>
  
      <!-- Success Message -->
      <div v-if="successMessage" class="alert alert-success mt-4">
        {{ successMessage }}
      </div>
  
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emailForm = ref({ name: '', email: '', message: '' })
  const callForm = ref({ name: '', phone: '', time: '' })
  const successMessage = ref('')
  
  const submitEmail = () => {
    const subject = encodeURIComponent("Message from " + emailForm.value.name)
    const body = encodeURIComponent(emailForm.value.message + "\n\nReply to: " + emailForm.value.email)
    window.location.href = `mailto:svishnoi@u.northwestern.edu?subject=${subject}&body=${body}`
    successMessage.value = 'Your email draft has opened. Please review and send it from your email client.'
  }
  
  const submitCallRequest = () => {
    const subject = encodeURIComponent("Call Request from " + callForm.value.name)
    const body = encodeURIComponent(`Call requested by ${callForm.value.name}\nPhone: ${callForm.value.phone}\nTime: ${callForm.value.time}`)
    window.location.href = `mailto:svishnoi@u.northwestern.edu?subject=${subject}&body=${body}`
    successMessage.value = 'Your call request email draft has opened. Please review and send it.'
  }
  </script>
  