import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "../../App.css";
import "leaflet/dist/leaflet.css";

function MapPanel() {
	const [wards, setWards] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/ward-data")
			.then((response) => {
				const reversedWards = response.data.map(ward => ({
                    ...ward,
                    geometry: JSON.parse(ward.geometry).coordinates[0].map(coord => [coord[1], coord[0]])
                }));
                setWards(reversedWards);
			})
			.catch((error) => {
				console.error("Error fetching Ward Data: ", error);
			});
	}, []);

	return (
		<>
			<MapContainer center={[43.6426, -79.3871]} zoom={10}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{wards.map((ward) => (
                    <Polygon
                        key={ward._id}
                        positions={ward.geometry}
                        pathOptions={{ color: 'red' }} // Customize polygon style if needed
                    >
						<Popup><strong>Ward {ward.AREA_LONG_CODE}</strong> | {ward.AREA_NAME} <br />

						</Popup>
					</Polygon>
                ))}
			</MapContainer>
		</>
	);
}

export default MapPanel;
