export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Прочитать 100 книг', done: true, editing: false, color: '#1867C0', size: "35", time: '15:26 EDT' },
					{ id: '1', text: 'Прочитал 75 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					{ id: '2', text: 'Прочитал 50 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
				// 	{ id: '3', text: 'Прочитал 25 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
				// 	{ id: '4', text: 'Прочитал 10 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
				// 	{ id: '5', text: 'Прочитал 0 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
				],
			},
			{
				id: '101',
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Прочитать 100 книг', done: true, editing: false, color: 'orange', size: "large", time: '15:26 EDT' },
					{ id: '1', text: 'Прочитал 75 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					{ id: '2', text: 'Прочитал 50 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					// 	{ id: '3', text: 'Прочитал 25 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					// 	{ id: '4', text: 'Прочитал 10 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					// 	{ id: '5', text: 'Прочитал 0 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
				],
			},
		]
	},
	getters: {
		goalsFindEl: state => id => {
			return state.notes.id
		},
		// allGoals: state => state.cards,
		// filteredGoals: state => conditions => state.cards.filter(item => {
		// 	// if (conditions) return 
		// 	// console.log(Object.values(item))
		// 	// console.log('Синий кит'.indexOf('ний') !== -1); // true
		// 	return (item.text.toLowerCase().indexOf(conditions.toLowerCase()) !== -1)
		// })
		goals: state => state.cards
	},
	mutations: {
		// comment: () => {
		// 	const time = (new Date()).toTimeString()
		// 	events.push({
		// 		id: nonce.value++,
		// 		text: input.value,
		// 		time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
		// 			return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
		// 		}),
		// 	})

		// 	input.value = null
		// },
		addGoal({ cards }, { text, cardId }) {
			const selectedCard = cards.find(item => item.id === cardId)
			const time = (new Date()).toTimeString()
			const item = {
				id: ((parseInt(selectedCard.tasks[selectedCard.tasks.length - 1]?.id) + 1) || 0).toString(),
				text,
				time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
					return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
				}),
			}
			// console.log('selectedCard', selectedCard)
			selectedCard.tasks.push(item)
			// selectedCard.allDone = false

		},
	},
	actions: {
		createGoal(store, obj) {
			store.commit('addGoal', obj)
		},
	},
}

