<template>
	<v-container style="max-width: 600px;">
		<!-- TODO:ПОЛЕ ЗАГОЛОВКА ДЛЯ ДОБАВЛЕНИЯ НОВОГО ЭТАПА -->
		<!-- <v-text-field
			v-model="input"
			hide-details
			label="Leave a comment..."
			density="compact"
			@keydown.enter="comment"
		>
			<template v-slot:append>
				<v-btn
					class="mx-0"
					color="rgb(70, 90, 247"
					@click="comment"
				>
					Post
				</v-btn>
			</template>
		</v-text-field> -->
		<!-- TODO -->

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
		<transition
			name="goals-bounce"
		>
			<div
				v-if="allDone"
				class="all-done"
			>ВЫПОЛНЕНО</div>
		</transition>
	</v-container>
</template>

<script>
import { ref, reactive, computed, onMounted, toRef, watch } from 'vue'
import { useStore } from 'vuex'
export default {
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
			store.dispatch('goals/changeGoal', { cardId, taskId })
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)

			// input.value = null
		}


		// const getDotColor = computed(() => {
		// 	const item = colorPalete[Math.floor(Math.random() * colorPalete.length)]
		// 	reverse()
		// 	// console.log('colorPalette', colorPalete)
		// 	return item
		// })
		const getDotColor = (eventDone, allDone) => {
			console.log('Вызов')
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
			getDotColor

		}
	}
}
</script>

<style>
.goals-time {
	color: #1867C0;
	font-weight: 500;
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
	transform: translate(20%, -50%);
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
		transform: translate(20%, -50%) scale(0);
	}

	50% {
		transform: translate(20%, -50%) scale(1.1);
	}

	100% {
		transform: translate(20%, -50%) scale(1);
	}
}





.time-line-item:hover .time-line-btn-done {
	/* visibility: visible; */
}

.time-line-btn-done {
	/* visibility: hidden; */
}

.time-line-btn-done {}</style>