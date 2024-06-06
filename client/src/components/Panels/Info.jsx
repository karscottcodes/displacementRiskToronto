import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function InfoPanel({ info }) {

	const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

	const citizenshipData = {
		labels: ["Canadian Citizen", "Non-Canadian Citizen"],
		datasets: [
			{
				label: "Citizenship Percentage",
				data: [
					info?.VULNERABILITIES?.can_citizen ?? 0,
					info?.VULNERABILITIES?.not_can_citizen ?? 0,
				],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
				],
				borderWidth: 1,
			},
		],
	};


	const ageData = {
		labels: ["0-14", "15-64", "65+", "85+"],
		datasets: [
			{
				label: "Neighbourhood Age Distribution",
				data: [
					info?.VULNERABILITIES?.zero_fourteen ?? 0,
					info?.VULNERABILITIES?.fifteen_sixtyfour ?? 0,
					info?.VULNERABILITIES?.sixtyfiveplus ?? 0,
					info?.VULNERABILITIES?.eightyfiveplus ?? 0,
				],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const hhSizeData = {
		labels: [
			"One Persons",
			"Two Persons",
			"Three Persons",
			"Four Persons",
			"Five or More",
		],
		datasets: [
			{
				label: "Household Sizes",
				data: [
					info?.CONDITIONS?.size_one ?? 0,
					info?.CONDITIONS?.size_two ?? 0,
					info?.CONDITIONS?.size_three ?? 0,
					info?.CONDITIONS?.size_four ?? 0,
					info?.CONDITIONS?.size_fiveplus ?? 0,
				],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(40, 25, 33, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(40, 25, 33, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	const welcomeMsg = (
		<div className="p-5">
			<h1 className="text-xl font-bold pb-3">
				Welcome to the Toronto Risk Displacement Map
			</h1>
			<p className="pb-3">
				Inspired by the{" "}
				<a
					className="underline"
					href="https://equitableexplorer.planning.nyc.gov/map/drm/nta"
					target="_blank"
				>
					NYC Risk Map
				</a>
				, this application illustrates the level of risk residents face
				of being unable to remain in their homes or neighbourhoods.
			</p>
			<p className="pb-3">
				Clicking on a neighbourhood of will show an estimated level of
				displacement, and display a breakdown of the factors
				contributing to the risk. The factors are sorted into three
				categories: Population Vulnerability, Housing Conditions, and
				Market Pressure.
			</p>
			<p className="pb-3">
				Additional project details, and resource citations can be found
				here:{" "}
				<a className="underline" href="/resources">
					Methods & Sources
				</a>
				.
			</p>
			<p>
				This web tool was developed independently and has no affiliation
				with the City of Toronto.
			</p>
		</div>
	);

	// Check If An Area Has Been Clicked; Else Display Welcome Message
	return (
		<div>
			{info?.area_name ? (
				<>
					<div className="grid grid-cols-2 grid-rows-3">
						<div className="col-span-2 text-2xl pb-3"><h2>{info.area_name}</h2></div>
						<div className="col-span-2 pb-3">Designation: {info.designation}</div>
						<div className="col-span-2 pb-3 text-xl py-3 font-bold"><h3>Population Vulnerabilities</h3></div>
						<div><span className="font-bold">Unemployment Rate:</span> {info.VULNERABILITIES.unemployment_rate} % </div>
						<div><span className="font-bold">Rent Burdened:</span> {info.VULNERABILITIES.rent_burdened} %</div>
						<div><span className="font-bold">Canadian Citizen:</span> {info.VULNERABILITIES.can_citizen}</div>
						<div className="row-span-2"><Pie options={chartOptions} data={citizenshipData} /></div>
						<div><span className="font-bold">Not Canadian Citizen:</span> {info.VULNERABILITIES.not_can_citizen}</div>
					</div>

					<div>
						<h4 className="font-bold py-3">Income Factors</h4>
						<p>
							Avg Income ($ CDN):{" "}
							{info.VULNERABILITIES.inc_average}
						</p>
						<p>
							Income in Lower Half:{" "}
							{info.VULNERABILITIES.inc_lower_half}
						</p>
						<p>
							Income in Upper Half:{" "}
							{info.VULNERABILITIES.inc_upper_half}
						</p>
						<h4 className="font-bold py-3">
							Population Distribution
						</h4>
						<p>
							% of Pop 0-14: {info.VULNERABILITIES.zero_fourteen}
						</p>
						<p>
							% of Pop 15-64:{" "}
							{info.VULNERABILITIES.fifteen_sixtyfour}
						</p>
						<p>
							% of Pop 65+: {info.VULNERABILITIES.sixtyfiveplus}
						</p>
						<p>
							% of Pop 85+: {info.VULNERABILITIES.eightyfiveplus}
						</p>
						<div style={{ width: "200px", height: "200px" }}>
							<Pie data={ageData} />
						</div>
					</div>
					<div>
						<h3 className="text-xl py-3 font-bold">
							Housing Conditions
						</h3>
						<h4 className="font-bold py-3">Housing Type</h4>
						<p>
							Single Detached: {info.CONDITIONS.single_detached}
						</p>
						<p>Semi Detached: {info.CONDITIONS.semi_detached}</p>
						<p>Row House: {info.CONDITIONS.row_house}</p>
						<p>Apt (Duplex): {info.CONDITIONS.apt_duplex}</p>
						<p>
							Apt (Less than 5 Floors):{" "}
							{info.CONDITIONS.apt_less_5}
						</p>
						<p>
							Apt (More than 5 Floors):{" "}
							{info.CONDITIONS.apt_more_5}
						</p>
						<p>Other: {info.CONDITIONS.other}</p>
						<p>Moveable Dwelling: {info.CONDITIONS.moveable}</p>
						<h4 className="font-bold py-3">Size of Household</h4>
						<p>One: {info.CONDITIONS.size_one} </p>
						<p>Two: {info.CONDITIONS.size_two} </p>
						<p>Three: {info.CONDITIONS.size_three} </p>
						<p>Four: {info.CONDITIONS.size_four} </p>
						<p>Five+: {info.CONDITIONS.size_fiveplus} </p>

						<div style={{ width: "200px", height: "200px" }}>
							<Pie data={hhSizeData} />
						</div>
						<h4 className="font-bold py-3">
							Household by Tenure (Own/Rent)
						</h4>
						<p>Owner: {info.CONDITIONS.owner} </p>
						<p>Tenant: {info.CONDITIONS.renter} </p>
						<p>Government/Indigienous: {info.CONDITIONS.govt} </p>
						<h4 className="font-bold py-3">Dwelling Build Year</h4>
						<p>Pre-1960: {info.CONDITIONS.pre_1960} </p>
						<p>1961-1980: {info.CONDITIONS.age1961_1980} </p>
						<p>1981-1990: {info.CONDITIONS.age1981_1990} </p>
						<p>1991-2000: {info.CONDITIONS.age1991_2000} </p>
						<p>2001-2005: {info.CONDITIONS.age2001_2005} </p>
						<p>2006-2010: {info.CONDITIONS.age2006_2010} </p>
						<p>2011-2015: {info.CONDITIONS.age2011_2015} </p>
						<p>2016-2021: {info.CONDITIONS.age2016_2021} </p>
					</div>
					<div>
						<h3 className="text-xl py-3 font-bold">
							Market Pressures
						</h3>
						<p>Median Rent ($ CDN): {info.PRESSURES.median_rent}</p>
						<p>
							Average Rent ($ CDN): {info.PRESSURES.average_rent}
						</p>
					</div>
				</>
			) : (
				welcomeMsg
			)}
		</div>
	);
}

export default InfoPanel;
