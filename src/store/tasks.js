export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				date: 'Вчера, ',
				allDone: false,
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '0', text: 'Пойти на рыбалку с друзьями', done: true, editing: false },
					{ id: '1', text: 'Зайти в магазин за продуктами', done: true, editing: false },
					{ id: '2', text: 'Выпить пива, поностальгировать', done: true, editing: false },
				],
			},
			{
				id: '101',
				date: 'Сегодня, ',
				allDone: true,
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
				date: 'Завтра, ',
				allDone: false,
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
				date: 'Послезавтра, ',
				allDone: false,
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
		filteredTasks: state => ({ search }) => state.cards.filter(item => {
			return item
			// if (conditions) return 
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

		},
		changeCheckbox(state, { cardId, taskId }) {
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			const card = state.cards.find(item => item.id == cardId)
			const elem = card.tasks.find(e => e.id == taskId)
			elem.done = !elem.done
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
			card.date += date
		},
		deleteTask(state, { cardId, taskId }) {
			const card = state.cards.find(item => item.id == cardId)
			const index = card.tasks.findIndex(task => task.id === taskId);
			// console.log("index", index)
			if (index !== -1) {
				card.tasks.splice(index, 1);
			}
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
		}

	},
}

