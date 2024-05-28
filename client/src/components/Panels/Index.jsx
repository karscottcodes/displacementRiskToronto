import { useState, useEffect, useRef } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import InfoPanel from "./Info";
import MapPanel from "./Map";

function Panels() {
	const [sizes, setSizes] = useState(["50%", "auto"]);
	const [info, setInfo] = useState({areaName:"", classification:""});
	const mapRef = useRef();

	const updateInfo = (newInfo) => {
		setInfo(newInfo);
	}

	const mapCss = {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	};

	const infoCss = {
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	};

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.invalidateSize();
		}
	}, [sizes]);

	return (
		<div style={{ height: "100vh" }}>
			<SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
				<Pane minSize="25%" maxSize="50%">
					<div style={{ ...infoCss }} className="bg-white">
						<InfoPanel info={info} />
					</div>
				</Pane>
				<div style={{ ...mapCss }} className="bg-tor-red">
					<MapPanel updateInfo={updateInfo} mapRef={mapRef} />
				</div>
			</SplitPane>
		</div>
	);
}

export default Panels;
