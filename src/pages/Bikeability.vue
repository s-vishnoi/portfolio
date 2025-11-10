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

      <section class="border-4 border-ink bg-paper p-8 space-y-6">
        <h2 class="text-xl font-semibold uppercase tracking-[3px]">Problem → Method → Findings → Impact</h2>
        <div class="space-y-6">
          <article class="border border-smoke/30 bg-cream p-5 space-y-3">
            <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Problem</p>
            <p class="text-sm text-charcoal leading-relaxed">
              Chicago residents and advocacy groups rarely share the same facts when they debate bikeability. Crash spreadsheets, street design drawings, and neighborhood risk data live in different silos, so the neighborhoods that need protection most often show up last in budget memos.
            </p>
            <p class="text-sm text-charcoal leading-relaxed">
              This project reframes the debate by telling a single story about where people get hurt, which corridors lack protection, and how stressors pile up across the South and West Sides.
            </p>
          </article>
          <article class="border border-smoke/30 bg-cream p-5 space-y-3">
            <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Method</p>
            <p class="text-sm text-charcoal leading-relaxed">
              I built a Plotly Dash pipeline that ingests 12 years of crash records, cleans geospatial attributes, and stitches them to CDOT infrastructure inventories, Vision Zero priority corridors, and census-level exposure variables.
            </p>
            <p class="text-sm text-charcoal leading-relaxed">
              The app then ranks all 77 community areas nightly, so anyone—from aldermanic offices to mutual-aid ride leaders—can explore live crash density, infrastructure gaps, and proposed fixes without touching the codebase.
            </p>
          </article>
          <article class="border border-smoke/30 bg-cream p-5 space-y-3">
            <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Findings</p>
            <p class="text-sm text-charcoal leading-relaxed">
              The dashboard exposes corridor-level crash clusters that repeat year after year, highlights seasonal surges along lakefront commuting routes, and pinpoints arterials where painted lanes coexist with the highest injury counts.
            </p>
            <p class="text-sm text-charcoal leading-relaxed">
              Those patterns help explain why injury risk in Bronzeville looks nothing like risk in Lincoln Square—even when the total number of miles biked is similar.
            </p>
          </article>
          <article class="border border-smoke/30 bg-cream p-5 space-y-3">
            <p class="text-xs font-semibold uppercase tracking-[2px] text-smoke">Impact</p>
            <p class="text-sm text-charcoal leading-relaxed">
              Community coalitions now cite these rankings when prioritizing quick-build interventions, and multiple aldermanic offices embedded the evidence packs into their Vision Zero funding pitches.
            </p>
            <p class="text-sm text-charcoal leading-relaxed">
              The public notes section below keeps the story alive—residents log dangerous spots, the dashboard provides receipts, and the city hears both at the same time.
            </p>
          </article>
        </div>
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
