export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				allDone: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '1', text: 'Прочитать 100 книг', done: false, editing: false, size: "large", time: '' },
					{ id: '2', text: 'Прочитал 75 книг', done: false, editing: false, size: "small", time: '' },
					{ id: '3', text: 'Прочитал 50 книг', done: true, editing: false, size: "small", time: '14:59 23.06.23' },
					
					// 	{ id: '3', text: 'Прочитал 25 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					// 	{ id: '4', text: 'Прочитал 10 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
					// 	{ id: '5', text: 'Прочитал 0 книг', done: true, editing: false, color: '#1867C0', size: "small", time: '15:26 EDT' },
				],
			},
			{
				id: '101',
				allDone: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '1', text: 'Прочитать 100 книг', done: false, editing: false, size: "large", time: '' },
					{ id: '2', text: 'Прочитал 75 книг', done: false, editing: false, size: "small", time: '' },
					{ id: '3', text: 'Прочитал 50 книг', done: false, editing: false, size: "small", time: '' },
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
			let currTaskId = 0
			// const tasks = 
			class Task {
				constructor(text) {
					this.id = currTaskId++
					this.text = text
					this.done = false
					this.editing = false
					this.size = 'small'
					//ниже часть не нужна потому что время я буду добавлять в момент выполнения цели, а не в момент её создания, то есть при событии setDone надо добавлять время
					// this.time = time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
					// 	return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
					// })
				}
				showText() {
					console.log('this.id', this.id)
				}
			}
			// arr.forEach(item => )

			const newTask = new Task('lalala')
			console.log('newTask', newTask)
			newTask.showText()

			// const item = {
			// 	id: maxId,
			// 	tasks: [],
			// 	text: arr.forEach(),
			// 	time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
			// 		return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
			// 	}),
			// }


			// cards.push(item)

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

			// проверяю если все goals done -> ставлю/снимаю галочку allDone
			const checkAllDone = selectedCard.tasks.every(val => val.done === true)
			if (checkAllDone) selectedCard.allDone = true
			else selectedCard.allDone = false

			const currentDate = new Date();
			// Получаем часы, минуты, день, месяц и год из объекта Date
			const hours = currentDate.getHours();
			const minutes = currentDate.getMinutes();
			const day = currentDate.getDate();
			const month = currentDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
			const year = currentDate.getFullYear() % 100; // Получаем двузначный год

			// Форматируем время и дату в нужный формат
			const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
			const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;


			if (elem.done) {
				elem.time = `${formattedTime} ${formattedDate}`
			} else {
				elem.time = ''
			}
			
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

