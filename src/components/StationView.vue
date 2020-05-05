<template>
	<div class="container">
		<div class="map-container">
			<div v-if="!mapLoaded || !selectedStation" class="loading-container">
				<Loading :text="'map'" />
			</div>
			<template v-else>
				<Map :stations="stations" :selectedStation="selectedStation" />
			</template>
			<div class="credit">
				<p>Based on data from</p>
				<img :src="logo" alt="credit" />
			</div>
		</div>
		<Stations :stations="stations" />
	</div>
</template>

<script>
	import Map from "./Map.vue";
	import Stations from "./Stations/Stations.vue";
	import Loading from "./Loading.vue";
	import { fetchStations } from "../utils/index.js";
	import { eventBus } from "../main";
	import logo from "../assets/logo_cff@2x.png";

	export default {
		name: "StationView",
		components: {
			Map,
			Stations,
			Loading,
		},
		data() {
			return {
				logo,
				mapLoaded: false,
				selectedStation: null,
				stations: [],
			};
		},
		created() {
			this.loadStations();
			this.loadMap();
			eventBus.$on("onSelectStation", (selectedStation) => {
				this.selectedStation = selectedStation;
			});
			eventBus.$on("onLoadMoreStations", (stations) => {
				this.stations = [...this.stations, ...stations];
			});
		},
		methods: {
			loadStations() {
				fetchStations(0)
					.then((stations) => {
						this.stations = stations;
						this.selectedStation = stations[0];
					})
					.catch((err) => console.error(err));
			},
			loadMap() {
				if (!this.mapLoaded) {
					const googleScript = document.createElement("script");
					const key = process.env.VUE_APP_API_KEY;
					googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
					document.body.appendChild(googleScript);
					googleScript.addEventListener("load", () => (this.mapLoaded = true));
				}
			},
		},
	};
</script>

<style scoped>
	.container {
		position: relative;
		z-index: 100;
		background-color: #fff;
		width: 100%;
		max-width: 1000px;
		height: 100%;
		margin: auto;
		left: 0;
		right: 0;
		top: -250px;
		bottom: 0;
		padding: 50px;
	}

	.loading-container {
		height: 440px;
		width: 100%;
		background-color: lightgray;
	}

	.map-container {
		width: 100%;
	}

	.credit {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		margin-top: 15px;
	}
	p {
		margin: 5px 15px 0 0;
		color: #292929;
		font-family: "Raleway Medium", Helvetica, sans-serif;
		font-size: 14px;
	}
</style>
