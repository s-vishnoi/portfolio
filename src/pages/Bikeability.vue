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

      <section class="space-y-4">
        <h2 class="text-xl font-semibold uppercase tracking-[3px]">Problem · Method · Findings · Impact</h2>
        <p class="text-sm text-charcoal leading-relaxed">
          <span class="font-semibold text-ink uppercase tracking-[1px]">Problem —</span>
          Conversations about safe streets in Chicago often begin with anecdotes because the facts are scattered across PDFs, FOIA’d spreadsheets, and neighborhood lore. The city’s South and West Sides shoulder the heaviest crash burdens, yet they rarely enter capital budgets with the urgency their data warrants, so this project starts by naming that gap and pulling residents, organizers, and planners into the same factual frame.
        </p>
        <p class="text-sm text-charcoal leading-relaxed">
          <span class="font-semibold text-ink uppercase tracking-[1px]">Method —</span>
          I built a Plotly Dash pipeline that cleans twelve years of crash reports, geocodes every incident, and joins it with CDOT infrastructure inventories, Vision Zero corridors, and census exposure measures. Each night the system recalculates bikeability scores for all seventy-seven community areas and publishes the narrative through an interface that anyone—aldermanic staff, mutual-aid ride leaders, or parents planning safe routes—can explore without touching code.
        </p>
        <p class="text-sm text-charcoal leading-relaxed">
          <span class="font-semibold text-ink uppercase tracking-[1px]">Findings —</span>
          The rolling rankings reveal a tale of two Chicagos: lakefront corridors enjoy declining crash density even as ridership spikes, while arterials in Bronzeville, Austin, and Little Village keep absorbing the same injury clusters year after year. Seasonal filters show how tourism pushes danger north in summer while winter freight traffic shoves it south, letting us point to exact blocks where painted lanes coexist with the city’s worst crash severity.
        </p>
        <p class="text-sm text-charcoal leading-relaxed">
          <span class="font-semibold text-ink uppercase tracking-[1px]">Impact —</span>
          Those insights now anchor Vision Zero memos, power community teach-ins, and feed petitions that demand quick-build protection instead of distant promises. The public notes below keep the narrative grounded—neighbors log the close calls the data might miss, the dashboard offers receipts, and together they create a living record city agencies can no longer ignore.
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
          class="space-y-4 border border-smoke/30 bg-cream p-4"
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
            class="w-full border border-smoke/40 bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke transition-transform focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline"
            />
            <input
              v-model.trim="neighborhood"
              maxlength="80"
              placeholder="Neighborhood (optional)"
            class="w-full border border-smoke/40 bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke transition-transform focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline"
            />
            <button
              :disabled="loading"
              type="submit"
              class="border border-smoke/40 px-4 py-2 text-sm uppercase tracking-[2px] transition-transform hover:-translate-y-1 disabled:opacity-60 disabled:pointer-events-none"
            >
              {{ loading ? 'Posting…' : 'Post' }}
            </button>
          </div>

          <textarea
            v-model.trim="comment"
            required
            maxlength="2000"
            placeholder="Comment..."
            class="w-full border border-smoke/40 bg-paper px-3 py-2 text-sm text-ink placeholder:text-smoke transition-transform focus:outline-none focus:-translate-x-1 focus:-translate-y-1 focus:shadow-outline min-h-[120px]"
          ></textarea>

          <div class="text-xs min-h-[1rem] text-smoke">
            <span v-if="error" class="text-red-600">{{ error }}</span>
            <span v-else-if="success" class="text-ink">Thanks! Posted.</span>
          </div>
        </form>

        <div class="space-y-4">
          <h3 class="text-base font-semibold uppercase tracking-[2px]">All Comments</h3>
          <div class="border border-smoke/30 bg-cream p-4 max-h-72 overflow-y-auto space-y-4">
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
