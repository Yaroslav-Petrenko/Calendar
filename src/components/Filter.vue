<template>
	<v-card
		class="filter d-flex align-center"
		color="#1d1d24"
		width="265px"
		elevation="0"
	>
		<span class="filter__title">Показать</span>
		<v-select
			v-model="select"
			class="filter__select"
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
</template>

<script>
import { ref } from 'vue'


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
.filter {
	// .filter__title
	&__title {
		font-size: 14px;
		letter-spacing: 0.0892857143em;
		text-transform: uppercase;
	}

	// .filter__select
	&__select {
		margin-left: 10px;
	}

	// .filter.v-card
	&.v-card {
		padding: 15px 0px 15px 15px;
	}
}
</style>