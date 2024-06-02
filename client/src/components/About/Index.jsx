import screenshot from "../../assets/Screenshot_v1.png"
import ContactForm from "../parts/ContactForm";

function About() {
	return (
		<>
			<div className="container mx-auto p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold mb-2 text-tor-blue">About</h2>
							<p className="pb-3">
								The Toronto Risk Displacement Map illustrates
								the level of risk that Toronto residents may
								face of being unable to stay in their home or
								neighbourhood. By combining available housing
								and demographic information, it indicates the
								risk level of neighbourhoods in comparison with
								each other.
							</p>
							<p className="pb-3">
								The map is a snapshot of conditions, and does
								not provide sufficient information to preduct
								the effect that future changes would have on a
								neighbourhood.
							</p>
							<p className="pb-3">
								It is heavily inspired by the work of the NYC
								Department of City Planning and Housing
								Preservation and Development, and their{" "}
								<a className="underline" href="https://equitableexplorer.planning.nyc.gov/map/drm/nta" target="_blank">Risk Displacement Map</a>.
							</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold mb-2 text-tor-blue">Version 1.0</h2>
						<p className="text-gray-700">
							<img src={screenshot} />
						</p>
					</div>
				</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold mb-2 text-tor-blue">Methods & Resources</h2>
							<p className="pb-3">
                                Resources, data points and methodology on how they were incorporated into the map can be viewed <a href="/resources" className="underline">here</a>. 
							</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold mb-2 text-tor-blue">Contact & Feedback</h2>
						<p className="text-gray-700">
							<ContactForm />
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
