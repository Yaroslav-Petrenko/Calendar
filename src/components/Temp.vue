<template>
	<v-sheet
		width="400"
		class="mx-auto"
	>

		<v-form ref="form">
			<!-- <v-text-field
				v-model="text"
				:counter="300"
				:rules="textRules"
				label="Текст заметки"
				required
			></v-text-field> -->

			<v-textarea
				label="Текст заметки"
				variant="solo-filled"
				v-model="text"
				:counter="300"
				:rules="textRules"
				required
			></v-textarea>
			<div class="modal-icon">
				<img
					src="../icons/modal/social-engagement.webp"
					alt=""
				/>
			</div>
			<!-- <v-select
				v-model="select"
				:items="items"
				:rules="[v => !!v || 'Item is required']"
				label="Item"
				required
			></v-select> -->

			<v-checkbox
				v-model="checkbox"
				label="Поместить в начало"
			></v-checkbox>

			<div class="d-flex flex-column">
				<v-btn
					color="success"
					class="mt-4"
					block
					@click="validate"
				>
					Добавить
				</v-btn>

				<v-btn
					color="error"
					class="mt-4"
					block
					@click="reset"
				>
					Очистить
				</v-btn>
			</div>
		</v-form>
	</v-sheet>
</template>

<script>
export default {
	data: () => ({
		valid: true,
		text: '',
		textRules: [
			v => !!v || 'Текст обязателен',
			v => (v && v.length <= 300) || 'Не более 300 символов',
		],
		select: null,
		items: [
			'Item 1',
			'Item 2',
			'Item 3',
			'Item 4',
		],
		checkbox: true,
	}),

	methods: {
		async validate() {
			const { valid } = await this.$refs.form.validate()

			if (valid) alert('Form is valid')
		},
		reset() {
			this.$refs.form.reset()
		},
		resetValidation() {
			this.$refs.form.resetValidation()
		},
	},
}
</script>

<style lang="scss">
.modal-icon {
	position: absolute;
	width: 64px;
	height: 64px;
	top: 80px;
	right: 4px;
}

#textarea {
	// &::before {
	// 	content: 'Hello';
	// 	background: url('../icons/modal/social-engagement.webp') 0 0 / 100% no-repeat;
	// 	;
	// 	width: 64px;
	// 	height: 64px;
	// 	position: relative;
	// top: 0;
	// left: 0;
	// z-index: 999;
	// }
}
</style>