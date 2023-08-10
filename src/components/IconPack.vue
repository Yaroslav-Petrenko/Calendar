<template>
	<transition name="cbxFade">
		<div class="icon-pack">
			<v-checkbox
				v-model="cbxRandonIcon"
				key="checkbox"
				label="Случайная иконка"
				density="compact"
				color="info"
			></v-checkbox>
			<transition name="fadeIcon">
				<div v-show="!cbxRandonIcon">
					<div class="icon-pack__title">Выберите иконку для заметки</div>
					<v-btn-toggle
						v-model="iconToggle"
						class="icon-pack__button-togle"
						selected-class="icon-pack__selected-item"
					>
						<div class="pt-1 d-flex flex-wrap justify-center">
							<div
								v-for="icon in iconsName"
								:key="icon"
								class="icon-pack__body"
							>
								<v-btn
									class="icon-pack__button"
									stacked
									variant="text"
									:value="icon"
									@click="emitSelectedIcon(icon)"
								>
									<img
										:src="getImageUrl(icon)"
										class="icon-pack__img"
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
import { ref } from 'vue'

export default {
	setup(_, { emit }) {
		const iconsName = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49']

		const cbxRandonIcon = ref(false)
		const iconToggle = ref('1')

		// взято из офф документации
		function getImageUrl(name) {
			return new URL(`/src/icons/viking-icons-54px/${name}.webp`, import.meta.url).href
		}
		const rndIcon = iconsName[Math.floor(Math.random() * iconsName.length)]
		emit('selectedIcon', rndIcon)

		const emitSelectedIcon = (id) => {
			emit('selectedIcon', id)
		}

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
// анимация border для выбранной иконки 
@property --border-angle {
	syntax: "<angle>";
	inherits: true;
	initial-value: 0turn;
}

.icon-pack {
	overflow: hidden;

	// .icon-pack__body 
	&__body {
		// border-radius: 3px;
	}

	// .icon-pack__title
	&__title {
		margin-bottom: 11px;
	}

	// .icon-pack__selected-item
	&__selected-item {
		// color: #FAFAFA;
		// border-radius: 13px;
		// --v-activated-opacity: 0.15;
		// // border: 1px solid black;
		// border: 3px dotted transparent;
		// /* Устанавливаем ширину границы и делаем её прозрачной */
		// border-image: linear-gradient(to right, #9B8BFD, #00B3FE);
		// /* Линейный градиентный border */
		// border-image-slice: 1;
		// // border-style: dotted;
		// /* Устанавливаем значение для разделения изображения границы */


		--border-size: 1px;
		--border-angle: 0turn;
		// width: 60vmin;
		// height: 50vmin;
		background-image: conic-gradient(from var(--border-angle),
				#213,
				#112 50%,
				#213),
			conic-gradient(from var(--border-angle), transparent 20%, #08f, #f03);
		background-size: calc(100% - (var(--border-size) * 2)) calc(100% - (var(--border-size) * 2)),
			cover;
		background-position: center center;
		background-repeat: no-repeat;

		animation: bg-spin 3s linear infinite;

		@keyframes bg-spin {
			to {
				--border-angle: 1turn;
			}
		}

	}

	// .icon-pack__button.v-btn
	&__button.v-btn {
		min-height: 48px;
		min-width: 48px;
		height: 60px;
		padding: 6px;
	}

	// .icon-pack__img
	&__img {
		height: 48px;
		width: 48px;
	}

	// .icon-pack__button-togle.v-btn-group
	&__button-togle.v-btn-group {
		height: 100%;
	}
}

// .icon-pack__button-togle.v-btn-group {
// 	height: 100%;
// }


// .icon-pack__body {
// 	border-radius: 3px;
// }

// .icon-pack__title {
// 	margin-bottom: 15px;
// }

// .icon-pack__button.v-btn {
// 	min-height: 48px;
// 	min-width: 48px;
// 	height: 60px;
// 	padding: 6px;
// }

// .icon-pack__selected-item {
// 	color: #FAFAFA;
// 	--v-activated-opacity: 0.2;
// 	// border: 1px solid black;
// }

// .icon-pack__img {
// 	height: 48px;
// 	width: 48px;
// }


//------------------------------АНИМАЦИИ----------------------------------------
// анимация для checkbox
.cbxFade-enter-active {
	animation: cbxFadeIn 0.5s linear;
}

.cbxFade-leave-active {
	animation: cbxFadeIn 0.5s linear reverse;
}

@keyframes cbxFadeIn {
	from {
		max-height: 0px;
	}

	to {
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
		max-height: 0px;
	}

	to {
		max-height: 420px;
	}
}
</style>