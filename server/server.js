const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const { getFirstDatastoreResource, getSecondDatastoreResource, getNHPackage } = require("./opendata/neighbourhoods");
const { getCrimePackage, getFirstCrimeDatastoreResource, getSecondCrimeDatastoreResource } = require("./opendata/crimerates");

dotenv.config();

//Models
const LinkModel = require("./Models/MenuLink");
const MenuLinkModel = require("./Models/MenuLink");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Backend UP: http://localhost:${port}`)
});

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}torontoRisk`)
.then(() => console.log("Connected to torontoRisk DB"))
.catch(error => console.error("Error on DB Connection:", error));

app.get("/api/menu", async (req, res) => {
    try {
        const menuLinks = await MenuLinkModel.find({});
        res.json(menuLinks);
    } catch (error) {
        console.error("Error Fetching Menu Links: ", error);
        res.status(500).json({ error: "Internal Server Error "});
    }
});

app.get("/api/neighbourhoods", async (req, res) => {
    try {
        const packageMetadata = await getNHPackage();
        const datastoreResources = packageMetadata["resources"].filter(r => r.datastore_active);
        const firstData = await getFirstDatastoreResource(datastoreResources[0]);
        const secondData = await getSecondDatastoreResource(datastoreResources[0]);
        const combinedData = firstData.concat(secondData);
        res.json(combinedData);
        } catch (error) {
            console.error("Error fetching CKAN data: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
});

app.get("/api/crimerates", async (req, res) => {
    try {
        const packageMetadata = await getCrimePackage();
        const datastoreResources = packageMetadata["resources"].filter(r => r.datastore_active);
        const firstData = await getFirstCrimeDatastoreResource(datastoreResources[0]);
        const secondData = await getSecondCrimeDatastoreResource(datastoreResources[0]);
        const combinedCrimeData = firstData.concat(secondData);
        res.json(combinedCrimeData);
        } catch (error) {
            console.error("Error fetching CKAN data: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
});
