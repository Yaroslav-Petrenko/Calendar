<template>
	<v-card>
		<v-toolbar color="grey-darken-3">
			<!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
			<v-toolbar-title>Calendar</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>

			<template v-slot:extension>
				<v-tabs
					v-model="tab"
					align-tabs="title"
					bg-color="grey-darken-3"
					selected-class="red"
				>
					<v-tab
						v-for="item in items"
						:key="item"
						:value="item"
						variant="plain"
					>
						{{ item }}
					</v-tab>
					<!-- <v-tab>One</v-tab> -->
				</v-tabs>
			</template>

		</v-toolbar>
		<v-window v-model="tab">
			<v-window-item
				v-for="item in items"
				:key="item"
				:value="item"
			>
				<v-card flat>
					Hellol
					<v-card-text v-text="text"></v-card-text>
				</v-card>
			</v-window-item>
		</v-window>

		<!-- <v-window v-model="One">
				<v-window-item
					value="One"
				>
					<v-card flat>
						<v-card-text>Personal item text</v-card-text>
					</v-card>
				</v-window-item>
			</v-window> -->

		{{ tab }}
	</v-card>
</template>

<script>
import { ref, reactive, computed } from 'vue'
export default {
	setup() {
		const tab = ref(null)
		const items = [
			'Заметки', 'Задачи', 'Цели',
		]
		const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'




		return {
			items,
			text,
			tab
		}
	}
}
</script>

<style>


/* ниже рабоатет для выделенного таба */
	/* .v-tab--selected {
		font-weight: 700;
	} */

</style>
