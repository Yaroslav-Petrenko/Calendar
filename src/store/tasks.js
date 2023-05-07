export default {
	namespaced: true,
	state: {
		category: 'Задачи',
		cards: [
			{
				id: '100',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст первой Задачи",
				complited: false,
				show: false,
			},
			{
				id: '101',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст второй Задачи",
				complited: false,
				show: true,
			},
			{
				id: '102',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст третьей Задачи",
				complited: false,
				show: true,
			},
			{
				id: '103',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст четвертой Задачи",
				complited: false,
				show: true,
			},
			{
				id: '104',
				title: 'Задачи title',
				subTitle: 'Задачи subTitle',
				text: "Текст пятой Задачи",
				complited: false,
				show: true,
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

