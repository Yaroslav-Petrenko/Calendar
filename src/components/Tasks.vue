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
					class="task-item d-flex align-center"
				>
					<v-checkbox
						class="task-checkbox pr-1 flex-grow-0"
						hide-details="true"
						density="compact"
						color="info"
					></v-checkbox>
					<v-card-text class="task-text flex-grow-1">
						{{ item.text }}
					</v-card-text>
				</div>
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
				textField {{ textField }}

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
		id: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
	},
	setup(props) {
		const store = useStore()
		const id = toRef(props, 'id')
		const textField = ref('Выгулять девушку')


		const createTask = () => {
			store.dispatch('tasks/createTask', {
				text: textField.value,
				id: id.value
			})
		}


		return {
			textField,
			createTask
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