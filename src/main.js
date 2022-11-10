import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import axios from 'axios'
import {createPinia} from 'pinia'



const app = createApp(App)
app.config.globalProperties.axios = axios
app.use(router)
app.use(createPinia())
app.use(Elementplus)
app.mount('#app')
