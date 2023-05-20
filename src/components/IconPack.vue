<template>
	<div class="icon-pack fade-enter-active fade-leave-active">
		<div class="icon-pack-title">Выберите иконку</div>
		<div class="pt-0 d-flex flex-wrap justify-center">
			<div
				v-for="icon, i in icons"
				:key="icon"
				class="icon-pack-body"
			>
				<img
					:src="getImageUrl(icon)"
					alt="Icon"
				>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
// import { fileURLToPath, URL } from 'node:url'


export default {
	setup() {
		const icons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49']
		// это взято из офф документации
		function getImageUrl(name) {
			return new URL(`/src/icons/viking-icons-48px/${name}.webp`, import.meta.url).href
		}
		// это тоже работает
		// function getImageUrl(name) {
		// 	return `/src/icons/viking-icons-48px/${name}.webp`
		// }



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
			icons,
			getImageUrl,
		}
	}
}
</script>

<style lang="scss">
.icon-pack {
	// padding-right: 20px;
}

.icon-pack-body {
	padding: 5px;
}

.icon-pack-title {
	margin-bottom: 15px;
}

.fade-enter-active {
	animation: fadeIn 0.5s;
}

// .fade-leave-active {
// 	animation: fadeOut 2s;
// }

@keyframes fadeIn {
	from {
		// opacity: 0;
		// transform: translateY(-100%);
		overflow: hidden;
		max-height: 0;
	}

	to {
		// opacity: 1;
		// transform: translateY(100%);
		max-height: 500px;
		// overflow: hidden;
	}
}

@keyframes fadeOut {
	from {
		// opacity: 1;
		// transform: translateY(100%);
		max-height: 500px;
	}

	to {
		// opacity: 0;
		// transform: translateY(-100%);
		max-height: 0;
	}
}
</style>