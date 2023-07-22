import store from "./index"

export default {
	namespaced: true,
	state: {
		category: 'Заметки',
		// searchField: 'чет',
		notes: [
			{
				id: '100',
				archive: false,
				editing: false,
				// title: 'Reminder of App Project And Design',
				// subTitle: 'Заметки subTitle',
				text: "The Woodman set to work at once, and so sharp was his axe that the tree was",
				notesType: 'text',
				icon: '47'
			},
			{
				id: '101',
				archive: false,
				editing: false,
				// title: 'Email Signature for Support Team',
				// subTitle: 'Заметки subTitle',
				text: "Привет моя новая заметка2",
				notesType: 'text',
				icon: '26'
			},
			{
				id: '102',
				archive: false,
				editing: false,
				// title: 'Plugins & Team Review Meeting',
				// subTitle: 'Заметки subTitle',
				text: "Привет моя новая заметка3",
				notesType: 'text',
				icon: '3'
			},
			{
				id: '103',
				archive: false,
				editing: false,
				// title: 'New Year Iqonic Design Campaigns',
				// subTitle: 'Заметки subTitle',
				text: "Привет моя новая заметка4",
				notesType: 'text',
				icon: '12'
			},
			{
				id: '104',
				archive: false,
				editing: false,
				// title: 'Email Signature for Support Team',
				// subTitle: 'Заметки subTitle',
				text: "Outsmart back-and-forth in communication by staying alert with your support team follow-ups.",
				notesType: 'ideas',
				icon: '51'
			},
			{
				id: '105',
				archive: false,
				editing: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec",
				notesType: 'text',
				icon: '5'
			},
			{
				id: '106',
				archive: false,
				editing: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Добавленный текст",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '107',
				archive: false,
				editing: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '108',
				archive: false,
				editing: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus",
				notesType: 'text',
				icon: '15'
			},
			{
				id: '109',
				archive: false,
				editing: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra",
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '110',
				archive: false,
				editing: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim",
				notesType: 'ideas',
				icon: '51'
			},
			{
				id: '111',
				archive: false,
				editing: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa",
				notesType: 'text',
				icon: '11'
			},
		]
	},
	getters: {
		notesFindEl: state => id => {
			return state.notes.id
		},
		// allNotes: state => state.cards,
		filteredNotes: state => ({ search, select }) => state.notes.filter(item => {
			// console.log("select", select)
			if (select == 'all' && !item.archive) return (item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1)
			if (select == 'archive') return item.archive
			if (item.notesType == select && !item.archive && item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1) return item
			// const selecteItem = item.notesType === select
			// if (conditions) return 
			// console.log('Синий кит'.indexOf('ний') !== -1); // true
			// return (item.text.toLowerCase().indexOf(search.toLowerCase()) !== -1)


			// вариант оптимизации от gpt
			// filteredNotes: state => ({ search, select }) => {
			// 	const lowercaseSearch = search.toLowerCase();
			// 	const filtered = state.notes.filter(item => {
			// 		if (select === 'all') {
			// 			return !item.archive && item.text.toLowerCase().includes(lowercaseSearch);
			// 		}
			// 		if (select === 'archive') {
			// 			return item.archive;
			// 		}
			// 		return item.notesType === select && !item.archive && item.text.toLowerCase().includes(lowercaseSearch);
			// 	});

			// 	return filtered;
			// }

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
				text,
				// borderColor,
				notesType,
				icon: newIcon
			}
			inFirstPlace ? notes.unshift(item) : notes.push(item)
		},
		changeArchive({ notes }, { noteId }) {
			const elem = notes.find(item => item.id === noteId)
			elem.archive = !elem.archive
			// console.log('elem', elem)
		},
		removeNote({ notes }, { noteId }) {
			notes.splice(notes.findIndex(item => item.id == noteId), 1)
		},
		startEditing({ notes }, { noteId, newText }) {
			// console.log('newText', newText)
			const note = notes.find(item => item.id === noteId)
			if (note.editing) {
				console.log('попал в перый if')
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
			// console.log('obj', obj)
			store.commit('addNote', obj)
		},
		toArchive(store, obj) {
			// console.log('toArchive', id)
			store.commit('changeArchive', obj)
		},
		deleteNote(store, obj) {
			// console.log('toArchive', id)
			store.commit('removeNote', obj)
		},
		editNote(store, obj) {
			store.commit('startEditing', obj)
		},
	},
}

