import { createStore } from 'vuex'

import notes from './notes'
import tasks from './tasks'
import goals from './goals'
import reset from './reset'

const store = {
	modules: {
		notes,
		tasks,
		goals,
		reset
	},
	strict: process.env.NODE_ENV !== 'production'
}


export default createStore(store);