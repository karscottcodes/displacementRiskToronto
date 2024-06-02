const rankNeighbourhoods = (neighbourhoods) => {

    //Criteria Points Map
    //Criteria One: Classification
    const classificationPoints = {
        "Neighbourhood Improvement Area": 1,
        "Not an NIA or Emerging Neighbourhood": 2,
        "Emerging Neighbourhood": 3,
    };

    //Criteria Two: Population Density Per Sq KM
    

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
                return "";
        }
    };

    neighbourhoods.forEach(neighbourhood => {
        const classification = neighbourhood.properties ? neighbourhood.properties.CLASSIFICATION : neighbourhood.CLASSIFICATION;
        neighbourhood.score = classificationPoints[classification] || 0;
        neighbourhood.colour = colourScore(neighbourhood.score);
    });

    return neighbourhoods;
}

module.exports = rankNeighbourhoods;