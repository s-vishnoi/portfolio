import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
import router from './router'
import '@fortawesome/fontawesome-free/css/all.min.css'


createApp(App).use(router).mount('#app')