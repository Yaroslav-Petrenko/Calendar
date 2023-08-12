export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				date: '',
				allDone: true,
				tasks: [
					{ id: '0', text: 'Закончить проект до конца недели', done: true, editing: false },
					{ id: '1', text: 'Запланировать встречу с клиентом', done: true, editing: false },
					{ id: '2', text: 'Зайти в магазин за продуктами', done: true, editing: false },
				],
			},
			{
				id: '101',
				date: '',
				allDone: false,
				tasks: [
					{ id: '0', text: 'Написать письмо другу', done: true, editing: false },
					{ id: '1', text: 'Подготовиться к собеседованию', done: true, editing: false },
					{ id: '2', text: 'Посетить спортивный зал вечером', done: true, editing: false },
					{ id: '3', text: 'Сделать список покупок', done: true, editing: false },
					{ id: '4', text: 'Найти новую книгу для чтения', done: false, editing: false },
					// { id: '6', text: 'Составить список целей на следующий год', done: false, editing: false },
					// { id: '7', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					// { id: '8', text: 'Зайти в магазин за продуктами', done: true, editing: false },
					// { id: '9', text: 'Выпить пива, поностальгировать', done: true, editing: false },
				],
			},
			{
				id: '102',
				date: '',
				allDone: false,
				tasks: [
					{ id: '0', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					{ id: '1', text: 'Записаться на курсы по фотографии', done: true, editing: false },
					{ id: '2', text: 'Сходить на "Оппенгеймера"', done: false, editing: false },
					{ id: '3', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '5', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '6', text: 'Выпить пива, поностальгировать', done: false, editing: false },
				],
			},
			{
				id: '103',
				date: '',
				allDone: false,
				tasks: [
					{ id: '0', text: 'Отправить подарок другу на день рождения', done: true, editing: false },
					{ id: '1', text: 'Подготовиться к семейному празднику', done: true, editing: false },
					{ id: '2', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '4', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '5', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '6', text: 'Выпить пива, поностальгировать', done: false, editing: false },
				],
			},
		],
		archiveCards: []
	},
	getters: {
		tasksFindEl: state => id => {
			return state.notes.id
		},
		// allTasks: state => state.cards,
		filteredTasks: state => ({ taskToggle }) => {
			if (taskToggle == 'all') return state.cards
			if (taskToggle == 'archive') return state.archiveCards
		},
		// state.cards.filter(item => {
		// 	// return item.archive === false
		// 	// if (conditions) return 
		// 	console.log("select", taskToggle)
		// 	if (taskToggle == 'all') return item.archive === false
		// 	if (taskToggle == 'archive') return item.archive === true
		// 	// if (item.notesType == select && !item.archive && item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1) return item
		// 	// console.log(Object.values(item))
		// 	// console.log('Синий кит'.indexOf('ний') !== -1); // true
		// 	// return (item.tasks.toLowerCase().indexOf(search.toLowerCase()) !== -1)
		// }),
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
			// при перемещении в архив удаляю из даты субъективные слова
			const regex = /^(Вчера|Сегодня|Завтра|Послезавтра), /;
			// const cardCopy = structuredClone(selectedCard)
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
			// очищаю текст
			selectedCard.tasks.forEach(item => item.text = '')
			// ниже я удаляю всю карту
			// state.cards.splice(state.cards.findIndex(item => item.id == cardId), 1)
			// надо просто очистить все таски
			selectedCard.tasks =
				[
					// { id: '0', text: 'Новый таск', done: true, editing: false },
					// { id: '1', text: 'Новый таск', done: true, editing: false },
					// { id: '2', text: 'Новый таск', done: true, editing: false },
				]
		},
		removeTaskCard(state, { cardId }) {
			state.archiveCards.splice(state.archiveCards.findIndex(item => item.id == cardId), 1)
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
	},
}