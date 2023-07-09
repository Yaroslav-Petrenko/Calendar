<template>
	<v-card
		class="time-line d-flex flex-column pa-4"
		color="#1D1D24"
		elevation="0"
	>


		<div class="time-line__block flex-grow-1">
			<v-timeline
				density="compact"
				side="end"
				truncate-line="start"
			>
				<transition-group name="bounce">
					<v-timeline-item
						v-for="event in tasks"
						:key="event.id"
						class="mb-4 time-line-item"
						:dot-color="getDotColor(event.done, allDone)"
						:size="event.size"
						:fill-dot="false"
						:rounded="5"
						@click="setDone(cardId, event.id)"
					>
						<div class="d-flex justify-space-between flex-grow-1 ">
							<div class="flex-grow-1">
								{{ event.text }}
								<!-- {{ getDotColor(event.done, allDone) }} -->
							</div>
							<transition
								name="bounce"
								:duration="200"
							>
								<div
									v-if="event.time"
									class="goals-time"
								>
									{{ event.time }}
								</div>
							</transition>
						</div>
						<!-- <template v-slot:append> -->
						<!-- </template> -->
					</v-timeline-item>
				</transition-group>
			</v-timeline>
		</div>
		<transition name="goals-bounce">
			<div
				v-if="allDone"
				class="all-done"
			>ВЫПОЛНЕНО</div>
		</transition>
		<v-card-actions class="pt-0 d-flex justify-space-between">
			<!-- <v-btn
				variant="flat"
				color="blue-grey-darken-3"
				size="small"
			>редактировать</v-btn> -->


			<Modal buttonText="Редактирование цели">
				<template v-slot:modal-content="{ isActive }">
					<EditGoalsForm
						@closeModal="isActive.value = false"
						:tasks="tasks"
						:cardId="cardId"
					/>
				</template>
				<template v-slot:modal-open-button="{ props }">
					<v-btn
						v-bind="props"
						variant="flat"
						color="blue-grey-darken-3"
						size="small"
					>редактировать</v-btn>
				</template>
			</Modal>

			<div>
				<v-btn
					v-if="!archive"
					variant="plain"
					color="amber-accent-4"
					size="small"
					@click="toArchive(cardId)"
				>в архив</v-btn>
				<v-btn
					v-else
					variant="plain"
					color="amber-accent-4"
					size="small"
					@click="toArchive(cardId)"
				>вернуть из архива</v-btn>
				
				<v-btn
					variant="plain"
					color="blue-grey-lighten-2"
					size="small"
					@click="deleteGoal(cardId)"
				>удалить</v-btn>
			</div>
		</v-card-actions>
	</v-card>
</template>

<script>
import { ref, reactive, computed, onMounted, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import Modal from './Modal.vue'
import EditGoalsForm from './EditGoalsForm.vue'
export default {
	components: {
		Modal,
		EditGoalsForm
	},
	props: {
		tasks: {
			type: Array,
			required: true
		},
		cardId: {
			type: String,
			required: true
		},
		allDone: {
			type: Boolean,
			required: true
		},
		archive: {
			type: Boolean,
			required: true
		},
	},
	setup() {
		const store = useStore()
		const events = reactive([])
		const input = ref(null)
		const nonce = ref(0)

		const timeline = computed(() => {
			return events.slice().reverse()
		})

		const goals = computed(() => store.getters['goals/goals'])

		const setDone = (cardId, taskId) => {
			store.dispatch('goals/setDone', { cardId, taskId })
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)

			// input.value = null
		}

		const toArchive = (id) => {
			store.dispatch('goals/sendToArchive', id)
		}
		const deleteGoal = (cardId) => {
			store.dispatch('goals/deleteGoal', cardId)
		}


		// const getDotColor = computed(() => {
		// 	const item = colorPalete[Math.floor(Math.random() * colorPalete.length)]
		// 	reverse()
		// 	// console.log('colorPalette', colorPalete)
		// 	return item
		// })
		const getDotColor = (eventDone, allDone) => {
			// console.log('Вызов')
			// console.log('eventDone', eventDone)
			// console.log('allDone', allDone)
			if (allDone) return 'green-darken-2'
			if (eventDone) return '#1867C0'
			else return 'grey-darken-2'
			// const item = colorPalete[Math.floor(Math.random() * colorPalete.length)]
			// reverse()
			// console.log('colorPalette', colorPalete)
			// return item
		}



		// const reverse = () => colorPalete = colorPalete.pop()


		return {
			timeline,
			events,
			input,
			nonce,
			setDone,
			getDotColor,
			toArchive,
			deleteGoal

		}
	}
}
</script>

<style lang="scss">
.time-line {
	/* центрирую карточки по левому краю */
	margin-left: 0;
	position: relative;
	min-width: 600px;
	// z-index: 999;
	// overflow: visible;

	/* height: 100%; */
	&__block {
		// height: 100%;
		// font-size: 35px;
		// z-index: 999;
		// overflow: visible;
	}
}

// .time-line__block {
// 	z-index: 999;
// 	overflow: visible;
// }


.goals-time {
	color: #1867C0;
	font-weight: 500;
	/* height: 100px; */
	/* min-width: 120px; */

	/* font-size: 18px; */

}

.v-timeline-item__body {
	width: 100%;
}

.time-line-item {
	cursor: pointer;
	user-select: none;

	/* transition: all 0.5s linear; */
	/* &::after {
		content: 'выполнено';
		position: absolute;
		color: rgb(56, 142, 60, 0.50);
		font-size: 45px;
		top: 50%;
		right: 50%;
		transform: translate(50%, -50%);
		letter-spacing: 15px;
		text-transform: uppercase;
		z-index: 0;
	} */
}

.all-done {
	content: 'выполнено';
	position: absolute;
	color: rgb(56, 142, 60, 0.60);
	font-size: 45px;
	top: 50%;
	/* right: 50%; */
	transform: translate(20%, -92%);
	letter-spacing: 15px;
	text-transform: uppercase;
	z-index: -1;
}

/* // анимация для .all-done */
.goals-bounce-enter-active {
	animation: bounce-in-goals 0.2s;
}

.goals-bounce-leave-active {
	animation: bounce-in-goals 0.2s reverse;
}

@keyframes bounce-in-goals {
	0% {
		transform: translate(20%, -92%) scale(0);
	}

	50% {
		transform: translate(20%, -92%) scale(1.1);
	}

	100% {
		transform: translate(20%, -92%) scale(1);
	}
}





.time-line-item:hover .time-line-btn-done {
	/* visibility: visible; */
}

.time-line-btn-done {
	/* visibility: hidden; */
}

.time-line-btn-done {}
</style>