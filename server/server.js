const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs").promises;
const xml2js = require("xml2js");
const transporter = require("./config");
const { getAllBoundaries, nhPackage } = require("./opendata/neighbourhoods");
const { npPackage, getAllProfiles } = require("./opendata/nh_profiles");
// const rankNeighbourhoods = require("./algo/vOne");
const rankNeighbourhoods = require("./algo/vTwo");

dotenv.config();

//Models
const MenuLinkModel = require("./Models/MenuLink");

const buildPath = path.join(__dirname, "../client", "build");

const app = express();
app.use(express.json());
app.use(express.static(buildPath));
//Serve Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use(
	cors({
		origin: "*",
	})
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Backend UP: http://localhost:${port}`);
});

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}torontoRisk`
	)
	.then(() => console.log("Connected to torontoRisk DB"))
	.catch((error) => console.error("Error on DB Connection:", error));

app.get("/api/menu", async (req, res) => {
	try {
		const menuLinks = await MenuLinkModel.find({});
		res.json(menuLinks);
	} catch (error) {
		console.error("Error Fetching Menu Links: ", error);
		res.status(500).json({ error: "Internal Server Error " });
	}
});

//GET CENSUS 2021 XML
const getCensus2021XML = async () => {
	const census2021XMLPath = path.join(
		__dirname,
		"/public/datasets",
		"Census2021v2.xml"
	);
	const xml = await fs.readFile(census2021XMLPath, "utf-8");
	const parser = new xml2js.Parser();
	const result = await parser.parseStringPromise(xml);
	return result["NEIGHBOURHOOD-DATA"].NEIGHBOURHOOD;
};

// FUNCTION TO MERGE NEIGHBOURHOOD DATA WITH XML DATA (2021)
const mergeData = (neighbourhoodData, xmlData) => {
	return neighbourhoodData.map((hood) => {
		const xmlHood = xmlData.find(
			(xHood) => xHood.AREA_NAME[0] === hood.AREA_NAME
		);
		return { ...hood, ...xmlHood };
	});
};

// 2021: 158 Neighbourhoods (CKAN Open DATA)
app.get("/api/neighbourhoods", async (req, res) => {
	try {
		const packageMetadata = await nhPackage();
		const datastoreResources = packageMetadata.resources.filter(
			(r) => r.datastore_active
		);
		if (datastoreResources.length === 0) {
			return res
				.status(404)
				.json({ error: "No active datastore resources found" });
		};
		const boundary158Data = await getAllBoundaries(
			datastoreResources[0].id
		);
		const xml2021Data = await getCensus2021XML();
		// console.log("Data: ", xml2021Data);
		const merged158Neighbourhoods = await mergeData(
			boundary158Data,
			xml2021Data
		);
		// console.log(merged158Neighbourhoods);
		const ranked158Neighbourhoods = await rankNeighbourhoods(
			merged158Neighbourhoods
		);
		res.json(ranked158Neighbourhoods);
	} catch (error) {
		console.error("Error Fetching 158 Data: ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});




// 2016: 140 Neighbourhoods

const getCensus2016XML = async () => {
	const census2016XMLPath = path.join(
		__dirname,
		"/public/datasets",
		"Census2016v1.xml"
	);
	const xml = await fs.readFile(census2016XMLPath, "utf-8");
	const parser = new xml2js.Parser();
	const result = await parser.parseStringPromise(xml);
	return result["NEIGHBOURHOOD-DATA"].NEIGHBOURHOOD;
};

const merge140Data = (neighbourhoodData, xmlData) => {
	return neighbourhoodData.map((hood) => {
		const xmlHood = xmlData.find((xHood) => xHood.AREA_NAME[0] === hood.properties.AREA_NAME);
		if (xmlHood) {
			// Merge relevant properties
			return { ...hood, xmlProperties: xmlHood };
		}
		return hood;
	});
};

app.get("/api/neighbourhoods140", async (req, res) => {
	try {
		//Read GeoJSON Boundaries
		const data140 = path.join(
			__dirname,
			"/public/datasets",
			"neighbourhoods_140.geojson"
		);
		const geojsonData = await fs.readFile(data140, "utf-8");
		const jsonData = JSON.parse(geojsonData);
		//Read XML Data
		const xml2016Data = await getCensus2016XML();
		//Merge
		const merged140Neighbourhoods = merge140Data(jsonData.features, xml2016Data);
		//Rank
		const ranked140Neighbourhoods = rankNeighbourhoods(merged140Neighbourhoods);
		res.json(ranked140Neighbourhoods);
	} catch (error) {
		console.error("Error fetching 140 dataset: ", error);
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
			html: `<p>New Contact or Feedback from: Toronto Risk Displacement Map.</p>
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
                </ul>`,
		};

		transporter.sendMail(emailOptions, function (err, info) {
			if (err) {
				res.status(500).send({
					success: false,
					message: "Something went wrong. Try again later.",
				});
			} else {
				res.send({
					success: true,
					message:
						"Thanks for contacting us. We will get back to you shortly.",
				});
			}
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: "Something went wrong. Try again later.",
		});
	}
});
