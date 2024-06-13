import { useState, useEffect, useRef, useCallback } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import InfoPanel from "./Info";
import MapPanel from "./Map";

function Panels() {
	const [sizes, setSizes] = useState(["50%", "auto"]);
	const [info, setInfo] = useState({areaName:"", classification:""});
	const mapRef = useRef();

	// Change The Panel Orientation Based on Screen Size (Yes/No)
	const [isVertical, setIsVertical] = useState(true);
	

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
		overflowY: "auto",
	};

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.invalidateSize();
		}
	}, [sizes]);

	useEffect(() => {
		const handleWindow = () => {
			if (window.innerWidth <= 768) {
				setIsVertical(false); //STACKED
			} else {
				setIsVertical(true); //DEFAULT = side by side
			}
		};

		window.addEventListener("resize", handleWindow);
		handleWindow();

		return () => {
			window.removeEventListener("resize", handleWindow);
		};
	}, []);

	return (
		<div style={{ height: "100vh" }}>
			<SplitPane split={isVertical ? "vertical" : "horizontal"} sizes={sizes} onChange={setSizes}>
			{/* if true, set vertical */}
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
