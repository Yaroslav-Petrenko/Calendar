/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import store from './store/index'
import router from './router/index'

const app = createApp(App)

registerPlugins(app)

app.use(store)
	.use(router)
	.mount('#app')
