export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				allDone: true,
				archive: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Первая цель', done: true, size: "large", time: '20:25 22.10.22' },
					{ id: '1', text: 'Прочитал 30 книг', done: true, size: "small", time: '18:36 23.07.22' },
					{ id: '2', text: 'Прочитал 20 книг', done: true, size: "small", time: '14:59 23.05.22' },
					{ id: '3', text: 'Прочитал 10 книг', done: true, size: "small", time: '15:23 22.03.22' },
				],
			},
			{
				id: '101',
				allDone: false,
				archive: false,
				tasks: [
					{ id: '0', text: 'Вторая цель', done: false, size: "large", time: '' },
					{ id: '1', text: 'Прочитал 75 книг', done: true, size: "small", time: '15:23 22.03.22' },
					{ id: '2', text: 'Прочитал 50 книг', done: true, size: "small", time: '15:23 29.02.22' },
				],
			},
			{
				id: '102',
				allDone: false,
				archive: false,
				tasks: [
					{ id: '0', text: 'Третья цель', done: false, size: "large", time: '' },
					{ id: '1', text: 'Прочитал 30 книг', done: true, size: "small", time: '20:56 23.07.22' },
					{ id: '2', text: 'Прочитал 20 книг', done: true, size: "small", time: '14:59 23.05.22' },
					{ id: '3', text: 'Прочитал 10 книг', done: true, size: "small", time: '15:23 22.03.22' },
				],
			},
			{
				id: '103',
				allDone: false,
				archive: false,
				tasks: [
					{ id: '0', text: 'Четвертая цель', done: false, size: "large", time: '' },
					{ id: '1', text: 'Пробежать 35 000 метров', done: false, size: "small", time: '' },
					{ id: '2', text: 'Пробежать 30 000 метров', done: true, size: "small", time: '20:25 22.10.22' },
					{ id: '3', text: 'Пробежать 25 000 метров', done: false, size: "small", time: '' },
					{ id: '4', text: 'Пробежать 20 000 метров', done: false, size: "small", time: '' },
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
		// if (conditions) return 
		// console.log(Object.values(item))
		// console.log('Синий кит'.indexOf('ний') !== -1); // true
		// 	return (item.text.toLowerCase().indexOf(conditions.toLowerCase()) !== -1)
		// })
		// goals: state => state.cards,
		filteredGoals: state => state.cards.filter(item => item.archive === false)


	},
	mutations: {
		addGoal({ cards }, { arr, cardId }) {
			// убираю последний элемент массива - пустую строку
			const formattedArr = arr.slice(0, -1)

			const newCard = {
				id: cardId || String(++maxId),
				allDone: false,
				archive: false,
				tasks: []
			}

			let currTaskId = 0
			class Task {
				static isFirstTask = true;
				constructor(text) {
					this.id = String(currTaskId++)
					this.text = text
					this.done = false
					this.size = Task.isFirstTask ? 'large' : 'small';
					if (Task.isFirstTask) {
						Task.isFirstTask = false;
					}
				}
			}

			// console.log('arr', arr)
			if (cardId) {
				const selectedCard = cards.find(item => item.id === cardId)
				const itemsForDelete = []
				let maxTaskId = 0;
				selectedCard.tasks.forEach(item => maxTaskId = Math.max(item.id, maxTaskId))
				
				
		

				// ниже я итерируюсь по таскам и меняю таски, но надо итерироваться по массиву. Далее записывать в существующий таск, или таска нет - создавать новый
				// selectedCard.tasks.forEach((item, i) => {
				// 	if (arr[i]) {
				// 		item.text = arr[i]
				// 	}
				// 	else {
				// 		// вместо удаления элемента и изменения массива, я записываю индексы элементов которые следует удалить
				// 		itemsForDelete.push(i)
				// 	}
				// })
			
				// итерируюсь по массиву
				arr.forEach((item, i) => {
					if (selectedCard.tasks[i]) {
						selectedCard.tasks[i].text = item
						console.log('selectedCard.tasks[i].text', selectedCard.tasks[i].text)
						console.log('item', item)
					} else {

					}
				})




				// делаю сортировку по индексам в обратном порядке, чтобы процедура удаления шла всегда с конца массива. Если она будет идти с начала, то индексы массива будут сдвигаться, и удаление будет некорректным
				// itemsForDelete.sort((a, b) => b - a);
				// itemsForDelete.forEach(item => {
				// 	selectedCard.tasks.splice(item, 1)
				// })
			} else {
				let maxId = 0;
				cards.forEach(item => maxId = Math.max(item.id, maxId))
				// const newCard = {
				// 	id: String(++maxId),
				// 	allDone: false,
				// 	archive: false,
				// 	tasks: []
				// }
				cards.push(newCard)

				// let currTaskId = 0
				// class Task {
				// 	static isFirstTask = true;
				// 	constructor(text) {
				// 		this.id = String(currTaskId++)
				// 		this.text = text
				// 		this.done = false
				// 		this.size = Task.isFirstTask ? 'large' : 'small';
				// 		if (Task.isFirstTask) {
				// 			Task.isFirstTask = false;
				// 		}
				// 	}
				// }
				// создаю новые такси в новой карте
				formattedArr.forEach(item => newCard.tasks.push(new Task(item)))
			}



		},
		// addGoalField({ cards }, { text, cardId }) {
		// 	const selectedCard = cards.find(item => item.id === cardId)
		// 	const time = (new Date()).toTimeString()
		// 	const item = {
		// 		id: ((parseInt(selectedCard.tasks[selectedCard.tasks.length - 1]?.id) + 1) || 0).toString(),
		// 		text,
		// 		time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
		// 			return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
		// 		}),
		// 	}
		// 	// console.log('selectedCard', selectedCard)
		// 	selectedCard.tasks.push(item)
		// 	// selectedCard.allDone = false

		// },
		markAsDone({ cards }, { cardId, taskId }) {
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

		},
		changeGoalArchive(state, id) {
			const elem = state.cards.find(item => item.id === id)
			console.log('elem', elem)
			elem.archive = !elem.archive
		},
		editGoal({ cards }, { textFieldsValue, cardId }) {
			const selectedCard = cards.find(item => item.id === cardId)
			const itemsForDelete = []
			selectedCard.tasks.forEach((item, i) => {
				if (textFieldsValue[i]) {
					item.text = textFieldsValue[i]
				}
				else {
					// вместо удаления элемента и изменения массива, я записываю индексы элементов которые следует удалить
					itemsForDelete.push(i)
				}
			})
			// делаю сортировку по индексам в обратном порядке, чтобы процедура удаления шла всегда с конца массива. Если она будет идти с начала, то индексы массива будут сдвигаться, и удаление будет некорректным
			itemsForDelete.sort((a, b) => b - a);
			itemsForDelete.forEach(item => {
				selectedCard.tasks.splice(item, 1)
			})
		},
		deleteGoal({ cards }, cardId) {
			const idx = cards.findIndex(item => item.id === cardId)
			cards.splice(idx, 1)
		},
	},
	actions: {
		createGoal(store, obj) {
			store.commit('addGoal', obj)
		},
		setDone(store, obj) {
			store.commit('markAsDone', obj)
		},
		sendToArchive(store, id) {
			store.commit('changeGoalArchive', id)
		},
		changeGoalTasks(store, obj) {
			// debugger
			// let arrayIsEmpty = false
			// obj.textFieldsValue.forEach(item => item == false ? arrayIsEmpty = true : arrayIsEmpty = false)

			// const arrayIsEmpty = obj.textFieldsValue.every(item => item == true)
			// const arrayIsEmpty = !obj.textFieldsValue.some(item => item)

			// const arrayIsEmpty2 = obj.textFieldsValue.some(item => {
			// 	if(item) return true
			// })

			// console.log('arrayIsEmpty', arrayIsEmpty)
			// console.log('obj', obj)
			// store.commit('deleteGoal', obj.cardId)
			// setTimeout(() => { store.commit('deleteGoal', obj.cardId) }, 0)
			// store.commit('deleteGoal', obj.cardId)
			// if (arrayIsEmpty) store.commit('deleteGoal', obj.cardId)
			// else store.commit('editGoal', obj)
			// store.commit('editGoal', obj)
			store.commit('addGoal', obj)
			// console.log('changeGoalTasks', obj)
		},

		deleteGoal(store, cardId) {
			console.log('deleteGoal', cardId)
			store.commit('deleteGoal', cardId)
		},
	},
}

