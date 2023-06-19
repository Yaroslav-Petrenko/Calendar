<template>
	<v-container style="max-width: 600px;">
		<!-- TODO:ПОЛЕ ЗАГОЛОВКА ДЛЯ ДОБАВЛЕНИЯ НОВОГО ЭТАПА -->
		<v-text-field
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
		</v-text-field>
		<!-- TODO -->

		<v-timeline
			density="compact"
			side="end"
		>
			<v-timeline-item
				v-for="event in tasks"
				:key="event.id"
				class="mb-4"
				:dot-color="event.color"
				:size="event.size"
			>
				<div class="d-flex justify-space-between flex-grow-1">
					<div class="flex-grow-1">
						{{ event.text }}
					</div>
					<div>
						{{ event.time }}
					</div>
				</div>
			</v-timeline-item>
		</v-timeline>
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

		const comment = () => {
			store.dispatch('goals/')

			input.value = null
		}
		const getRandomDotColor = () => {
			// определяю геттер внутри функции, чтобы избежать кеширования его результата
			// console.log('Вызов')
			const colorPalete = ['pink', 'purple', 'blue', 'orange', 'info', 'error']
			const getRandomColor = computed(() => {
				return colorPalete[Math.floor(Math.random() * colorPalete.length)]
			})
			return getRandomColor.value
		}
		let colorPalete = ['pink', 'purple', 'blue', 'orange', 'info', 'error']
		const getRandomColor = computed(() => {
			const item = colorPalete[Math.floor(Math.random() * colorPalete.length)]
			reverse()
			// console.log('colorPalette', colorPalete)
			return item
		})
		const reverse = () => colorPalete = colorPalete.pop()


		return {
			getRandomDotColor,
			timeline,
			events,
			input,
			nonce,
			comment,
			getRandomColor

		}
	}
}
</script>

<style>
.v-timeline-item__body {
	width: 100%;
}
</style>