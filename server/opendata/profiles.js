const https = require("https");
const packageId = "6678e1a6-d25f-4dff-b2b7-aa8f042bc2eb";

const getProfilePackage = () => {
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

module.exports = { getProfilePackage };