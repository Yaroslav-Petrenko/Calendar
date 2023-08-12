<template>
	<v-col
		cols="12"
		md="3"
		class="d-flex main-note"
	>
		<v-card
			class="flex-grow-1 d-flex flex-column note"
			:color="getNoteColor"
		>
			<v-card-item class="flex-grow-1 align-content-space-between note__item">
				<div>
					<div class="d-flex">
						<v-textarea
							v-if="editing"
							v-model="editingField"
							@keydown.enter="editingNote(noteId)"
							color="blue-darken-1"
							variant="underlined"
							hide-details="true"
							rows="1"
							auto-grow
							density="comfortable"
							autofocus
						></v-textarea>
						<div
							v-if="!editing"
							class="flex-1-1 note__text"
						>
							{{ noteText }}
						</div>
						<div
							class="note__icon"
							@click="editingNote(noteId)"
						>
							<img
								:src="`/src/icons/viking-icons-54px/${icon}.webp`"
								alt=""
							/>
						</div>
					</div>
				</div>
			</v-card-item>
			<v-card-actions class="justify-space-between pa-0 note__actions">
				<v-btn
					v-if="archive"
					class="align-self-end pa-0"
					variant="plain"
					color="amber-accent-4"
					size="small"
					@click="dispArchive(noteId)"
				>вернуть из архива</v-btn>
				<v-btn
					v-else
					class="align-self-end pa-0"
					variant="plain"
					color="amber-darken-2"
					size="small"
					@click="dispArchive(noteId)"
				>
					в архив
				</v-btn>
				<v-btn
					class="align-self-end pa-0"
					variant="plain"
					color="blue-grey-lighten-2"
					size="small"
					@click="deleteNote(noteId)"
				>удалить</v-btn>
			</v-card-actions>
		</v-card>
	</v-col>
</template>

<script>
import { ref, computed, toRef } from 'vue'
import { useStore } from 'vuex'
export default {
	props: {
		noteText: {
			type: String,
			required: true
		},
		notesType: {
			type: String,
			required: true
		},
		icon: {
			type: String,
			required: true
		},
		noteId: {
			type: String,
			required: true
		},
		archive: {
			type: Boolean,
			required: true
		},
		editing: {
			type: Boolean,
			required: true
		},
	},
	setup(props) {
		const store = useStore()

		const notesType = toRef(props, 'notesType')
		const noteText = toRef(props, 'noteText')
		const getNoteColor = computed(() => {
			switch (notesType.value) {
				case 'text': return 'blue-grey-darken-4'
				case 'ideas': return '#46302F'
				case 'achievements': return '#1A321B'
			}
		})
		const getRandomIco = computed(() => {
			const randomNumber = Math.floor(Math.random() * 10 + 1)
			// const res = `../icons/webp/${("0" + randomNumber).slice(-2)}.webp`;
			// return "09.webp";
		})

		const dispArchive = (noteId) => {
			store.dispatch('notes/toArchive', { noteId })
		}
		const deleteNote = (noteId) => {
			store.dispatch('notes/deleteNote', { noteId })
		}

		const editingField = ref(noteText.value)
		const editingNote = (noteId) => {
			// в момент превращения checkbox в textarea происходит баг - нижестоящая строка подпрыгивает из-за присваивания класса .tasks-fade-move 
			// На время превращения я обнуляю transition стили этого DOM узла
			const elems = document.querySelectorAll('.main-note')
			console.log('elems', elems)
			elems.forEach(item => item.style.transition = 'none')

			store.dispatch('notes/editNote', { noteId, newText: editingField.value })

			// после dispatch возвращаю исходные transition стили DOM узла
			setTimeout(() => {
				elems.forEach(item => item.style.transition = 'all 0.5s ease')
			}, 0)
		}

		return {
			getRandomIco,
			getNoteColor,
			dispArchive,
			deleteNote,
			editingNote,
			editingField,
		}
	}
}
</script>

<style lang="scss">
.note {
	&.v-card {
		border: 2px solid transparent;
		transition: all .225s ease-in-out;
		box-shadow: 6px 6px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
		padding: 8px 8px 3px 8px;
	}

	// .note__item.v-card-item
	&__item.v-card-item {
		padding: 0 0 15px 0;
		min-height: 78px;
	}

	// .note__text
	&__text {
		font-family: 'Montserrat', sans-serif;
		color: #fff;
	}

	// .note_&
	&__icon {
		padding: 2px;
		position: relative;
		left: 0px;
		top: 0px;
		margin-left: 15px;
		cursor: pointer;

		img {
			width: 48px;
			height: 48px;

			&:hover {
				transform: scale(1.1);
			}
		}
	}

	// переопределение служебных классов vuetify
	.v-field__field {
		flex: 1 0;
		grid-area: field;
		position: relative;
		align-items: flex-start;
		// display: grid;
		// max-height: 50% !important;
	}

	.v-field__field .v-field__input {
		padding: 0;
		flex-wrap: nowrap;
	}

	.v-textarea .v-field__input {
		font-family: 'Montserrat', sans-serif;
		letter-spacing: 0px;
		mask-image: none;
		-webkit-mask-image: none;
	}

	.note .v-field.v-field--active.v-field--dirty.v-field--no-label.v-field--variant-underlined.v-theme--dark .v-field__outline::before {
		border-width: 0 0 1px;
		opacity: 1;
		color: #1E88E5;
		transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.v-field.v-field--active.v-field--dirty.v-field--no-label.v-field--variant-underlined.v-theme--dark {
		overflow: hidden;
	}

	.v-card-actions.note__actions {
		min-height: 28px;
	}

}


// .note__item.v-card-item {
// 	padding: 0 0 15px 0;
// 	min-height: 78px;
// }

// .note-title-text {
// 	font-weight: 500;
// 	font-size: 1.44rem;
// 	line-height: 1.3;
// }

// .note__text {
// 	font-family: 'Montserrat', sans-serif;
// 	color: #fff;
// }

// .note__icon {
// 	padding: 2px;
// 	position: relative;
// 	left: 0px;
// 	top: 0px;
// 	margin-left: 15px;
// 	cursor: pointer;

// 	img {
// 		width: 48px;
// 		height: 48px;

// 		&:hover {
// 			transform: scale(1.1);
// 		}
// 	}
// }
</style>
