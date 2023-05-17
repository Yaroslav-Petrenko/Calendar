<template>
	<v-row>
		<v-col cols="auto">
			<v-dialog
				transition="dialog-top-transition"
				width="auto"
			>
				<template v-slot:activator="{ props }">
					<v-btn
						color="#465af7"
						v-bind="props"
						class="ml-3"
						size="large"
					>Добавить заметку</v-btn>
				</template>
				<template v-slot:default="{ isActive }">
					<v-card>
						<v-toolbar
							color="#7858d7"
							title="Добавьте заметку"
						></v-toolbar>
						<v-card-text>
							<slot :isActive="isActive" name="modal-content"></slot>
						</v-card-text>
						<v-card-actions class="justify-end">
							<v-btn
								variant="text"
								@click="isActive.value = false"
							>Закрыть</v-btn>
							<!-- <slot :isActive="isActive"></slot> -->
							<!-- <pre>setActive {{ setActive }}</pre>
								<pre>isActive {{ isActive }}</pre>
								<pre>someValue {{ someValue }}</pre> -->
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
	</v-col>
</v-row>
</template>

<script>
export default {
	props: {
		setActive: {
			type: Object,
			required: true
		},
	},
	setup(props, context) {
		// console.log('context', context)
		const someValue = 42

		return {
			someValue
		}
	}
}
</script>