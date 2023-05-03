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
		allGoals: state => state.cards
	},
	mutations: {

	},
	actions: {

	},
}

