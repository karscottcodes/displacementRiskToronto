import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

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

	const hhTypeData = {
        labels: [
			"Single Detached",
            "Semi Detached",
            "Row House",
            "Apt (Duplex)",
            "Apt (Less than 5 Floors)",
            "Apt (More than 5 Floors)",
            "Other",
            "Moveable Dwelling"
        ],
        datasets: [
            {
                label: "Housing Type Distribution",
                data: [
					info?.CONDITIONS?.single_detached ?? 0,
                    info?.CONDITIONS?.semi_detached ?? 0,
                    info?.CONDITIONS?.row_house ?? 0,
                    info?.CONDITIONS?.apt_duplex ?? 0,
                    info?.CONDITIONS?.apt_less_5 ?? 0,
                    info?.CONDITIONS?.apt_more_5 ?? 0,
                    info?.CONDITIONS?.other ?? 0,
                    info?.CONDITIONS?.moveable ?? 0,
                ],
                backgroundColor: [
					"rgba(255, 159, 64, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)"
                ],
                borderColor: [
					"rgba(255, 159, 64, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

	const buildYearData = {
		labels: ["Pre-1960", "1961-1980", "1981-1990", "1991-2000", "2001-2005", "2006-2010", "2011-2015", "2016-2021"],
		datasets: [
			{
				label: ["Dwelling Build Year"],
				data: [
					info?.CONDITIONS?.pre_1960 ?? 0,
					info?.CONDITIONS?.age1961_1980 ?? 0,
					info?.CONDITIONS?.age1981_1990 ?? 0,
					info?.CONDITIONS?.age1991_2000 ?? 0,
					info?.CONDITIONS?.age2001_2005 ?? 0,
					info?.CONDITIONS?.age2006_2010 ?? 0,
					info?.CONDITIONS?.age2011_2015 ?? 0,
					info?.CONDITIONS?.age2016_2021 ?? 0,
				],
				backgroundColor: [
					"rgba(255, 159, 64, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)"
                ],
                borderColor: [
					"rgba(255, 159, 64, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)"
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
		<div className="p-5">
			{info?.area_name ? (
				<>
					<div className="grid grid-cols-2 grid-rows-3">
						<div className="col-span-2 text-3xl font-bold pb-3 text-center text-tor-blue"><h2>{info.area_name}</h2></div>
						<div className="col-span-2 pb-3"><span className="font-bold">Designation:</span> {info.designation}</div>
						<div className="col-span-2 pb-3 text-2xl py-3 font-bold text-tor-red underline"><h3>Population Vulnerabilities</h3></div>
						<div><span className="font-bold">Unemployment Rate:</span> {info.VULNERABILITIES.unemployment_rate} % </div>
						<div><span className="font-bold">Rent Burdened:</span> {info.VULNERABILITIES.rent_burdened} %</div>
						<div><span className="font-bold">Canadian Citizen:</span> {info.VULNERABILITIES.can_citizen}</div>
						<div className="row-span-2"><Pie options={chartOptions} data={citizenshipData} /></div>
						<div><span className="font-bold">Not Canadian Citizen:</span> {info.VULNERABILITIES.not_can_citizen}</div>
						<div className="col-span-2 font-bold text-xl"><h4>Income Factors</h4></div>
						<div className="col-span-2 py-3"><span className="font-bold">Avg Income:</span> $ {info.VULNERABILITIES.inc_average} CDN</div>
						<div className="pb-3"><span className="font-bold">Income in Lower Half:</span> {info.VULNERABILITIES.inc_lower_half}</div>
						<div><span className="font-bold">Income in Upper Half:</span> {info.VULNERABILITIES.inc_upper_half}</div>
						<div className="col-span-2 font-bold text-xl py-3"><h4>Population Distribution</h4></div>
						<div><span className="font-bold">Children/Youth (0 - 14):</span> {info.VULNERABILITIES.zero_fourteen} %</div>
						<div className="row-span-4"><Pie options={chartOptions} data={ageData} /></div>
						<div><span className="font-bold">Working Age (15-64):</span> {info.VULNERABILITIES.fifteen_sixtyfour} %</div>
						<div><span className="font-bold">Seniors (65+):</span> {info.VULNERABILITIES.sixtyfiveplus} %</div>
						<div><span className="font-bold">Older Seniors (85+):</span> {info.VULNERABILITIES.eightyfiveplus} %</div>
						<div className="col-span-2 text-2xl pt-10 font-bold underline text-tor-red"><h3>Housing Conditions</h3></div>
						<div className="col-span-2 font-bold text-xl py-3"><h4>Housing Type</h4></div>
						<div>Single Detached: {info.CONDITIONS.single_detached}</div>
						<div className="row-span-8"><Pie options={chartOptions} data={hhTypeData} /></div>
						<div>Semi Detached: {info.CONDITIONS.semi_detached}</div>
						<div>Row House: {info.CONDITIONS.row_house}</div>
						<div>Apt (Duplex): {info.CONDITIONS.apt_duplex}</div>
						<div>Apt (Less than 5 Floors): {info.CONDITIONS.apt_less_5}</div>
						<div>Apt (More than 5 Floors): {info.CONDITIONS.apt_more_5}</div>
						<div>Other: {info.CONDITIONS.other}</div>
						<div>Moveable Dwelling: {info.CONDITIONS.moveable}</div>
						<div className="col-span-2 font-bold text-xl py-3"><h4>Size of Household</h4></div>
						<div>One: {info.CONDITIONS.size_one} </div>
						<div className="row-span-5"><Bar options={chartOptions} data={hhSizeData} /></div>
						<div>Two: {info.CONDITIONS.size_two} </div>
						<div>Three: {info.CONDITIONS.size_three} </div>
						<div>Four: {info.CONDITIONS.size_four} </div>
						<div>Five+: {info.CONDITIONS.size_fiveplus} </div>
						<div className="col-span-2 font-bold text-xl py-3"><h4>Household by Tenure (Own/Tenant)</h4></div>
						<div>Owner: {info.CONDITIONS.owner} </div>
						<div className="row-span-3">chart</div>
						<div>Tenant: {info.CONDITIONS.renter} </div>
						<div>Government/Indigienous: {info.CONDITIONS.govt} </div>
						<div className="col-span-2 font-bold text-xl py-3"><h4>Dwelling Build Year</h4></div>
						<div>Pre-1960: {info.CONDITIONS.pre_1960} </div>
						<div className="row-span-8"><Bar options={chartOptions} data={buildYearData} /></div>
						<div>1961-1980: {info.CONDITIONS.age1961_1980} </div>
						<div>1981-1990: {info.CONDITIONS.age1981_1990} </div>
						<div>1991-2000: {info.CONDITIONS.age1991_2000} </div>
						<div>2001-2005: {info.CONDITIONS.age2001_2005} </div>
						<div>2006-2010: {info.CONDITIONS.age2006_2010} </div>
						<div>2011-2015: {info.CONDITIONS.age2011_2015} </div>
						<div>2016-2021: {info.CONDITIONS.age2016_2021} </div>
						<div className="col-span-2 pb-3 text-2xl py-3 font-bold underline text-tor-red"><h3>Market Pressures</h3></div>
						<div>Median Rent (CDN): $ {info.PRESSURES.median_rent} / month</div>
						<div>Average Rent (CDN): $ {info.PRESSURES.average_rent} / month</div>
					</div>
				</>
			) : (
				welcomeMsg
			)}
		</div>
	);
}

export default InfoPanel;
