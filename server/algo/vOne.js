const rankNeighbourhoods = (neighbourhoods) => {

    //Criteria Points Map
    const classificationPoints = {
        "Neighbourhood Improvement Area": 1,
        "Not an NIA or Emerging Neighbourhood": 2,
        "Emerging Neighbourhood": 3,
    };

    //ColorsByScore
    const colourScore = (score) => {
        switch(score) {
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "green";
            default:
                return "grey";
        }
    };

    neighbourhoods.forEach(neighbourhood => {
        neighbourhood.score = classificationPoints[neighbourhood.CLASSIFICATION] || 0;
        neighbourhood.colour = colourScore(neighbourhood.score);
    });

    return neighbourhoods;
}

module.exports = rankNeighbourhoods;