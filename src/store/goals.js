export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				allDone: true,
				archive: false,
				tasks: [
					{ id: '0', text: 'Прочитать 30 книг за год', done: true, size: "large", time: '18:36 11.08.23' },
					{ id: '1', text: 'Прочитал 25 книг', done: true, size: "small", time: '18:36 14.07.23' },
					{ id: '2', text: 'Прочитал 20 книг', done: true, size: "small", time: '18:36 16.05.23' },
					{ id: '3', text: 'Прочитал 15 книг', done: true, size: "small", time: '18:36 21.04.23' },
					{ id: '4', text: 'Прочитал 10 книг', done: true, size: "small", time: '14:59 12.02.23' },
				],
			},
			{
				id: '101',
				allDone: false,
				archive: false,
				tasks: [
					{ id: '0', text: 'Пройти 300 уроков по английскому', done: false, size: "large", time: '' },
					{ id: '1', text: 'Прошёл 250 уроков', done: false, size: "small", time: '' },
					{ id: '2', text: 'Прошёл 200 уроков', done: true, size: "small", time: '14:59 23.08.23' },
					{ id: '3', text: 'Прошёл 150 уроков', done: true, size: "small", time: '15:23 22.06.23' },
					{ id: '4', text: 'Прошёл 100 уроков', done: true, size: "small", time: '15:23 22.03.23' },
				],
			},
			{
				id: '102',
				allDone: false,
				archive: false,
				tasks: [
					{ id: '0', text: 'Сделать 200 тренировок в спортзале', done: false, size: "large", time: '' },
					{ id: '1', text: '150 тренировок', done: true, size: "small", time: '15:23 22.08.23' },
					{ id: '2', text: '100 тренировок', done: true, size: "small", time: '15:23 29.06.23' },
					{ id: '3', text: '50 тренировок', done: true, size: "small", time: '15:23 29.04.23' },
					{ id: '4', text: '25 тренировок', done: true, size: "small", time: '15:23 29.02.23' },
				],
			},
			{
				id: '103',
				allDone: false,
				archive: false,
				tasks: [
					{ id: '0', text: 'Пробежать марафон!', done: false, size: "large", time: '' },
					{ id: '1', text: 'Пробежать 35 000 метров', done: false, size: "small", time: '' },
					{ id: '2', text: 'Пробежать 30 000 метров', done: false, size: "small", time: '' },
					{ id: '3', text: 'Пробежать 25 000 метров', done: true, size: "small", time: '17:25 22.05.23' },
					{ id: '4', text: 'Пробежать 15 000 метров', done: true, size: "small", time: '17:25 22.03.23' },
				],
			},
		]
	},
	getters: {
		goalsFindEl: state => id => {
			return state.notes.id
		},
		filteredGoals: ({ cards }) => ({ taskToggle }) => cards.filter(item => {
			if (taskToggle === 'all') return item.archive === false
			if (taskToggle === 'archive') return item.archive === true
		})

	},
	mutations: {
		createGoalTasks({ cards }, { arr, cardId }) {
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
				if (text) {
					const done = selectedCard.tasks[i]?.done || false
					const time = selectedCard.tasks[i]?.time || ''
					newTasksArr.push(new Task(text, done, time))
				}
			})
			selectedCard.tasks = newTasksArr
		},
		addGoal({ cards }, cardId) {
			const newCard = {
				id: cardId,
				allDone: false,
				archive: false,
				tasks: []
			}
			cards.push(newCard)
		},
		markAsDone({ cards }, { cardId, taskId }) {
			const selectedCard = cards.find(item => item.id === cardId)
			const elem = selectedCard.tasks.find(e => e.id == taskId)
			elem.done = !elem.done

			// проверяю если все goals done -> ставлю/снимаю галочку allDone
			const checkAllDone = selectedCard.tasks.every(val => val.done === true)
			if (checkAllDone) selectedCard.allDone = true
			else selectedCard.allDone = false

			const currentDate = new Date();
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
			elem.archive = !elem.archive
		},
		deleteGoal({ cards }, cardId) {
			const idx = cards.findIndex(item => item.id === cardId)
			cards.splice(idx, 1)
		},
	},
	actions: {
		createGoal(store, arr) {
			let cardId = 0;
			store.state.cards.forEach(item => cardId = Math.max(item.id, cardId))
			cardId = String(++cardId)
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
			store.commit('createGoalTasks', obj)
		},

		deleteGoal(store, cardId) {
			store.commit('deleteGoal', cardId)
		},
	},
}

