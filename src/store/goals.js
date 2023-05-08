export default {
	namespaced: true,
	state: {
		category: 'Цели',
		cards: [
			{
				id: '100',
				title: 'Цели title',
				subTitle: 'Цели subTitle',
				text: "Текст первой Цели"
			},
			{
				id: '101',
				title: 'Цели title',
				subTitle: 'Цели subTitle',
				text: "Текст второй Цели"
			},
			{
				id: '102',
				title: 'Цели title',
				subTitle: 'Цели subTitle',
				text: "Текст третьей Цели"
			},
			{
				id: '103',
				title: 'Цели title',
				subTitle: 'Цели subTitle',
				text: "Текст четвертой Цели"
			},
			{
				id: '104',
				title: 'Цели title',
				subTitle: 'Цели subTitle',
				text: "Текст пятой Цели"
			}
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

