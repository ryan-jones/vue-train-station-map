<template>
	<div id="map"></div>
</template>

<script>
import { setIcons } from "../utils";
import loungeIcon from "../assets/lounge.svg";
import luggageIcon from "../assets/luggage.svg";
import moneyExchangeIcon from "../assets/money.svg";

export default {
	name: "Map",
	props: {
		selectedStation: {
			name: String,
			email: String,
			address: String,
			services: String,
			coordinates: {
				lat: String,
				lng: String
			}
		},
		stations: Array
	},
	data() {
		return {
			map: null,
			infoWindow: null,
			markers: [],
			icons: {
				loungeIcon,
				luggageIcon,
				moneyExchangeIcon
			}
		};
	},
	mounted() {
		this.onInit();
	},
	watch: {
		selectedStation() {
			this.onSelectNewMarker();
		}
	},
	destroyed() {
		delete window.map;
	},
	methods: {
		onInit() {
			const { lat, lng } = this.selectedStation.coordinates;

			this.map = new window.google.maps.Map(document.getElementById("map"), {
				center: { lat, lng },
				zoom: 14
			});

			this.stations.forEach(station => {
				const marker = new window.google.maps.Marker({
					map: this.map,
					position: station.coordinates
				});
				marker.addListener("click", () => this.setInfoWindow(station, marker));
				this.markers.push(marker);
			});
			window.map = this.map;
		},
		onSelectNewMarker() {
			const selectedMarker = this.markers.find(marker => {
				const { lat, lng } = this.selectedStation.coordinates;
				return marker.position.lat() === lat && marker.position.lng() === lng;
			});
			this.setInfoWindow(this.selectedStation, selectedMarker);
		},
		setInfoWindow(station, marker) {
			if (this.infowindow) {
				this.infowindow.close();
			}
			this.infowindow = new window.google.maps.InfoWindow();
			this.infowindow.setContent(this.buildInfoWindowContent(station));
			this.infowindow.open(this.map, marker);
		},
		buildInfoWindowContent(station) {
			const offeredIcons = setIcons(station)
				.map((icon, i) => {
					const key = `${i}-${Math.random()}`;
					const img = this.icons[icon];
					return `<img key="${key}" src="${img}" alt="icon" />`;
				})
				.join("");
			return `
				<div class="info-window">
					<div class="info-window-location">
						<h2>${station.name}</h2>
						<p class="address">${station.address}</p>
						<div class="info-window-details">
							<p class="email">${station.email}</p>
							${offeredIcons}
						</div>
					</div>
				</div>
			`;
		}
	}
};
</script>

<style scoped>
#map {
	height: 440px;
	width: 100%;
	background-color: lightgray;
}

.info-window {
	width: 300px;
}
.info-window-details {
	margin-top: 50px;
}
.address {
	margin: 15px 0 0;
}
.email {
	margin: 10px 0;
}
img {
	height: 34px;
	width: 34px;
}
</style>