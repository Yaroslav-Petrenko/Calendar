<template>
	<v-card
		class="d-flex"
		color="#1d1d24"
		elevation="0"
		width="260px"
	>
		Показать
		<v-select
			class="sort-select"
			v-model="select"
			:items="items"
			item-title="title"
			item-value="value"
			label="Select"
			width="50px"
			hide-details=""
			single-line
			density="compact"
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
				value: 'notes'
			},
			{
				title: 'Идеи',
				value: 'ideas'
			},
			{
				title: 'Достижения',
				value: 'achievements'
			}]

		watch(select, () => {
			emit('selectValue', select)
		})


		return {
			select,
			items,
		}
	}
}
</script>

<style lang="scss">
.sort-select {
	margin-left: 10px;
}
</style>