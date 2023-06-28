<template>
	<v-card class="content d-flex flex-column">
		<v-card
			color="#27272f"
			elevation="0"
		>
			<v-card
				class="ma-auto"
				width="1300"
				elevation="0"
			>
				<v-toolbar color="#27272f">

					<!-- <v-card class="ma-auto" color="#27272f" width="1300"> -->
					<!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
					<v-toolbar-title>Calendar</v-toolbar-title>
					<!-- Calendar -->
					<v-spacer></v-spacer>
					<!-- <v-btn icon>
						<v-icon>mdi-magnify</v-icon>
					</v-btn> -->
					<v-btn icon>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
					<template
						late
						v-slot:extension
					>
						<!-- <div class="container"> -->
						<!-- Хочу заменить цикл на статику -->
						<v-tabs
							v-model="tab"
							align-tabs="title"
							selected-class=""
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
					<!-- </v-card> -->
				</v-toolbar>
			</v-card>
		</v-card>


		<v-card
			class="ma-auto flex-grow-1"
			width="1300"
			color="#1d1d24"
			elevation="0"
		>
			<div class="d-flex justify-space-between">
				<!-- TODO:ЧТОБЫ 2 РАЗА НЕ ПИСАТЬ tab === 'Заметки' МОЖНО ОБЕРНУТЬ В TEMPLATE -->
				<div
					v-if="tab != 'Задачи'"
					class="d-flex align-center"
				>
					<Search
						:tab="tab"
						@emitSearchValue="setSearch($event)"
					/>
					<Modal :buttonText="setModalButtonText">
						<template v-slot:modal-content="{ isActive }">
							<NoteForm
								v-if="tab === 'Заметки'"
								@closeModal="isActive.value = false"
							/>
							<GoalsForm
								v-else="tab === 'Цели'"
								@closeModal="isActive.value = false"
							/>
						</template>
					</Modal>

				</div>
				<Filter
					v-if="tab === 'Заметки'"
					@select="setSelect($event)"
				/>
				<!-- TODO:ПРОСТО БЛОК-ЗАГЛУШКА ЧТОБЫ КАРТОЧКИ НЕ ПРЫГАЛИ -->
				<v-card
					v-else
					height="78"
				></v-card>
			</div>
			<!-- isActive {{ isActive }} -->
			<!-- <v-data-table
					:headers="headers"
					:items="desserts"
					:search="search"
				></v-data-table> -->
			<!-- Хочу заменить цикл на статику -->
			<!-- <div class="pa-3 d-flex justify-center">
			</div> -->
			<v-window
				:modelValue="tab"
				update:modelValue="update($event)"
			>
				<v-window-item value="Заметки">
					<v-row>
						<!-- <v-card v-for="item in allCards" flat> -->
						<!-- <v-card-text v-text="text"></v-card-text> -->
						<transition-group
							name="bounce"
							appear
						>
							<Notes
								v-for="item in filteredNotes({ search, select }) "
								:key="item.id"
								:text="item.text"
								:borderColor="item.borderColor"
								:notesType="item.notesType"
								:icon="item.icon"
								:id="item.id"
								mode="out-in"
							/>
						</transition-group>
						<!-- </v-card> -->
					</v-row>
				</v-window-item>
				<v-window-item value="Задачи">
					<v-row>
						<!-- <Tasks
							v-for="item in filteredTasks({ search })"
							:key="item.id"
							:date="item.date"
							:tasks="item.tasks"
							:id="item.id"
						/> -->
						<Tasks
							v-for=" item  in  cards "
							:key="item.id"
							:date="item.date"
							:tasks="item.tasks"
							:cardId="item.id"
							:allDone="item.allDone"
						/>
						<!-- {{ filteredTasks({ search })[0].date }} -->
					</v-row>
				</v-window-item>
				<v-window-item value="Цели">
					<v-row>
						<!-- <div class="d-flex"> -->
						<transition-group
							name="bounce"
							appear
						>
							<Goals
								v-for=" item in goalsCards "
								:key="item.id"
								:tasks="item.tasks"
								:cardId="item.id"
								:allDone="item.allDone"
								mode="out-in"
							/>
						</transition-group>
						<!-- </div> -->
						<!-- <Goals
							v-for="item in cards"
							:key="item.id"
							:date="item.date"
							:tasks="item.tasks"
							:cardId="item.id"
							:allDone="item.allDone"
						/> -->
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
	</v-card>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import Notes from './Notes.vue'
import Search from './Search.vue'
import Filter from './Filter.vue'
import Tasks from './Tasks.vue'
import Goals from './Goals.vue'
import Modal from './Modal.vue'
import NoteForm from './NoteForm.vue'
import GoalsForm from './GoalsForm.vue'

export default {
	components: {
		Notes,
		Search,
		Filter,
		Tasks,
		Goals,
		Modal,
		NoteForm,
		GoalsForm
	},
	setup() {

		const store = useStore()

		const test = store.getters['notes/test']
		const tab = ref('Цели')
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
		const search = ref('')
		const setSearch = (e) => {
			search.value = e.value
			// console.log(obj)
		}
		// watch(tab, () => {
		// 	search.value = ''
		// });
		const select = ref('all')
		const setSelect = (e) => {
			select.value = e.value
		}

		const setModalButtonText = computed(() => {
			switch (tab.value) {
				case 'Заметки': return 'заметку'
				case 'Задачи': return 'задачу'
				case 'Цели': return 'цель'
			}
		})

		// const update = ($event) => {

		// }

		// const allNotes = computed(() => store.getters['notes/allNotes'])
		const filteredNotes = computed(() => store.getters['notes/filteredNotes'])
		// const allTasks = computed(() => store.getters['tasks/allTasks'])
		const filteredTasks = computed(() => store.getters['tasks/filteredTasks'])
		// const allGoals = computed(() => store.getters['goals/allGoals'])
		const cards = computed(() => store.getters['tasks/cards'])
		// const allGoals = computed(() => store.getters['goals/allGoals'])
		const goalsCards = computed(() => store.getters['goals/filteredGoals'])
		// console.log('filteredNotes', filteredNotes.value(''))



		return {
			items,
			text,
			tab,
			test,
			// update,
			// allNotes,
			// allTasks,
			// allGoals,
			filteredNotes,
			filteredTasks,
			goalsCards,
			setSearch,
			search,
			setSelect,
			select,
			cards,
			setModalButtonText
		}
	}
}
</script>

<style>
/* // анимация для note */
.bounce-enter-active {
	animation: bounce-in 0.3s;
	/* animation-delay: 5s; */
}

.bounce-leave-active {
	animation: bounce-in 0.3s reverse;
	/* animation-fill-mode: forwards; */
	/* animation-delay: 5s; */
}

@keyframes bounce-in {
	0% {
		transform: scale(0);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
}




.content {
	font-family: 'Work Sans', sans-serif;
	/* color:#fff; */
	background-color: #1d1d24;
	/* font-weight: 500; */
	/* font-size: 16px; */
	min-height: 100%;
	overflow: hidden;
}

/* .app-title {
	font-size: 40px;
} */
/* ниже рабоатет для выделенного таба */
/* .v-tab--selected {
		font-weight: 700;
	} */
</style>
