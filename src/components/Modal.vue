<template>
	<!-- <v-row> -->
	<!-- <v-col cols="auto"> -->
	<v-dialog
		transition="dialog-top-transition"
		width="auto"
	>
		<template v-slot:activator="{ props }">
			<v-btn
				color="#465af7"
				v-bind="props"
				class="ml-3"
				height="47px"
				size="large"
			>Добавить {{ buttonText }}</v-btn>
		</template>
		<template v-slot:default="{ isActive }">
			<v-card >
				<v-toolbar
					color="#7858d7"
					:title="'Добавить ' + buttonText"
				></v-toolbar>
				<v-card-text>

					<slot name="modal-content" :isActive="isActive">

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
	<!-- </v-col> -->
	<!-- </v-row> -->
</template>

<script>
// import NoteForm from './NoteForm.vue'
import { reactive, ref } from 'vue'
export default {
	// components: {
	// 	NoteForm
	// },
	props: {
		buttonText: {
			type: String,
			required: true
		},
		// modelValue
	},
	setup(props, context) {
		// console.log('context', context.slots.default())
		// const someValue = 42
		// const isActive = ref('');
		// console.log('isActive', isActive)

		const isActive = ref(true);

		// // Проверяем наличие isActive в слоте


		// 	const { isActive: slotIsActive } = context.slots.default();
		// 	// console.log('slotIsActive', slotIsActive)
		// 	isActive.value = slotIsActive;



		// let active = ref(true)
		const setActive = () => {
			// console.log('isActive work')
			// active = false
		}

		return {
			// someValue,
			// isActive,
			// setActive
		}
	}
}
</script>

<style>
/* .v-card.v-theme--dark.v-card--density-default.v-card--variant-elevated::-webkit-scrollbar {
	scrollbar-width: 4px;
	scrollbar-color: #4b4b55;
	
}
.v-card.v-theme--dark.v-card--density-default.v-card--variant-elevated {
	scrollbar-color: #6969dd #e0e0e0;
  scrollbar-width: thin;
	
}

html {
    scrollbar-color: #6969dd #e0e0e0;
    scrollbar-width: thin;
} */

::-webkit-scrollbar {
	width: 4px;
	/* ширина для вертикального скролла */
	height: 4px;
	/* высота для горизонтального скролла */
	background-color: #383B42;
}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
	background: linear-gradient(to bottom, #9B8BFD, #00B3FE);
	/* border-radius: 9em;
	box-shadow: inset 1px 1px 10px #f3faf7; */
}

::-webkit-scrollbar-thumb:hover {
	background-color: #253861;
}
</style>