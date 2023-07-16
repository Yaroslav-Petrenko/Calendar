<template>
	<transition>
		<v-col
			cols="12"
			md="3"
			class="d-flex"
		>
			<!-- max-width="344" -->
			<!-- <transition name="bounce" appear> -->
			<v-card
				class="flex-grow-1 pa-2 d-flex flex-column note"
				:color="getNoteColor"
			>
				<v-card-item class="notes-item flex-grow-1 align-content-space-between">
					<div class="">
						<div class="note-body d-flex">
							<!-- <div class="text-overline mb-1 text-h1">
							<span class="sub-title">{{ subTitle }}</span>
						</div> -->
							<!-- <div class="card-title-text align-self-stretch">
							{{ title }}
						</div> -->
							<div class="flex-1-1 note-text">{{ text }}</div>
							<div class="icon">
								<img
									:src="`/src/icons/viking-icons-48px/${icon}.webp`"
									alt=""
								/>
							</div>
						</div>

					</div>
				</v-card-item>
				<!-- <v-card-actions class="pa-0"> -->
				<!-- <v-btn
					variant="flat"
					color="#465af7"
					size="small"
				>
					Выполнено
				</v-btn> -->


				<v-btn
					v-if="archive"
					class="align-self-start"
					variant="plain"
					color="amber-accent-4"
					size="small"
					@click="dispArchive(id)"
				>вернуть из архива</v-btn>
				<v-btn
					v-else
					class="align-self-start"
					variant="plain"
					color="amber-darken-2"
					size="small"
					@click="dispArchive(id)"
				>
					в архив
				</v-btn>




				<!-- archive {{ archive }} -->
				<!-- Random id {{ getRandomIco }} -->
				<!-- getNoteColor	{{ getNoteColor }} -->
				<!-- </v-card-actions> -->
				<!-- getRandomColor {{ getRandomColor }} -->
			</v-card>
			<!-- </transition> -->
		</v-col>
	</transition>
</template>

<script>
import { ref, reactive, computed, onMounted, toRef } from 'vue'
import { useStore } from 'vuex'
// import { props } from 'vue'
export default {
	props: {
		text: {
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
		id: {
			type: String,
			required: true
		},
		archive: {
			type: Boolean,
			required: true
		},
	},
	setup(props) {
		const store = useStore()

		const notesType = toRef(props, 'notesType')
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

		const dispArchive = (id) => {
			store.dispatch('notes/toArchive', id)
		}


		return {
			getRandomIco,
			getNoteColor,
			dispArchive
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
}

.note-title-text {
	/* font-family: 'Open Sans', sans-serif; */
	font-weight: 500;
	font-size: 1.44rem;
	line-height: 1.3;
	// color:#fff;
}

.note-text {
	color: #fff;
	// padding: 10px;
}

.note-body {}

.icon {
	/* background: url('../icons/01.png') 100% 0 / cover no-repeat; */
	position: relative;
	left: 0px;
	top: 0px;
	// overflow: hidden;
	width: 48px;
	height: 48px;
	margin-left: 15px;
}

.v-card.note {
	border: 2px solid transparent;
	// border-bottom: 8px solid transparent;
	transition: all .225s ease-in-out;
	// padding: 8px;
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
