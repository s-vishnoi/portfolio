<template>
  <div class="min-h-screen bg-cream text-ink">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <section class="border-4 border-ink bg-paper p-8 space-y-4">
        <h1 class="text-3xl font-bold uppercase tracking-[4px]">Chicago Bikeability Map</h1>
        <p class="text-charcoal leading-relaxed">
          This interactive map ranks bikeability across Chicago communities based on infrastructure.
          Explore bike traffic crashes by location, cause, and severity to surface city-wide insights
          and identify areas ready for safer streets.
        </p>
      </section>

      <section class="border-4 border-ink bg-paper">
        <div class="border-b-4 border-ink px-6 py-3 text-xs uppercase tracking-[2px] text-smoke">
          Interactive dashboard
        </div>
        <div class="w-full">
          <iframe
            src="https://chicago-bike-dashboard.onrender.com"
            class="w-full h-[720px]"
            style="border: none;"
          ></iframe>
        </div>
        <div class="border-t-4 border-ink px-6 py-3 text-xs uppercase tracking-[2px] text-smoke">
          Built with Plotly Dash · Hosted on Render
        </div>
      </section>

      <section class="border-4 border-ink bg-paper p-8 space-y-6">
        <h2 class="text-xl font-semibold uppercase tracking-[3px]">Community Notes</h2>
        <form
          @submit.prevent="submitForm"
          class="space-y-4 border-3 border-smoke bg-cream p-4"
        >
          <input
            v-model="honeypot"
            type="text"
            autocomplete="off"
            tabindex="-1"
            aria-hidden="true"
            class="sr-only"
          />
          <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
            <input
              v-model.trim="name"
              required
              maxlength="80"
              placeholder="Name"
            class="w-full border-2 border-smoke bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke transition-transform focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline"
            />
            <input
              v-model.trim="neighborhood"
              maxlength="80"
              placeholder="Neighborhood (optional)"
            class="w-full border-2 border-smoke bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke transition-transform focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline"
            />
            <button
              :disabled="loading"
              type="submit"
              class="border-2 border-smoke px-4 py-2 text-sm uppercase tracking-[2px] transition-transform hover:-translate-y-1 disabled:opacity-60 disabled:pointer-events-none"
            >
              {{ loading ? 'Posting…' : 'Post' }}
            </button>
          </div>

          <textarea
            v-model.trim="comment"
            required
            maxlength="2000"
            placeholder="Comment..."
            class="w-full border-2 border-smoke bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke transition-transform focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline min-h-[120px]"
          ></textarea>

          <div class="text-xs min-h-[1rem] text-smoke">
            <span v-if="error" class="text-red-600">{{ error }}</span>
            <span v-else-if="success" class="text-ink">Thanks! Posted.</span>
          </div>
        </form>

        <div class="space-y-4">
          <h3 class="text-base font-semibold uppercase tracking-[2px]">All Comments</h3>
          <div class="border-3 border-smoke bg-cream p-4 max-h-72 overflow-y-auto space-y-4">
            <div
              v-for="c in comments"
              :key="c.id"
              class="border-b border-ink/40 pb-3 last:border-b-0"
            >
              <p class="text-xs uppercase tracking-[1px] text-smoke">
                <span class="font-semibold text-ink">{{ c.name }}</span>
                <span v-if="c.neighborhood"> • {{ c.neighborhood }}</span>
                <span> • {{ formatDate(c.created_at) }}</span>
              </p>
              <p class="mt-2 text-sm text-charcoal whitespace-pre-wrap" v-text="c.comment"></p>
            </div>
            <p v-if="comments.length === 0" class="text-sm text-smoke">
              No comments yet.
            </p>
          </div>
        </div>
      </section>
    </main>
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
