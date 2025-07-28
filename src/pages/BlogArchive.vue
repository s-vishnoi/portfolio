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
              <!-- TDS logo -->
              <img
                v-if="post.isTDS"
                src="/logos/tds_logo.jpeg"
                alt="TDS"
                class="h-6 w-auto"
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


<script>export default {
  data() {
    return {
      blogPosts: [],
    };
  },
  mounted() {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@s-vishnoi")
      .then(res => res.json())
      .then(data => {
        const clapsMap = {
          "Bayesian Linear Regression: A Complete Beginner’s guide": 307,
          "Bayesian Data Science: The What, Why, and How": 480,
          "Spatio-Temporal Data Visualization: My Top 3 techniques by experience": 103
        }

        this.blogPosts = data.items.map(post => ({
          title: post.title,
          link: post.link,
          subtitle: this.extractFirstLine(post.description),
          date: new Date(post.pubDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          claps: clapsMap[post.title] || 100,
          isTDS: post.link.includes("towardsdatascience")
        }));
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