<template>
	<v-select
		v-model="select"
		:hint="`${select.state}, ${select.abbr}`"
		:items="items"
		item-title="state"
		item-value="abbr"
		label="Select"
		persistent-hint
		return-object
		single-line
	></v-select>
</template>

<script>
import { ref, computed } from 'vue'
// import { fileURLToPath, URL } from 'node:url'


export default {
	setup(_, { emit }) {
		const select = ref('')
		const items = ['text', 'idea', 'achievement']



		return {
			select,
			items,
		}
	}
}
</script>

<style lang="scss"></style>