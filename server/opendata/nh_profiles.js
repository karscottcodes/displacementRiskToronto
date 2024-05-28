const https = require("https");
const packageId = "6e19a90f-971c-46b3-852c-0c48c436d1fc";

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

const npPackage = () => {
    const url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`;
    return fetchData(url).then(data => data["result"]);
};


const getAllProfiles = (resourceId) => {
    const records = [];
    const fetchChunk = (offset = 0) => {
        const url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resourceId}&offset=${offset}`;
        return fetchData(url).then(data => {
            const newProfiles = data["result"]["records"];
            records.push(...newProfiles);
            if (newProfiles.length > 0){
                return fetchChunk(offset + newProfiles.length);
            } else {
                return records;
            }
        });
    };
    return fetchChunk();
};

// Exporting functions
module.exports = { npPackage, getAllProfiles };