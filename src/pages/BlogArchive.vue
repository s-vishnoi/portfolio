<template>
  <div class="p-6 mb-4">
    <ul class="grid gap-6">
      <a
        v-for="post in blogPosts"
        :key="post.link"
        :href="post.link"
        target="_blank"
        class="block bg-base-200 rounded-lg overflow-hidden shadow transition transform hover:shadow-xl hover:scale-[1.01] hover:ring-2 hover:ring-accent"
      >
        <div class="p-4">
          <div class="flex justify-between mb-2">
            <!-- Logo and Title aligned left -->
            <div class="flex items-center gap-2">
              <img
                v-if="post.logo"
                :src="post.logo"
                alt="Publisher Logo"
                class="h-5 w-auto object-contain rounded"
              />
              <h3 class="text-lg font-semibold text-gray-600">
                {{ post.title }}
              </h3>
            </div>
            <!-- Claps on the right -->
            <div class="flex items-center gap-1 text-sm text-gray-400">
              <i class="fas fa-sign-language"></i> {{ post.claps }}
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
