<template>
	<v-card>
		<v-toolbar color="grey-darken-3">
			<!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
			<v-toolbar-title>Calendar</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>

			<template v-slot:extension>
				<v-tabs
					v-model="tab"
					align-tabs="title"
					bg-color="grey-darken-3"
					selected-class="red"
				>
					<v-tab
						v-for="item in items"
						:key="item"
						:value="item"
						variant="plain"
					>
						{{ item }}
					</v-tab>
					<!-- <v-tab>One</v-tab> -->
				</v-tabs>
			</template>

		</v-toolbar>

		<v-window
			:modelValue="tab"
			update:modelValue="update($event)"
		>
			<v-window-item
				v-for="item, i in items"
				:key="item"
				:value="item"
			>
				<v-card flat>
					Hellol
					<v-card-text v-text="text[i]"></v-card-text>
					<Notes/>
				</v-card>
			</v-window-item>
		</v-window>

		<!-- <v-window v-model="One">
				<v-window-item
					value="One"
				>
					<v-card flat>
						<v-card-text>Personal item text</v-card-text>
					</v-card>
				</v-window-item>
			</v-window> -->

		The tab is{{ tab }}
		<!-- The test is {{ test }} -->
	</v-card>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import Notes from './Notes.vue'

export default {
		components: {
		Notes,
	},
	setup() {
		const store = useStore()

		const test = store.getters['notes/test']
		const tab = ref('Заметки')
		const items = [
			'Заметки', 'Задачи', 'Цели',
		]
		const text = [
			'Заметки. Текст для заметок',
			'Задачи. Текст для Задач',
			'Цели. Текст для Целей'
		]

		const update = ($event) => {
			console.log('event', $event)

		}




		return {
			items,
			text,
			tab,
			test,
			update
		}
	}
}
</script>

<style>
/* ниже рабоатет для выделенного таба */
/* .v-tab--selected {
		font-weight: 700;
	} */
</style>
