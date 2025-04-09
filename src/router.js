import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import UrbanScaling from './pages/UrbanScaling.vue'
import Demographics from './pages/Demographics.vue'
import BlogArchive from './pages/BlogArchive.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/urban-scaling', component: UrbanScaling },
  { path: '/demographics', component: Demographics },
  { path: '/blog', component: BlogArchive }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router