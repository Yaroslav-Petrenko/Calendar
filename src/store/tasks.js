export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				date: 'Вчера, 14 авг. 2023 г.',
				allDone: true,
				tasks: [
					{ id: '0', text: 'Закончить проект до конца недели', done: true, editing: false },
					{ id: '1', text: 'Запланировать встречу с клиентом', done: true, editing: false },
					{ id: '2', text: 'Зайти в магазин за продуктами', done: true, editing: false },
				],
			},
			{
				id: '101',
				date: 'Сегодня, 15 авг. 2023 г.',
				allDone: false,
				tasks: [
					{ id: '0', text: 'Сходить на "Оппенгеймера', done: true, editing: false },
					{ id: '1', text: 'Посетить спортзал вечером', done: true, editing: false },
					{ id: '2', text: 'Записаться на тверк', done: false, editing: false },
				],
			},
			{
				id: '102',
				date: 'Завтра, 16 авг. 2023 г.',
				allDone: false,
				tasks: [
					{ id: '0', text: 'Подготовиться к собеседованию', done: true, editing: false },
					{ id: '1', text: 'Написать письмо другу', done: false, editing: false },
					{ id: '2', text: 'Пойти на рыбалку с друзьями', done: false, editing: false },
					{ id: '3', text: 'Сделать список покупок', done: false, editing: false },
					{ id: '4', text: 'Найти новую книгу для чтения', done: false, editing: false },
					{ id: '6', text: 'Посмотреть фильм', done: false, editing: false },
					{ id: '7', text: 'Зайти в магазин за продуктами', done: false, editing: false },
					// { id: '8', text: 'Выпить пива, поностальгировать', done: false, editing: false },
				],
			},
			{
				id: '103',
				date: 'Послезавтра, 17 авг. 2023 г.',
				allDone: false,
				tasks: [
					{ id: '0', text: 'Сходить на фестиваль', done: false, editing: false },
					{ id: '1', text: 'Найти время для самообучения', done: false, editing: false },
					{ id: '2', text: 'Запланировать отпуск', done: false, editing: false },
					{ id: '3', text: 'Задуматься о бесконечно вечном', done: false, editing: false },
				],
			},
		],
		archiveCards: []
	},
	getters: {
		// tasksFindEl: state => id => {
		// 	return state.notes.id
		// },
		filteredTasks: state => ({ taskToggle }) => {
			if (taskToggle == 'all') return state.cards
			if (taskToggle == 'archive') return state.archiveCards
		},
		cards: state => state.cards,
		getDate: state => {
			const months = [
				"Января", "Февраля", "Марта", "Апреля",
				"Мая", "Июня", "Июля", "Августа",
				"Сентября", "Октября", "Ноября", "Декабря"
			];

			const currentDate = new Date();
			const day = currentDate.getDate();
			const month = months[currentDate.getMonth()];
			const year = currentDate.getFullYear();

			const formattedDate = `${day} ${month} ${year}`;
		}
	},
	mutations: {
		addTask({ cards, archiveCards }, { text, cardId, taskToggle }) {
			let selectedCard = null
			if (taskToggle === 'all') {
				selectedCard = cards.find(item => item.id === cardId)
			}
			if (taskToggle === 'archive') {
				selectedCard = archiveCards.find(item => item.id === cardId)
			}

			const item = {
				id: ((parseInt(selectedCard.tasks[selectedCard.tasks.length - 1]?.id) + 1) || 0).toString(),
				text,
			}
			selectedCard.tasks.push(item)
			selectedCard.allDone = false

		},
		changeCheckbox(state, { cardId, taskId, taskToggle }) {
			let card = null
			if (taskToggle === 'all') {
				card = state.cards.find(item => item.id == cardId)
			}
			if (taskToggle === 'archive') {
				card = state.archiveCards.find(item => item.id == cardId)
			}

			const elem = card.tasks.find(e => e.id == taskId)
			elem.done = !elem.done
			// проверяю если все таски done -> ставлю/снимаю галочку allDone
			const checkAllDone = card.tasks.every(val => val.done === true)
			if (checkAllDone) card.allDone = true
			else card.allDone = false
		},
		changeAllDone(state, { cardId, taskToggle }) {
			let card = null
			if (taskToggle === 'all') {
				card = state.cards.find(item => item.id == cardId)
			}
			if (taskToggle === 'archive') {
				card = state.archiveCards.find(item => item.id == cardId)
			}
			card.allDone = !card.allDone
			if (card.allDone) card.tasks.forEach(item => item.done = true)
			else card.tasks.forEach(item => item.done = false)
		},
		setDate(state, { cardId, date }) {
			const card = state.cards.find(item => item.id == cardId)
			card.date = date
		},
		deleteTask(state, { cardId, taskId, taskToggle }) {
			let card = null
			if (taskToggle === 'all') {
				card = state.cards.find(item => item.id == cardId)
			}
			if (taskToggle === 'archive') {
				card = state.archiveCards.find(item => item.id == cardId)
			}

			const index = card.tasks.findIndex(task => task.id === taskId);
			if (index !== -1) {
				card.tasks.splice(index, 1);
			}
			// при удалении таска делаю проверку -> оставшиеся таски done или нет если done то ставлю статус card.allDone = true.
			const checkAllDone = card.tasks.every(val => val.done === true)
			if (checkAllDone) card.allDone = true
			else card.allDone = false

		},
		editTask(state, { cardId, taskId, taskToggle }) {
			if (taskToggle === 'all') {
				// убираю редактирования со всех тасков, чтобы одновременно редактировался только один
				state.cards.forEach(card => {
					card.tasks.forEach(task => task.editing = false)
				})
				// включаю редактирование на нужном
				const card = state.cards.find(item => item.id == cardId)
				const task = card.tasks.find(task => task.id === taskId);
				task.editing = true
			}
			if (taskToggle === 'archive') {
				// убираю редактирования со всех тасков, чтобы одновременно редактировался только один
				state.archiveCards.forEach(card => {
					card.tasks.forEach(task => task.editing = false)
				})
				// включаю редактирование на нужном
				const card = state.archiveCards.find(item => item.id == cardId)
				const task = card.tasks.find(task => task.id === taskId);
				task.editing = true
			}

		},
		completeEditing(state, { cardId, taskId, text, taskToggle }) {
			let card = null
			if (taskToggle === 'all') {
				card = state.cards.find(item => item.id == cardId)
			}
			if (taskToggle === 'archive') {
				card = state.archiveCards.find(item => item.id == cardId)
			}

			const task = card.tasks.find(task => task.id === taskId);
			task.text = text;
			task.editing = false;
		},
		sendToArchive(state, { cardId }) {
			let maxId = 1000
			state.archiveCards.forEach(item => maxId = Math.max(item.id, maxId))

			const selectedCard = state.cards.find(item => item.id == cardId)
			selectedCard.allDone = true
			// при перемещении в архив удаляю из даты слова "Вчера, Сегодня, Завтра.."
			const regex = /^(Вчера|Сегодня|Завтра|Послезавтра), /;
			state.archiveCards.unshift({
				id: String(++maxId),
				date: selectedCard.date.replace(regex, ''),
				allDone: selectedCard.allDone,
				tasks: []
			})
			const cardInArchive = state.archiveCards.find(item => item.id == maxId)
			selectedCard.tasks.forEach(item => {
				cardInArchive.tasks.push({
					id: item.id,
					text: item.text,
					done: item.done
				})
			})
			selectedCard.tasks.forEach(item => item.text = '')
			selectedCard.tasks = []
		},
		removeTaskCard(state, { cardId }) {
			state.archiveCards.splice(state.archiveCards.findIndex(item => item.id == cardId), 1)
		},
		changeArchive(state) {
			state.cards.forEach(item => item.tasks.forEach(task => task.editing = false))
		}

	},
	actions: {
		createTask(store, obj) {
			store.commit('addTask', obj)
		},
		setCheckbox(store, obj) {
			store.commit('changeCheckbox', obj)
		},
		changeCbxDone(store, obj) {
			store.commit('changeAllDone', obj)
		},
		changeDate(store, obj) {
			store.commit('setDate', obj)
		},
		deleteTask(store, obj) {
			store.commit('deleteTask', obj)
		},
		deleteTaskCard(store, obj) {
			store.commit('removeTaskCard', obj)
		},
		editTask(store, obj) {
			store.commit('editTask', obj)
		},
		finishEditingTask(store, obj) {
			store.commit('completeEditing', obj)
		},
		changeArchive(store, obj) {
			store.commit('sendToArchive', obj)
		},
		normalizeTaskState(store) {
			store.commit('changeArchive')
		},
	},
}