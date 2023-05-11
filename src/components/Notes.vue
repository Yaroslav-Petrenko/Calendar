<template>
	<v-col
		cols="12"
		md="4"
		class="d-flex"
	>
		<!-- max-width="344" -->
		<v-card
			id="card"
			class="pa-3 d-flex flex-column "
			color="#27272f"
		>
			<v-card-item class="pa-1 flex-1-0 align-content-space-between">
				<div class="">
					<div class="card-body d-flex">
						<!-- <div class="text-overline mb-1 text-h1">
							<span class="sub-title">{{ subTitle }}</span>
						</div> -->
						<!-- <div class="card-title-text align-self-stretch">
							{{ title }}
						</div> -->
						<div class="card-text">{{ text }}</div>
						<div class="icon">
							<img
								src="./09.webp"
								alt=""
							/>
						</div>
					</div>

				</div>
			</v-card-item>
			<v-card-actions>
				<v-btn
					variant="flat"
					color="#465af7"
				>
					Done
				</v-btn>
				<v-btn
					variant="flat"
					color="amber-darken-2"
				>
					archive
				</v-btn>
				<!-- Random id {{ getRandomIco }} -->
			</v-card-actions>
		</v-card>
	</v-col>
</template>

<script>
import { ref, reactive, computed } from 'vue'
// import { props } from 'vue'
export default {
	props: {
		// subTitle: {
		// 	type: String,
		// 	required: true
		// },
		title: {
			type: String,
			// required: true
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

<style lang="scss">
#card {
	border-bottom: 8px solid #7858d7;
}

.sub-title {
	/* font-size: 23px; */
}

.card-title-text {
	/* font-family: 'Open Sans', sans-serif; */
	font-weight: 500;
	font-size: 1.44rem;
	line-height: 1.3;
	// color:#fff;
}

.card-text {
	color: #fff;
	padding: 10px;

}

.card-body {}

.icon {
	/* background: url('../icons/01.png') 100% 0 / cover no-repeat; */
	position: relative;
	left: 0px;
	top: 0px;
	// overflow: hidden;
	width: 64px;
	height: 64px;
	margin-left: 20px;
}
</style>
