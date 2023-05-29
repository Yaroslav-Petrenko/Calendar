<template>
	<transition>
		<v-col
			cols="12"
			md="4"
			class="d-flex"
		>
			<v-card :class="`flex-grow-1 pa-2 d-flex flex-column note`">

				<v-card-title class="task-title">
					{{ date }}
				</v-card-title>

				<div
					v-for="item in tasks"
					:key="item.id"
					class="task-item d-flex align-center"
				>
					<v-checkbox
						:model-value="item.complited"
						@change="setCheckbox(cardId, item.id)"
						class="task-checkbox pr-1 flex-grow-0"
						hide-details="true"
						density="compact"
						color="info"
						:label="item.text"
					></v-checkbox>
					<!-- item.complited {{ item.complited }} -->
					<!-- <v-card-text class="task-text flex-grow-1">
						{{ item.text }}
					</v-card-text> -->
					<!-- <v-label class="task-text flex-grow-1">
						{{ item.text }}
					</v-label> -->
				</div>
				<!-- selected {{ selected }} -->

				<div class="d-flex align-center">
					<v-text-field
						v-model="textField"
						class="mr-3"
						label="Label"
						variant="underlined"
					></v-text-field>
					<v-btn
						variant="flat"
						icon="$plus"
						color="light-blue-darken-3"
						size="small"
						@click="createTask()"
					>
					</v-btn>

				</div>
				<!-- textField {{ textField }} -->

				<!-- <v-card-item class="notes-item flex-grow-1 align-content-space-between">
					<div class="">
						<div class="note-body d-flex">
							<div class="card-title-text align-self-stretch">
								Date {{ date }}
							</div>
							<div class="flex-1-1 note-text">{{ text }}</div>
							<div class="icon">
								<img
									:src="`/src/icons/viking-icons-48px/${icon}.webp`"
									alt=""
								/>
							</div>
						</div>

					</div>
				</v-card-item> -->

				<v-card-actions class="justify-space-between pl-1">
					<v-btn
						variant="flat"
						color="green-darken-2"
						size="small"
						@click="dispArchive(id)"
					>
						всё сделано
					</v-btn>
					<v-btn
						variant="plain"
						color="amber-accent-4"
						size="small"
						@click="dispArchive(id)"
					>
						в архив
					</v-btn>
				</v-card-actions>
				<!-- id {{ id }} -->
				<!-- date {{ date }} -->
			</v-card>
		</v-col>
	</transition>
</template>

<script>
import { ref, reactive, computed, onMounted, toRef } from 'vue'
import { useStore } from 'vuex'
// import { props } from 'vue'
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
		date: {
			type: String,
			required: true
		},
		// cards: {
		// 	type: Object,
		// 	required: true
		// },
	},
	setup(props) {
		const store = useStore()
		const cardId = toRef(props, 'cardId')
		const textField = ref('Выгулять девушку')


		const createTask = () => {
			console.log('cardId', cardId.value)
			store.dispatch('tasks/createTask', {
				text: textField.value,
				cardId: cardId.value
			})
			textField.value = ''
		}

		// const selected = ref([])
		const setCheckbox = (cardId, taskId) => {
			// console.log('cardId', cardId)
			// console.log('taskId', taskId)
			store.dispatch('tasks/setCheckbox', { cardId, taskId })
		}


		return {
			textField,
			createTask,
			// selected,
			setCheckbox
		}

	}


}
</script>

<style lang="scss">
.task-item {
	// margin: 5px 0 5px 0;
	margin: 0 0 0 0;
}

.task-title.v-card-title {
	line-height: 120%;
	padding: 0;
	margin-bottom: 10px;
}

.task-text.v-card-text {
	padding: 0;
	font-size: 18px;
}
</style>
