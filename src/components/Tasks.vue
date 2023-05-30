<template>
	<transition>
		<v-col
			cols="12"
			md="4"
			class="d-flex align-start"
		>
			<v-card
				:class="`flex-grow-1 pa-2 d-flex flex-column note`"
				max-height="296px"
				:color="getTaskColor"
			>

				<!-- <div v-show="allDone" class="task-icon">
					<img
						src="../icons/done-icons-64px/check.webp"
						alt=""
					/>
				</div> -->

				<v-card-title class="task-title d-flex justify-space-between">
					{{ date }}



					<div class="task-icon">
						<div class="task-icon-circle">
							<img
								src="../icons/done-icons-64px/1-check.webp"
								alt=""
							/>
						</div>
						<transition name="bounce">
							<div v-show="allDone" class="task-icon-check">
								<img
									src="../icons/done-icons-64px/2-check.webp"
									alt=""
								/>
							</div>
						</transition>
					</div>



				</v-card-title>

				<div
					v-for="item in tasks"
					:key="item.id"
					class="task-item d-flex align-center"
				>
					<v-checkbox
						:model-value="item.done"
						@change="setCheckbox(cardId, item.id)"
						class="task-checkbox pr-1 flex-grow-0"
						hide-details="true"
						density="compact"
						color="info"
						:label="item.text"
					></v-checkbox>
					<!-- item.done {{ item.done }} -->
					<!-- <v-card-text class="task-text flex-grow-1">
						{{ item.text }}
					</v-card-text> -->
					<!-- <v-label class="task-text flex-grow-1">
						{{ item.text }}
					</v-label> -->
				</div>
				<!-- selected {{ selected }} -->

				<div class="d-flex align-center">
					<v-text-field
						v-model="textField"
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
				<!-- getTaskColor {{ getTaskColor }} -->
				<!-- id {{ id }} -->
				<!-- date {{ date }} -->
			</v-card>
		</v-col>
	</transition>
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
			// console.log('getTaskColor', allDone.value)
			// if (allDone.value) return '#424242'
			if (allDone.value) return 'blue-grey-darken-4'
			// else return '#212121'
			// else return '#182024'
			else return '#171E21'
		})


		const createTask = () => {
			if (validateField() === false) return
			// console.log('cardId', cardId.value)
			store.dispatch('tasks/createTask', {
				text: textField.value,
				cardId: cardId.value
			})
			textField.value = ''

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


		return {
			textField,
			createTask,
			// selected,
			setCheckbox,
			// rules
			validateField,
			errorMessages,
			changeAllDone,
			getTaskColor
		}

	}


}
</script>

<style lang="scss">
.note.v-card {
	overflow: auto;
	// ::after {
	// 	content: '';
	// 	background: url('');
	// 	position: absolute;
	// 	width: 64px;
	// 	height: 64px;
	// }
}
// галочка выполнения
.task-icon {
	position: absolute;
	right: 57px;
	top: 7px;
	.task-icon-circle {
		position: fixed;
	}
	.task-icon-check {
		position: fixed;
	}
}





.task-item {
	// margin: 5px 0 5px 0;
	margin: 0 0 0 0;
}

.task-title.v-card-title {
	line-height: 120%;
	padding: 0;
	margin-bottom: 10px;
}

.task-text.v-card-text {
	padding: 0;
	font-size: 18px;
}
</style>
