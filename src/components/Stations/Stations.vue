<template>
	<div class="stations-container">
		<div :key="setKey(station)" v-for="station in stations">
			<Station :station="station" />
		</div>
	</div>
</template>

<script>
	import Station from "./Station.vue";
	import { fetchStations } from "../../utils";
	import { eventBus } from "../../main";

	export default {
		name: "Stations",
		components: {
			Station,
		},
		props: {
			stations: Array,
		},
		data() {
			return {
				stationQty: 0,
				observer: null,
				loadOn: null,
				stationsList: [],
			};
		},
		updated() {
			this.stationQty = this.stations.length;
			this.stationList = document.getElementsByClassName("station");

			if (this.stations.length > 0) {
				this.setObserver();
			}
		},
		methods: {
			setKey(station) {
				return `${station}-${Math.random()}`;
			},
			setObserver() {
				if (this.stationQty > 0 && this.stationList.length > 0) {
					const loadPoint = Math.floor(this.stationQty * 0.7);
					this.loadOn = this.stationList[loadPoint];
					this.observer = new IntersectionObserver(this.onIntersection, {
						threshold: 0.3,
					});
					this.observer.observe(this.loadOn);
				}
			},
			onIntersection(entries) {
				if (entries[0].isIntersecting) {
					fetchStations(this.stations.length)
						.then((stations) => {
							eventBus.$emit("onLoadMoreStations", stations);
							this.observer.unobserve(this.loadOn);
						})
						.catch((err) => console.error(err));
				}
			},
		},
	};
</script>

<style scoped>
	.stations-container {
		width: 100%;
		height: 80vh;
		overflow-y: scroll;
		margin: 20px 0;
	}
</style>
