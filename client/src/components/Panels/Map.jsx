import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "../../App.css";
import "leaflet/dist/leaflet.css";

function MapPanel({updateInfo}) {
	const [hoods, setHoods] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/neighbourhoods")
			.then((response) => {
				const reversedHoods = response.data.map((hood) => ({
					...hood,
					geometry: JSON.parse(hood.geometry).coordinates[0].map(
						(coord) => [coord[1], coord[0]]
					),
				}));
				setHoods(reversedHoods);
			})
			.catch((error) => {
				console.error("Error fetching Neighbourhood Data: ", error);
			});
	}, []);

	return (
		<>
			<MapContainer center={[43.6426, -79.3871]} zoom={10}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{hoods.map((hood) => (
					<Polygon
						key={hood._id}
						positions={hood.geometry}
						pathOptions={{ color: "black", weight: 1, fillColor: hood.colour, fillOpacity: 0.5 }}
						eventHandlers={{
							click: () => updateInfo({areaName: hood.AREA_NAME, classification: hood.CLASSIFICATION}), //Call updateInfo on Click
						}}
					>
						<Popup>{hood.AREA_NAME}<br />{hood.CLASSIFICATION}</Popup>
					</Polygon>
				))}
			</MapContainer>
		</>
	);
}

export default MapPanel;
