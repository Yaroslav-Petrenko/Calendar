<template>
	<div class="pt-8">
		<img
			v-for="icon, i in icons"
			:key="icon"
			:src="getImageUrl(icon)"
			alt="Icon"
		>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
// import { fileURLToPath, URL } from 'node:url'


export default {
	setup() {
		const icons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']

		// const getIcons = () => {
		// 	const rndIcon = icons[Math.floor(Math.random() * icons.length)]
		// 	const path = new URL(`@/icons/viking-icons-48px/${rndIcon}.webp`, import.meta.url).href
		// 	return path
		// }

		const num = '51'
		const num2 = new URL('1', import.meta.url)
		// const module2 = await import(`@/icons/viking-icons-48px/${num}.webp`)

		// const path = new URL(`@/icons/viking-icons-48px/1.webp`, import.meta.url).href
		const path = new URL(`@/icons/viking-icons-48px/${num}.webp`, import.meta.url).href

		// const path2 = '@/icons/viking-icons-48px/1.webp'

		async function loadImage() {
			const imagePath = new URL(`@/icons/viking-icons-48px/${num}.webp`, import.meta.url).href;
			const image = await import(imagePath);
			// Используйте загруженное изображение здесь
			return image;
		}

		// const imageUrl = new URL(`@/icons/viking-icons-48px/${num}.webp`, import.meta.url).href

		// const imageUrl = new URL('@/icons/viking-icons-48px/' + num + '.webp', import.meta.url).href

		// это взято из офф документации
	function getImageUrl(name) {
	return new URL(`/src/icons/viking-icons-48px/${name}.webp`, import.meta.url).href
	}

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


		// ошибок нет но изображения битые
		const getImageUrl4 = (name) => {
			const image = import(`@/icons/viking-icons-48px/${name}.webp`);
			return image.then((module) => module.default);
		};


		return {
			// getIcons,
			icons,
			path,
			loadImage,
			// imageUrl,
			getImageUrl,
			// getImageUrl2,
			// getImageUrl3,
			getImageUrl4
			// module2
			// path2
		}
	}
}
</script>

<style lang="scss"></style>