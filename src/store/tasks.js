export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				date: '',
				allDone: false,
				// archive: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'At imperdiet dui accumsan sit amet nulla facilisi morbi. At imperdiet dui accumsan sit amet. At imperdiet dui accumsan sit amet', done: true, editing: false },
					{ id: '1', text: 'Зайти в магазин за продуктами ', done: true, editing: false },
					{ id: '2', text: 'Выпить пива, поностальгировать', done: true, editing: false },
					{ id: '3', text: 'At imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna', done: false, editing: false },
				],
			},
			{
				id: '101',
				date: '',
				allDone: false,
				// archive: false,
				// subTitle: 'Задачи subTitle',, editing: false
				tasks: [
					{ id: '0', text: 'Выпить пива, поностальгировать Зайти в магазин за продуктами', done: true, editing: false },
					{ id: '1', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					{ id: '2', text: 'Зайти в магазин за продуктами', done: true, editing: false },
					{ id: '3', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					{ id: '4', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					{ id: '5', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					{ id: '6', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					{ id: '7', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					{ id: '8', text: 'Зайти в магазин за продуктами', done: true, editing: false },
					{ id: '9', text: 'Выпить пива, поностальгировать', done: true, editing: false },
				],
			},
			{
				id: '102',
				date: '',
				allDone: false,
				// archive: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					{ id: '1', text: 'Зайти в магазин за продуктами', done: true, editing: false },
					{ id: '2', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '4', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '5', text: 'Выпить пива, поностальгировать', done: false, editing: false },
					// { id: '6', text: 'Выпить пива, поностальгировать', done: false, editing: false },
				],
			},
			{
				id: '103',
				date: '',
				allDone: false,
				// archive: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					{ id: '1', text: 'Зайти в магазин за продуктами', done: true, editing: false },
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
			// state.cards.forEach(item => item.date = formattedDate);
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

			// console.log("addTask", selectedCard)
			// console.log("text", text)
			// console.log("cardId", cardId)
			const item = {
				id: ((parseInt(selectedCard.tasks[selectedCard.tasks.length - 1]?.id) + 1) || 0).toString(),
				// id: (parseInt(cards.tasks[cards.tasks.length - 1].id) + 1).toString(),
				// date,
				text,
			}
			// console.log('selectedCard', selectedCard)
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
		
		
			// console.log('card', card)
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
			
			// console.log('changeAllDone', cardId)
			// console.log('card.allDone', card.allDone)
			// console.log('card', card)
			// card.tasks.forEach(item => item.done = true)
		},
		setDate(state, { cardId, date }) {
			const card = state.cards.find(item => item.id == cardId)
			// console.log('cardId', cardId)
			// console.log('date', date)
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
			// console.log("index", index)
			if (index !== -1) {
				card.tasks.splice(index, 1);
			}
			// при удалении таска делаю проверку -> оставшиеся таски done или нет если done то ставлю статус card.allDone = true. Задержку в 500 мс поставил для более красивоого переключения стилей. Зедержку убрал - ассинхронщину нельзя в мутациях
			const checkAllDone = card.tasks.every(val => val.done === true)
			// console.log('checkAllDone', checkAllDone)
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
				// console.log('all', card)
			}
			if (taskToggle === 'archive') {
				card = state.archiveCards.find(item => item.id == cardId)
				// console.log('archive', card)
			}
		
			const task = card.tasks.find(task => task.id === taskId);
			task.text = text;
			task.editing = false;
		},
		sendToArchive(state, { cardId }) {
			let maxId = 1000
			state.archiveCards.forEach(item => maxId = Math.max(item.id, maxId))
			// console.log('sendToArchive')
			// console.log('cardId', cardId)
			// const selectedCard = state.cards.find(item => item.id == cardId)
			// selectedCard.archive = !selectedCard.archive

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
			// console.log('cardInArchive', cardInArchive)
			selectedCard.tasks.forEach(item => {
				cardInArchive.tasks.push({
					id: item.id,
					text: item.text,
					done: item.done
				})
			})
			// тут я очищаю только текст
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
			// console.log('selectedCard.tasks', !!selectedCard.tasks)

			// setTimeout(() => {
			// 	selectedCard.tasks.forEach(item => item.text = '')
			// }, 3000)

			// selectedCard.tasks.forEach(item => {
			// 	console.log('item', item)
			// })
		},
		removeTaskCard(state, { cardId }) {
			// console.log('I want to delete', cardId)
			// const selectedCard = state.archiveCards.find(item => item.id == cardId)
			state.archiveCards.splice(state.archiveCards.findIndex(item => item.id == cardId), 1)
			// console.log('state.archiveCards', state.archiveCards)
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

