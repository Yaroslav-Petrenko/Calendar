<template>
	<v-card
		color="#1d1d24"
		elevation="0"
		width="514"
	>
		<v-card-title class="d-flex align-center search">
			<v-text-field
				v-model="search"
				variant="outlined"
				density="comfortable"
				bg-color="#1d1d24"
				:label="`Поиск по ${notesType}`"
				single-line
				hide-details
			>
			</v-text-field>
		</v-card-title>
	</v-card>
</template>

<script>
import { ref, computed, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import Filter from './Filter.vue'
export default {
	components: {
		Filter
	},
	props: {
		tab: {
			type: String,
			required: true
		}
	},
	setup(props, { emit }) {
		const store = useStore()

		const { tab } = toRefs(props)
		const allNotes = computed(() => store.getters['notes/allNotes'])
		const search = ref('')

		watch(search, (newValue) => {
			emit('emitSearchValue', { value: newValue })
		})
		watch(tab, () => search.value = '')

		const notesType = computed(() => {
			switch (tab.value) {
				case 'Заметки':
					return 'заметкам'
				case 'Задачи':
					return 'задачам'
				case 'Цели':
					return 'целям'
			}
		})

		return {
			search,
			notesType,
			allNotes,
		}
	}
}
</script>

<style>
.search.v-card-title {
	padding: 15px 15px 15px 0;
}
</style>
