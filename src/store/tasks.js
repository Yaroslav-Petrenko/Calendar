export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст первой Задачи"
			},
			{
				id: '101',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст второй Задачи"
			},
			{
				id: '102',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст третьей Задачи"
			},
			{
				id: '103',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст четвертой Задачи"
			},
			{
				id: '104',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст пятой Задачи"
			}
		]
	},
	getters: {
		tasksFindEl: state => id => {
			return state.notes.id
		},
		allTasks: state => state.cards
	},
	mutations: {

	},
	actions: {

	},
}

