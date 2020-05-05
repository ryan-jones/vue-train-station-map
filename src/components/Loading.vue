<template>
	<div class="loading">
		<p>Currently loading {{ text }}...</p>
	</div>
</template>

<script>
export default {
	name: "Loading",
	props: ["text"]
};
</script>

<style scoped>
.loading {
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
}
</style>