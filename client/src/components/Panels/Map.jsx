import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
	MapContainer,
	TileLayer,
	Polygon,
	Popup,
	LayersControl,
	LayerGroup,
} from "react-leaflet";
import "../../App.css";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;

function MapPanel({ updateInfo, mapRef }) {
	const [hoods, setHoods] = useState([]);
	const [hoods140, setHoods140] = useState([]);

	const setMapRef = useCallback(
		(node) => {
			if (node !== null) {
				mapRef.current = node;
				setTimeout(() => {
					node.invalidateSize();
				}, 0);
			}
		},
		[mapRef]
	);

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

	useEffect(() => {
		axios
			.get("http://localhost:3000/datasets/neighbourhoods_140.geojson")
			.then((response) => {
				const reversedHoods140 = response.data.map((hood) => ({
					...hood,
					geometry: JSON.parse(hood.geometry).coordinates[0].map(
						(coord) => [coord[1], coord[0]]
					),
				}));
				setHoods140(reversedHoods140);
			})
			.catch((error) => {
				console.error("Error fetching Neighbourhood Data: ", error);
			});
	}, []);

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<MapContainer
				center={[43.6426, -79.3871]}
				zoom={10}
				style={{ height: "100%", width: "100%" }}
				ref={setMapRef}
			>
				<LayersControl position="topright">
					<LayersControl.Overlay
						checked
						name="2021 : 158 Neighbourhoods"
					>
						<LayerGroup>
							<LayerGroup>
								{hoods.map((hood) => (
									<Polygon
										key={hood._id}
										positions={hood.geometry}
										pathOptions={{
											color: "black",
											weight: 1,
											fillColor: hood.colour,
											fillOpacity: 0.5,
										}}
										eventHandlers={{
											click: () =>
												updateInfo({
													areaName: hood.AREA_NAME,
													classification:
														hood.CLASSIFICATION,
												}), //Call updateInfo on Click
										}}
									>
										<Popup>
											{hood.AREA_NAME}
											<br />
											{hood.CLASSIFICATION}
										</Popup>
									</Polygon>
								))}
							</LayerGroup>
						</LayerGroup>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="2016 : 140 Neighbourhoods">
						<LayerGroup>
							<LayerGroup>
							{hoods140.map((hood) => (
									<Polygon
										key={hood._id}
										positions={hood.geometry.coordinates}
										pathOptions={{
											color: "black",
											weight: 1,
											fillColor: hood.colour,
											fillOpacity: 0.5,
										}}
										eventHandlers={{
											click: () =>
												updateInfo({
													areaName: hood.AREA_NAME,
													classification:
														hood.CLASSIFICATION,
												}), //Call updateInfo on Click
										}}
									>
										<Popup>
											{hood.AREA_NAME}
											<br />
											{hood.CLASSIFICATION}
										</Popup>
									</Polygon>
								))}
							</LayerGroup>
						</LayerGroup>
					</LayersControl.Overlay>
				</LayersControl>

				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
}

export default MapPanel;
