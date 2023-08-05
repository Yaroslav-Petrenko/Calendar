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
					required
					@input.once="i === textFieldsValue.length - 1 ? addField() : null"
				></v-text-field>
			</transition-group>
			<div class="d-flex flex-column">
				<v-btn
					color="success"
					class="mt-4"
					block
					@click="createGoal()"
				>
					Добавить
				</v-btn>
				<v-btn
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
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import IconPack from './IconPack.vue'

export default {
	components: {
		IconPack
	},
	props: {
		isActive: {
			type: Boolean,
		}
	},
	setup(_, { emit }) {
		const store = useStore()

		const createGoal = () => {
			store.dispatch('goals/createGoal', textFieldsValue)
			closeModal()
		}
		const textFieldsValue = reactive(
			[
				'Бегать 30 дней подряд',
				'Бегать 20 дней подряд',
				'Бегать 10 дней подряд',
				'',
			])
		const addField = () => {
			textFieldsValue.push('')
		}
		const closeModal = () => {
			emit('closeModal')
		}

		const valid = ref(true)
		const form = ref(null)
		const reset = () => {
			form.value.reset()
		}

		return {
			valid,
			form,
			reset,
			createGoal,
			textFieldsValue,
			addField
		}
	}
}
</script>

<style lang="scss">
// .modal-icon {
// 	position: absolute;
// 	width: 64px;
// 	height: 64px;
// 	top: 80px;
// 	right: 4px;
// }

// .v-col.achievement-col {
// 	padding: 0 0 15px 0;
// }
</style>