<template>
	<v-col
		cols="12"
		md="4"
	>
		<!-- max-width="344" -->
		<v-card variant="outlined" >
			<v-card-item class="pa-2">
				<div class="d-flex">
					<div class="card-body flex-grow-1">
						<div class="text-overline mb-1">
							{{ subTitle }}
						</div>
						<div class="text-h6 mb-1">
							{{ title }}
						</div>
						<div class="text-caption">
							{{ text }}</div>
					</div>
					<div class="icon">
						<img
							:src="getRandomIco"
							alt=""
						/>
					</div>
				</div>
			</v-card-item>
			<v-card-actions>
				<v-btn variant="outlined">
					30 MIN
				</v-btn>
				<v-btn variant="outlined">
					15 MIN
				</v-btn>
				Random id {{ getRandomIco }}
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
	setup() {
		// console.log('props:', props);
		// console.log('props.subTitle', props.subTitle);
		const getRandomIco = computed(() => {
			const randomNumber = Math.floor(Math.random() * 10 + 1)
			const res = `../icons/webp/${("0" + randomNumber).slice(-2)}.webp`;
			console.log(res)
			// return `../icons/webp/${("0" + randomNumber).slice(-2)}.webp`;
			return "09.webp";
		})

		return {
			getRandomIco
		}

	}


}
</script>

<style>
.card-body {}

.icon {
	/* background: url('../icons/01.png') 100% 0 / cover no-repeat; */
	position: relative;
	left: 0px;
	top: 0px;
	overflow: hidden;
	width: 64px;
	height: 64px;
}
</style>
