<template>
	<v-card >
		<v-toolbar color="#27272f">
			
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
					<!-- <div class="container"> -->
					<!-- Хочу заменить цикл на статику -->
					<v-tabs
						v-model="tab"
						align-tabs="title"
						selected-class="red"
					>
						<v-tab
							value="Заметки"
							variant="plain"
						>
							Заметки
						</v-tab>
						<v-tab
							value="Задачи"
							variant="plain"
						>
							Задачи
						</v-tab>
						<v-tab
							value="Цели"
							variant="plain"
						>
							Цели
						</v-tab>
						<!-- Ниже цикл -->
						<!-- <v-tab
								v-for="item in notes"
								:key="item.category"
								:value="item.category"
								variant="plain"
							>
								{{ item.category }}
							</v-tab> -->
						<!-- <v-tab>{{ notes["Заметки"] }}</v-tab> -->
					</v-tabs>
					<!-- <Search/> -->
						<!-- </div> -->
				</template>
			
		</v-toolbar>
		<Search
			:tab="tab"
			@emitSearchValue="setSearch($event)"
		/>
		<!-- <v-data-table
				:headers="headers"
				:items="desserts"
				:search="search"
			></v-data-table> -->
		<!-- Хочу заменить цикл на статику -->
		<div class="pa-3 d-flex justify-center">
		</div>
		<v-window
			:modelValue="tab"
			update:modelValue="update($event)"
		>
			<v-window-item value="Заметки">
				<v-row>
					<!-- <v-card v-for="item in allCards" flat> -->
					<!-- <v-card-text v-text="text"></v-card-text> -->
					<Notes
						v-for="item in filteredNotes(search.value)"
						subTitle="Заметки"
						:title="item.title"
						:text="item.text"
					/>
					<!-- </v-card> -->
				</v-row>
			</v-window-item>
			<v-window-item value="Задачи">
				<v-row>
					<Notes
						v-for="item in filteredTasks(search.value)"
						subTitle="Задачи"
						:title="item.title"
						:text="item.text"
					/>
				</v-row>
			</v-window-item>
			<v-window-item value="Цели">
				<v-row>
					<Notes
						v-for="item in filteredGoals(search.value)"
						subTitle="Цели"
						:title="item.title"
						:text="item.text"
					/>
				</v-row>
			</v-window-item>
			<!-- Ниже цикл -->
			<!-- <v-window
				:modelValue="tab"
				update:modelValue="update($event)"
			>
				<v-window-item
					v-for="item, i in notes.cards"
					:key="item"
					:value="item"
				>
					Before card
					<v-card flat>
						Hellol
						<v-card-text v-text="text[i]"></v-card-text>
						<Notes
							subTitle="Заметки"
							title="Заметки title"
							text="Заметки lorem ipsum"
						/>
					</v-card>
				</v-window-item> -->
			<!-- <v-window-item>
						<v-card flat>
							<v-card-text >Lorem</v-card-text>
						</v-card>
					</v-window-item> -->
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
		<!-- The tab is {{ tab }} -->
		<!-- allTasks {{ allTasks }} -->
	</v-card>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import Notes from './Notes.vue'
import Search from './Search.vue'

export default {
	components: {
		Notes,
		Search
	},
	setup() {

		const notes = [
			{
				category: 'Заметки',
				cards: {
					'100': { id: '100', title: 'Заметки title', subTitle: 'Заметки subTitle', text: "Заметки lorem ipsum" },

					'101': { id: '101', title: 'Заметки title', subTitle: 'Заметки subTitle', text: "Заметки lorem ipsum" },

					'102': { id: '102', title: 'Заметки title', subTitle: 'Заметки subTitle', text: "Заметки lorem ipsum" },

					'103': { id: '103', title: 'Заметки title', subTitle: 'Заметки subTitle', text: "Заметки lorem ipsum" },

					'104': { id: '104', title: 'Заметки title', subTitle: 'Заметки subTitle', text: "Заметки lorem ipsum" }
				}
			},
			{
				category: 'Задачи',
				cards: {
					'100': { id: '100', title: 'Задачи title', subTitle: 'Задачи subTitle', text: "Задачи lorem ipsum" },

					'101': { id: '101', title: 'Задачи title', subTitle: 'Задачи subTitle', text: "Задачи lorem ipsum" },

					'102': { id: '102', title: 'Задачи title', subTitle: 'Задачи subTitle', text: "Задачи lorem ipsum" },

					'103': { id: '103', title: 'Задачии title', subTitle: 'Задачи subTitle', text: "Заметки lorem ipsum" },

					'104': { id: '104', title: 'Задачи title', subTitle: 'Задачи subTitle', text: "Задачи lorem ipsum" }
				}
			},
			{
				category: 'Цели',
				cards: {
					'100': { id: '100', title: 'Цели title', subTitle: 'Цели subTitle', text: "Цели lorem ipsum" },

					'101': { id: '101', title: 'Цели title', subTitle: 'Цели subTitle', text: "Цели lorem ipsum" },

					'102': { id: '102', title: 'Цели title', subTitle: 'Цели subTitle', text: "Цели lorem ipsum" },

					'103': { id: '103', title: 'Цели title', subTitle: 'Цели subTitle', text: "Цели lorem ipsum" },

					'104': { id: '104', title: 'Цели title', subTitle: 'Цели subTitle', text: "Цели lorem ipsum" }
				}
			}
		]

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

		// notes.forEach(item => console.log(Object.keys(item)))
		// console.log(Object.keys(notes))
		const search = reactive({ value: '' })
		const setSearch = (e) => {
			search.value = e.value
			// console.log(obj)
		}
		// watch(tab, () => {
		// 	search.value = ''
		// });





		const update = ($event) => {
			// console.log('event', $event)

		}

		// const allNotes = computed(() => store.getters['notes/allNotes'])
		const filteredNotes = computed(() => store.getters['notes/filteredNotes'])
		// const allTasks = computed(() => store.getters['tasks/allTasks'])
		const filteredTasks = computed(() => store.getters['tasks/filteredTasks'])
		// const allGoals = computed(() => store.getters['goals/allGoals'])
		const filteredGoals = computed(() => store.getters['goals/filteredGoals'])
		console.log('filteredNotes', filteredNotes.value(''))



		return {
			items,
			text,
			tab,
			test,
			update,
			notes,
			// allNotes,
			// allTasks,
			// allGoals,
			filteredNotes,
			filteredTasks,
			filteredGoals,
			setSearch,
			search
		}
	}
}
</script>

<style>
/* .app-title {
	font-size: 40px;
} */
/* ниже рабоатет для выделенного таба */
/* .v-tab--selected {
		font-weight: 700;
	} */
</style>
