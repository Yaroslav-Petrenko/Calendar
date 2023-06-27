export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				allDone: true,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Прочитать 50 книг за год', done: true, size: "large", time: '20:25 22.10.22' },
					{ id: '1', text: 'Прочитал 30 книг', done: true, size: "small", time: '18:36 23.07.22' },
					{ id: '2', text: 'Прочитал 20 книг', done: true, size: "small", time: '14:59 23.05.22' },
					{ id: '3', text: 'Прочитал 10 книг', done: true, size: "small", time: '15:23 22.03.22' },

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
					{ id: '0', text: 'Прочитать 100 книг', done: false, editing: false, size: "large", time: '' },
					{ id: '1', text: 'Прочитал 75 книг', done: false, editing: false, size: "small", time: '' },
					{ id: '2', text: 'Прочитал 50 книг', done: false, editing: false, size: "small", time: '' },
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
			// убираю последний элемент массива - пустую строку
			const formattedArr = arr.slice(0, -1)

			let maxId = 0;
			cards.forEach(item => maxId = Math.max(item.id, maxId))
			const newCard = { id: String(++maxId), allDone: false, tasks: [] }
			cards.push(newCard)
			// console.log('maxId', maxId)
			// console.log('arr', Array.isArray(arr))
			let currTaskId = 0
			// const tasks =



			class Task {
				static isFirstTask = true;

				constructor(text) {
					this.id = String(currTaskId++)
					this.text = text
					this.done = false
					this.editing = false
					this.size = Task.isFirstTask ? 'large' : 'small';
					if (Task.isFirstTask) {
						Task.isFirstTask = false;
					}
					//ниже часть не нужна потому что время я буду добавлять в момент выполнения цели, а не в момент её создания, то есть при событии setDone надо добавлять время
					// this.time = time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
					// 	return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
					// })
				}
			}
			// создаю новые такси в новой карте
			formattedArr.forEach(item => newCard.tasks.push(new Task(item)))

			const newTask = new Task('lalala')
			// console.log('newTask', newTask)
			// newTask.showText()

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
		createGoal(store, arr) {
			store.commit('addGoal', arr)
		},
		changeGoal(store, obj) {
			store.commit('changeGoal', obj)
		}
	},
}

