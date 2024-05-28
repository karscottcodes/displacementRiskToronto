function InfoPanel({ info }) {
    const welcomeMsg = (
        <div className="p-5">
            <h1 className="text-xl font-bold pb-3">Welcome to the Toronto Risk Displacement Map</h1>
            <p className="pb-3">Inspired by the <a className="underline" href="https://equitableexplorer.planning.nyc.gov/map/drm/nta" target="_blank">NYC Risk Map</a>, this application illustrates the level of risk residents face of being unable to remain in their homes or neighbourhoods.</p>
            <p className="pb-3">Clicking on a neighbourhood of will show an estimated level of displacement, and display a breakdown of the factors contributing to the risk. The factors are sorted into three categories: Population Vulnerability, Housing Conditions, and Market Pressure.</p>
            <p className="pb-3">Additional project details, and resource citations can be found here: <a className="underline" href="/resources">Methods & Sources</a>.</p>
            <p>This web tool was developed independently and has no affiliation with the City of Toronto.</p>
        </div>
    );

        // Check If An Area Has Been Clicked; Else Display Welcome Message
	return (
		<div>
			{info.areaName ? (
				<>
					<h2>{info.areaName}</h2>
					<p>{info.classification}</p>
				</>
			) : (
				welcomeMsg
			)}
		</div>
	);
}

export default InfoPanel;
