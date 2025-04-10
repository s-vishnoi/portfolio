<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Posts</h1>
    <ul class="grid gap-6 md:grid-cols-2">
      <a
        v-for="post in blogPosts"
        :key="post.link"
        :href="post.link"
        target="_blank"
        class="block bg-base-200 rounded-lg overflow-hidden shadow transition transform hover:shadow-xl hover:scale-[1.01] hover:ring-2 hover:ring-accent"
      >
        <img
          :src="post.thumbnail"
          :alt="post.title"
          class="w-full h-40 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-accent mb-2">
            {{ post.title }}
          </h3>
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
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@s-vishnoi")
      .then(res => res.json())
      .then(data => {
        this.blogPosts = data.items.map(post => ({
          title: post.title,
          link: post.link,
          thumbnail: post.thumbnail,
          subtitle: this.extractFirstLine(post.description),
          date: new Date(post.pubDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }));
      });
  },
  methods: {
    extractFirstLine(html) {
      const textOnly = html.replace(/<[^>]+>/g, '');
      const firstLine = textOnly.split('\\n').find(line => line.trim() !== '');
      return firstLine || null;
    }
  }
};
</script>
