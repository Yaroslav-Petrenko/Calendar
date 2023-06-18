export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Прочитать 100 книг', done: true, editing: false, color: 'purple' },
					{ id: '1', text: 'Прочитал 75', done: true, editing: false, color: 'pink' },
					{ id: '2', text: 'Прочитал 50', done: true, editing: false, color: 'orange' },
					{ id: '3', text: 'Прочитал 25', done: true, editing: false, color: 'orange' },
				],
			},
			{
				id: '101',
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Пойти на рыбалку с друзьями', done: true, editing: false, color: 'purple' },
					{ id: '1', text: 'Зайти в магазин за продуктами', done: true, editing: false, color: 'purple' },
					{ id: '2', text: 'Выпить пива, поностальгировать', done: true, editing: false, color: 'purple' },
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

