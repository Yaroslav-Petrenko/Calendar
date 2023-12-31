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
					<div class="animate__animated animate__jello d-flex align-center main__tooltip-reset">
						<v-tooltip
							:text="tooltipResetText"
							location="bottom"
							max-width="430"
						>
							<template v-slot:activator="{ props }">
								<img
									v-bind="props"
									class="main__tooltip-reset-btn"
									src="@/icons/question-mark-48px/question.webp"
									alt=""
								/>
							</template>
						</v-tooltip>
					</div>
					<v-btn
						variant="flat"
						color="deep-purple-darken-2"
						@click="resetApp()"
					>
						reset app
					</v-btn>
					<template
						late
						v-slot:extension
					>
						<v-tabs
							v-model="tab"
							align-tabs="start"
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
									src="@/icons/question-mark-48px/question.webp"
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
								v-for="item, i in filteredTasks({ taskToggle })"
								:key="item.id"
								:date="item.date"
								:tasks="item.tasks"
								:cardId="item.id"
								:allDone="item.allDone"
								:taskToggle="taskToggle"
								:cardNumber="i"
							/>
						</transition-group>
					</v-row>
				</v-window-item>
				<v-window-item value="Заметки">
					<v-row class="pr-2 pb-2">
						<transition
							enter-active-class="bounce-enter-active"
							mode="out-in"
						>
							<template v-if="search && filteredNotes({ search, select }).length === 0">
								<v-col
									cols="12"
									md="12"
									class="main__tasks-empty d-flex justify-center"
								>Поиск не дал результатов...</v-col>
							</template>
							<template v-else-if="filteredNotes({ search, select }).length === 0">
								<v-col
									cols="12"
									md="12"
									class="main__tasks-empty d-flex justify-center"
								>
									{{ getNotesStatus }}
								</v-col>
							</template>
						</transition>
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

		const tab = ref('Задачи')
		const taskToggle = ref('all')

		const getNotesStatus = computed(() => {
			switch (select.value) {
				case 'all': return 'Раздел пуст...'
				case 'text': return 'Заметок нет...'
				case 'ideas': return 'Идей нет...'
				case 'achievements': return 'Достижений нет...'
				case 'archive': return 'В архиве пусто...'
			}
		})

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

		const tooltipNoteText = 'Для редактирования заметки нажмите на её иконку.'
		const tooltipResetText = `Так как в приложении реализован LocalStorage любые изменения сохраняются. Эта клавиша сбросит приложение в начальное состояние.`

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

		// Перед перезагрузкой/закрытии страницы делаю нормализацию стейта
		window.addEventListener('beforeunload', () => {
			store.dispatch('tasks/normalizeTaskState')
		});

		const initialState = store.state
		// Сохраняю initialState в localStorage для работы функции resetApp
		localStorage.setItem('initialState', JSON.stringify(initialState));

		const resetApp = () => {
			const initialState = JSON.parse(localStorage.getItem('initialState'))
			store.replaceState(initialState)
		}

		// Проверяем, есть ли сохраненное состояние в localStorage
		const savedState = JSON.parse(localStorage.getItem('baseState'));
		if (savedState) {
			store.replaceState(savedState);
		}
		store.subscribe((mutation, state) => {
			// Сохранение состояния в localStorage
			localStorage.setItem('baseState', JSON.stringify(state));
		});

		return {
			items,
			text,
			tab,
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
			tooltipNoteText,
			getNotesStatus,
			resetApp
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

	// .main__tooltip-reset
	&__tooltip-reset {
		animation-iteration-count: 10;
	}

	// .main__tooltip-reset-btn
	&__tooltip-reset-btn {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	// ------- начало Поиск----------------------------------------------
	.v-field__outline__start,
	.v-field__outline__end {
		color: #737377;
		--v-field-border-width: 1px;
		--v-field-border-opacity: 0.75;
		transition: all 0.2s linear;
	}

	.v-field:hover .v-field__outline__start,
	.v-field:hover .v-field__outline__end {
		--v-field-border-opacity: 1;
	}
	.v-field.v-field--focused.v-field--variant-outlined .v-field__outline__end,
	.v-field.v-field--focused.v-field--variant-outlined .v-field__outline__start {
		color: #BDBDBD;
	}
	// ------- конец Поиск----------------------------------------------
}

//------------------------------АНИМАЦИИ----------------------------------------

/* // анимация для note */
.bounce-enter-active {
	animation: bounce-in 30s;
	animation: bounce-in 0.3s;
}

.bounce-leave-active {
	animation: bounce-in 30s reverse;
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
