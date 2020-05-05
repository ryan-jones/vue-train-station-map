<template>
	<header class="header">
		<div class="header__banner">
			<img class="header__img" :src="image" alt="header" />
			<TextOverlay>
				<HeaderText :title="title" :subtitle="subtitle" />
			</TextOverlay>
		</div>
	</header>
</template>

<script>
import TextOverlay from "./TextOverlay.vue";
import HeaderText from "./HeaderText.vue";
import image from "../assets/vue-background.png";

export default {
	name: "Header",
	components: {
		TextOverlay,
		HeaderText
	},
	data() {
		return {
			image,
			title: "Explore Swiss Railway Stations",
			subtitle:
				"An Interactive Map That Lets You Explore The Dense Network Of Railway Stations in Switzerland"
		};
	}
};
</script>

<style scoped>
.header {
	width: 100%;
	height: 859px;
	background-color: #d13833;
}

.header__banner {
	height: 768px;
}

.header__img {
	height: 100%;
	width: 100%;
}
</style>
