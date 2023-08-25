export default {
	namespaced: true,
	state: {
		category: 'Заметки',
		notes: [
			{
				id: '100',
				archive: false,
				editing: false,
				text: "Сходить на концерт",
				notesType: 'text',
				icon: '1'
			},
			{
				id: '101',
				archive: false,
				editing: false,
				text: "Подготовиться к марафону",
				notesType: 'text',
				icon: '11'
			},
			{
				id: '102',
				archive: false,
				editing: false,

				text: "Создать свою гильдию",
				notesType: 'text',
				icon: '24'
			},
			{
				id: '103',
				archive: false,
				editing: false,

				text: "Посадить цветы на балконе",
				notesType: 'text',
				icon: '25'
			},
			{
				id: '104',
				archive: false,
				editing: false,
				text: "Создать плейлист для тренировок",
				notesType: 'ideas',
				icon: '51'
			},
			{
				id: '105',
				archive: false,
				editing: false,
				text: "Сделать ремонт в гостинной",
				notesType: 'ideas',
				icon: '51'
			},
			{
				id: '106',
				archive: false,
				editing: false,

				text: "Завести нового пушистого друга - котенка.",
				notesType: 'ideas',
				icon: '51'
			},
			{
				id: '107',
				archive: false,
				editing: false,

				text: "Lacus",
				notesType: 'text',
				icon: '33'
			},
			{
				id: '108',
				archive: false,
				editing: false,

				text: "Построил птичий домик на заднем дворе",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '109',
				archive: false,
				editing: false,

				text: "Прошёл курс по саморазвитию",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '110',
				archive: false,
				editing: false,

				text: "Вскопал огород",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '111',
				archive: false,
				editing: false,

				text: "Записался на мастер-класс по ноготочкам",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '112',
				archive: false,
				editing: false,
				text: "Организовал поисковую экспедицию в поисках потерянного пульта от телевизора",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '113',
				archive: false,
				editing: false,
				text: "Провёл расследование: куда исчезают носки после стирки",
				notesType: 'achievements',
				icon: '52'
			},
		]
	},
	getters: {
		notesFindEl: state => id => {
			return state.notes.id
		},
		filteredNotes: state => ({ search, select }) => state.notes.filter(item => {
			if (select == 'all' && !item.archive) return (item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1)
			if (select == 'archive') return item.archive
			if (item.notesType == select && !item.archive && item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1) return item
		})
	},
	mutations: {
		addNote({ notes }, { text, inFirstPlace, notesType, icon }) {
			let maxId = 0
			notes.forEach(item => maxId = Math.max(item.id, maxId))

			let newIcon = ''
			if (notesType === 'text') newIcon = icon
			if (notesType === 'ideas') newIcon = '51'
			if (notesType === 'achievements') newIcon = '52'

			const item = {
				id: String(++maxId),
				archive: false,
				editing: false,
				text,
				notesType,
				icon: newIcon
			}
			inFirstPlace ? notes.unshift(item) : notes.push(item)
		},
		changeArchive({ notes }, { noteId }) {
			const elem = notes.find(item => item.id === noteId)
			elem.archive = !elem.archive
		},
		removeNote({ notes }, { noteId }) {
			notes.splice(notes.findIndex(item => item.id == noteId), 1)
		},
		startEditing({ notes }, { noteId, newText }) {
			const note = notes.find(item => item.id === noteId)
			if (note.editing) {
				// console.log('попал в перый if')
				note.text = newText
				note.editing = !note.editing
			} 
			else {
				notes.forEach(item => item.editing = false)
				note.editing = !note.editing
			}
		},
	},
	actions: {
		createNote(store, obj) {
			store.commit('addNote', obj)
		},
		toArchive(store, obj) {
			store.commit('changeArchive', obj)
		},
		deleteNote(store, obj) {
			store.commit('removeNote', obj)
		},
		editNote(store, obj) {
			store.commit('startEditing', obj)
		},
	},
}

