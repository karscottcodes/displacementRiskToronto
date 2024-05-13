const https = require("https");
const packageId = "neighbourhood-crime-rates";

// Function to retrieve package metadata from CKAN
const getCrimePackage = () => {
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

// Retrieve the First Part of the Dataset
const getFirstCrimeDatastoreResource = (resource) => {
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

// Retrieve the First Part of the Dataset
const getSecondCrimeDatastoreResource = (resource) => {
    return new Promise((resolve, reject) => {
        https.get(
            `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=${resource["id"]}&offset=100`,
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
module.exports = { getCrimePackage, getFirstCrimeDatastoreResource, getSecondCrimeDatastoreResource };
