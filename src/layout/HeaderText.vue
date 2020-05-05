<template>
	<div class="text">
		<h1 class="text__title">{{ title }}</h1>
		<h3 class="text__sub-title">{{ subtitle }}</h3>
	</div>
</template>

<script>
export default {
	name: "HeaderText",
	props: {
		title: {
			type: String,
			required: true
		},
		subtitle: {
			type: String,
			required: true
		}
	}
};
</script>

<style scoped>
.text {
	color: #fff;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.text__title {
	text-transform: uppercase;
	margin: 15px auto;
	text-align: center;
	font-family: "Raleway Black", Helvetica, sans-serif;
	font-size: 64px;
	width: 55%;
	margin-bottom: 36px;
}
.text__sub-title {
	font-family: "Raleway Extrabold", helvetica, sans-serif;
	font-size: 20px;
	text-transform: uppercase;
	margin-bottom: 30px;
	width: 65%;

	text-align: center;
}
</style>