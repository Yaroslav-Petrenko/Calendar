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
		addGoal({ cards }, arr) {
			// убираю последний элемент массива - пустую строку
			const formattedArr = arr.slice(0, -1)

			let maxId = 0;
			cards.forEach(item => maxId = Math.max(item.id, maxId))
			const newCard = {
				id: String(++maxId),
				allDone: false,
				archive: false,
				tasks: []
			}
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
					this.size = Task.isFirstTask ? 'large' : 'small';
					if (Task.isFirstTask) {
						Task.isFirstTask = false;
					}
				}
			}
			// создаю новые такси в новой карте
			formattedArr.forEach(item => newCard.tasks.push(new Task(item)))

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
			// console.log('textFieldsValue', textFieldsValue)
			// console.log('cardId', cardId)
			const selectedCard = cards.find(item => item.id === cardId)

			const itemsForDelete = []


			selectedCard.tasks.forEach((item, i) => {

				// console.log('item', item)
				// console.log('i', i)
				// debugger;
				if (textFieldsValue[i]) {
					// console.log('Попал в первый if')
					// console.log('item.text = ', item.text)
					// console.log('textFieldsValue[i] =', textFieldsValue[i])
					item.text = textFieldsValue[i]
				}
				else {
					// вместо удаления элемента и изменения массива, я записываю индексы элементов которые следует удалить
					itemsForDelete.push(i)
					// console.log('Попал во второй if')
					// console.log('textFieldsValue[i] =', textFieldsValue[i])
					// console.log('Перед удалением таска, карта выглядит вот так', selectedCard.tasks)

					// const deletedItems = selectedCard.tasks.splice(i, 1) /* тут ключевая ошибка */

					// console.log('Удаленные элементы методом splice', deletedItems)
					// console.log('После удаления таска, карта выглядит вот так', selectedCard.tasks )
				}
			})
			console.log('Индексы элементов которые следует удалить', itemsForDelete)
			// делаю сортировку по индексам в обратном порядке, чтобы процедура удаления шла всегда с конца массива. Если она будет идти с начала, то индексы массива будут сдвигаться, и удаление будет некорректным
			itemsForDelete.sort((a, b) => b - a);
			console.log('Индексы элементов после сортировки', itemsForDelete)
			itemsForDelete.forEach(item => {
				selectedCard.tasks.splice(item, 1)
			})

		},
		deleteGoal(state, cardId) {
			// const elem = state.cards.find(item => item.id === id)
			// console.log('elem', elem)
			// const idx = state.cards.indexOf(elem)
			// console.log('idx', idx)
			const idx = state.cards.findIndex(item => item.id === cardId)
			console.log('idx', idx)
			console.log('istate.cards', state.cards)
			state.cards.splice(idx, 1)
			console.log('istate.cards', state.cards)
			
		},
	},
	actions: {
		createGoal(store, arr) {
			store.commit('addGoal', arr)
		},
		setDone(store, obj) {
			store.commit('markAsDone', obj)
		},
		sendToArchive(store, id) {
			store.commit('changeGoalArchive', id)
		},
		changeGoalTasks(store, obj) {
			store.commit('editGoal', obj)
		},
		deleteGoal(store, cardId) {
			store.commit('deleteGoal', cardId)
		},
	},
}

