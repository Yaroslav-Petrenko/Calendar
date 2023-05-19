<template>
	<div class="pt-8">
		<img
			v-for="icon in icons"
			:src="path"
			alt="Icon"
		>
	</div>
</template>

<script>
import { ref, computed } from 'vue'


export default {
	setup() {
		const icons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']

		const getIcons = () => {
			// const rndIcon = icons[Math.floor(Math.random() * icons.length)]
			// return  import.meta.rollupPluginUrl(`../icons/viking-icons-48px/1.webp`)
		}

		const path = new URL(`../icons/viking-icons-48px/1.web`, import.meta.url).href

		const path2 = '../icons/viking-icons-48px/1.web'

		return {
			getIcons,
			icons,
			path
		}
	}
}
</script>

<style lang="scss"></style>