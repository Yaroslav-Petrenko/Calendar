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

const initialStore = store.state

// Проверяем, есть ли сохраненное состояние в localStorage
const savedState = JSON.parse(localStorage.getItem('myAppState'));
if (savedState) {
	store.replaceState(savedState);
}

let counter = 0
// Обработчик для сохранения состояния в localStorage
store.subscribe((mutation, state) => {
	// Сохранение состояния в localStorage
	localStorage.setItem('myAppState', JSON.stringify(state));
	console.log('Произошло изменение стор, сработал store.subscribe', ++counter)

	console.log('mutation', mutation)
	console.log('state', state)
});




const app = createApp(App)

registerPlugins(app)

app.use(store)
	 .use(router)
	 .mount('#app')
