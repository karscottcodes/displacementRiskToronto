# Toronto Displacement Risk Map
**Kyle Scott** (N00352594)
2024 Capstone Project (Humber College)

#### Project Purpose

Inspired by the Displacement Risk Map developed by the NYC Departments of City Planning (DCP) and Housing Preservation and Development (HPD) ( [Found Here](https://equitableexplorer.planning.nyc.gov/map/data/districthttp:// "Found Here") ) - the purpose of this project is to develop a displacement risk map for the City of Toronto. The project aims to illustrate the level of risk residents face regarding the ability to remain in their home or community.

By analyzing various factors such as building types, demographics, and average rental costs - the project will provide valuable insights into the risk of displacement across the neighbourhoods of Toronto.

#### Technology Stack

**Frontend:** TailwindCSS  
**Backend:** MERN Stack (Mongo, Express, React, Node)  
**API:** OpenStreetMap, Toronto Open Data  
**Additional Frameworks:** Chart.js for data visualization

#### Data Sources
Primary data sources include:
- [City of Toronto - Open Data | Neighbourhoods](https://open.toronto.ca/dataset/neighbourhoods/ "City of Toronto - Open Data | Neighbourhoods")  
This dataset is used to draw the boundaries for the neighbourhoods. The 158 (2021) Neighbourhood boundaries are dynamically generated through a call to the CKAN API. The 140 (2016) Neighbourhood boundaries are generated through the GeoJSON file.

- [City of Toronto - Open Data | Neighbourhood Profiles](https://open.toronto.ca/dataset/neighbourhood-profiles/ "City of Toronto - Open Data | Neighbourhood Profiles")  
This dataset contains census data (2021/2016) sorted by neighbourhood. I downloaded each dataset, and mapped out a custom XML schema using Excel.

- [Canadian Mortgage and Housing Corporation](https://www03.cmhc-schl.gc.ca/hmip-pimh/en/TableMapChart/Table?TableId=2.2.11&GeographyId=2270&GeographyTypeId=3&DisplayAs=Table&GeograghyName=Toronto# "Canadian Mortgage and Housing Corporation")  
Some historical average rental data was taken from this resource.

#### Futher Development
- Expanding the data sources to include additional factors that could contribute to displacement risk, such as crime rates or school quality.
- Developing a more sophisticated methodology for calculating displacement risk.

#### Get Started
1. Clone Repo
2. Install Dependencies

cd server  
npm install

cd client  
npm install

3. Run the application
cd server  
npm start

cd client  
npm run dev
