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
				class="task-header"
				elevation="0"
			>
				<div class="pa-2 d-flex align-center justify-space-between">
					<div class="task-title">{{ date }}</div>
					<div class="task-icon">
						<div class="task-icon-circle">
							<img
								src="../icons/done-icons-48px/1-check.webp"
								alt=""
							/>
						</div>
						<transition name="bounce">
							<div
								v-show="allDone"
								class="task-icon-check"
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
				:class="`flex-grow-1 d-flex flex-column task-body`"
				max-height="248px"
				min-height="248px"
				:color="getTaskColor"
				elevation="0"
			>
				<!-- taskToggle {{ taskToggle }} -->
				<!-- <v-card-title class="task-title d-flex justify-space-between">
					{{ date }}
					<div class="task-icon">
						<div class="task-icon-circle">
							<img
								src="../icons/done-icons-48px/1-check.webp"
								alt=""
							/>
						</div>
						<transition name="bounce">
							<div
								v-show="allDone"
								class="task-icon-check"
							>
								<img
									src="../icons/done-icons-48px/2-check.webp"
									alt=""
								/>
							</div>
						</transition>
					</div>
				</v-card-title> -->
				<transition name="task-bounce">
					<div
						v-if="tasks.length == 0"
						class="task-no-task d-flex justify-center "
						key="no-task"
					>Задач нет...
					</div>
				</transition>
				<transition-group name="flip-list">

					<!-- <div
						v-if="tasks.length == 0"
						class="task-no-task d-flex justify-center "
						key="no-task"
					>Задач нет...
					</div> -->


					<div
						v-for="item in tasks"
						:key="item.id"
						class="task-item d-flex flex-grow-1"
					>
						<v-textarea
								v-if="item.editing"
								v-model="editingField"
								@keydown.enter="finishEditingTask(cardId, item.id, taskToggle)"
								autofocus
								rows="1"
								auto-grow
								density="compact"
								class="ml-7 editing-text-field "
								variant="underlined"
								hide-details="true"
							></v-textarea>


						<v-checkbox
							v-else
							:model-value="item.done"
							@change="setCheckbox(cardId, item.id, taskToggle)"
							class="task-checkbox pr-1 flex-grow-1"
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
								class="task-checkbox-edit align-self-start"
							>
								<button
									@click="finishEditingTask(cardId, item.id, taskToggle)"
									class="task-checkbox-button "
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
								<div class="task-checkbox-pencil">
									<button
										@click="editTask(cardId, item.id, item.text, taskToggle)"
										class="task-checkbox-button "
									>
										<img
											src="../icons/edit-icons-48px/16.webp"
											alt=""
										/>
									</button>
								</div>
								<div class="task-checkbox-delete">
									<button
										@click="deleteTask(cardId, item.id, taskToggle)"
										class="task-checkbox-button"
									>
										<img
											src="../icons/delete-icons-48px/22.webp"
											alt=""
										/>
									</button>
								</div>
							</div>
						</transition>
						<!-- item.done {{ item.done }} -->
						<!-- <v-card-text class="task-text flex-grow-1">
								{{ item.text }}
							</v-card-text> -->
						<!-- <v-label class="task-text flex-grow-1">
								{{ item.text }}
							</v-label> -->
					</div>
					<!-- конец отрисовки тасков -->


				</transition-group>
				<!-- selected {{ selected }} -->
				<div class="d-flex align-end mr-2 flex-grow-1">
					<v-text-field
						v-model="textField"
						@keydown.enter="createTask(taskToggle)"
						class="mr-3"
						label="Текст"
						variant="underlined"
						:error-messages="errorMessages"
					></v-text-field>
					<v-btn
						class="task-add-btn"
						variant="flat"
						icon="$plus"
						color="light-blue-darken-3"
						size="small"
						@click="createTask(taskToggle)"
					>
					</v-btn>
				</div>
				<!-- textField {{ textField }} -->
				<!-- <v-card-item class="notes-item flex-grow-1 align-content-space-between">
						<div class="">
							<div class="note-body d-flex">
								<div class="card-title-text align-self-stretch">
									Date {{ date }}
								</div>
								<div class="flex-1-1 note-text">{{ text }}</div>
								<div class="icon">
									<img
										:src="`/src/icons/viking-icons-48px/${icon}.webp`"
										alt=""
									/>
								</div>
							</div>
						</div>
					</v-card-item> -->
				<v-card-actions class="justify-space-between pl-1">
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
					<!-- taskToggle is {{ taskToggle }} -->
				</v-card-actions>
				<!-- editingField.value {{ editingField }} -->
				<!-- id {{ id }} -->
				<!-- tasks {{ tasks }} -->
			</v-card>
		</v-card>
	</v-col>
</template>

<script>
import { ref, reactive, computed, onMounted, toRef, watch } from 'vue'
import { useStore } from 'vuex'
// import { props } from 'vue'
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
		// archive: {
		// 	type: Boolean,
		// 	required: true
		// },
		// cards: {
		// 	type: Object,
		// 	required: true
		// },
	},
	// directives: {
	// 	pin: {
	// 		mounted(el) {
	// 			console.log("mounted el", el)
	// 			// el.style.position = 'absolute'
	// 			el.style.color = 'red'
	// 		},
	// 	}
	// },
	setup(props) {
		//  var a = function (e, t, i, n) {
		// 	var s = this;
		// 	return this.btn = e,
		// 		this.video_id = t,
		// 		this.csrf = i,
		// 		this.options = n || {},
		// 		this.btn.on("click", function (e) {
		// 			e.preventDefault(),
		// 				s.click_func()
		// 		}).addClass("init-ok"),
		// 		this
		// };
		const store = useStore()
		const cardId = toRef(props, 'cardId')
		const allDone = toRef(props, 'allDone')
		const tasks = toRef(props, 'tasks')
		const taskToggle = toRef(props, 'taskToggle')
		const textField = ref('At imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna')
		const errorMessages = ref('')
		const editingField = ref('')

		// const rules = {
		// 	required: value => !!value || 'Поле обязательно',
		// 	minLenght: value => value.length > 3 || 'Минимальная длина 5 символов'
		// }
		const validateField = () => {
			// console.log('textField.value.lenght', textField.value.length)
			if (!textField.value) {
				errorMessages.value = 'Поле обязательно'
				return false
			}
			if (textField.value.length < 5) {
				// console.log('второй if')
				errorMessages.value = 'Минимальная длина 5 символов'
				return false
			}
			// ниже возможно стоит присвоить null вместо пустой строки
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
			// не смог пофиксить планость анимации, поэтому убираю размытие
			// return allDone.value ? 'text-shadow__grey' : 'text-shadow__dark'


			// if (allDone.value) return 'text-shadow__dark'
			// else return 'text-shadow__grey'
		})

		const getButtonVariant = computed(() => {
			if (tasks.value.length == 0) return 'text'
			else return 'flat'
		})
		const getButtonColor = computed(() => {
			if (tasks.value.length == 0) return 'grey-lighten-2'
			else return 'blue-grey-darken-3'
		})

		// watch(textField, (newValue, oldValue) => {
		// 	// console.log("watch newValue", newValue)
		// 	// console.log("watch oldValue", oldValue)
		// 		if (!newValue) {
		// 		errorMessages.value = 'Поле обязательно'
		// 		return false
		// 	}
		// 	if (newValue.length < 5) {
		// 		// console.log('второй if')
		// 		errorMessages.value = 'Минимальная длина 5 символов'
		// 		return false
		// 	}
		// 	errorMessages.value = ''
		// })

		const getTaskColor = computed(() => {
			return allDone.value ? 'blue-grey-darken-4' : '#171E21'
			// console.log('getTaskColor', allDone.value)
			// if (allDone.value) return '#424242'
			// if (allDone.value) return 'blue-grey-darken-4'
			// // else return '#212121'
			// // else return '#182024'
			// else return '#171E21'
		})

		// watch(allDone, () => {
		// 	console.log('change')
		// })


		// const getTaskColor = computed(() => {
		// 	if (allDone.value) {
		// 		return 'blue-grey-darken-4'
		// 	} else {
		// 		return '#171E21'
		// 	}
		// })

		// const getShadowType = computed(() => {
		// 	if (allDone.value) {
		// 		return 'text-shadow__grey'
		// 	} else {
		// 		return 'text-shadow__dark'
		// 	}
		// })


		const createTask = () => {
			if (validateField() === false) return
			// console.log('cardId', cardId.value)
			store.dispatch('tasks/createTask', {
				text: textField.value,
				cardId: cardId.value,
				taskToggle: taskToggle.value
			})
			textField.value = ''
		}

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

		// const selected = ref([])
		const setCheckbox = (cardId, taskId, taskToggle) => {
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			store.dispatch('tasks/setCheckbox', { cardId, taskId, taskToggle })
		}

		const changeAllDone = (cardId, taskToggle) => {
			// console.log('cardId', cardId)
			store.dispatch('tasks/changeCbxDone', { cardId, taskToggle })
		}

		const toArchive = (cardId) => {
			// console.log('tasks', tasks.value)
			// console.log('toArchive', cardId)
			store.dispatch('tasks/changeArchive', { cardId })
			// console.log('toArchive tasks.lenght', tasks.value.length)
		}


		onMounted(() => {
			// console.log('tasks.lenght', tasks.value.length)
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


			// console.log('cardId.value', cardId.value);
			// console.log('Сегодня', getToday);
			// console.log('Завтра', getTomorrow);
			// console.log('Послезавтра', getAfterTomorrow);
			switch (cardId.value) {
				case '100': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Вчера, ${getYesterday}` })
				case '101': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Сегодня, ${getToday}` })
				case '102': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Завтра, ${getTomorrow}` })
				case '103': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: `Послезавтра, ${getAfterTomorrow}` })
			}


			if (cardId === '100') { }
		})


		return {
			textField,
			createTask,
			// selected,
			setCheckbox,
			// rules
			validateField,
			errorMessages,
			changeAllDone,
			getTaskColor,
			deleteTask,
			getShadowType,
			getTaskStyles,
			editingField,
			editTask,
			finishEditingTask,
			toArchive,
			deleteTaskCard,
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
	// &::before {
	// 	content: '';
	// 	display: block;
	// 	position: absolute;
	// 	width: 390px;
	// 	height: 10px;
	// 	background: linear-gradient(to bottom, #171E21 0%, rgb(23, 30, 33, 0) 100%);
	// 	top: 69px;
	// 	z-index: 50;
	// }
}

// .text-shadow::before {
// 	content: '';
// 	display: block;
// 	position: absolute;
// 	width: 390px;
// 	height: 10px;
// 	// background: linear-gradient(to bottom, #171E21 0%, rgb(23, 30, 33, 0) 100%);
// 	top: 69px;
// 	z-index: 50;
// 	// transition: all 5s linear;
// 	// background: #263238;
// }

.text-shadow::before {
	content: "";
	display: block;
	position: absolute;
	width: 390px;
	height: 5px;
	top: 67px;
	z-index: 999;
	// background: #263238;
	filter: blur(2px);
	// transition: all 0s linear;
	// transition-delay: 1s;
}


.text-shadow__dark::before {
	// background: linear-gradient(to bottom, #171E21 0%, rgb(23, 30, 33, 0) 100%);
	// transition: all 0s linear;
	// transition-delay: 1s;
	// background: linear-gradient(to bottom, #171E21 0%, transparent 100%);
	// background: #171E21;
	animation: blurGrey 0.2s;
	animation-fill-mode: forwards;
}

.text-shadow__grey::before {
	// background: linear-gradient(to bottom, transparent 0%, rgb(38,50,56, 0) 100%);
	// background: linear-gradient(to bottom, #263238 0%, transparent 100%);
	// background: #263238;
	// animation: blurGrey 0.5s reverse;
	animation: blurDark 0.2s;
	animation-fill-mode: forwards;
}

@keyframes blurGrey {
	0% {
		z-index: 0;
		background: transparent;
	}

	// 50% {
	// 	z-index: 0;
	// }
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

	// 50% {
	// 	z-index: 0;
	// }
	99% {
		z-index: 0;
		background: transparent;
	}

	100% {
		z-index: 50;
		background: #263238;
	}
}

.task-no-task {
	// делаю position: absolute; чтобы во время анимации появления/исчезновения блока контент не прыгал 
	position: absolute;
	width: 100%;
	// display: flex;
	// justify-content: center;
	// align-items: center;
	font-size: 38px;
	color: #455A64;
	// color: #546E7A;
	// color: #37474F;
	// color: #263238;
}

.v-btn--disabled {
	// color: #37474F !important;
	// background-color: #37474F !important;
	// opacity: 1 !important;
	//  --v-theme-overlay-multiplier: 1 !important;
}

// .v-btn.v-btn--disabled.v-theme--dark.bg-blue-grey-darken-3.v-btn--density-default.v-btn--size-small.v-btn--variant-flat {
// 	color: #37474F ;
// 	background-color: #37474F !important;
// }


.task-body.v-card {
	overflow: auto;
	// padding: 0 8px 8px 8px;
	border-radius: 0 0 4px 4px;
	padding-top: 2px;
	overflow-x: hidden;
	// padding-bottom: 0px;

	// ::after {
	// 	content: '';
	// 	background: url('');
	// 	position: absolute;
	// 	width: 64px;
	// 	height: 64px;
	// }
	.v-field__input {
		// height: 40px;
		// padding: 0;
		padding-top: 13px;
		padding-bottom: 0;
		// margin-bottom: 2px;
		// display: flex;
		// align-items: flex-end;
	}

.v-field.v-field--active.v-field--dirty.v-field--no-label.v-field--variant-underlined.v-theme--dark.v-field--focusedgg {
	// border-style: solid;
	border-width: 0 0 1px;
	opacity: 1;
	color: #1E88E5;
	transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
	// content: "";
	// position: absolute;
	// top: 0;
	// left: 0;
	// width: 100%;
	// height: 100%;
	// overflow: hidden;
}

	.editing-text-field {
		// margin-bottom: 2px;
		// своства ниже чтобы при входе в режим редактирвоания текст не прыгал
		position: relative;
		bottom: 4px;
	}
}

// галочка выполнения
.task-header {
	// position: relative;
	// min-height: 50px;
	padding: 0 4px 0 4px;
	border-radius: 4px 4px 0 0;
	// overflow: visible;

	// &::after {
	// 	content: "";
	// 	position: absolute;
	// 	bottom: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	height: 10px;
	// 	// background: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.5));
	// 	box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
	// 	z-index: 9999;
	// }




	.task-title {
		color: #fff;
		line-height: 120%;
		padding: 0;
		// margin-bottom: 10px;
		font-size: 20px;
		font-weight: 500;
		letter-spacing: 0.0125em;
	}

	.task-icon {
		position: relative;
		height: 48px;
		width: 48px;

		right: -9px;
		top: -2px;
		// z-index: 999;

		.task-icon-circle {
			position: absolute;
		}

		.task-icon-check {
			position: absolute;
		}
	}
}


.flip-list-move {
	// transition: transform 0.8s ease;
	// position: absolute;
}

// .flip-list-enter-active {
// 	animation: bounceOutRight 0.3s ease reverse;
// }

// .flip-list-leave-active {

// }


.animate__bounceOutRight {
	// animation: anima 0.8s ease;
	// animation: bounceOutRight 0.3s ease;
	// position: absolute;
}

// .flip-list-enter-from,
// .flip-list-leave-to {
// 	opacity: 0;
// 	transform: translateX(30px);
// }






// взято с сайта чисто для тренировки
// .list-complete-item {
// 	transition: all 0.8s ease;
// 	// display: inline-block;
// 	margin-right: 10px;
// }

// .flip-list-enter-from,
// .flip-list-leave-to {
// 	opacity: 0;
// 	transform: translateX(30px);
// }

// .flip-list-leave-active {
// 	position: absolute;
// }


.flip-list-enter-active {
	animation: bounceOutRight 0.3s reverse;
	// animation-fill-mode: forwards;
}

.flip-list-leave-active {
	animation: bounceOutRight 0.3s;
	animation-fill-mode: forwards;
	// animation-delay: 2s;
}

// 
// .flip-list-move {
//   transition: transform 0.3s ease;
// }

@keyframes bounceOutRight {
	20% {
		opacity: 1;
		-webkit-transform: translate3d(-20px, 0, 0) scaleX(0.9);
		transform: translate3d(-20px, 0, 0) scaleX(0.9);
	}

	100% {
		opacity: 0;
		// position: absolute;
		-webkit-transform: translate3d(400px, 0, 0) scaleX(1.1);
		transform: translate3d(400px, 0, 0) scaleX(1.1);
	}
}


/* // анимация для task */
.task-bounce-enter-active {
	animation: bounce-in-task 0.4s;
	// animation-delay: 0.3s;
}

// .task-bounce-leave-active {
// 	animation: bounce-in-task 0.3s reverse;
// 	// animation-delay: 3s;
// 	/* animation-fill-mode: forwards; */
// 	/* animation-delay: 5s; */
// }

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


.v-textarea .v-field__input {
	// font-family: 'Montserrat', sans-serif;
	// letter-spacing: 0px;
	// font-weight: 500;
	mask-image: none;
	-webkit-mask-image: none;
	// min-height: 59px;
}


.task-item {
	// margin: 5px 0 5px 0;
	// margin: 0 0 0 0;
	// свойство ниже делает задержку при bounceOutRight во время leave
	// transition: all 0.8s ease;
	// display: inline-block;
	// position: relative;
	overflow: visible;

	.v-label {
		align-items: start;
		position: relative;
		top: 3px;
	}
	// .v-label.v-label--clickable {

	// }

	.v-checkbox .v-selection-control {
		min-height: 28px;
	}

	.task-checkbox-icons {
		position: relative;
	}

	.v-selection-control {
		align-items: start;
	}
	.task-checkbox {
		padding: 6px 0 6px 0;
		// max-height: 70px;
	}

	.task-checkbox-pencil {
		// height:24px;
		// width:24px;
		margin-right: 10px;
	}

	.task-checkbox-edit {
		// height:24px;
		// width:24px;
		margin-right: 34px;
	}

	.task-checkbox-delete {
		margin-right: 5px;
	}

	.task-checkbox-pencil,
	.task-checkbox-delete {
		visibility: hidden;
	}

	// .task-checkbox-delete:hover {
	// 	visibility: visible;
	// }
	&:hover .task-checkbox-delete,
	&:hover .task-checkbox-pencil {
		visibility: visible;
	}


	.task-checkbox-delete {
		// height:24px;
		// width:24px;

	}

	.task-checkbox-button img {
		max-height: 20px;
		max-width: 20px;
		// position: relative;
		// top: 0;
		// z-index: 999;
	}

	.task-checkbox-button:hover {
		transform: scale(1.15);
		//  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.3);
	}

	.task-checkbox-button {
		position: relative;
		top: 6px;
	}


	&:hover {
		// color: red;
		// &::after {
		// 	content: '';
		// 	background: url('../icons/edit-icons-24px/1.webp');
		// 	position: relative;
		// 	height: 24px;
		// 	width: 24px;
		// 	right: -92px;
		// }
	}
}

.task-add-btn {
	position: relative;
	bottom: 19px;
}

.task-text.v-card-text {
	padding: 0;
	font-size: 18px;
}
</style>
