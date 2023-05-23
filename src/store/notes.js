import store from "./index"

export default {
	namespaced: true,
	state: {
		category: 'Заметки',
		// searchField: 'чет',
		notes: [
			{
				id: '100',
				// title: 'Reminder of App Project And Design',
				// subTitle: 'Заметки subTitle',
				text: "Calendify always allows you to set the reminder to optimize task management roles and jobs.",
				borderColor: 'grey',
				notesType: 'achievement',
				icon: '52'
			},
			{
				id: '101',
				// title: 'Email Signature for Support Team',
				// subTitle: 'Заметки subTitle',
				text: "Outsmart back-and-forth in communication by staying alert with your support team follow-ups.",
				borderColor: 'yellow',
				notesType: 'idea',
				icon: '51'
			},
			{
				id: '102',
				// title: 'Plugins & Team Review Meeting',
				// subTitle: 'Заметки subTitle',
				text: "Calendify lets you to simplify and prioritize your calendar and your team’s calendar with review.",
				borderColor: 'green',
				notesType: 'text',
				icon: '3'
			},
			{
				id: '103',
				// title: 'New Year Iqonic Design Campaigns',
				// subTitle: 'Заметки subTitle',
				text: "Quickly schedule and set the event type to manage all your marketing and management campaigns.",
				borderColor: 'blue',
				notesType: 'achievement',
				icon: '52'
			},
			{
				id: '104',
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Set reminders for your team regarding their project and task completion so that they are not overlooked.",
				borderColor: 'orange',
				notesType: 'text',
				icon: '5'
			},
			{
				id: '104',
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Set reminders for your team regarding their project and task completion so that they are not overlooked.",
				borderColor: 'orange',
				notesType: 'achievement',
				icon: '52'
			},
			{
				id: '104',
				// title: 'Project And Task Management Roles',
				// subTitle: 'Заметки subTitle',
				text: "Set reminders for your team regarding their project and task completion so that they are not overlooked.",
				borderColor: 'orange',
				notesType: 'achievement',
				icon: '52'
			}
		]
	},
	getters: {
		notesFindEl: state => id => {
			return state.notes.id
		},
		// allNotes: state => state.cards,
		filteredNotes: state => conditions => state.notes.filter(item => {
			// if (conditions) return 
			// console.log(Object.values(item))
			// console.log('Синий кит'.indexOf('ний') !== -1); // true
			return (item.text.toLowerCase().indexOf(conditions.toLowerCase()) !== -1)
		})
	},
	mutations: {
		addNote({ notes }, { text, inFirstPlace, borderColor, notesType, icon }) {
			const item = {
				id: (parseInt(notes[notes.length - 1].id) + 1).toString(),
				text,
				borderColor,
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
		}

	},
	actions: {
		createNote(store, obj) {
			// console.log('obj', obj)
			store.commit('addNote', obj)
		}
	},
}

