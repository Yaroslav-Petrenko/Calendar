<template>
	<v-container style="max-width: 600px;">
		<v-timeline
			density="compact"
			side="end"
		>
			<v-timeline-item
				fill-dot
				class="mb-12"
				dot-color="orange"
				size="large"
			>
				<template v-slot:icon>
					<span>МС</span>
				</template>
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
							variant="text"
							@click="comment"
						>
							Post
						</v-btn>
					</template>
				</v-text-field>
			</v-timeline-item>

			<!-- <v-slide-x-transition group> -->
				<v-timeline-item
					v-for="event in events"
					:key="event.id"
					class="mb-4"
					:dot-color="getRandomColor"
					size="small"
				>
					<div class="d-flex justify-space-between flex-grow-1">
						<div>{{ getRandomColor }}</div>
						<!-- <div class="flex-shrink-0">{{ event.time }}</div> -->
					</div>
				</v-timeline-item>
			<!-- </v-slide-x-transition> -->

			<v-timeline-item
				class="mb-6"
				hide-dot
			>
				<span>TODAY</span>
			</v-timeline-item>

			<v-timeline-item
				class="mb-4"
				dot-color="grey"
				size="small"
			>
				<div class="d-flex justify-space-between flex-grow-1">
					<div>
						This order was archived.
					</div>
					<div class="flex-shrink-0">
						15:26 EDT
					</div>
				</div>
			</v-timeline-item>

			<v-timeline-item
				class="mb-4"
				dot-color="primary"
				size="small"
			>
				<div class="d-flex justify-space-between flex-grow-1">
					<div>
						<v-chip
							class="ms-0"
							color="purple"
							label
							size="small"
						>
							APP
						</v-chip>
						Digital Downloads fulfilled 1 item.
					</div>
					<div class="flex-shrink-0">
						15:25 EDT
					</div>
				</div>
			</v-timeline-item>

			<v-timeline-item
				class="mb-4"
				dot-color="grey"
				size="small"
			>
				<div class="d-flex justify-space-between flex-grow-1">
					<div>
						Order confirmation email was sent to John Leider (john@google.com).
					</div>
					<div class="flex-shrink-0">
						15:25 EDT
					</div>
				</div>
			</v-timeline-item>

			<v-timeline-item
				class="mb-4"
				hide-dot
			>
				<v-btn variant="outlined">
					Resend Email
				</v-btn>
			</v-timeline-item>

			<v-timeline-item
				class="mb-4"
				dot-color="grey"
				size="small"
			>
				<div class="d-flex justify-space-between flex-grow-1">
					<div>
						A $15.00 USD payment was processed on PayPal Express Checkout
					</div>
					<div class="flex-shrink-0">
						15:25 EDT
					</div>
				</div>
			</v-timeline-item>

			<v-timeline-item
				dot-color="grey"
				size="small"
			>
				<div class="d-flex justify-space-between flex-grow-1">
					<div>
						John Leider placed this order on Online Store (checkout #1937432132572).
					</div>
					<div class="flex-shrink-0">
						15:25 EDT
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
	setup() {
		const events = reactive([])
		const input = ref(null)
		const nonce = ref(0)

		const timeline = computed(() => {
			return events.slice().reverse()
		})

		const comment = () => {
			const time = (new Date()).toTimeString()
			events.push({
				id: nonce.value++,
				text: input.value,
				time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
					return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
				}),
			})

			input.value = null
		}
		const getRandomDotColor = () => {
			// определяю геттер внутри функции, чтобы избежать кеширования его результата
			console.log('Вызов')
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
			console.log('colorPalette', colorPalete)
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