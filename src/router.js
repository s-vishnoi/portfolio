import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Bikeability from './pages/Bikeability.vue'
import UrbanScaling from './pages/UrbanScaling.vue'
import Demographics from './pages/Demographics.vue'
import BlogArchive from './pages/BlogArchive.vue'
import Resume from './pages/Resume.vue'
import Work from './pages/Work.vue'
import Contact from './pages/Contact.vue' 

const routes = [
  { path: '/', component: Home },
  { path: '/bikeability', component: Bikeability },
  { path: '/urban-scaling', component: UrbanScaling },
  { path: '/demographics', component: Demographics },
  { path: '/blog', component: BlogArchive },
  { path: '/resume', component: Resume },
  { path: '/work', component: Work },
  { path: '/contact', component: Contact } 
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router