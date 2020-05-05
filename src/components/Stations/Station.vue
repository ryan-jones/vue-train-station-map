<template>
	<div class="station" @click="selectStation">
		<div class="station__location">
			<h2>{{ station.name }}</h2>
			<p class="station__address">{{ station.address }}</p>
		</div>
		<div class="station__info">
			<Icons :station="station" />
			<div class="station__email">
				<p>{{ station.email }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Icons from "../Icons.vue";
import { eventBus } from "../../main";

export default {
	name: "Station",
	components: {
		Icons
	},
	props: {
		station: {
			type: Object,
			required: true
		}
	},
	methods: {
		selectStation() {
			eventBus.$emit("onSelectStation", this.station);
		}
	}
};
</script>

<style scoped>
.station {
	display: flex;
	justify-content: space-between;
	border: 1px solid #0000000d;
	box-shadow: 0px 1px 1px #d5d5d5;
	padding: 30px 40px;
	margin: 10px 0;
}
.station__location {
	max-width: 75%;
	min-width: 50%;
}

.station__info {
	max-width: 35%;
}

.station__address {
	font-size: 22px;
}

.station__email {
	font-size: 17px;
	text-align: center;
}

h2 {
	color: #292929;
	font-family: "Raleway Extrabold", helvetica, sans-serif;
	font-size: 34px;
	margin: 0 auto 5px;
}

p {
	color: #6f6f6f;
	font-family: "Raleway Medium", Helvetica, sans-serif;
	margin: 0 auto;
}
</style>