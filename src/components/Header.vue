<template>
	<v-card class="main d-flex flex-column">
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
					<div class="main__title">Calendar</div>
					<v-spacer></v-spacer>
					<v-tooltip
						:text="tooltipResetText"
						location="bottom"
						max-width="430"
					>
						<template v-slot:activator="{ props }">
							<v-btn
								v-bind="props"
								variant="flat"
								color="deep-purple-darken-2"
							>
								reset app
							</v-btn>
						</template>
					</v-tooltip>
					<template
						late
						v-slot:extension
					>
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
			class="ma-auto flex-grow-1"
			width="1300"
			color="#1d1d24"
			elevation="0"
		>
			<div class="d-flex justify-space-between">
				<!-- TODO:ЧТОБЫ 2 РАЗА НЕ ПИСАТЬ tab === 'Заметки' МОЖНО ОБЕРНУТЬ В TEMPLATE -->
				<div class="d-flex align-center">
					<div v-if="tab != 'Заметки'">
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
										<GoalsAddForm
											v-else="tab === 'Цели'"
											@closeModal="isActive.value = false"
										/>
									</template>
								</Modal>
							</div>
						</transition>
					</div>
					<div
						v-if="tab === 'Заметки'"
						class="main__tooltip animate__animated animate__jello"
					>
						<v-tooltip
							:text="tooltipNoteText"
							location="top"
						>
							<template v-slot:activator="{ props }">
								<img
									v-bind="props"
									src="/src/icons/question-mark-48px/16.webp"
									alt=""
								/>
							</template>
						</v-tooltip>
					</div>
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
			
			<v-window v-model="tab">
				<v-window-item value="Задачи">
					<v-row>
						<transition enter-active-class="bounce-enter-active">
							<v-col
								cols="12"
								md="12"
								class="main__tasks-empty d-flex justify-center"
								v-if="filteredTasks({ taskToggle }).length === 0"
							>В архиве задач нет...</v-col>
						</transition>
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
						<transition-group name="tasks-fade">
							<Notes
								v-for="item in filteredNotes({ search, select }) "
								:key="item.id"
								:noteText="item.text"
								:notesType="item.notesType"
								:icon="item.icon"
								:noteId="item.id"
								:archive="item.archive"
								:editing="item.editing"
							/>
						</transition-group>
					</v-row>
				</v-window-item>

				<v-window-item value="Цели">
					<v-row>
						<transition-group
							name="tasks-fade"
							appear
						>
							<Goals
								v-for="item in filteredGoals({ taskToggle })"
								:key="item.id"
								:tasks="item.tasks"
								:cardId="item.id"
								:allDone="item.allDone"
								:archive="item.archive"
								mode="out-in"
							/>
						</transition-group>
					</v-row>
				</v-window-item>
			</v-window>
		</v-card>
	</v-card>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Notes from './Notes.vue'
import Search from './Search.vue'
import Filter from './Filter.vue'
import Tasks from './Tasks.vue'
import Goals from './Goals.vue'
import Modal from './Modal.vue'
import NoteForm from './NoteForm.vue'
import GoalsAddForm from './GoalsAddForm.vue'

export default {
	components: {
		Notes,
		Search,
		Filter,
		Tasks,
		Goals,
		Modal,
		NoteForm,
		GoalsAddForm
	},
	setup() {
		const store = useStore()

		const test = store.getters['notes/test']
		const tab = ref('Задачи')
		const taskToggle = ref('all')

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

		const tooltipNoteText = 'Подсказка: для редактирования заметки нажмите на её иконку'
		const tooltipResetText = `Так как в приложении реализован LocalStorage любые изменения сохраняются. Эта клавиша сбросит приложение в начальное состояние`

		const search = ref('')
		const setSearch = (e) => {
			search.value = e.value
		}

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

		const filteredNotes = computed(() => store.getters['notes/filteredNotes'])
		const filteredTasks = computed(() => store.getters['tasks/filteredTasks'])
		const filteredGoals = computed(() => store.getters['goals/filteredGoals'])

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
			filteredNotes,
			filteredTasks,
			filteredGoals,
			setSearch,
			search,
			setSelect,
			select,
			setModalButtonText,
			taskToggle,
			getTaskSectionColor,
			tooltipResetText,
			tooltipNoteText
		}
	}
}
</script>

<style lang="scss">
.main {
	font-family: 'Work Sans', sans-serif;
	background-color: #1d1d24;
	min-height: 100%;
	overflow: hidden;

	// .main__title
	&__title {
		font-family: 'Courgette', cursive;
		font-size: 38px;
		padding-top: 12px;
	}

	// .main__tooltip
	&__tooltip {
		height: 42px;
		width: 42px;
		margin: 0 0 0 23px;
		animation-iteration-count: 10;
	}

	// .main__tasks-empty
	&__tasks-empty {
		font-size: 38px;
		color: #455A64;
	}
}

// .main__title {
// 	font-family: 'Courgette', cursive;
// 	font-size: 38px;
// 	padding-top: 12px;
// }

// .main__tooltip {
// 	height: 42px;
// 	width: 42px;
// 	margin: 0 0 0 23px;
// 	animation-iteration-count: 5;
// }

// .main__tasks-empty {
// 	font-size: 38px;
// 	color: #455A64;
// }


/* для выделенного таба */
.v-tab--selected {
	// font-weight: 700;
}

//  стили для линии подчеркивая выбранного раздела
.v-tab--selected .v-tab__slider {
	// background: #42A5F5;
	// background: #1E88E5;
	// background: #1976D2;
	// background: #7C4DFF;
	// background: #0277BD;
}

//------------------------------АНИМАЦИИ----------------------------------------

/* // анимация для note */
.bounce-enter-active {
	animation: bounce-in 0.3s;
}

.bounce-leave-active {
	animation: bounce-in 0.3s reverse;
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
}

.tasks-fade-enter-from,
.tasks-fade-leave-to {
	opacity: 0;
	transform: scale(0.01);
}

.tasks-fade-leave-active {
	position: absolute;
}
</style>
