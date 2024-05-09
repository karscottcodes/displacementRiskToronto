import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import InfoPanel from "./Info";
import MapPanel from "./Map";
import MapPanel2 from "./MapNeighbourhoods";

function Panels() {
	const [sizes, setSizes] = useState(["50%", "auto"]);

	const panelCss = {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	};

	return (
		<div style={{ height: 600 }}>
			<SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
				<Pane minSize="25%" maxSize="50%">
					<div style={{ ...panelCss }} className="bg-white">
						<InfoPanel />
					</div>
				</Pane>
				<div style={{ ...panelCss }} className="bg-tor-red">
					<MapPanel />
				</div>
			</SplitPane>
		</div>
	);
}

export default Panels;
