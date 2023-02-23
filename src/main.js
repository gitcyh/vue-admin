import { createApp } from 'vue'
import '/public/css/style.css'
import App from './App.vue'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import axios from 'axios'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import piniaPluginPersist from 'pinia-plugin-persist'



const app = createApp(App)
app.config.globalProperties.axios = axios
app.use(router)
app.use(createPinia().use(piniaPluginPersist))
app.use(Elementplus, {locale: zhCn})
app.mount('#app')

document.oncontextmenu = function(e){
    e.preventDefault();
}
