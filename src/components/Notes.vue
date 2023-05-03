<template>
	<v-col
		cols="12"
		md="4"
	>
	<!-- max-width="344" -->
		<v-card
			variant="outlined"
		>
			<v-card-item>
				<div>
					<div class="text-overline mb-1">
						{{ subTitle }}
					</div>
					<div class="text-h6 mb-1">
						{{ title }}
					</div>
					<div class="text-caption">
						{{ text }}</div>
				</div>
			</v-card-item>
			<v-card-actions>
				<v-btn variant="outlined">
					30 MIN
				</v-btn>
				<v-btn variant="outlined">
					15 MIN
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-col>
</template>

<script>
import { ref, reactive, computed } from 'vue'
// import { props } from 'vue'
export default {
	props: {
		subTitle: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},

	},
	setup(props) {
		console.log('props:', props);
		console.log('props.subTitle', props.subTitle);

		return {
			// subTitle
		}

	}

	
}
</script>

<style></style>
