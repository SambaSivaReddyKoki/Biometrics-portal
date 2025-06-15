import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import { clickOutside } from './directives/click-outside'
import './styles/main.css'

// Create the app
const app = createApp(App)
const head = createHead()

// Register global directives
app.directive('click-outside', clickOutside)

// Use plugins
app.use(createPinia())
app.use(router)
app.use(head)

// Mount the app
app.mount('#app')
