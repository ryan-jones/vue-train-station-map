<template>
	<div class="body-layout">
		<StationView />
	</div>
</template>


<script>
import StationView from "../components/StationView.vue";

export default {
	name: "BodyLayout",
	components: {
		StationView
	}
};
</script>

<style scoped>
.body-layout {
	height: 100%;
	background-color: "#F5F5F5";
}
</style>