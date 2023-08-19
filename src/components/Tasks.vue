<template>
	<v-col
		cols="12"
		md="4"
	>
		<v-card
			:class="`task text-shadow ${getShadowType}`"
			:color="getTaskColor"
			max-height="321px"
		>
			<v-card
				:color="getTaskColor"
				class="task__header"
				elevation="0"
			>
				<div class="pa-2 d-flex align-center justify-space-between">
					<div class="task__title">{{ date }}</div>
					<div class="task__icon icon">
						<div class="icon__circle">
							<img
								src="../icons/done-icons-48px/1-check.webp"
								alt=""
							/>
						</div>
						<transition name="bounce">
							<div
								v-show="allDone"
								class="icon__check"
							>
								<img
									src="../icons/done-icons-48px/2-check.webp"
									alt=""
								/>
							</div>
						</transition>
					</div>
				</div>
			</v-card>

			<v-card
				:class="`flex-grow-1 d-flex flex-column task__body`"
				max-height="248px"
				min-height="248px"
				:color="getTaskColor"
				elevation="0"
			>
				<transition name="task-bounce">
					<div
						v-if="tasks.length == 0"
						class="d-flex justify-center task__no-task"
					>Задач нет...
					</div>
				</transition>
				<transition-group name="flip-list">
					<div
						v-for="item in tasks"
						:key="item.id"
						class="d-flex flex-grow-1 task__item"
					>
						<v-textarea
							v-if="item.editing"
							v-model="editingField"
							@keydown.enter="finishEditingTask(cardId, item.id, taskToggle)"
							autofocus
							rows="1"
							auto-grow
							density="compact"
							class="ml-7 task__editing-text-field pr-2 flex-grow-1"
							variant="underlined"
							hide-details="true"
							color="blue-darken-1"
						></v-textarea>
						<v-checkbox
							v-else
							:model-value="item.done"
							@change="setCheckbox(cardId, item.id, taskToggle)"
							class="pr-2 flex-grow-1 task__checkbox checkbox"
							hide-details="true"
							density="compact"
							color="info"
							:label="item.text"
						></v-checkbox>
						<!-- TODO АНИМАЦИЯ ДЛЯ ГАЛОЧКИ, КАРАНДАША, КОРЗИНЫ -->
						<transition
							name="bounce"
							mode="out-in"
							:duration="50"
						>
							<div
								v-if="item.editing"
								class="align-self-start checkbox__edit"
							>
								<button
									@click="finishEditingTask(cardId, item.id, taskToggle)"
									class="checkbox__button"
								>
									<img
										src="../icons/ok-icons-48px/1.webp"
										alt=""
									/>
								</button>
							</div>
							<div
								v-else
								class="d-flex align-self-start"
							>
								<div class="checkbox__pencil">
									<button
										@click="editTask(cardId, item.id, item.text, taskToggle)"
										class="checkbox__button"
									>
										<img
											src="../icons/edit-icons-48px/16.webp"
											alt=""
										/>
									</button>
								</div>
								<div class="checkbox__delete">
									<button
										@click="deleteTask(cardId, item.id, taskToggle)"
										class="checkbox__button"
									>
										<img
											src="../icons/delete-icons-48px/22.webp"
											alt=""
										/>
									</button>
								</div>
							</div>
						</transition>
					</div>
				</transition-group>
				<div class="d-flex align-end mr-2 flex-grow-1 task__add-field">
					<v-text-field
						v-model="textField[cardNumber]"
						@keydown.enter="createTask(taskToggle)"
						class="mr-3"
						label="Текст"
						variant="underlined"
						:error-messages="errorMessages"
					></v-text-field>
					<v-btn
						class="task__add-btn"
						variant="flat"
						icon="$plus"
						color="light-blue-darken-3"
						size="small"
						@click="createTask(taskToggle)"
					>
					</v-btn>
				</div>
				<v-card-actions class="justify-space-between pl-1 task__actions">
					<v-btn
						v-if="!allDone"
						variant="flat"
						color="green-darken-2"
						size="small"
						@click="changeAllDone(cardId, taskToggle)"
					>
						всё сделано
					</v-btn>
					<v-btn
						v-else
						:disabled="tasks.length == 0"
						:variant="getButtonVariant"
						:color="getButtonColor"
						size="small"
						@click="changeAllDone(cardId, taskToggle)"
					>
						снять выделение
					</v-btn>
					<v-btn
						v-if="taskToggle === 'all'"
						:disabled="tasks.length == 0"
						variant="plain"
						color="amber-accent-4"
						size="small"
						@click="toArchive(cardId)"
					>в архив</v-btn>
					<v-btn
						v-else
						variant="plain"
						color="blue-grey-lighten-2"
						size="small"
						@click="deleteTaskCard(cardId)"
					>удалить</v-btn>
				</v-card-actions>
			</v-card>
		</v-card>
	</v-col>
</template>

<script>
import { ref, computed, onMounted, toRef, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
	props: {
		tasks: {
			type: Array,
			required: true
		},
		cardId: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
		allDone: {
			type: Boolean,
			required: true
		},
		taskToggle: {
			type: String,
			required: true
		},
		cardNumber: {
			type: Number,
			required: true
		},
	},
	setup(props) {
		const store = useStore()

		const cardId = toRef(props, 'cardId')
		const allDone = toRef(props, 'allDone')
		const tasks = toRef(props, 'tasks')
		const taskToggle = toRef(props, 'taskToggle')
		const cardNumber = toRef(props, 'cardNumber')
		const textField = reactive([
			'Поговорить с котом',
			'Найти ключ от вечной жизни',
			'Выпить пива, поностальгировать',
			'Задуматься о бесконечно вечном'
		])
		const errorMessages = ref('')
		const editingField = ref('')

			const createTask = () => {
			if (validateField() === false) return
			store.dispatch('tasks/createTask', {
				text: textField[cardNumber.value],
				cardId: cardId.value,
				taskToggle: taskToggle.value
			})
			textField[cardNumber.value] = ''
		}

		const validateField = () => {
			if (!textField[cardNumber.value]) {
				errorMessages.value = 'Поле обязательно'
				return false
			}
			if (textField[cardNumber.value].length < 5) {
				errorMessages.value = 'Минимальная длина 5 символов'
				return false
			}
			errorMessages.value = ''
		}

		const getTaskStyles = computed(() => {
			const color = allDone.value ? 'blue-grey-darken-4' : '#171E21'
			const shadowType = allDone.value ? 'text-shadow__grey' : 'text-shadow__dark'

			return {
				color,
				shadowType
			}
		})


		const getShadowType = computed(() => {
		})

		const getButtonVariant = computed(() => {
			if (tasks.value.length == 0) return 'text'
			else return 'flat'
		})
		const getButtonColor = computed(() => {
			if (tasks.value.length == 0) return 'grey-lighten-2'
			else return 'blue-grey-darken-3'
		})

		const getTaskColor = computed(() => {
			return allDone.value ? 'blue-grey-darken-4' : '#171E21'
		})

		const deleteTaskCard = (cardId) => {
			store.dispatch('tasks/deleteTaskCard', { cardId })
		}

		const deleteTask = (cardId, taskId, taskToggle) => {
			store.dispatch('tasks/deleteTask', { cardId, taskId, taskToggle })
		}

		const editTask = (cardId, taskId, text, taskToggle) => {
			editingField.value = text
			store.dispatch('tasks/editTask', { cardId, taskId, taskToggle })
		}


		const finishEditingTask = (cardId, taskId, taskToggle) => {
			store.dispatch('tasks/finishEditingTask', { cardId, taskId, text: editingField.value, taskToggle })
		}

		const setCheckbox = (cardId, taskId, taskToggle) => {
			store.dispatch('tasks/setCheckbox', { cardId, taskId, taskToggle })
		}

		const changeAllDone = (cardId, taskToggle) => {
			store.dispatch('tasks/changeCbxDone', { cardId, taskToggle })
		}

		const toArchive = (cardId) => {
			store.dispatch('tasks/changeArchive', { cardId })
		}


		onMounted(() => {
			const currentDate = new Date();
			const yesterday = new Date();
			const tomorrow = new Date();
			const afterTomorrow = new Date();

			yesterday.setDate(currentDate.getDate() - 1)
			tomorrow.setDate(currentDate.getDate() + 1)
			afterTomorrow.setDate(currentDate.getDate() + 2)

			const options = { month: 'short', day: 'numeric', year: 'numeric' };

			const getYesterday = yesterday.toLocaleDateString('ru-RU', options)
			const getToday = currentDate.toLocaleDateString('ru-RU', options);
			const getTomorrow = tomorrow.toLocaleDateString('ru-RU', options)
			const getAfterTomorrow = afterTomorrow.toLocaleDateString('ru-RU', options)

			switch (cardId.value) {
				case '100': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Вчера, ${getYesterday}` })
				case '101': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Сегодня, ${getToday}` })
				case '102': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Завтра, ${getTomorrow}` })
				case '103': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Послезавтра, ${getAfterTomorrow}` })
			}
		})


		return {
			finishEditingTask,
			editTask,
			toArchive,
			createTask,
			validateField,
			changeAllDone,
			deleteTask,
			setCheckbox,
			deleteTaskCard,
			errorMessages,
			textField,
			getTaskColor,
			getShadowType,
			getTaskStyles,
			editingField,
			getButtonVariant,
			getButtonColor
		}
	}
}
</script>

<style lang="scss">
@import 'animate.css';

.task {
	padding: 5px 10px 10px 10px;
	overflow: hidden;
	position: relative;

	// .task ::-webkit-scrollbar
	& ::-webkit-scrollbar {
		width: 2px;
		/* ширина для вертикального скролла */
		height: 2px;
		/* высота для горизонтального скролла */
		background-color: #383B42;
	}

	// .task__header 
	&__header {
		padding: 0 4px 0 4px;
		border-radius: 4px 4px 0 0;
	}

	// .task__title
	&__title {
		color: #fff;
		line-height: 120%;
		padding: 0;
		font-size: 20px;
		font-weight: 500;
		letter-spacing: 0.0125em;
	}

	// .task__icon icon
	.icon {
		position: relative;
		height: 48px;
		width: 48px;
		right: -9px;
		top: -2px;

		&__circle {
			position: absolute;
		}

		&__check {
			position: absolute;
		}
	}

	// .task__body
	&__body.v-card {
		overflow: auto;
		border-radius: 0 0 4px 4px;
		padding-top: 2px;
		overflow-x: hidden;
		// position: relative;
		position: static;

		.v-field__input {
			padding-top: 13px;
			padding-bottom: 0;
		}

		.v-field__outline::before {
			border-color: #1E88E5;
			opacity: 1;
		}
	}

	// .task__add-field
	&__add-field {
		max-width: 387.33px;
	}

	// .task__actions
	&__actions {
		max-width: 395.33px;
	}


	// .task__no-task 
	&__no-task {
		// делаю position: absolute; чтобы во время анимации появления/исчезновения блока контент не прыгал 
		position: absolute;
		bottom: 180px;
		right: -5px;
		width: 100%;
		font-size: 38px;
		color: #455A64;
	}

	// .task__editing-text-field
	.task__editing-text-field {
		// центрирую текст при входе в режим редактирвания
		position: relative;
		bottom: 4px;
	}

	// .task__item
	&__item {
		overflow: visible;

		&:hover .checkbox__delete,
		&:hover .checkbox__pencil {
			visibility: visible;
		}

		.v-label {
			align-items: start;
			position: relative;
			top: 3px;
		}

		.v-checkbox .v-selection-control {
			min-height: 28px;
		}

		.v-selection-control {
			align-items: start;
		}

		.checkbox {
			padding: 6px 0 6px 0;

			&__pencil {
				margin-right: 10px;
			}

			&__edit {
				margin-right: 35px;
			}

			&__delete {
				margin-right: 5px;
			}

			&__pencil,
			&__delete {
				visibility: hidden;
			}

			&__button img {
				max-height: 20px;
				max-width: 20px;
			}

			&__button:hover {
				transform: scale(1.15);
			}

			&__button {
				position: relative;
				top: 7px;
			}
		}
	}

	// .task__add-btn
	.task__add-btn {
		position: relative;
		bottom: 19px;
	}

	.v-textarea .v-field__input {
		mask-image: none;
		-webkit-mask-image: none;
	}

	.text-shadow::before {
		content: "";
		display: block;
		position: absolute;
		width: 390px;
		height: 5px;
		top: 67px;
		z-index: 999;
		filter: blur(2px);
	}

	.text-shadow__dark::before {
		animation: blurGrey 0.2s;
		animation-fill-mode: forwards;
	}

	.text-shadow__grey::before {
		animation: blurDark 0.2s;
		animation-fill-mode: forwards;
	}
}

@keyframes blurGrey {
	0% {
		z-index: 0;
		background: transparent;
	}

	99% {
		z-index: 0;
		background: transparent;
	}

	100% {
		z-index: 50;
		background: #171E21;
	}
}

@keyframes blurDark {
	0% {
		z-index: 0;
		background: transparent;
	}

	99% {
		z-index: 0;
		background: transparent;
	}

	100% {
		z-index: 50;
		background: #263238;
	}
}


@keyframes bounceOutRight {
	20% {
		opacity: 1;
		-webkit-transform: translate3d(-20px, 0, 0) scaleX(0.9);
		transform: translate3d(-20px, 0, 0) scaleX(0.9);
	}

	100% {
		opacity: 0;
		-webkit-transform: translate3d(400px, 0, 0) scaleX(1.1);
		transform: translate3d(400px, 0, 0) scaleX(1.1);
	}
}


/* // анимация для task */
.task-bounce-enter-active {
	// animation: bounce-in-task 0.4s;
	// animation: bounce-in-task 15s;
	animation: bounce-in-task 0.5s;
}

@keyframes bounce-in-task {
	0% {
		transform: scale(0);
		opacity: 0;
	}

	80% {
		transform: scale(1.1);

	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}

.flip-list-enter-active {
	transition: all 0.5s ease;
	animation: bounceOutRight 0.3s reverse;
}

.flip-list-leave-active {
	animation: bounceOutRight 0.3s;
}



// .task ::-webkit-scrollbar {
// 	width: 2px;
// 	/* ширина для вертикального скролла */
// 	height: 2px;
// 	/* высота для горизонтального скролла */
// 	background-color: #383B42;
// }


// .task__item {
// 	overflow: visible;

// 	.v-label {
// 		align-items: start;
// 		position: relative;
// 		top: 3px;
// 	}

// 	.v-checkbox .v-selection-control {
// 		min-height: 28px;
// 	}

// 	.checkbox-icons {
// 		position: relative;
// 	}

// 	.v-selection-control {
// 		align-items: start;
// 	}

// 	.checkbox {
// 		padding: 6px 0 6px 0;
// 	}

// 	.сheckbox__pencil {
// 		margin-right: 10px;
// 	}

// 	.checkbox__edit {
// 		margin-right: 35px;
// 	}

// 	.checkbox__delete {
// 		margin-right: 5px;
// 	}

// 	.checkbox__pencil,
// 	.checkbox__delete {
// 		visibility: hidden;
// 	}

// 	&:hover .checkbox__delete,
// 	&:hover .checkbox__pencil {
// 		visibility: visible;
// 	}

// 	.checkbox__delete {}

// 	.checkbox__button img {
// 		max-height: 20px;
// 		max-width: 20px;
// 	}

// 	.checkbox__button:hover {
// 		transform: scale(1.15);
// 	}

// 	.checkbox__button {
// 		position: relative;
// 		top: 6px;
// 	}
// }

// .task__add-btn {
// 	position: relative;
// 	bottom: 19px;
// }

// .task-text.v-card-text {
// 	padding: 0;
// 	font-size: 18px;
// }
</style>
