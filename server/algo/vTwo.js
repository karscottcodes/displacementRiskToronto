const rankNeighbourhoods = (neighbourhoods) => {
	// Risk Categories - 5 Categories
	const riskCategories = [
		{ name: "high-risk", color: "red" },
		{ name: "medium-high-risk", color: "orange" },
		{ name: "medium-risk", color: "yellow" },
		{ name: "medium-low-risk", color: "lightgreen" },
		{ name: "low-risk", color: "green" },
	];

	// Calculate non-Canadian percentage
	neighbourhoods.forEach((neighbourhood) => {
		if (neighbourhood.vulnerabilities) {
			const canCitizen = neighbourhood.vulnerabilities.CAN_CITIZEN || 0;
			const notCanCitizen =
				neighbourhood.vulnerabilities.NOT_CAN_CITIZEN || 0;
			const total = canCitizen + notCanCitizen;
			neighbourhood.notCanPercentage =
				total > 0 ? (notCanCitizen / total) * 100 : 0;
		} else {
			neighbourhood.notCanPercentage = 0;
		}
	});

	// Sort and rank based on non-Canadian percentage
	const notCanSorted = [...neighbourhoods].sort(
		(a, b) => b.notCanPercentage - a.notCanPercentage
	);
	notCanSorted.forEach((neighbourhood, index) => {
		neighbourhood.notCanRank = index + 1;
	});

	// Calculate Rent Burdened
	neighbourhoods.forEach((neighbourhood) => {
		if (neighbourhood.vulnerabilities) {
			if ("RENT_BURDENED" in neighbourhood.vulnerabilities) {
				neighbourhood.rentBurdened =
					neighbourhood.vulnerabilities.RENT_BURDENED;
			} else if (
				"LESS_THAN_THIRTY" in neighbourhood.vulnerabilities &&
				"MORE_THAN_THIRTY" in neighbourhood.vulnerabilities &&
				"THIRTY_TO_HUNDRED" in neighbourhood.vulnerabilities
			) {
				const lessThanThirty =
					neighbourhood.vulnerabilities.LESS_THAN_THIRTY;
				const moreThanThirty =
					neighbourhood.vulnerabilities.MORE_THAN_THIRTY;
				const thirtyToHundred =
					neighbourhood.vulnerabilities.THIRTY_TO_HUNDRED;
				const total = lessThanThirty + moreThanThirty + thirtyToHundred;
				if (total > 0) {
					neighbourhood.rentBurdened =
						((moreThanThirty + thirtyToHundred) / total) * 100;
				} else {
					neighbourhood.rentBurdened = 0;
				}
			} else {
				neighbourhood.rentBurdened = 0;
			}
		} else {
			neighbourhood.rentBurdened = 0;
		}
	});

	// Sort and rank based on rent burden
	const rentBurdenSorted = [...neighbourhoods].sort(
		(a, b) => b.rentBurdened - a.rentBurdened
	);
	rentBurdenSorted.forEach((neighbourhood, index) => {
		neighbourhood.rentBurdenRank = index + 1;
	});

	// Sort and rank based on unemployment rate
	const unemploymentSorted = [...neighbourhoods].sort((a, b) => {
		const aRate = a.vulnerabilities
			? a.vulnerabilities.UNEMPLOYMENT_RATE
			: 0;
		const bRate = b.vulnerabilities
			? b.vulnerabilities.UNEMPLOYMENT_RATE
			: 0;
		return bRate - aRate; // Sort in descending order (higher unemployment rate first)
	});
	unemploymentSorted.forEach((neighbourhood, index) => {
		neighbourhood.unemploymentRank = index + 1;
	});

	// Sort and rank based on average rent
	const averageRentSorted = [...neighbourhoods].sort((a, b) => {
		const aRent = a.pressures ? a.pressures.AVERAGE_RENT : 0;
		const bRent = b.pressures ? b.pressures.AVERAGE_RENT : 0;
		return bRent - aRent; // Sort in descending order (higher unemployment rate first)
	});
	averageRentSorted.forEach((neighbourhood, index) => {
		neighbourhood.averageRentRank = index + 1;
	});

	// Calculate the average rank
	neighbourhoods.forEach((neighbourhood) => {
		neighbourhood.averageRank =
			(neighbourhood.rentBurdenRank +
				neighbourhood.unemploymentRank +
				neighbourhood.notCanRank +
				neighbourhood.averageRentRank) /
			4;
	});

	// Sort by average rank
	const averageRankNeighbourhoods = [...neighbourhoods].sort(
		(a, b) => a.averageRank - b.averageRank
	);

	// Divide into risk categories
	const groupSize = Math.ceil(neighbourhoods.length / riskCategories.length);
	for (let i = 0; i < riskCategories.length; i++) {
		const startIdx = i * groupSize;
		const endIdx = startIdx + groupSize;
		averageRankNeighbourhoods
			.slice(startIdx, endIdx)
			.forEach((neighbourhood) => {
				neighbourhood.riskCategory = riskCategories[i].name;
				neighbourhood.colour = riskCategories[i].color;
			});
	}

	return averageRankNeighbourhoods;
};

module.exports = rankNeighbourhoods;