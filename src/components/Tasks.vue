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
				<div class=" pa-2 d-flex align-center justify-space-between">
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
				<!-- <div v-show="allDone" class="task-icon">
						<img
							src="../icons/done-icons-64px/check.webp"
							alt=""
						/>
					</div> -->
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

				<transition-group leave-active-class="animate__animated animate__bounceOutRight animate__faster">
					<div
						v-for="item in tasks"
						:key="item.id"
						class="task-item d-flex align-center "
					>
						<v-text-field
							v-if="item.editing"
							v-model="editingField"
							@keydown.enter="finishEditingTask(cardId, item.id, item.text)"
							:autofocus=true
							density="compact"
							class="mr-0 ml-7 mb-1"
							variant="underlined"
							hide-details="true"
						></v-text-field>
						<v-checkbox
							v-else
							:model-value="item.done"
							@change="setCheckbox(cardId, item.id)"
							class="task-checkbox pr-1 flex-grow-1"
							hide-details="true"
							density="compact"
							color="info"
							:label="item.text"
						></v-checkbox>
						<div
							v-if="item.editing"
							class="task-checkbox-pencil"
						>
							<button
								@click="finishEditingTask(cardId, item.id, item.text)"
								class="task-checkbox-button"
							>
								<img
									src="../icons/ok-icons-48px/1.webp"
									alt=""
								/>
							</button>
						</div>
						<div
							v-else
							class="d-flex align-center"
						>
							<div class="task-checkbox-pencil">
								<button
									@click="editTask(cardId, item.id, item.text)"
									class="task-checkbox-button"
								>
									<img
										src="../icons/edit-icons-48px/16.webp"
										alt=""
									/>
								</button>
							</div>
							<div class="task-checkbox-delete">
								<button
									@click="deleteTask(cardId, item.id)"
									class="task-checkbox-button"
								>
									<img
										src="../icons/delete-icons-48px/22.webp"
										alt=""
									/>
								</button>
							</div>
						</div>
						<!-- item.done {{ item.done }} -->
						<!-- <v-card-text class="task-text flex-grow-1">
								{{ item.text }}
							</v-card-text> -->
						<!-- <v-label class="task-text flex-grow-1">
								{{ item.text }}
							</v-label> -->
					</div>
				</transition-group>
				<!-- selected {{ selected }} -->
				<div class="d-flex align-center mr-2">
					<v-text-field
						v-model="textField"
						@keydown.enter="createTask()"
						class="mr-3"
						label="Текст"
						variant="underlined"
						:error-messages="errorMessages"
					></v-text-field>
					<v-btn
						variant="flat"
						icon="$plus"
						color="light-blue-darken-3"
						size="small"
						@click="createTask()"
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
						@click="changeAllDone(cardId)"
					>
						всё сделано
					</v-btn>
					<v-btn
						v-else
						variant="flat"
						color="blue-grey-darken-3"
						size="small"
						@click="changeAllDone(cardId)"
					>
						снять выделение
					</v-btn>
					<v-btn
						variant="plain"
						color="amber-accent-4"
						size="small"
						@click="dispArchive(id)"
					>
						в архив
					</v-btn>
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
		// cards: {
		// 	type: Object,
		// 	required: true
		// },
	},
	setup(props) {

		const store = useStore()
		const cardId = toRef(props, 'cardId')
		const allDone = toRef(props, 'allDone')
		const textField = ref('Выгулять девушку')
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
				cardId: cardId.value
			})
			textField.value = ''
		}

		const deleteTask = (cardId, taskId) => {
			// console.log('deleteTask')
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			store.dispatch('tasks/deleteTask', { cardId, taskId })
		}

		const editTask = (cardId, taskId, text) => {

			// console.log('deleteTask')
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			// console.log('text', text)
			editingField.value = text

			store.dispatch('tasks/editTask', { cardId, taskId, text })
		}


		const finishEditingTask = (cardId, taskId) => {
			// if (validateField() === false) return
			store.dispatch('tasks/finishEditingTask', { cardId, taskId, text: editingField.value })
		}





		// const selected = ref([])
		const setCheckbox = (cardId, taskId) => {
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			store.dispatch('tasks/setCheckbox', { cardId, taskId })
		}

		const changeAllDone = (cardId) => {
			// console.log('cardId', cardId)
			store.dispatch('tasks/changeCbxDone', cardId)
		}


		onMounted(() => {
			// const months = [
			// 	"Января", "Февраля", "Марта", "Апреля",
			// 	"Мая", "Июня", "Июля", "Августа",
			// 	"Сентября", "Октября", "Ноября", "Декабря"
			// ];

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
				case '100': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: getYesterday })
				case '101': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: getToday })
				case '102': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: getTomorrow })
				case '103': return store.dispatch('tasks/changeDate', { cardId: cardId.value, date: getAfterTomorrow })
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
			finishEditingTask
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

.task-body.v-card {
	overflow: auto;
	// padding: 0 8px 8px 8px;
	border-radius: 0 0 4px 4px;
	overflow-x: hidden;

	// ::after {
	// 	content: '';
	// 	background: url('');
	// 	position: absolute;
	// 	width: 64px;
	// 	height: 64px;
	// }
	.v-field__input {
		padding: 0;
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








.task-item {
	// margin: 5px 0 5px 0;
	margin: 0 0 0 0;

	.task-checkbox-pencil {
		// height:24px;
		// width:24px;
		margin-right: 10px;
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
		// overflow: hidden;
	}

	.task-checkbox-button:hover {
		transform: scale(1.15);
		//  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.3);
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



.task-text.v-card-text {
	padding: 0;
	font-size: 18px;
}
</style>
