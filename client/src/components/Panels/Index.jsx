import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import InfoPanel from "./Info";
import MapPanel from "./Map";

function Panels() {
	const [sizes, setSizes] = useState(["50%", "auto"]);
	const [info, setInfo] = useState("");

	const updateInfo = (newInfo) => {
		setInfo(newInfo);
	}

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
						<InfoPanel info={info} />
					</div>
				</Pane>
				<div style={{ ...panelCss }} className="bg-tor-red">
					<MapPanel updateInfo={updateInfo} />
				</div>
			</SplitPane>
		</div>
	);
}

export default Panels;
