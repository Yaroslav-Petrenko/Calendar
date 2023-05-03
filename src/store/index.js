import { createStore } from 'vuex'

import notes from './notes'
import tasks from './tasks'
import goals from './goals'
// import cart from './cart'

const store = {
	modules: {
		notes,
		tasks,
		goals
		// cart
	},
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);