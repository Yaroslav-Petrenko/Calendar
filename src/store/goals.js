export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '1', text: 'Прочитать 100 книг', done: false, editing: false, size: "large", time: '15:26 EDT' },
					{ id: '2', text: 'Прочитал 75 книг', done: false, editing: false, size: "small", time: '15:26 EDT' },
					{ id: '3', text: 'Прочитал 50 книг', done: true, editing: false, size: "small", time: '15:26 EDT' },
					// 	{ id: '3', text: 'Прочитал 25 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					// 	{ id: '4', text: 'Прочитал 10 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					// 	{ id: '5', text: 'Прочитал 0 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
				],
			},
			{
				id: '101',
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '1', text: 'Прочитать 100 книг', done: false, editing: false, size: "large", time: '15:26 EDT' },
					{ id: '2', text: 'Прочитал 75 книг', done: false, editing: false, size: "small", time: '15:26 EDT' },
					{ id: '3', text: 'Прочитал 50 книг', done: false, editing: false, size: "small", time: '15:26 EDT' },
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
		addGoal({ cards }, arr) {
			let maxId = 0;
			cards.forEach(item => maxId = Math.max(item.id, maxId))
			console.log('maxId', maxId)
			console.log('arr', arr)
			cards.push({})

		},
		addGoalField({ cards }, { text, cardId }) {
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
		changeGoal({ cards }, { cardId, taskId }) {
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			const selectedCard = cards.find(item => item.id === cardId)
			const elem = selectedCard.tasks.find(e => e.id == taskId)
			elem.done = !elem.done
		}
	},
	actions: {
		createGoal(store, obj) {
			store.commit('addGoal', obj)
		},
		changeGoal(store, obj) {
			store.commit('changeGoal', obj)
		}
	},
}

