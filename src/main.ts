import { createApp } from 'vue'
import App from './App.vue'
import '~/assets/styles/reset.scss'
import 'uno.css'
import { router } from '~/router'

const app = createApp(App)

app.use(router).mount('#app')
