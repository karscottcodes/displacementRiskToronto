const https = require("https");
const packageId = "neighbourhoods";

//Fetch Data for URL and Parse as JSON

const fetchData = (url) => {
    return new Promise ((resolve, reject) => {
        https.get(url, (response) => {
            let dataChunks = [];
            response.on("data", (chunk) => {
                dataChunks.push(chunk);
            }).on("end", () => {
                let data = Buffer.concat(dataChunks);
                resolve(JSON.parse(data.toString()));
            }).on("error", (error) => {
                reject(error);
            });
        });
    });
};

const nhPackage = () => {
    const url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`;
    return fetchData(url).then(data => data["result"]);
};


const getAllBoundaries = (resourceId) => {
    const records = [];
    const fetchChunk = (offset = 0) => {
        const url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resourceId}&offset=${offset}`;
        return fetchData(url).then(data => {
            const newBoundaries = data["result"]["records"];
            records.push(...newBoundaries);
            if (newBoundaries.length > 0){
                return fetchChunk(offset + newBoundaries.length);
            } else {
                return records;
            }
        });
    };
    return fetchChunk();
};

// Exporting functions
module.exports = { nhPackage, getAllBoundaries };