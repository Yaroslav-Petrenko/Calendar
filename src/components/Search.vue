<template>
	<v-card
		color="#27272f"
		class="pa-4"
	>
		<v-card-title class="d-flex align-center">
			<!-- Nutrition -->
			<!-- <v-spacer></v-spacer> -->
			<v-text-field
				v-model="search"
				variant="outlined"
				density="comfortable"
				bg-color="#1d1d24"
				:label="`Поиск по ${notesType}`"
				single-line
				hide-details
			>
				<!-- {{ `Поиск по ${notesType}` }} -->
			</v-text-field>


			<Modal>
				<!-- <template v-slot:modal-content="{ isActive }" >
					 <NoteForm/>
				</template> -->
			</Modal>


		</v-card-title>
		<!-- <v-data-table
			:headers="headers"
			:items="desserts"
			:search="search"
		></v-data-table> -->
		<!-- seacrh is {{ search }}
		tab is {{ tab }} -->
		<!-- <pre>desserts is {{ desserts }}</pre> -->
	</v-card>
</template>


<script>
import { ref, reactive, computed, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import Modal from './Modal.vue'
// import NoteForm from './NoteForm.vue'
// import { props } from 'vue'
export default {
	components: {
		Modal,
		// NoteForm
	},
	props: {
		tab: {
			type: String,
			required: true
		}
	},
	setup(props, context) {
		
		// const isActive = ref(false); 
		// console.log('isActive', isActive.value)
		
		const store = useStore()
		const { tab } = toRefs(props)
		const allNotes = computed(() => store.getters['notes/allNotes'])
		// console.log('allNotes', allNotes.value)


		// console.log('tab.value', tab.value)
		// console.log('tab', tab)
		const search = ref('')
		// const headers = reactive([
		// 	{
		// 		align: 'start',
		// 		key: 'title',
		// 		sortable: false,
		// 		title: 'Dessert (100g serving)',
		// 	},
		// 	{ key: 'subTitle', title: 'Calories' },
		// 	{ key: 'text', title: 'Fat (g)' },
		// 	// { key: 'carbs', title: 'Carbs (g)' },
		// 	// { key: 'protein', title: 'Protein (g)' },
		// 	{ key: 'calories', title: 'Iron (%)' },
		// ])
		// const desserts = reactive([
		// 	{
		// 		name: 'Frozen Yogurt',
		// 		calories: 159,
		// 		fat: 6.0,
		// 		carbs: 24,
		// 		protein: 4.0,
		// 		iron: 1,
		// 	},
		// 	{
		// 		name: 'Ice cream sandwich',
		// 		calories: 237,
		// 		fat: 9.0,
		// 		carbs: 37,
		// 		protein: 4.3,
		// 		iron: 1,
		// 	},
		// 	{
		// 		name: 'Eclair',
		// 		calories: 262,
		// 		fat: 16.0,
		// 		carbs: 23,
		// 		protein: 6.0,
		// 		iron: 7,
		// 	},
		// 	{
		// 		name: 'Cupcake',
		// 		calories: 305,
		// 		fat: 3.7,
		// 		carbs: 67,
		// 		protein: 4.3,
		// 		iron: 8,
		// 	},
		// 	{
		// 		name: 'Gingerbread',
		// 		calories: 356,
		// 		fat: 16.0,
		// 		carbs: 49,
		// 		protein: 3.9,
		// 		iron: 16,
		// 	},
		// 	{
		// 		name: 'Jelly bean',
		// 		calories: 375,
		// 		fat: 0.0,
		// 		carbs: 94,
		// 		protein: 0.0,
		// 		iron: 0,
		// 	},
		// 	{
		// 		name: 'Lollipop',
		// 		calories: 392,
		// 		fat: 0.2,
		// 		carbs: 98,
		// 		protein: 0,
		// 		iron: 2,
		// 	},
		// 	{
		// 		name: 'Honeycomb',
		// 		calories: 408,
		// 		fat: 3.2,
		// 		carbs: 87,
		// 		protein: 6.5,
		// 		iron: 45,
		// 	},
		// 	{
		// 		name: 'Donut',
		// 		calories: 452,
		// 		fat: 25.0,
		// 		carbs: 51,
		// 		protein: 4.9,
		// 		iron: 22,
		// 	},
		// 	{
		// 		name: 'KitKat',
		// 		calories: 518,
		// 		fat: 26.0,
		// 		carbs: 65,
		// 		protein: 7,
		// 		iron: 6,
		// 	},
		// ])

		watch(search, (newValue) => {
			emit('emitSearchValue', { value: newValue })
		})
		// const clearSearch = () => {
		// 	console.log('blur work')
		// 	search.value = ''
		// }

		watch(tab, () => search.value = '')


		const notesType = computed(() => {
			switch (tab.value) {
				case 'Заметки':
					return 'заметкам'
				// break
				case 'Задачи':
					return 'задачам'
				// break
				case 'Цели':
					return 'целям'
				// break
			}
		})

		return {
			search,
			// headers,
			// desserts,
			notesType,
			allNotes,
			// isActive
			// clearSearch
		}

	}


}
</script>

<style>

</style>
