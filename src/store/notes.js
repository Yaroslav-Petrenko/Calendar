export default {
	namespaced: true,
	state: {
		category: 'Заметки',
		// searchField: 'чет',
		cards: [
			{
				id: '100',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст первой заметки первая-третья"
			},
			{
				id: '101',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст второй заметки вторая-четвертая"
			},
			{
				id: '102',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст третьей заметки первая-третья"
			},
			{
				id: '103',
				title: 'Заметки title',
				subTitle: 'Заметки subTitle',
				text: "Текст четвертой заметки вторая-четвертая"
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
		allNotes: state => state.cards,
		filteredNotes: state => conditions => state.cards.filter(item => {
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

