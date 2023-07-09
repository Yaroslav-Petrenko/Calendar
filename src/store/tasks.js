export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				date: '',
				allDone: true,
				archive: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					{ id: '1', text: 'Зайти в магазин за продуктами', done: true, editing: false },
					{ id: '2', text: 'Выпить пива, поностальгировать', done: true, editing: false },
				],
			},
			{
				id: '101',
				date: '',
				allDone: false,
				archive: false,
				// subTitle: 'Задачи subTitle',, editing: false
				tasks: [
					{ id: '0', text: 'Выпить пива, поностальгировать', done: true, editing: false },
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
				archive: false,
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
				archive: false,
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
		]
	},
	getters: {
		tasksFindEl: state => id => {
			return state.notes.id
		},
		// allTasks: state => state.cards,
		filteredTasks: state => ({ taskToggle }) => state.cards.filter(item => {
			// return item.archive === false
			// if (conditions) return 
			console.log("select", taskToggle)
			if (taskToggle == 'all') return item.archive === false
			if (taskToggle == 'archive') return item.archive === true
			// if (item.notesType == select && !item.archive && item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1) return item
			// console.log(Object.values(item))
			// console.log('Синий кит'.indexOf('ний') !== -1); // true
			// return (item.tasks.toLowerCase().indexOf(search.toLowerCase()) !== -1)
		}),
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
		addTask({ cards }, { text, cardId }) {
			const selectedCard = cards.find(item => item.id === cardId)
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
		changeCheckbox(state, { cardId, taskId }) {
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			// ставлю done на на нужном таске
			const card = state.cards.find(item => item.id == cardId)
			// console.log('card', card)
			const elem = card.tasks.find(e => e.id == taskId)
			elem.done = !elem.done
			// проверяю если все таски done -> ставлю/снимаю галочку allDone
			const checkAllDone = card.tasks.every(val => val.done === true)
			if (checkAllDone) card.allDone = true
			else card.allDone = false
		},
		changeAllDone(state, cardId) {
			const card = state.cards.find(item => item.id == cardId)
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
		deleteTask(state, { cardId, taskId }) {
			const card = state.cards.find(item => item.id == cardId)
			const index = card.tasks.findIndex(task => task.id === taskId);
			// console.log("index", index)
			if (index !== -1) {
				card.tasks.splice(index, 1);
			}
			// при удалении таска делаю проверку -> оставшиеся таски done или нет если done то ставлю статус card.allDone = true. Задержку в 500 мс поставил для более красивоого переключения стилей. Зедержку убрал - ассинхронщину нельзя в мутациях
			const checkAllDone = card.tasks.every(val => val.done === true)
			if (checkAllDone) card.allDone = true
			else card.allDone = false

		},
		editTask(state, { cardId, taskId, text }) {
			// убираю редактирования со всех тасков, чтобы одновременно релактировался только один
			state.cards.forEach(card => {
				card.tasks.forEach(task => task.editing = false)
			})
			// включаю редактирование на нужном
			const card = state.cards.find(item => item.id == cardId)
			const task = card.tasks.find(task => task.id === taskId);
			task.editing = true
		},
		completeEditing(state, { cardId, taskId, text }) {
			const card = state.cards.find(item => item.id == cardId)
			const task = card.tasks.find(task => task.id === taskId);
			task.text = text;
			task.editing = false;
		},
		sendToArchive(state, { cardId }) {
			console.log('sendToArchive')
			console.log('cardId', cardId)
			const selectedCard = state.cards.find(item => item.id == cardId)
			selectedCard.archive = !selectedCard.archive
		}

	},
	actions: {
		createTask(store, obj) {
			store.commit('addTask', obj)
		},
		setCheckbox(store, obj) {
			store.commit('changeCheckbox', obj)
		},
		changeCbxDone(store, cardId) {
			store.commit('changeAllDone', cardId)
		},
		changeDate(store, obj) {
			store.commit('setDate', obj)
		},
		deleteTask(store, obj) {
			store.commit('deleteTask', obj)
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

