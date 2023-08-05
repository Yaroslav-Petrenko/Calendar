<template>
	<v-card
		class="time-line d-flex flex-column pa-4"
		color="#1D1D24"
		elevation="0"
	>
		<div class="flex-grow-1">
			<v-timeline
				density="compact"
				side="end"
				truncate-line="start"
			>
				<transition-group name="bounce">
					<v-timeline-item
						v-for="event in tasks"
						:key="event.id"
						class="mb-4 time-line__item"
						:dot-color="getDotColor(event.done, allDone)"
						:size="event.size"
						:fill-dot="false"
						:rounded="5"
						@click="setDone(cardId, event.id)"
					>
						<div class="d-flex justify-space-between flex-grow-1">
							<div class="flex-grow-1">
								{{ event.text }}
							</div>
							<transition
								name="bounce"
								:duration="200"
							>
								<div
									v-if="event.time"
									class="time-line__goals-time"
								>
									{{ event.time }}
								</div>
							</transition>
						</div>
					</v-timeline-item>
				</transition-group>
			</v-timeline>
		</div>
		<transition name="goals-bounce">
			<div
				v-if="allDone"
				class="time-line__all-done"
			>ВЫПОЛНЕНО</div>
		</transition>
		<v-card-actions class="pt-0 d-flex justify-space-between">
			<Modal buttonText="Редактирование цели">
				<template v-slot:modal-content="{ isActive }">
					<GoalsEditForm
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
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import Modal from './Modal.vue'
import GoalsEditForm from './GoalsEditForm.vue'
export default {
	components: {
		Modal,
		GoalsEditForm
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

		const setDone = (cardId, taskId) => {
			store.dispatch('goals/setDone', { cardId, taskId })
		}
		const toArchive = (id) => {
			store.dispatch('goals/sendToArchive', id)
		}
		const deleteGoal = (cardId) => {
			store.dispatch('goals/deleteGoal', cardId)
		}

		const getDotColor = (eventDone, allDone) => {
			if (allDone) return 'green-darken-2'
			if (eventDone) return '#1867C0'
			else return 'grey-darken-2'
		}

		return {
			timeline,
			events,
			input,
			nonce,
			setDone,
			getDotColor,
			toArchive,
			deleteGoal,
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

	// .time-line__goals-time
	&__goals-time {
		color: #1867C0;
		font-weight: 500;
	}

	// .time-line__item
	&__item {
		cursor: pointer;
		user-select: none;
	}

	// .time-line__all-done
	&__all-done {
		content: 'выполнено';
		position: absolute;
		color: rgb(56, 142, 60, 0.60);
		font-size: 45px;
		top: 50%;
		transform: translate(20%, -92%);
		letter-spacing: 15px;
		text-transform: uppercase;
		z-index: -1;
	}
}

.v-timeline-item__body {
	width: 100%;
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


// .time-line__goals-time {
// 	color: #1867C0;
// 	font-weight: 500;
// }


// .time-line__item {
// 	cursor: pointer;
// 	user-select: none;
// }

// .time-line__all-done {
// 	content: 'выполнено';
// 	position: absolute;
// 	color: rgb(56, 142, 60, 0.60);
// 	font-size: 45px;
// 	top: 50%;
// 	/* right: 50%; */
// 	transform: translate(20%, -92%);
// 	letter-spacing: 15px;
// 	text-transform: uppercase;
// 	z-index: -1;
// }
</style>