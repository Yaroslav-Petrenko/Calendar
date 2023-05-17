<template>
	<v-sheet
		width="400"
		class="mx-auto"
	>

		<v-form ref="form">
			<!-- <v-text-field
				v-model="text"
				:counter="300"
				:rules="textRules"
				label="Текст заметки"
				required
			></v-text-field> -->

			<v-textarea
				label="Текст заметки"
				variant="solo-filled"
				v-model="text"
				:counter="300"
				required
			></v-textarea>
			<div class="modal-icon">
				<img
					src="../icons/modal/social-engagement.webp"
					alt=""
				/>
			</div>
			<!-- <v-select
				v-model="select"
				:items="items"
				:rules="[v => !!v || 'Item is required']"
				label="Item"
				required
			></v-select> -->

			<v-checkbox
				v-model="inFirstPlace"
				label="Поместить в начало"
			></v-checkbox>

			<div class="d-flex flex-column">
				<v-btn
					color="success"
					class="mt-4"
					block
					@click="createNote(), changeActive()"
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
	<!-- <pre>someValue {{ someValue }}</pre> -->
	<!-- <pre>form {{ form }}</pre> -->
</template>

<script>
import { ref, nextTick, computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
	setup() {
		const store = useStore()

		const createNote = () => {
			if (text.value.length < 5) return
			// определяю геттер внутри функции, чтобы избежать кеширования его результата
			const colorPalete = ['purple', 'green', 'blue', 'orange', 'grey']
			const getRandomColor = computed(() => {
				return colorPalete[Math.floor(Math.random() * colorPalete.length)]
			})

			store.dispatch('notes/createNote',
				{
					text: text.value,
					inFirstPlace: inFirstPlace.value,
					color: getRandomColor.value
				})
			text.value = ''
		}

		const setActive = reactive({
			value: false
		})
		const changeActive = () => {
			setActive.value = false
		}

		const form = ref(null)

		const valid = ref(true)
		const text = ref('')
		const select = ref(null)
		// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
		const inFirstPlace = ref(true)

		// const textRules = [
		// 	v => !!v || 'Текст обязателен',
		// 	v => (v && v.length <= 300) || 'Не более 300 символов',
		// 	v => (v.length >= 5) || 'Минимум 5 символов для заметки',
		// ]


		// const validate = () => {
		// 	// form.value.items[0].errorMessages.push("Минимум 5 символов для заметки")
		// 	console.log('text.value', text.value)
		// 	const inputId = form.value.items[0].id
		// 	const error = {
		// 		"id": inputId,

		// 	}
		// 	if (text.value.length < 5) {
		// 		console.log('here if')
		// 		// error.errorMessages = [
		// 		// 	"Минимум 5 символов для заметки"
		// 		// ]
		// 		// form.value.errors.unshift(error)
		// 		form.value.items[0].errorMessages = ["Минимум 5 символов для заметки"]
		// 	}
		// 	if (text.value.length > 300) {
		// 		error.errorMessages = [
		// 			"Максимум 300 символов для заметки"
		// 		]
		// 		form.value.errors.unshift(error)
		// 	}
		// }

		const reset = async () => {

			// await nextTick()
			// console.log('form.value.reset()', form.value.reset)
			form.value.reset()
		}

		// function resetValidation() {
		//   formRef.value.resetValidation()
		// }

		return {
			form,
			valid,
			text,
			// textRules,
			select,
			// items,
			inFirstPlace,
			// validate,
			reset,
			createNote,
			setActive,
			changeActive
			// resetValidation,
		}
	}
}
</script>

<style lang="scss">
.modal-icon {
	position: absolute;
	width: 64px;
	height: 64px;
	top: 80px;
	right: 4px;
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
</style>