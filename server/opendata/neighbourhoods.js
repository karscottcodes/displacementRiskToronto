const https = require("https");
const packageId = "neighbourhoods";

// Function to retrieve package metadata from CKAN
const getNHPackage = () => {
    return new Promise((resolve, reject) => {
        https.get(
            `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=${packageId}`,
            (response) => {
                let dataChunks = [];
                response.on("data", (chunk) => {
                    dataChunks.push(chunk);
                }).on("end", () => {
                    let data = Buffer.concat(dataChunks);
                    resolve(JSON.parse(data.toString())["result"]);
                }).on("error", (error) => {
                    reject(error);
                });
            }
        );
    });
};

// Function to retrieve data from CKAN datastore resource
const getNHDatastoreResource = (resource) => {
    return new Promise((resolve, reject) => {
        https.get(
            `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource["id"]}`,
            (response) => {
                let dataChunks = [];
                response.on("data", (chunk) => {
                    dataChunks.push(chunk);
                }).on("end", () => {
                    let data = Buffer.concat(dataChunks);
                    resolve(JSON.parse(data.toString())["result"]["records"]);
                }).on("error", (error) => {
                    reject(error);
                });
            }
        );
    });
};

// Exporting functions
module.exports = { getNHPackage, getNHDatastoreResource };
