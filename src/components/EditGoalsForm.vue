<template>
	<v-sheet
		width="420"
		class="mx-auto modal-icon-block"
	>
		<v-form ref="form">
			<transition-group name="flip-list">
				<v-text-field
					v-for="(item, i) in textFieldsValue"
					:key="i"
					v-model="textFieldsValue[i]"
					:label="i == 0 ? 'Главная цель' : 'Этап достижения'"
					@input.once="i === textFieldsValue.length - 1 ? addField() : null"
				></v-text-field>

			</transition-group>

			<!-- <p>mainGoal {{ mainGoal }}</p> -->
			<!-- <p>textFieldsValue {{ textFieldsValue }}</p> -->
			<!-- <p>arr[1] {{ arr[1] }}</p> -->

			<!-- <v-textarea
				label="Текст заметки"
				variant="solo-filled"
				v-model="text"
				:counter="300"
				required
			></v-textarea> -->

			<!-- <v-checkbox
				v-model="inFirstPlace"
				label="Поместить в начало"
				color="success"
				density="compact"
			></v-checkbox> -->


			<!-- <v-col
				cols="12"
				class="achievement-col"
			>
				<p class="pb-4">Выбирите тип заметки</p>
			</v-col> -->

			<div class="d-flex flex-column">
				<transition
					enter-active-class="animate__animated animate__flipInX"
					leave-active-class="animate__animated animate__flipOutX"
					:duration="500"
					mode="out-in"
				>
					<v-btn
						v-if="arrayIsEmpty"
						color="blue-darken-3"
						class="mt-4"
						block
						@click="editGoal()"
					>
						Удалить цель
					</v-btn>
					<v-btn
						v-else
						color="blue-darken-3"
						class="mt-4"
						block
						@click="editGoal()"
					>
						Сохранить
					</v-btn>
				</transition>

				<!-- arrayIsEmpty {{ arrayIsEmpty }} -->
				<v-btn
					:disabled="arrayIsEmpty"
					color="error"
					class="mt-4"
					block
					@click="reset"
				>
					Очистить
				</v-btn>
			</div>
			<!-- textFieldsValue {{ textFieldsValue }} -->
			<!-- cardId {{ cardId }} -->
			<!-- isActive {{ isActive }} -->
		</v-form>
	</v-sheet>
</template>

<script>
import { ref, nextTick, computed, reactive, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import IconPack from './IconPack.vue'

export default {
	components: {
		IconPack
	},
	props: {
		isActive: {
			type: Boolean,
		},
		tasks: {
			type: Array,
			required: true
		},
		cardId: {
			type: String,
			required: true
		},
	},
	setup(props, { emit }) {
		const store = useStore()

		// const changeGoalTasks = () => {
		// 	store.dispatch('goals/changeGoalTasks', { 'arr': textFieldsValue, cardId: cardId.value })
		// 	closeModal()
		// }

		const textFieldsValue = reactive([])
		const tasks = toRef(props, 'tasks')
		const cardId = toRef(props, 'cardId')
		tasks.value.forEach(item => textFieldsValue.push(item.text))
		textFieldsValue.push('')

		const arrayIsEmpty = ref(null)

		watch(textFieldsValue, () => {
			arrayIsEmpty.value = !textFieldsValue.some(item => item)
			// console.log('arrayIsEmpty.value', arrayIsEmpty.value)
		})

		const editGoal = () => {

			// console.log('вызвано')
			// console.log('form', form)
			// arrayIsEmpty = !textFieldsValue.some(item => item)
			// console.log('arrayIsEmpty', arrayIsEmpty)

			if (arrayIsEmpty.value) {
				// console.log('первый if')
				store.dispatch('goals/deleteGoal', cardId.value)
				// closeModal()
			}
			else {
				// closeModal()
				// console.log('второй if')
				store.dispatch('goals/editGoalTasks', { 'arr': textFieldsValue, 'cardId': cardId.value })
				closeModal()
			}

			// store.dispatch('goals/changeGoalTasks', { 'textFieldsValue': textFieldsValue, 'cardId': cardId.value })
			// closeModal()
		}

		const closeModal = () => {
			// console.log('вызывается closeModal')
			emit('closeModal')
		}

		// const valid = ref(true)
		const form = ref(null)
		const reset = () => {
			form.value.reset()
		}
		const addField = () => {
			// console.log('here')
			textFieldsValue.push('')
		}

		// function resetValidation() {
		//   formRef.value.resetValidation()
		// }

		return {
			// valid,
			form,
			// mainGoal,
			reset,
			textFieldsValue,
			editGoal,
			arrayIsEmpty,
			addField,
			// changeGoalTasks
			// addField

		}
	}
}
</script>

<style lang="scss">
.v-card.v-theme--dark.v-card--density-default.v-card--variant-elevated {
	// margin-right: -4px;
	// overflow-x:hidden;
	// scrollbar-gutter: stable;
}

.modal-icon-block {
	// scrollbar-gutter: stable;
	// padding-right: 4px;
	// margin-right: -4px;
	// overflow-x:hidden;
}

.modal-icon {
	position: absolute;
	width: 64px;
	height: 64px;
	top: 80px;
	right: 4px;


}

.v-col.achievement-col {
	padding: 0 0 15px 0;
}

#textarea {
	// &::before {
	// 	content: 'Hello';
	// 	background: url('../icons/modal/social-engagement.webp') 0 0 / 100% no-repeat;
	// 	;
	// 	width: 64px;
	// 	height: 64px;
	// 	position: relative;
	// top: 0;
	// left: 0;
	// z-index: 999;
	// }
}

// анимация
// .cbxFade-enter-active {
// 	animation: fadeIn 0.5s linear;
// }

// .cbxFade-leave-active {
// 	animation: fadeIn 0.5s linear reverse;
// }


// @keyframes fadeIn {
// 	from {
// 		// overflow: hidden;
// 		max-height: 0px;
// 	}

// 	to {
// 		// overflow: hidden;
// 		max-height: 70px;
// 	}
// }

/* // анимация для появления новых v-text-field */
// .goals-enter-active {
// 	animation: bounce-in 0.5s;
// 	/* animation-delay: 5s; */
// }

// .goals-leave-active {
// 	animation: bounce-in 0.5s reverse;
// 	/* animation-fill-mode: forwards; */
// 	/* animation-delay: 5s; */
// }
</style>