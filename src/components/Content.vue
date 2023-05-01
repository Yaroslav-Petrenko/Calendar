<template>
	<Header />
	<v-row>
		<Notes />
		<Notes />
		<Notes />
		<Notes />
		<Notes />
		<Notes />
		<Notes />
	</v-row>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import Notes from './Notes.vue'
import Header from './Header.vue'
export default {
	components: {
		Notes,
		Header
	},
	setup() {

	}
}
</script>

<style></style>
