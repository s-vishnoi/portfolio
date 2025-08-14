<template>
  <div class="bg-base-100 text-base-content min-h-screen pt-0">
    <!-- Header -->
    <main class="max-w-6xl mx-auto px-6 pt-6 space-y-6">
      <h1 class="text-2xl font-semibold">Chicago Bikeability Map</h1>
      <p class="text-gray-400">
        This interactive map ranks Bikeability of Chicago communities based on infrastructure.
        Explore bike traffic crashes by location, cause, and severity. Users can glean city-wide
        insights and identify areas for improving safety and equity.
      </p>
    </main>

    <!-- Iframe -->
    <div class="w-full flex justify-center mt-4">
      <div class="w-full max-w-screen-2xl">
        <iframe
          src="https://chicago-bike-dashboard.onrender.com"
          class="w-full"
          height="1080"
          style="border: none;"
        ></iframe>
      </div>
    </div>

    <!-- Comment Section -->
    <section class="max-w-6xl mx-auto px-6 mt-6 space-y-4">
      <!-- Form -->
      <form @submit.prevent="submitForm"
            class="rounded-2xl p-4 shadow border border-base-300/50 bg-base-200/50 space-y-3">
        <input v-model="honeypot" type="text" autocomplete="off" tabindex="-1"
               style="position:absolute;left:-9999px;opacity:0" aria-hidden="true" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input v-model.trim="name" required maxlength="80" placeholder="Your name"
                 class="input input-bordered bg-base-100" />
          <input v-model.trim="neighborhood" maxlength="80" placeholder="Neighborhood (optional)"
                 class="input input-bordered bg-base-100" />
          <button :disabled="loading"
                  type="submit"
                  class="btn btn-outline">
            {{ loading ? 'Posting…' : 'Post comment' }}
          </button>
        </div>

        <textarea v-model.trim="comment" required maxlength="2000" placeholder="Add your comment…"
                  class="textarea textarea-bordered bg-base-100 w-full min-h-[96px]"></textarea>

        <div class="text-sm h-5">
          <span v-if="error" class="text-error">{{ error }}</span>
          <span v-else-if="success" class="text-success">Thanks! Your comment was posted.</span>
        </div>
      </form>

      <!-- Scrollable All Comments -->
      <div>
        <h2 class="text-lg font-semibold mb-2">All Comments</h2>
        <div class="bg-base-200 rounded-lg p-4 max-h-64 overflow-y-auto space-y-3 shadow-inner">
          <div v-for="c in comments" :key="c.id" class="border-b border-base-300/60 pb-2 last:border-b-0">
            <p class="text-sm text-gray-400">
              <strong class="text-base-content">{{ c.name }}</strong>
              <span v-if="c.neighborhood"> • {{ c.neighborhood }}</span>
              <span> • {{ formatDate(c.created_at) }}</span>
            </p>
            <p class="text-base-content/90 whitespace-pre-wrap" v-text="c.comment"></p>
          </div>
          <p v-if="comments.length === 0" class="text-gray-400 text-sm">No comments yet.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-sm text-gray-400 italic text-center mt-4 p-4">
      Built with Plotly and Dash using data from the City of Chicago.<br />
      Hosted using Docker and Render.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

type CommentRow = {
  id: number;
  name: string;
  neighborhood: string | null;
  comment: string;
  created_at: string;
};

const comments = ref<CommentRow[]>([]);
const name = ref('');
const neighborhood = ref('');
const comment = ref('');
const honeypot = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

async function loadComments() {
  try {
    const r = await fetch('/api/comments', { cache: 'no-store' });
    const j = await r.json();
    if (j.ok) comments.value = j.data;
  } catch (e) {
    console.error('Failed to load comments', e);
  }
}

async function submitForm() {
  error.value = '';
  success.value = false;
  if (!name.value || !comment.value) {
    error.value = 'Name and comment are required.';
    return;
  }
  loading.value = true;
  try {
    const r = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        neighborhood: neighborhood.value,
        comment: comment.value,
        honeypot: honeypot.value
      })
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || 'Failed to submit');

    name.value = '';
    neighborhood.value = '';
    comment.value = '';
    success.value = true;
    await loadComments();
  } catch (e: any) {
    error.value = e.message || 'Something went wrong.';
  } finally {
    loading.value = false;
  }
}

onMounted(loadComments);
</script>
