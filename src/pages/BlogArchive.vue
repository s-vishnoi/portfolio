<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Posts</h1>
    <ul class="grid gap-6">
      <a
        v-for="post in blogPosts"
        :key="post.link"
        :href="post.link"
        target="_blank"
        class="block bg-base-200 rounded-lg overflow-hidden shadow transition transform hover:shadow-xl hover:scale-[1.01] hover:ring-2 hover:ring-accent"
      >
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-600">
              {{ post.title }}
            </h3>
            <div class="flex items-center gap-2">
              <!-- Clap count -->
              <span class="text-sm text-gray-400 flex items-center gap-1">
                <i class="fas fa-sign-language"></i> {{ post.claps }}
              </span>
              <!-- Publisher logo (if available) -->
              <img
                v-if="post.logo"
                :src="post.logo"
                alt="Publisher Logo"
                class="h-5 w-auto object-contain rounded"
              />
            </div>
          </div>
          <p class="text-sm text-gray-500 italic mb-1">
            {{ post.subtitle || 'No description available.' }}
          </p>
          <p class="text-xs text-gray-400">{{ post.date }}</p>
        </div>
      </a>
    </ul>
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
        claps: 307,
        logo: "/logos/tds_logo.jpeg",
      },
      "Bayesian Data Science: The What, Why, and How": {
        claps: 480,
        logo: "/logos/tds_logo.jpeg",
      },
      "Spatio-Temporal Data Visualization: My Top 3 techniques by experience": {
        claps: 103,
        logo: "/logos/tds_logo.jpeg",
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
            claps: meta.claps || 100,
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
