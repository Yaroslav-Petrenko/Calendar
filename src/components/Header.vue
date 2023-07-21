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
					<!-- <v-toolbar-title class="header-title">Calendar</v-toolbar-title> -->
					<div class="header-title">Calendar</div>
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
							align-tabs="start"
							selected-class=""
						>
							<v-tab
								value="Задачи"
								variant="plain"
							>Задачи
							</v-tab>
							<v-tab
								value="Заметки"
								variant="plain"
							>Заметки
							</v-tab>
							<v-tab
								value="Цели"
								variant="plain"
							>Цели
							</v-tab>
						</v-tabs>
					</template>
				</v-toolbar>
			</v-card>
		</v-card>


		<v-card
			class="app-card ma-auto flex-grow-1"
			width="1300"
			color="#1d1d24"
			elevation="0"
		>
			<div class="d-flex justify-space-between">
				<!-- TODO:ЧТОБЫ 2 РАЗА НЕ ПИСАТЬ tab === 'Заметки' МОЖНО ОБЕРНУТЬ В TEMPLATE -->

				<div class="d-flex align-center">
					<div
						class="task-toggle-buttons"
						v-if="tab != 'Заметки'"
					>
						<v-btn-toggle
							v-model="taskToggle"
							density="comfortable"
							rounded="2"
							:color="getTaskSectionColor"
							group
						>
							<v-btn value="all">
								Все
							</v-btn>
							<v-btn value="archive">
								Архив
							</v-btn>
						</v-btn-toggle>
					</div>

					<div
						v-if="tab != 'Задачи'"
						class="d-flex align-center"
					>
						<Search
							v-if="tab != 'Цели'"
							:tab="tab"
							@emitSearchValue="setSearch($event)"
						/>
						<transition name="bounce">
							<div>
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
						</transition>
					</div>
				</div>

				<!-- <div
					class="d-flex align-center"
					v-if="tab != 'Заметки'"
				>
					<v-btn-toggle
						v-model="taskToggle"
						density="comfortable"
						rounded="2"
						:color="getTaskSectionColor"
						group
					>
						<v-btn value="all">
							Все
						</v-btn>

						<v-btn value="archive">
							Архив
						</v-btn>
					</v-btn-toggle>
				</div> -->



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
				class="main-sections"
			>

				<v-window-item
					class="main-sections"
					value="Задачи"
				>
					<v-row>
						<transition-group
							name="tasks-fade"
							appear
						>
							<Tasks
								v-for="item in filteredTasks({ taskToggle })"
								:key="item.id"
								:date="item.date"
								:tasks="item.tasks"
								:cardId="item.id"
								:allDone="item.allDone"
								:taskToggle="taskToggle"
							/>
						</transition-group>
					</v-row>
				</v-window-item>

				<v-window-item value="Заметки">
					<v-row class="pr-2 pb-2">
						<transition-group
							name="tasks-fade"
							appear
						>
							<Notes
								v-for="item in filteredNotes({ search, select }) "
								:key="item.id"
								:noteText="item.text"
								:notesType="item.notesType"
								:icon="item.icon"
								:noteId="item.id"
								:archive="item.archive"
								:editing="item.editing"
								mode="out-in"
							/>
						</transition-group>
					</v-row>
				</v-window-item>

				<!-- <v-window-item value="Задачи">
					<v-row>
						<transition-group
							name="tasks-fade"
							appear
						>
							<Tasks
								v-for="item in filteredTasks({ taskToggle })"
								:key="item.id"
								:date="item.date"
								:tasks="item.tasks"
								:cardId="item.id"
								:allDone="item.allDone"
								:taskToggle="taskToggle"
							/>
						</transition-group>
					</v-row>
				</v-window-item> -->

				<v-window-item value="Цели">
					<v-row>
						<!-- <div class="d-flex"> -->
						<transition-group
							name="tasks-fade"
							appear
						>
							<Goals
								v-for="item in filteredGoals({ taskToggle })"
								class="goals-main"
								:key="item.id"
								:tasks="item.tasks"
								:cardId="item.id"
								:allDone="item.allDone"
								:archive="item.archive"
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
import { ref, reactive, computed, watch } from 'vue'
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
		const tab = ref('Заметки')

		// Сбрасываю значение taskToggle(кнопка Все/Архив) до "Все" каждый раз при переключении tab
		watch(tab, () => taskToggle.value = 'all')

		const items = [
			'Задачи', 'Заметки', 'Цели',
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
				case 'Заметки': return 'Добавить заметку'
				case 'Задачи': return 'Добавить задачу'
				case 'Цели': return 'Добавить цель'
			}
		})


		// const update = ($event) => {

		// }

		// const allNotes = computed(() => store.getters['notes/allNotes'])
		const filteredNotes = computed(() => store.getters['notes/filteredNotes'])
		// const allTasks = computed(() => store.getters['tasks/allTasks'])
		const filteredTasks = computed(() => store.getters['tasks/filteredTasks'])
		// const allGoals = computed(() => store.getters['goals/allGoals'])
		// const cards = computed(() => store.getters['tasks/cards'])
		// const allGoals = computed(() => store.getters['goals/allGoals'])
		// const goalsCards = computed(() => store.getters['goals/filteredGoals'])
		const filteredGoals = computed(() => store.getters['goals/filteredGoals'])
		// console.log('filteredNotes', filteredNotes.value(''))

		const taskToggle = ref('all')
		const getTaskSectionColor = computed(() => {
			switch (taskToggle.value) {
				case 'all': return 'green-darken-2'
				case 'archive': return 'amber-darken-2'
			}
		})



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
			filteredGoals,
			setSearch,
			search,
			setSelect,
			select,
			// cards,
			setModalButtonText,
			taskToggle,
			getTaskSectionColor
		}
	}
}
</script>

<style>
/* // анимация для note */
.bounce-enter-active {
	animation: bounce-in 0.3s;
	/* animation-delay: 3s; */
}

.bounce-leave-active {
	animation: bounce-in 0.3s reverse;
	/* animation-delay: 3s; */
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

/* // анимация для goals */
.tasks-fade-move,
.tasks-fade-enter-active,
.tasks-fade-leave-active {
	transition: all 0.5s ease;
	/* animation-fill-mode: forwards; */
	/* transition: all 0.3s linear; */
}

.tasks-fade-enter-from,
.tasks-fade-leave-to {
	opacity: 0;
	/* transform: translate(-300px, 0); */
	transform: scale(0.01);
	/* transform: scaleY(10) translate(30px, 0); */
}

.tasks-fade-leave-active {
	position: absolute;
	/* top: 300px; */
	/* left: -300px; */
}

/* * {
	font-family: 'Montserrat', sans-serif;
} */


/*  */


.content {
	font-family: 'Work Sans', sans-serif;
	/* font-family: 'Montserrat'; */
	/* color:#fff; */
	background-color: #1d1d24;
	/* font-weight: 500; */
	/* font-size: 16px; */
	min-height: 100%;
	overflow: hidden;
}

.main-sections.v-window {
	/* overflow: visible; */
}
.app-card.v-card {
	/* overflow: visible; */
}
/* .notes-row {
	padding: 8px;
} */

.header-title {
	font-family: 'Courgette', cursive;
	font-size: 38px;
	padding-top: 12px;
	/* font-weight: 500; */
}


.task-toggle-buttons {
	/* width: 514px; */
}

/* .app-title {
	font-size: 40px;
} */
/* ниже рабоатет для выделенного таба */
/* .v-tab--selected {
		font-weight: 700;
	} */</style>
