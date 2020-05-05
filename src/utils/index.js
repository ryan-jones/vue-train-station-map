export const setUrl = (startAt = 0) => {
	return `https://data.sbb.ch/api/records/1.0/search/?dataset=kontaktadressen&facet=service&rows=30&start=${startAt}`;
};

export const fetchStations = (startAt = 0) => {
  return fetch(setUrl(startAt)).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(`Error of type ${res.status}`)
  }).then(data => formatStations(data.records));
}

const formatStations = (records) => {
	return records.map(({ fields }) => ({
		coordinates: {
			lng: fields.geopos[1],
			lat: fields.geopos[0],
		},
		name: fields.stationsbezeichnung,
		address: `${fields.adresse}, ${fields.plz} ${fields.ort}`,
		email: fields.mail,
		service: fields.service,
	}));
};

const selectIcon = (service) => {
	switch (service) {
		case "gepäck":
		case "gepäckausgabe":
		case "gepäckaufbewahrung":
			return "luggageIcon";
		case "businesstravel-service-center":
			return "loungeIcon";
		case "geldwechsel":
		case "western union":
			return "moneyExchangeIcon";
		default:
			return "";
	}
};

const acceptedValues = [
	"gepäck",
	"gepäckausgabe",
	"gepäckaufbewahrung",
	"businesstravel-service-center",
	"geldwechsel",
	"western union",
];

export const setIcons = (station) => {
	const providedServices = [...station.service.toLowerCase().split(",")];
	return providedServices.reduce((services, current) => {
		return acceptedValues.includes(current)
			? services.concat(selectIcon(current))
			: services;
	}, []);
};
