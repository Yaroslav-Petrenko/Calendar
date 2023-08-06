<template>
	<v-dialog
		transition="dialog-top-transition"
		width="auto"
	>
		<template v-slot:activator="{ props }">
			<slot
				name="modal-open-button"
				:props="props"
			>
				<v-btn
					color="#465af7"
					v-bind="props"
					class="ml-3"
					height="47px"
					size="large"
				>
					{{ buttonText }}
				</v-btn>
			</slot>
		</template>
		<template v-slot:default="{ isActive }">
			<v-card>
				<v-toolbar
					color="#7858d7"
					:title="buttonText"
				></v-toolbar>
				<v-card-text>
					<slot
						name="modal-content"
						:isActive="isActive"
					>
					</slot>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn
						variant="text"
						@click="isActive.value = false"
					>Закрыть</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script>
export default {
	props: {
		buttonText: {
			type: String,
			required: true
		},
	},
}
</script>

<style>
/* стили для скроллбара */
::-webkit-scrollbar {
	/* ширина для вертикального скролла */
	width: 4px;
	/* высота для горизонтального скролла */
	height: 4px;
	background-color: #383B42;
}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
	background: linear-gradient(to bottom, #9B8BFD, #00B3FE);
}

::-webkit-scrollbar-thumb:hover {
	background-color: #253861;
}
</style>