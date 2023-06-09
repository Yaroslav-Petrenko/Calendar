export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				date: 'Вчера, ',
				allDone: true,
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
				allDone: false,
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
		goalsFindEl: state => id => {
			return state.notes.id
		},
		// allGoals: state => state.cards,
		filteredGoals: state => conditions => state.cards.filter(item => {
			// if (conditions) return 
			// console.log(Object.values(item))
			// console.log('Синий кит'.indexOf('ний') !== -1); // true
			return (item.text.toLowerCase().indexOf(conditions.toLowerCase()) !== -1)
		})
	},
	mutations: {

	},
	actions: {

	},
}

