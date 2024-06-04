const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs").promises;
const _ = require("lodash");
const transporter = require("./config");
const { getAllBoundaries, nhPackage } = require("./opendata/neighbourhoods");
const { npPackage, getAllProfiles } = require("./opendata/nh_profiles");
const rankNeighbourhoods = require("./algo/vOne");

dotenv.config();

//Models
const MenuLinkModel = require("./Models/MenuLink");

const buildPath = path.join(__dirname, "../client", "build");

const app = express();
app.use(express.json());
app.use(express.static(buildPath));
//Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));
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

// 2021: 158 Neighbourhoods

const mergeData = (boundaryData, profilesData) => {
    return boundaryData.map(area => {
      const neighbourhood = profilesData[area.AREA_NAME];
      return neighbourhood
        ? { ...area, ...{ "Neighbourhood Name": area.AREA_NAME }, ...neighbourhood }
        : area;
    });
  };

// Merge 158 Data and serve
app.get("/api/neighbourhoods", async (req, res) => {
    try {
        const packageMetadata = await nhPackage();
        const datastoreResources = packageMetadata.resources.filter(r => r.datastore_active);

        if (datastoreResources.length === 0) {
            return res.status(404).json({ error: "No active datastore resources found" });
        }

        const boundary158Data = await getAllBoundaries(datastoreResources[0].id);
        const profiles158 = path.join(__dirname, "public/datasets", "profiles_158.json"); // Adjusted path
        const profilesData158 = JSON.parse(await fs.readFile(profiles158, "utf-8"));

        const all158Data = boundary158Data.map(area => {
            const neighbourhood = _.find(profilesData158, { "Neighbourhood Name": area.AREA_NAME });
            return neighbourhood ? { ...area, ...neighbourhood } : area;
        });

        const output158 = path.join(__dirname, "public/datasets", "output158.json"); // Adjusted path
        await fs.writeFile(output158, JSON.stringify(all158Data, null, 2), "utf-8");

        const ranked158Neighbourhoods = rankNeighbourhoods(all158Data);

        res.json(ranked158Neighbourhoods);
    } catch (error) {
        console.error("Error Merging 158 Data: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

















// 2016: 140 Neighbourhoods

app.get("/api/neighbourhoods140", async (req, res) => {
    try {
        const data140 = path.join(__dirname, "/public/datasets", "neighbourhoods_140.geojson");
        const geojsonData = await fs.readFile(data140, "utf-8");
        const jsonData = JSON.parse(geojsonData);

        const rankedNeighbourhoods140 = rankNeighbourhoods(jsonData.features);
        res.json(rankedNeighbourhoods140);
    } catch (error) {
        console.error("Error fetching 140 dataset: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// 140 Neighbourhood PROFILES
app.get("/api/profiles140", async (req, res) => {
    try {
        const packageMetadata = await npPackage();
        const datastoreResources = packageMetadata["resources"].filter(r => r.datastore_active);
        
        if (datastoreResources.length === 0) {
            return res.status(404).json({ error: "No active datastore resources found" });
        }

        const allProfileData = await getAllProfiles(datastoreResources[0].id);
        res.json(allProfileData);
    } catch (error) {
        console.error("Error fetching CKAN data: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//ContactForm
app.post("/send", (req, res) => {
    try {
        const emailOptions = {
            from: req.body.email, // Address of Sender
            to: process.env.CONFIG_EMAIL, // My Receiver Email
            subject: req.body.subject, // Subject Line
            html:
                `<p>New Contact or Feedback from: Toronto Risk Displacement Map.</p>
                <h3>Message Details</h3>
                <ul>
                    <li>
                        Name: ${req.body.contact_name}
                    </li>
                    <li>
                        Email: ${req.body.email}
                    </li>
                    <li>
                        Subject: ${req.body.subject}
                    </li>
                    <li>
                        Message: ${req.body.message}
                    </li>
                </ul>`
        };

        transporter.sendMail(emailOptions, function (err, info) {
            if (err) {
                res.status(500).send({
                    success:false,
                    message: "Something went wrong. Try again later."
                });
            } else {
                res.send({
                    success: true,
                    message: "Thanks for contacting us. We will get back to you shortly."
                });
            }
        });
    } catch (error) {
        res.status(500).send ({
            success: false,
            message: "Something went wrong. Try again later."
        });
    }
});