export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				date: 'Вчера, 25 Мая 2023',
				// subTitle: 'Задачи subTitle',
				tasks: [
					{ id: '1', text: 'Пойти на рыбалку с друзьями', complited: false },
					{ id: '2', text: 'Зайти в магазин за продуктами', complited: false },
					{ id: '3', text: 'Выпить пива, поностальгировать', complited: false },
				],
				complited: false,
				show: false,
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
		addTask({ cards }, { text, id }) {
			// console.log(Array.isArray(cards.tasks))
			const selectedCard = cards.find(item => item.id = id)
			const item = {
				id: (parseInt(selectedCard.tasks[selectedCard.tasks.length - 1].id) + 1).toString(),
				// id: (parseInt(cards.tasks[cards.tasks.length - 1].id) + 1).toString(),
				// date,
				text,
			}
			// console.log('selectedCard', selectedCard)
			selectedCard.tasks.push(item)

		},

	},
	actions: {
		createTask(store, obj) {
			// console.log('obj', obj)
			store.commit('addTask', obj)
		},

	},
}

