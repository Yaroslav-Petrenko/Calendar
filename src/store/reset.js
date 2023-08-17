import store from '../store/index'
// import initialStore from '../main'
// const initialState2 = store.state
export default {
	namespaced: true,
	state: {
	},
	getters: {
	},
	mutations: {
		// setToDefault(state, initialState) {
		// 	console.log('вызвана мутация')
		// 	console.log('state', state)
		// 	store.replaceState(initialState)
		// }
	},
	actions: {
		resetState(_) {
			// console.log('сброс')
			// localStorage.clear()
			// store.commit('setToDefault', initialState)
			// store.state = initialState
			// store.replaceState(initialState)
			// localStorage.setItem('myAppState', JSON.stringify(initialState));
			const initialState = JSON.parse(localStorage.getItem('initialState'))
			store.replaceState(initialState)
		}
	},
}

