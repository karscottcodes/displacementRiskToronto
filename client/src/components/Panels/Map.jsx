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
                                        click: () => {
                                            const vulnerabilities = hood.VULNERABILITIES[0] || {};
                                            const conditions = hood.CONDITIONS[0] || {};
                                            const pressures = hood.PRESSURES[0] || {};
                                            updateInfo({
                                                area_name: hood.AREA_NAME,
                                                designation: hood.DESIGNATION,
                                                VULNERABILITIES: {
                                                    unemployment_rate: vulnerabilities.UNEMPLOYMENT_RATE,
                                                    inc_lower_half: vulnerabilities.INC_LOW,
                                                    inc_upper_half: vulnerabilities.INC_HIGH,
                                                    inc_average: vulnerabilities.INC_AVG,
                                                    rent_burdened: vulnerabilities.RENT_BURDENED,
                                                    can_citizen: vulnerabilities.CAN_CITIZEN,
                                                    not_can_citizen: vulnerabilities.NOT_CAN_CITIZEN,
                                                    zero_fourteen: vulnerabilities.ZERO_FOURTEEN,
                                                    fifteen_sixtyfour: vulnerabilities.FIFTEEN_SIXTYFOUR,
                                                    sixtyfiveplus: vulnerabilities.SIXTYFIVEPLUS,
                                                    eightyfiveplus: vulnerabilities.EIGHTYFIVEPLUS,
                                                    average_age: vulnerabilities.AVERAGE_AGE
                                                },
                                                CONDITIONS: {
                                                    single_detached: conditions.SINGLE_DETACHED,
                                                    semi_detached: conditions.SEMI_DETACHED,
                                                    row_house: conditions.ROW_HOUSE,
                                                    apt_duplex: conditions.APT_DUPLEX,
                                                    apt_less_5: conditions.APT_LESS_5,
                                                    apt_more_5: conditions.APT_MORE_5,
                                                    other: conditions.OTHER,
                                                    moveable: conditions.MOVABLE,
                                                    size_one: conditions.SIZE_ONE,
                                                    size_two: conditions.SIZE_TWO,
                                                    size_three: conditions.SIZE_THREE,
                                                    size_four: conditions.SIZE_FOUR,
                                                    size_fiveplus: conditions.SIZE_FIVEPLUS,
                                                    owner: conditions.OWNER,
                                                    renter: conditions.RENTER,
                                                    govt: conditions.GOVT,
                                                    pre_1960: conditions.PRE_1960,
                                                    age1961_1980: conditions.AGE1961_1980,
                                                    age1981_1990: conditions.AGE1981_1990,
                                                    age1991_2000: conditions.AGE1991_2000,
                                                    age2001_2005: conditions.AGE2001_2005,
                                                    age2006_2010: conditions.AGE2006_2010,
                                                    age2011_2015: conditions.AGE2011_2015,
                                                    age2016_2021: conditions.AGE2016_2021,
                                                },
                                                PRESSURES: {
                                                    median_rent: pressures.MEDIAN_RENT,
                                                    average_rent: pressures.AVERAGE_RENT,
                                                }
                                            });
                                        }
                                    }}
                                >
                                    <Popup>
                                        {hood.AREA_NAME}
                                        <br />
                                        {hood.DESIGNATION}
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
