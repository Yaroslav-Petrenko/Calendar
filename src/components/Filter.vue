<template>
	<v-card
		class="filter d-flex align-center"
		color="#1d1d24"
		width="265px"
		elevation="0"
	>
		<span class="filter-title">Показать</span>
		<v-select
			v-model="select"
			class="sort-select"
			:items="items"
			item-title="title"
			item-value="value"
			label="Select"
			variant="solo"
			bg-color="grey-darken-3"
			hide-details="true"
			single-line
			density="comfortable"
			@update:modelValue="emitFilter()"
		></v-select>
	</v-card>
	<!-- select {{ select }} -->
</template>

<script>
import { ref, computed, watch } from 'vue'
// import { fileURLToPath, URL } from 'node:url'


export default {
	setup(_, { emit }) {
		const select = ref('Все')
		const items = [
			{
				title: 'Все',
				value: 'all'
			},
			{
				title: 'Заметки',
				value: 'text'
			},
			{
				title: 'Идеи',
				value: 'ideas'
			},
			{
				title: 'Достижения',
				value: 'achievements'
			},
			{
				title: 'Архив',
				value: 'archive'
			}
		]

		// watch(select, () => {
		// 	emit('selectValue', select)
		// })
		const emitFilter = () => {
			emit('select', select)
		}


		return {
			select,
			items,
			emitFilter
		}
	}
}
</script>

<style lang="scss">
.sort-select {
	margin-left: 10px;
}

.filter.v-card {
	padding: 15px 0px 15px 15px;
}
.filter-title {
	font-size: 14px;
	// font-weight: 500;
	letter-spacing: 0.0892857143em;
	text-transform: uppercase;
}
</style>