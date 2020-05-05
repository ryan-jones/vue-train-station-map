<template>
	<div id="app">
		<Header />
		<BodyLayout />
	</div>
</template>

<script>
	import BodyLayout from "./layout/BodyLayout.vue";
	import Header from "./layout/Header.vue";

	export default {
		name: "App",
		components: {
			Header,
			BodyLayout,
		},
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	#app {
		background-color: lightgrey;
	}
</style>
