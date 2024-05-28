function Footer() {

	const currentYear = new Date().getFullYear();

	return (
		<div className="flex items-center justify-between flex-wrap bg-tor-blue p-6">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<span className="px-3 font-semibold text-sm tracking-tight font-josefin">
					&copy; {currentYear} KARScott Codes
				</span>
			</div>
		</div>
	);
}

export default Footer;
