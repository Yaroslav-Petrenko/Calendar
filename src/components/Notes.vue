<template>
	<v-col
		cols="12"
		md="3"
		class="d-flex note-main"
	>
		<v-card
			class="flex-grow-1 d-flex flex-column note"
			:color="getNoteColor"
		>
			<v-card-item class="notes-item flex-grow-1 align-content-space-between">
				<div class="">
					<div class="note-body d-flex">
						<v-textarea
							v-if="editing"
							v-model="editingField"
							@keydown.enter="editingNote(noteId, noteText)"
							class="editing-note-field"
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
							class="flex-1-1 note-text"
						>
							{{ noteText }}
						</div>
						<div
							class="icon"
							@click="editingNote(noteId, noteText)"
						>
							<img
								:src="`/src/icons/viking-icons-54px/${icon}.webp`"
								alt=""
							/>
						</div>
					</div>
					<!-- editingField {{ editingField }} -->
				</div>
			</v-card-item>
			<v-card-actions class="notes-actions justify-space-between pa-0">
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
import { ref, reactive, computed, onMounted, toRef } from 'vue'
import { useStore } from 'vuex'
// import { props } from 'vue'
export default {
	props: {
		noteText: {
			type: String,
			required: true
		},
		// borderColor: {
		// 	type: String,
		// 	required: true
		// },
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
		const noteId = toRef(props, 'noteId')
		// console.log('notesType', notesType.value)
		const getNoteColor = computed(() => {
			// console.log('notesType', notesType.value)
			switch (notesType.value) {
				// case 'text': return '#27272f'
				// case 'text': return 'grey-darken-3'
				// case 'text': return 'blue-grey-darken-3'
				case 'text': return 'blue-grey-darken-4'
				// case 'idea': return 'brown-darken-4'
				// case 'idea': return 'brown-darken-4'
				case 'ideas': return '#46302F'
				// case 'achievement': return '#45412B'
				// case 'achievement': return '#324F33'
				// case 'achievement': return '#36472F'
				// case 'achievement': return '#1A381B'
				// case 'achievement': return '#1A341B'
				// case 'achievement': return '#1A321B'
				case 'achievements': return '#1A321B'
			}
		})
		// const vCard = ref(null)
		// onMounted(() => {
		// 	note.value.style.border = `8px solid ${getRandomColor}`
		// })

		// const colorPalete = ['purple', 'green', 'blue', 'orange', 'grey']
		// const getRandomColor = computed(() => {
		// 	return colorPalete[Math.floor(Math.random() * colorPalete.length)]
		// })
		// console.log('props:', props);
		// console.log('props.subTitle', props.subTitle);
		const getRandomIco = computed(() => {
			const randomNumber = Math.floor(Math.random() * 10 + 1)
			const res = `../icons/webp/${("0" + randomNumber).slice(-2)}.webp`;
			// console.log(res)
			// return `../icons/webp/${("0" + randomNumber).slice(-2)}.webp`;
			return "09.webp";
		})

		const dispArchive = (noteId) => {
			store.dispatch('notes/toArchive', { noteId })
		}
		const deleteNote = (noteId) => {
			store.dispatch('notes/deleteNote', { noteId })
		}

		const editingField = ref(noteText.value)
		const editingNote = (noteId, noteText) => {
			// в момент превращения checkbox в textarea происходит баг - нижестоящая строка подпрыгивает из-за присваивания класса .tasks-fade-move 
			// На время превращения я обнуляю transition стили этого DOM узла
			const elems = document.querySelectorAll('.note-main')
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
			// getRandomColor,
			// vCard
		}

	}


}
</script>

<style lang="scss">
// анимация для note
// это дуль анимации, такая же есть в Header
// .bounce-enter-active {
// 	animation: bounce-in 0.3s;
// }

// .bounce-leave-active {
// 	animation: bounce-in 0.3s reverse;
// }

// @keyframes bounce-in {
// 	0% {
// 		transform: scale(0);
// 	}

// 	50% {
// 		transform: scale(1.1);
// 	}

// 	100% {
// 		transform: scale(1);
// 	}
// }




.sub-title {
	/* font-size: 23px; */
}

.v-card-item.notes-item {
	padding: 0 0 15px 0;
	// padding: 0;
	min-height: 78px;
}

.note-title-text {
	/* font-family: 'Open Sans', sans-serif; */
	font-weight: 500;
	font-size: 1.44rem;
	line-height: 1.3;
	// color:#fff;
}

.note-text {
	// font-family: 'Courgette', cursive;
	// font-family: 'Marck Script', cursive;
	// font-family: 'Neucha', cursive;
	// font-family: 'Bad Script', cursive;
	// вродь неплохо
	// font-family: 'Cormorant Infant', serif;
	font-family: 'Montserrat', sans-serif;
	// font-size: 16px;
	color: #fff;
	// padding: 10px;
	// padding-top: 10px;

}

.note-body {

	// overflow: hidden;
	// height: 120px;
	// width: 285px;
	// position: absolute;
	// height: 100%;
	// position: relative;
	.editing-note-field {
		// min-height: 59px;
		// height: 59px
		// height: 120px;
		// height: auto;
		// height: 100%;
		// overflow: hidden;
	}

	.v-field__field {
		flex: 1 0;
		grid-area: field;
		position: relative;
		align-items: flex-start;
		display: grid;
		max-height: 50% !important;
		// height: 50%;
		// overflow: hidden;
	}

	// 	.v-field--variant-outlined.v-field--focused.v-field__outline {
	//   width: 5px;
	// }

	// .v-field.v-field--active.v-field--dirty.v-field--no-label.v-field--variant-underlined.v-theme--dark.v-field--focused {
	// 	 border-width: 5px;
	// }

	.v-field__field .v-field__input {
		padding: 0;
		flex-wrap: nowrap;
		// ниже важное свойство которое значительно влияет на внешний вид textarea
		// min-height: 25px;
		// height: auto;
		// height: 100%;
		// height: 226px;
		// max-height: 50% !important;
		// min-height: 100% !important;
		// height: 100% !important;
	}

	.v-textarea .v-field__input {
		font-family: 'Montserrat', sans-serif;
		letter-spacing: 0px;
		// font-weight: 500;
		mask-image: none;
		-webkit-mask-image: none;
		// min-height: 59px;
	}
}

.note {
	// overflow: hidden;
	// max-width: 25%;
}

// .v-textarea__sizer.v-field__input {
// 	visibility: hidden;
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 0 !important;
//     min-height: 1px !important;
//     pointer-events: none;
// }

.note .v-field.v-field--active.v-field--dirty.v-field--no-label.v-field--variant-underlined.v-theme--dark .v-field__outline::before {
	// border-style: solid;
	border-width: 0 0 1px;
	opacity: 1;
	color: #1E88E5;
	transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
	// content: "";
	// position: absolute;
	// top: 0;
	// left: 0;
	// width: 100%;
	// height: 100%;
	// overflow: hidden;
}

.v-field.v-field--active.v-field--dirty.v-field--no-label.v-field--variant-underlined.v-theme--dark {
	overflow: hidden;
}













.icon {
	/* background: url('../icons/01.png') 100% 0 / cover no-repeat; */
	padding: 2px;
	position: relative;
	left: 0px;
	top: 0px;
	// overflow: visible;
	// width: 48px;
	// height: 48px;
	margin-left: 15px;
	cursor: pointer;

	img {
		width: 48px;
		height: 48px;
		// transition: all 0.1s ease;

		&:hover {
			// transform: scale(1.05);
			// transform: scale(1.075);
			transform: scale(1.1);
			// transition: all 0.1s ease;
		}
	}
}

.note.v-card {
	border: 2px solid transparent;
	// border-bottom: 8px solid transparent;
	transition: all .225s ease-in-out;
	// padding: 8px;
	box-shadow: 6px 6px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
	// box-shadow: 6px 6px 1px 0px rgba(0, 0, 0, 0.2);
	// padding: 12px 8px 8px 16px;
	padding: 8px 8px 3px 8px;
}

.notes-actions.v-card-actions {
	min-height: 28px;
}

// .v-card.purple {
// 	border-bottom-color: #7858d7;

// 	&:hover {
// 		border-color: #7858d7;
// 	}
// }

// .v-card.green {
// 	border-bottom-color: #5baa73;

// 	&:hover {
// 		border-color: #5baa73;
// 	}
// }

// .v-card.blue {
// 	border-bottom-color: #465af7;

// 	&:hover {
// 		border-color: #465af7;
// 	}

// }

// .v-card.orange {
// 	border-bottom-color: #f4a965;

// 	&:hover {
// 		border-color: #f4a965;
// 	}
// }

// .v-card.grey {
// 	border-bottom-color: #7E7E7E;

// 	&:hover {
// 		border-color: #7E7E7E;
// 	}
// }
</style>
