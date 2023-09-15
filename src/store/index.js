import { createStore } from 'vuex'

import notes from './notes'
import tasks from './tasks'
import goals from './goals'

const store = {
	modules: {
		notes,
		tasks,
		goals,
	},
	strict: process.env.NODE_ENV !== 'production'
}

export default createStore(store);