<template>
	<transition name="cbxFade">
		<div
			key="icon-pack"
			class="icon-pack"
		>
			<!-- <transition name="cbxFade"> -->
			<v-checkbox
				key="checkbox"
				v-model="cbxRandonIcon"
				label="Случайная иконка"
				density="compact"
				color="info"
			></v-checkbox>
			<!-- </transition> -->
			<transition name="fadeIcon">
				<div
					v-show="!cbxRandonIcon"
					class="icon-block"
				>
					<div class="icon-pack-title">Выберите иконку для заметки</div>
					<v-btn-toggle
						class="button-togle"
						v-model="iconToggle"
						selected-class="select-item"
					>
						<div class="pt-0 d-flex flex-wrap justify-center">
							<div
								v-for="icon in iconsName"
								:key="icon"
								class="icon-pack-body"
							>
								<v-btn
									class="icon-button"
									stacked
									variant="text"
									:value="icon"
									@click="emitSelectedIcon(icon)"
								>
									<img
										:src="getImageUrl(icon)"
										class="icon-pack-img"
										alt="Icon"
									>
								</v-btn>
							</div>
						</div>
					</v-btn-toggle>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
import { ref, computed } from 'vue'
// import { fileURLToPath, URL } from 'node:url'


export default {
	setup(_, { emit }) {
		const iconsName = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49']
		// это взято из офф документации
		function getImageUrl(name) {
			return new URL(`/src/icons/viking-icons-54px/${name}.webp`, import.meta.url).href
		}
		// function getRandomIco() {
		const rndIcon = iconsName[Math.floor(Math.random() * iconsName.length)]
		emit('selectedIcon', rndIcon)
		// const path = new URL(`/src/icons/viking-icons-48px/${rndIcon}.webp`, import.meta.url).href
		// return path
		// }
		const cbxRandonIcon = ref(false)

		// это тоже работает
		// function getImageUrl(name) {
		// 	return `/src/icons/viking-icons-48px/${name}.webp`
		// }
		const iconToggle = ref('none')
		const emitSelectedIcon = (id) => {
			emit('selectedIcon', id)
		}




		/* // const num = '51'
		// const num2 = new URL('1', import.meta.url)
		// const module2 = await import(`@/icons/viking-icons-48px/${num}.webp`)

		// const path = new URL(`@/icons/viking-icons-48px/1.webp`, import.meta.url).href
		// const path = new URL(`@/icons/viking-icons-48px/${num}.webp`, import.meta.url).href
		// const path2 = '@/icons/viking-icons-48px/1.webp'

		// const getIcons = () => {
		// 	const rndIcon = icons[Math.floor(Math.random() * icons.length)]
		// 	const path = new URL(`@/icons/viking-icons-48px/${rndIcon}.webp`, import.meta.url).href
		// 	return path
		// }

		// function getImageUrl(name) {
		// 	return new URL(`./dir/${name}.png`, import.meta.url).href
		// }

		// function getImageUrl2(name) {
		// 	return await import(`./icons/viking-icons-48px/${name}.webp`)
		// }

		// async function getImageUrl3(name) {
		// 	const image = await import(`@/icons/viking-icons-48px/${name}.webp`);
		// 	return image;
		// }
		// const imageUrl = new URL(`@/icons/viking-icons-48px/${num}.webp`, import.meta.url).href

		// const imageUrl = new URL('@/icons/viking-icons-48px/' + num + '.webp', import.meta.url).href


		// ошибок нет но изображения битые
		// const getImageUrl4 = (name) => {
		// 	const image = import(`@/icons/viking-icons-48px/${name}.webp`);
		// 	return image.then((module) => module.default); */
		// };

		return {
			iconsName,
			getImageUrl,
			iconToggle,
			emitSelectedIcon,
			cbxRandonIcon
		}
	}
}
</script>

<style lang="scss">
.icon-pack {
	// padding-right: 20px;
	overflow: hidden;
}

.icon-pack-body {
	// padding: 5px;
	border-radius: 3px;
}

.icon-pack-title {
	margin-bottom: 15px;
}

.v-btn-group.button-togle {
	// height: 420px;
	height: 100%;
}

.v-btn.icon-button {
	min-height: 48px;
	min-width: 48px;
	height: 60px;
	padding: 6px;
}

.select-item {
	color: #FAFAFA;
	--v-activated-opacity: 0.2;
}

// анимация для checkbox
.cbxFade-enter-active {
	animation: cbxFadeIn 0.5s linear;
}

.cbxFade-leave-active {
	animation: cbxFadeIn 0.5s linear reverse;
}

.icon-pack-img {
	height: 48px;
	width: 48px;
}


@keyframes cbxFadeIn {
	from {
		// overflow: hidden;
		max-height: 0px;
	}

	to {
		// overflow: hidden;
		max-height: 420px;
	}
}


// анимация для блока icon
.fadeIcon-enter-active {
	animation: iconFadeIn 0.5s linear;
}

.fadeIcon-leave-active {
	animation: iconFadeIn 0.5s linear reverse;
}


@keyframes iconFadeIn {
	from {
		// overflow: hidden;
		max-height: 0px;
	}

	to {
		// overflow: hidden;
		max-height: 420px;
	}
}

// //////////////////////////////////////////////////////////////////
// .cbxFade2-enter-active {
// 	animation: cbxFadeIn2 0.2s linear;
// }

// .cbxFade2-leave-active {
// 	animation: cbxFadeIn2 0.2s linear reverse;
// }


// @keyframes cbxFadeIn2 {
// 	from {
// 		// overflow: hidden;
// 		max-height: 0px;
// 	}

// 	to {
// 		// overflow: hidden;
// 		max-height: 62px;
// 	}
// }

// .bounce-enter-active {
//   animation: bounce-in 0.5s;
// }
// .bounce-leave-active {
//   animation: bounce-in 0.5s reverse;
// }
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.25);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
</style>