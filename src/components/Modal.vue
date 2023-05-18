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
				<template v-slot:default="{isActive}">
					<v-card>
						<v-toolbar
							color="#7858d7"
							title="Добавьте заметку"
						></v-toolbar>
						<v-card-text>
							<NoteForm
								@closeModal="isActive.value = false"
							/>
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
		</v-col>
	</v-row>
</template>

<script>
import NoteForm from './NoteForm.vue'
import { reactive, ref } from 'vue'
export default {

	components: {
		NoteForm
	},
	// props: {
	// 	setActive: {
	// 		type: Object,
	// 		required: true
	// 	},
	// },
	setup(props, context) {
		console.log('context', context.slots.default())
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
			console.log('isActive work')
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