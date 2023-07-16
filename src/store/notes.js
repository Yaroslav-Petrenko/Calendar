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
				// title: 'Reminder of App Project And Design',
				// subTitle: 'Заметки subTitle',
				text: "Calendify always allows you to set the reminder to optimize task management roles and jobs.",
				borderColor: 'grey',
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '101',
				archive: false,
				// title: 'Email Signature for Support Team',
				// subTitle: 'Заметки subTitle',
				text: "Outsmart back-and-forth in communication by staying alert with your support team follow-ups.",
				borderColor: 'yellow',
				notesType: 'text',
				icon: '26'
			},
			{
				id: '102',
				archive: false,
				// title: 'Plugins & Team Review Meeting',
				// subTitle: 'Заметки subTitle',
				text: "Cviverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec",
				borderColor: 'green',
				notesType: 'text',
				icon: '3'
			},
			{
				id: '103',
				archive: false,
				// title: 'New Year Iqonic Design Campaigns',
				// subTitle: 'Заметки subTitle',
				text: "Ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta",
				borderColor: 'blue',
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '104',
				archive: false,
				// title: 'Email Signature for Support Team',
				// subTitle: 'Заметки subTitle',
				text: "Outsmart back-and-forth in communication by staying alert with your support team follow-ups.",
				borderColor: 'yellow',
				notesType: 'ideas',
				icon: '51'
			},
			{
				id: '105',
				archive: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Sed odio morbi quis commodo odio aenean sed adipiscing diam donec adipiscing tristique risus nec",
				borderColor: 'orange',
				notesType: 'text',
				icon: '5'
			},
			{
				id: '106',
				archive: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis",
				borderColor: 'orange',
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '107',
				archive: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique",
				borderColor: 'orange',
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '108',
				archive: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus",
				borderColor: 'orange',
				notesType: 'text',
				icon: '15'
			},
			{
				id: '109',
				archive: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra",
				borderColor: 'orange',
				notesType: 'achievements',
				icon: '52'
			},
			{
				id: '110',
				archive: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim",
				borderColor: 'orange',
				notesType: 'ideas',
				icon: '51'
			},
			{
				id: '111',
				archive: false,
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa",
				borderColor: 'orange',
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
			console.log("select", select)
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
		addNote({ notes }, { text, inFirstPlace, borderColor, notesType, icon }) {
			console.log('notesType', notesType)
			let maxId = 0
			notes.forEach(item => maxId = Math.max(item.id, maxId))
			const item = {
				id: String(++maxId),
				archive: false,
				text,
				// borderColor,
				notesType,
				icon
			}
			inFirstPlace ? notes.unshift(item) : notes.push(item)
		
			// console.log('inFirstPlace', inFirstPlace)
			// notes.push({
			// 	id: (parseInt(notes[notes.length - 1].id) + 1).toString(),
			// 	// title: 'Project And Task Management Roles',
			// 	// subTitle: 'Заметки subTitle',
			// 	text,
			// 	color: 'orange'
			// })
		},
		changeArchive({ notes }, id) {
			const elem = notes.find(item => item.id === id)
			elem.archive = true
			// console.log('elem', elem)
		}

	},
	actions: {
		createNote(store, obj) {
			// console.log('obj', obj)
			store.commit('addNote', obj)
		},
		toArchive(store, id) {
			console.log('toArchive', id)
			store.commit('changeArchive', id)
		}
	},
}

