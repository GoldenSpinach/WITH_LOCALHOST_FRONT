import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ko from "@/assets/language/ko.json"
import en from "@/assets/language/en.json"
import "@/assets/main.css"

import App from './App.vue'
import router from './router'

 

const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
