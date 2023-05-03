export default {
	namespaced: true,
	state: {
		category: 'Заметки',
		cards: [
			{
				id: '100',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст первой заметки"
			},
			{
				id: '101',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст второй заметки"
			},
			{
				id: '102',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст третьей заметки"
			},
			{
				id: '103',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст четвертой заметки"
			},
			{
				id: '104',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст пятой заметки"
			}
		]
	},
	getters: {
		notesFindEl: state => id => {
			return state.notes.id
		},
		allNotes: state => state.cards
	},
	mutations: {

	},
	actions: {

	},
}

