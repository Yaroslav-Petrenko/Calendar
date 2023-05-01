import { createStore } from 'vuex'

import notes from './notes'
// import cart from './cart'

const store = {
	modules: {
		notes,
		// cart
	},
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);