<template>
	<div class="overlay">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "TextOverlay"
};
</script>

<style scoped>
.overlay {
	position: absolute;
	top: 0;
	left: 0;
	height: inherit;
	width: 100%;
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(51, 51, 51, 0.8);
}
</style>