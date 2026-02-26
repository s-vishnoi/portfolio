<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <section class="border border-smoke/40 bg-[#e7dcc8] p-5 sm:p-8">
      <ul class="grid gap-6">
        <a
          v-for="post in blogPosts"
          :key="post.link"
          :href="post.link"
          target="_blank"
          class="block border border-smoke/30 bg-[#e7dcc8] p-4 sm:p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-outline"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4 mb-2">
            <div class="flex items-start sm:items-center gap-2">
              <img
                v-if="post.logo"
                :src="post.logo"
                alt="Publisher Logo"
                class="h-6 w-auto object-contain border border-smoke/30 bg-cream p-0"
              />
              <h3 class="text-base sm:text-lg font-semibold text-ink">
                {{ post.title }}
              </h3>
            </div>
            <div class="flex items-center gap-1 text-xs uppercase tracking-[1px] text-smoke">
              <i class="fas fa-sign-language"></i> {{ post.claps }}
            </div>
          </div>
          <p class="text-sm text-charcoal italic mb-2">
            {{ post.subtitle || 'No description available.' }}
          </p>
          <p class="text-xs text-smoke uppercase tracking-[1px]">{{ post.date }}</p>
        </a>
      </ul>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      blogPosts: [],
    };
  },
  mounted() {
    // Manual metadata map
    const postMetaMap = {
      "Bayesian Linear Regression: A Complete Beginner’s guide": {
        claps: 357,
        logo: "/logos/tds_logo.jpeg",
      },
      "Bayesian Data Science: The What, Why, and How": {
        claps: 514,
        logo: "/logos/tds_logo.jpeg",
      },
      "Spatio-Temporal Data Visualization: My Top 3 techniques by experience": {
        claps: 153,
        logo: "",
      }
    };

    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@s-vishnoi")
      .then(res => res.json())
      .then(data => {
        this.blogPosts = data.items.map(post => {
          const meta = postMetaMap[post.title] || {};
          return {
            title: post.title,
            link: post.link,
            subtitle: this.extractFirstLine(post.description),
            date: new Date(post.pubDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            claps: meta.claps || 'N/A',
            logo: meta.logo || null
          };
        });
      });
  },
  methods: {
    extractFirstLine(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const text = doc.body.textContent || '';
      const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
      return lines[0] || null;
    }
  }
};
</script>
