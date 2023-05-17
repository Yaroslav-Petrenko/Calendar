<template>
	<v-col
		cols="12"
		md="3"
		class="d-flex"
	>
		<!-- max-width="344" -->
		<v-card
			:class="`flex-grow-1 pa-2 d-flex flex-column note ${color}`"
			color="#27272f"
		>
			<v-card-item class="pa-1 flex-grow-1 align-content-space-between">
				<div class="">
					<div class="note-body d-flex">
						<!-- <div class="text-overline mb-1 text-h1">
							<span class="sub-title">{{ subTitle }}</span>
						</div> -->
						<!-- <div class="card-title-text align-self-stretch">
							{{ title }}
						</div> -->
						<div class="flex-1-1 note-text">{{ text }}</div>
						<div class="icon">
							<img
								src="../icons/viking-icons-48px/31.webp"
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
			<!-- getRandomColor {{ getRandomColor }} -->
		</v-card>
	</v-col>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
// import { props } from 'vue'
export default {
	props: {
		// subTitle: {
		// 	type: String,
		// 	required: true
		// },
		color: {
			type: String,
			// required: true
		},
		text: {
			type: String,
			required: true
		},

	},
	setup() {
		// const vCard = ref(null)
		// onMounted(() => {
		// 	note.value.style.border = `8px solid ${getRandomColor}`
		// })

		// const colorPalete = ['purple', 'green', 'blue', 'orange', 'grey']
		// const getRandomColor = computed(() => {
		// 	return colorPalete[Math.floor(Math.random() * colorPalete.length)]
		// })
		// console.log('props:', props);
		// console.log('props.subTitle', props.subTitle);
		const getRandomIco = computed(() => {
			const randomNumber = Math.floor(Math.random() * 10 + 1)
			const res = `../icons/webp/${("0" + randomNumber).slice(-2)}.webp`;
			// console.log(res)
			// return `../icons/webp/${("0" + randomNumber).slice(-2)}.webp`;
			return "09.webp";
		})

		return {
			getRandomIco,
			// getRandomColor,
			// vCard
		}

	}


}
</script>

<style lang="scss">
.sub-title {
	/* font-size: 23px; */
}

.note-title-text {
	/* font-family: 'Open Sans', sans-serif; */
	font-weight: 500;
	font-size: 1.44rem;
	line-height: 1.3;
	// color:#fff;
}

.note-text {
	color: #fff;
	padding: 10px;
}

.note-body {}

.icon {
	/* background: url('../icons/01.png') 100% 0 / cover no-repeat; */
	position: relative;
	left: 0px;
	top: 0px;
	// overflow: hidden;
	width: 48px;
	height: 48px;
	margin-left: 20px;
}

.v-card.note {
	border: 2px solid transparent;
	border-bottom: 8px solid transparent;
	transition: all .225s ease-in-out;
	// padding: 8px;
}

.v-card.purple {
	border-bottom-color: #7858d7;

	&:hover {
		border-color: #7858d7;
	}
}

.v-card.green {
	border-bottom-color: #5baa73;

	&:hover {
		border-color: #5baa73;
	}
}

.v-card.blue {
	border-bottom-color: #465af7;

	&:hover {
		border-color: #465af7;
	}

}

.v-card.orange {
	border-bottom-color: #f4a965;

	&:hover {
		border-color: #f4a965;
	}
}

.v-card.grey {
	border-bottom-color: #7E7E7E;

	&:hover {
		border-color: #7E7E7E;
	}
}
</style>
