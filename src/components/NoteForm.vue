<template>
	<v-sheet
		width="420"
		class="mx-auto"
	>
		<v-form
			ref="form"
			class="note-form"
		>
			<v-textarea
				v-model="text"
				label="Текст заметки"
				variant="solo-filled"
				:counter="300"
				required
			></v-textarea>
			<div class="note-form__icon">
				<img
					src="../icons/modal/social-engagement.webp"
					alt=""
				/>
			</div>
			<v-checkbox
				v-model="inFirstPlace"
				label="Поместить в начало"
				color="success"
				density="compact"
			></v-checkbox>
			<v-col
				cols="12"
				class="note-form__achievement"
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
							src="/src/icons/viking-icons-54px/53.webp"
							alt=""
						/>
						Текст
					</v-btn>
					<v-btn
						color="amber"
						value="ideas"
					>
						<img
							src="/src/icons/viking-icons-54px/51.webp"
							alt=""
							class="note-form__button"
						/>
						Идея
					</v-btn>
					<v-btn
						color="green-darken-1"
						value="achievements"
						class="pe-2"
					>
						<img
							src="/src/icons/viking-icons-54px/52.webp"
							alt=""
							class="note-form__button"
						/>
						Достижение
					</v-btn>
				</v-btn-toggle>
			</v-col>
			<IconPack
				v-show="notesType === 'text'"
				@selectedIcon="setIcon($event)"
			/>
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
import { ref } from 'vue'
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
			store.dispatch('notes/createNote',
				{
					text: text.value,
					inFirstPlace: inFirstPlace.value,
					notesType: notesType.value,
					icon: selectedIcon.value
				})
			text.value = ''
			closeModal()
		}

		const closeModal = () => {
			emit('closeModal')
		}

		const form = ref(null)
		const valid = ref(true)
		const text = ref('Привет, моя новая заметка!')
		const select = ref(null)
		const inFirstPlace = ref(true)

		const notesType = ref('text')
		const selectedIcon = ref('')
		const setIcon = (e) => {
			selectedIcon.value = e
		}

		const reset = () => form.value.reset()

		return {
			form,
			valid,
			text,
			select,
			inFirstPlace,
			reset,
			createNote,
			notesType,
			setIcon,
			selectedIcon
		}
	}
}
</script>

<style lang="scss">
.note-form {

	// .note-form__icon
	&__icon {
		position: absolute;
		width: 64px;
		height: 64px;
		top: 80px;
		right: 4px;
	}

	// .note-form__achievement.v-col
	&__achievement.v-col {
		padding: 0 0 15px 0;
	}

	// .note-form__button 
	&__button {
		max-height: 38px;
		max-width: 38px;
	}
}

// .note-form__icon {
// 	position: absolute;
// 	width: 64px;
// 	height: 64px;
// 	top: 80px;
// 	right: 4px;
// }

// .note-form__achievement.v-col {
// 	padding: 0 0 15px 0;
// }

// .note-form__button {
// 	max-height: 38px;
// 	max-width: 38px;
// }
</style>