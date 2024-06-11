import axios from "axios";
import { useState, useEffect } from "react";

function Header() {
	const [menuLinks, setMenuLinks] = useState([]);

	useEffect(() => {
		axios
			.get("http://displacement-risk-backend.vercel.app/api/menu")
			.then((response) => {
				setMenuLinks(response.data);
			})
			.catch((error) => {
				console.error("Error fetching valid Menu Links: ", error);
			});
	}, []);

	return (
		<div className="container-full mx-auto p-4 bg-tor-blue">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex text-white">
					<a href="/">
					<svg
						className=""
						width="54"
						height="54"
						version="1.1"
						viewBox="0 0 14.287 14.288"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							fillRule="evenodd"
							strokeWidth=".024096"
							fill="white"
						>
							<path d="m7.1026 12.363c-0.055064-1.7262-1.0341-2.7727-2-3.8052-1.035-1.1064-2.0575-2.1989-2.0575-4.0702 1.004e-4 -1.1892 0.4821-2.2655 1.261-3.0442 0.77897-0.77878 1.8552-1.261 3.0442-1.261 1.1893 0 2.2656 0.4822 3.0442 1.261 0.77897 0.77878 1.261 1.8556 1.261 3.0442 3.76e-4 1.8713-1.0221 2.9638-2.0574 4.0702-0.96609 1.0325-1.9452 2.079-2.0001 3.8052-0.0040229 0.13686-0.11869 0.24435-0.25545 0.23992-0.1313-0.003855-0.23606-0.11003-0.23992-0.23992zm-1.6381-4.1435c0.74922 0.80118 1.506 1.6103 1.8858 2.7288 0.37969-1.1186 1.1364-1.9277 1.8861-2.7288 0.96722-1.0335 1.9216-2.0537 1.9216-3.7319 1.86e-4 -1.0516-0.42629-2.0038-1.1151-2.6925-0.68851-0.68889-1.641-1.1151-2.6927-1.1151-1.0515 0-2.0037 0.42619-2.6925 1.1151-0.68842 0.6887-1.1151 1.641-1.1151 2.6925 1.877e-4 1.6782 0.9547 2.6984 1.9215 3.7319h2.88e-4" />
							<path d="m8.7865 10.912c-0.13723 0-0.24896-0.11135-0.24896-0.24867 1.877e-4 -0.13733 0.11154-0.24868 0.24877-0.24868h2.4033c0.08849 0 0.16613 0.04621 0.21008 0.11615l2.4211 3.2302c0.08189 0.10937 0.05976 0.26486-0.0497 0.34704-0.04452 0.03322-0.09686 0.04932-0.14881 0.04932l1.26e-4 9.87e-4h-12.544c-0.13714 0-0.24886-0.11135-0.24886-0.24867 1.8776e-4 -0.06287 0.02344-0.12076 0.062122-0.16434l2.4217-3.2308c0.048757-0.06504 0.12274-0.09902 0.19785-0.09902l1.004e-4 -9.1e-4h2.4031c0.13714 0 0.24839 0.11135 0.24839 0.24868 3.76e-4 0.13733-0.11144 0.24886-0.24858 0.24886l-2.2793-1.75e-4 -2.0601 2.7491h11.551l-2.0601-2.7491h-2.2795" />
							<path d="m5.1921 4.3045c-0.11116 0.079723-0.26637 0.054494-0.34619-0.056378-0.079817-0.11107-0.054593-0.26628 0.056378-0.346l2.3032-1.659c0.090076-0.064759 0.20933-0.060238 0.29367 0.00319l2.2994 1.6558c0.11078 0.079724 0.13601 0.23493 0.056195 0.346-0.079723 0.11088-0.23503 0.1361-0.3459 0.056379l-2.1584-1.5546-2.1584 1.5546" />
							<path d="m5.4346 3.6453c0-0.13733 0.11116-0.24867 0.24849-0.24867 0.13751 0 0.24877 0.11154 0.24877 0.24867l3.753e-4 2.2647h0.92646c0.13761 0 0.24868 0.11135 0.24868 0.24868 1.876e-4 0.13733-0.11144 0.24868-0.24868 0.24868h-1.1752c-0.13761 0-0.24914-0.11135-0.24914-0.24868l2.879e-4 -2.5134" />
							<path d="m7.8422 6.4074c-0.13714 0-0.24877-0.11135-0.24877-0.24868 9.1e-5 -0.13733 0.11144-0.24868 0.24868-0.24868h0.92665v-2.2647c0-0.13733 0.11144-0.24867 0.24877-0.24867 0.13723 0 0.24867 0.11154 0.24867 0.24867l1.877e-4 2.5069v0.00645c0 0.13733-0.11163 0.24867-0.24886 0.24867h-1.1753" />
							<path d="m7.1076 6.1587c0 0.13733-0.11163 0.24868-0.24886 0.24868-0.13714 0-0.24877-0.11135-0.24877-0.24868v-1.824c0-0.13733 0.11144-0.24868 0.24877-0.24868h0.9835c0.1377 0 0.24877 0.11135 0.24877 0.24868 9.12e-5 0.13733-0.11135 0.24867-0.24886 0.24867h-0.73454v1.5753" />
							<path d="m8.3576 2.441c0-0.13733 0.11116-0.24868 0.24849-0.24868 0.13742-1.876e-4 0.24877 0.11135 0.24877 0.24868l2.75e-4 0.9082c0 0.13733-0.11182 0.24868-0.24905 0.24868-0.13733 0-0.24877-0.11135-0.24877-0.24868l2.75e-4 -0.9082" />
						</g>
					</svg></a>
					
					<span className="px-3 font-semibold text-2xl tracking-tight font-josefin">
					<a href="/">Toronto Risk
						<br /> Displacement Map</a>
					</span>
					
				</div>
				<div className="ms-auto flex items-center">
						{menuLinks.map((link) => (
							<a
								key={link._id}
								href={link.href}
								className="block mt-4 lg:inline-block lg:mt-0 text-white text-xl hover:text-white hover:underline mr-4"
							>
								{link.title}
							</a>
						))}
				</div>
			</div>
		</div>
	);
}

export default Header;