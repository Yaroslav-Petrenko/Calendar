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
		createGoalTasks({ cards }, { arr, cardId }) {
			// console.log('createGoalTasks')
			// console.log('cardId', cardId)
			// console.log('arr', arr)
			// if (cardId) {
			// 	const selectedCard = cards.find(item => item.id === cardId)
			// }
			const selectedCard = cards.find(item => item.id === cardId)

			let currTaskId = 0
			class Task {
				static isFirstTask = true;
				constructor(text, done, time) {
					this.id = String(currTaskId++)
					this.text = text
					this.done = done
					this.time = time
					this.size = Task.isFirstTask ? 'large' : 'small';
					if (Task.isFirstTask) {
						Task.isFirstTask = false;
					}
				}
			}

			const newTasksArr = []
			arr.forEach((text, i) => {
			
				// const done = selectedCard.tasks[i]
				// console.log('done', done)
				// пустые строки пропускаем
				if (text) {
					const done = selectedCard.tasks[i]?.done || false
					const time = selectedCard.tasks[i]?.time || ''
					console.log('i', i)
					console.log('done', done)
					newTasksArr.push(new Task(text, done, time))
				} 
			})
			// просто заменяю старый массив с тасками на новый
			selectedCard.tasks = newTasksArr
	},
	addGoal({ cards }, cardId) {
		// let maxId = 0;
		// cards.forEach(item => maxId = Math.max(item.id, maxId))
		const newCard = {
			id: cardId,
			allDone: false,
			archive: false,
			tasks: []
		}
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
		// // создаю новые такси в новой карте
		// formattedArr.forEach(item => newCard.tasks.push(new Task(item)))

	},
	// editGoalTasks({ cards }, { arr, cardId }) {
	// убираю последний элемент массива - пустую строку, нет смысла удалять пустую строку в разделе создания массива с тасками newTasksArr, я пропуская все пустые строки
	// const formattedArr = arr.slice(0, -1)
	// 	const selectedCard = cards.find(item => item.id === cardId)

	// 	let currTaskId = 0
	// 	class Task {
	// 		static isFirstTask = true;
	// 		constructor(text) {
	// 			this.id = String(currTaskId++)
	// 			this.text = text
	// 			this.done = false
	// 			this.size = Task.isFirstTask ? 'large' : 'small';
	// 			if (Task.isFirstTask) {
	// 				Task.isFirstTask = false;
	// 			}
	// 		}
	// 	}

	// 	// на какое-то мгновение массив тасков становится пустым и это приводит к ошибке отсутствия key
	// 	// очищаю карту от старых тасков
	// 	// selectedCard.tasks.splice(0, selectedCard.tasks.length)

	// 	// // пушу новые такси в карту
	// 	// formattedArr.forEach((item, i) => {
	// 	// 	if (item) {
	// 	// 		selectedCard.tasks.push(new Task(item))
	// 	// 	}
	// 	// })

	// 	// создаю массив с новыми тасками
	// 	const newTasksArr = []
	// 	arr.forEach((item, i) => {
	// 		// пустые строки пропускаем
	// 		if (item) {
	// 			newTasksArr.push(new Task(item))
	// 		}
	// 	})
	// 	// просто заменяю старый массив с тасками на новый
	// 	selectedCard.tasks = newTasksArr
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
	// editGoal({ cards }, { textFieldsValue, cardId }) {
	// 	const selectedCard = cards.find(item => item.id === cardId)
	// 	const itemsForDelete = []
	// 	selectedCard.tasks.forEach((item, i) => {
	// 		if (textFieldsValue[i]) {
	// 			item.text = textFieldsValue[i]
	// 		}
	// 		else {
	// 			// вместо удаления элемента и изменения массива, я записываю индексы элементов которые следует удалить
	// 			itemsForDelete.push(i)
	// 		}
	// 	})
	// 	// делаю сортировку по индексам в обратном порядке, чтобы процедура удаления шла всегда с конца массива. Если она будет идти с начала, то индексы массива будут сдвигаться, и удаление будет некорректным
	// 	itemsForDelete.sort((a, b) => b - a);
	// 	itemsForDelete.forEach(item => {
	// 		selectedCard.tasks.splice(item, 1)
	// 	})
	// },
	deleteGoal({ cards }, cardId) {
		const idx = cards.findIndex(item => item.id === cardId)
		cards.splice(idx, 1)
	},
},
actions: {
	createGoal(store, arr) {
		let cardId = 0;
		store.state.cards.forEach(item => cardId = Math.max(item.id, cardId))
		// console.log('createGoal maxId', maxCardId)
		cardId = String(++cardId)
		// console.log('createGoal maxId', cardId)
		store.commit('addGoal', cardId)
		store.commit('createGoalTasks', { arr, cardId })
	},
	setDone(store, obj) {
		store.commit('markAsDone', obj)
	},
	sendToArchive(store, id) {
		store.commit('changeGoalArchive', id)
	},
	editGoalTasks(store, obj) {
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
		// store.commit('editGoalTasks', obj)
		// console.log('changeGoalTasks', obj)
		store.commit('createGoalTasks', obj)
	},

	deleteGoal(store, cardId) {
		console.log('deleteGoal', cardId)
		store.commit('deleteGoal', cardId)
	},
},
}

