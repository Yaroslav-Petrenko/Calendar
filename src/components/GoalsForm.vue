<template>
	<v-sheet
		width="420"
		class="mx-auto modal-icon-block"
	>

		<v-form ref="form">
			<v-text-field
				v-model="mainGoal"
				label="Главная цель"
				required
			></v-text-field>
			<transition-group
				name="flip-list"
			>
				<v-text-field
					v-for="(item, i) in textFieldsValue"
					:key="i"
					v-model="textFieldsValue[i]"
					label="Этап достижения"
					required
					@input.once="addField"
				></v-text-field>
			</transition-group>

			<p>mainGoal {{ mainGoal }}</p>
			<p>textFieldsValue {{ textFieldsValue }}</p>
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
		const createGoal = () => {
			store.dispatch('goals/createGoal',
				{
					arr: textFieldsValue
				})
			closeModal()
		}

		// function getRandomIco(name) {
		// 	const rndIcon = iconsName[Math.floor(Math.random() * icons.length)]
		// 	const path = new URL(`/src/icons/viking-icons-48px/${rndIcon}.webp`, import.meta.url).href
		// 	return path
		// }
		const textFieldsValue = reactive(['Вторая цель', 'Третья цель'])
		const addField = () => {
			textFieldsValue.push('')
		}

		const closeModal = () => {
			emit('closeModal')
		}



		const valid = ref(true)
		const mainGoal = ref('Главная цель')
		// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
		// const cbxRandonIcon = ref(false)


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
			valid,
			mainGoal,
			reset,
			createGoal,
			textFieldsValue,
			addField

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