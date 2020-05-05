<template>
	<div class="icons">
		<template v-for="service in services">
			<img :key="service" :src="setIcon(service)" alt="icon" />
		</template>
	</div>
</template>

<script>
import { setIcons } from "../utils";
import loungeIcon from "../assets/lounge.svg";
import luggageIcon from "../assets/luggage.svg";
import moneyExchangeIcon from "../assets/money.svg";

export default {
	name: "Icons",
	props: ["station"],
	data() {
		return {
			services: [],
			icons: {
				luggageIcon,
				loungeIcon,
				moneyExchangeIcon
			}
		};
	},
	methods: {
		onInit() {
			this.services = setIcons(this.station);
		},
		setIcon(service) {
			return this.icons[service];
		}
	},
	created() {
		this.onInit();
	}
};
</script>

<style scoped>
.icons {
	display: flex;
	height: 50px;
}
img {
	margin: 12px 0;
	height: 34px;
	width: 34px;
}
</style>