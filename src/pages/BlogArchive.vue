
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Blog Archive</h1>
    <ul class="space-y-4">
      <li v-for="post in blogPosts" :key="post.guid" class="border-b pb-2">
        <a :href="post.link" target="_blank" class="text-xl text-lg-600 hover:underline">
          {{ post.title }}
        </a>
        <p v-if="post.likes || post.claps" class="text-sm text-gray-500">
          👍 {{ post.likes || '0' }} &nbsp; 👏 {{ post.claps || '0' }}
        </p>
      </li>
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
          claps: 100+ // Placeholder for claps

        }));
      });
  },
};
</script>
