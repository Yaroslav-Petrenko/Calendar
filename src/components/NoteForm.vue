<template>
	<v-sheet
		width="420"
		class="mx-auto modal-icon-block"
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
				color="success"
				density="compact"
			></v-checkbox>


					<v-col
					cols="12"
					class="achievement-col"
				>
					<p class="pb-4">Выбирите тип заметки</p>

					<v-btn-toggle
						v-model="notesType"
						rounded="1"
						group
					>
						<v-btn
							color="grey-darken-2"
							value="text"
						>
							<img
								src="../icons/notesType-32px/4.webp"
								alt=""
							/>
							Текст
						</v-btn>

						<v-btn
							color="amber"
							value="ideas"
						>
							<img
								src="/src/icons/viking-icons-48px/51.webp"
								alt=""
							/>
							Идея
						</v-btn>

						<v-btn
							color="green-darken-1"
							value="achievements"
							class="pe-2"
						>
							<img
								src="/src/icons/viking-icons-48px/52.webp"
								alt=""
							/>
							Достижение
						</v-btn>

					</v-btn-toggle>
					<!-- noteType {{ noteType }} -->
				</v-col>


			<!-- <transition name="cbxFade"> -->
				<!-- <v-checkbox
					v-show="notesType === 'text'"
					v-model="cbxRandonIcon"
					label="Случайная иконка"
					density="compact"
					color="info"
				></v-checkbox> -->
			<!-- </transition> -->
			<IconPack
				v-show="notesType === 'text'"
				@selectedIcon="setIcon($event)"
			/>
			<!-- selectedIcon {{ selectedIcon }} -->



			<div class="d-flex flex-column">
				<v-btn
					color="success"
					class="mt-4"
					block
					@click="createNote()"
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
import { ref, nextTick, computed, reactive } from 'vue'
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

		const createNote = () => {
			if (text.value.length < 5) return
			// определяю геттер внутри функции, чтобы избежать кеширования его результата
			const colorPalete = ['purple', 'green', 'blue', 'orange', 'grey', 'yellow']
			const getRandomColor = computed(() => {
				return colorPalete[Math.floor(Math.random() * colorPalete.length)]
			})

			store.dispatch('notes/createNote',
				{
					text: text.value,
					inFirstPlace: inFirstPlace.value,
					borderColor: getRandomColor.value,
					notesType: notesType.value,
					icon: selectedIcon.value
				})
			text.value = ''
			closeModal()
		}

		// function getRandomIco(name) {
		// 	const rndIcon = iconsName[Math.floor(Math.random() * icons.length)]
		// 	const path = new URL(`/src/icons/viking-icons-48px/${rndIcon}.webp`, import.meta.url).href
		// 	return path
		// }

		const closeModal = () => {
			emit('closeModal')
		}

		const form = ref(null)

		const valid = ref(true)
		const text = ref('Привет моя новая заметка')
		const select = ref(null)
		// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
		const inFirstPlace = ref(true)
		// const cbxRandonIcon = ref(false)

		const notesType = ref('text')
		const selectedIcon = ref('')
		const setIcon = (e) => {
			selectedIcon.value = e
			// console.log('selectIcon', selectIcon.value)
		}

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

		const reset = () => {

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
			notesType,
			// cbxRandonIcon,
			setIcon,
			selectedIcon
			// setActive,
			// closeModal
			// resetValidation,
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

</style>