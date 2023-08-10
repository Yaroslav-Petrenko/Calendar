<template>
	<v-sheet
		width="420"
		class="mx-auto"
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
		</v-form>
	</v-sheet>
</template>

<script>
import { ref, reactive, toRef, watch } from 'vue'
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

		const textFieldsValue = reactive([])
		const tasks = toRef(props, 'tasks')
		const cardId = toRef(props, 'cardId')

		tasks.value.forEach(item => textFieldsValue.push(item.text))
		textFieldsValue.push('')

		const arrayIsEmpty = ref(null)

		watch(textFieldsValue, () => {
			arrayIsEmpty.value = !textFieldsValue.some(item => item)
		})

		const editGoal = () => {
			if (arrayIsEmpty.value) {
				store.dispatch('goals/deleteGoal', cardId.value)
			}
			else {
				store.dispatch('goals/editGoalTasks', { 'arr': textFieldsValue, 'cardId': cardId.value })
				closeModal()
			}
		}

		const closeModal = () => {
			emit('closeModal')
		}
		const form = ref(null)
		const reset = () => {
			form.value.reset()
		}
		const addField = () => {
			textFieldsValue.push('')
		}

		return {
			form,
			reset,
			textFieldsValue,
			editGoal,
			arrayIsEmpty,
			addField,
		}
	}
}
</script>

<style lang="scss"></style>