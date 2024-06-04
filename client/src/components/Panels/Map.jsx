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
                const reversedHoods = response.data.map((hood) => {
                    try {
                        const geometry = JSON.parse(hood.geometry);
                        if (geometry && geometry.coordinates && Array.isArray(geometry.coordinates[0])) {
                            return {
                                ...hood,
                                geometry: geometry.coordinates[0].map((coord) => [coord[1], coord[0]]),
                            };
                        } else {
                            console.error('Invalid geometry data:', hood.geometry);
                            return hood;
                        }
                    } catch (error) {
                        console.error('Error parsing geometry data:', error);
                        return hood;
                    }
                });
                setHoods(reversedHoods);
            })
            .catch((error) => {
                console.error("Error fetching Neighbourhood Data: ", error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/neighbourhoods140")
            .then((response) => {
                const reversedHoods140 = response.data.map((hood) => {
                    if (hood.geometry && hood.geometry.coordinates) {
                        const coordinates = hood.geometry.coordinates.map(
                            (polygon) =>
                                polygon.map((ring) =>
                                    ring.map((coord) => [coord[1], coord[0]])
                                )
                        );
                        return {
                            ...hood,
                            geometry: coordinates,
                        };
                    } else {
                        console.error('Invalid geometry:', hood.geometry);
                        return hood;
                    }
                });
                setHoods140(reversedHoods140);
            })
            .catch((error) => {
                console.error("Error fetching Neighbourhood140 Data: ", error);
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
                                            }),
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
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="2016 : 140 Neighbourhoods">
                        <LayerGroup>
                            {hoods140.map((hood) => (
                                <Polygon
                                    key={hood.properties._id}
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
                                                areaName: hood.properties
                                                    .AREA_NAME,
                                                classification:
                                                    hood.properties
                                                        .CLASSIFICATION,
                                            }),
                                    }}
                                >
                                    <Popup>
                                        {hood.properties.AREA_NAME}
                                        <br />
                                        {hood.properties.CLASSIFICATION}
                                    </Popup>
                                </Polygon>
                            ))}
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
