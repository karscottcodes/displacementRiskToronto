import { useEffect } from "react";
import L from "leaflet";
import "./Legend.css";

function Legend({ map }) {
    useEffect(() => {
        if (map) {
            console.log("Map instance is available.");

            const legend = L.control({ position: "bottomleft" });

            legend.onAdd = () => {
                console.log("Creating legend div.");
                const div = L.DomUtil.create("div", "info legend");
                div.innerHTML = "<h5>Legend</h5>";
                console.log("Legend div created:", div);
                return div;
            };

            legend.addTo(map);
            console.log("Legend added to the map.");
        } else {
            console.log("Map instance is not available yet.");
        }
    }, [map]);

    return null;
}

export default Legend;
