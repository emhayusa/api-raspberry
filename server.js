const express = require("express");
const cors = require("cors");

global.__basedir = __dirname;
const base = "/api/v1/";

//routes
const authRoutes = require("./app/routes/authRoutes");
const deviceRoutes = require("./app/routes/deviceRoutes");
const gnssRoutes = require("./app/routes/gnssRoutes");
const observationRoutes = require("./app/routes/observationRoutes");
const projectRoutes = require("./app/routes/projectRoutes");
const rainFallRoutes = require("./app/routes/rainFallRoutes");
const waterLevelRoutes = require("./app/routes/waterLevelRoutes");
const waveRoutes = require("./app/routes/waveRoutes");
//const weatherRoutes = require("./app/routes/weatherRoutes");

const app = express();

var corsOptions = {
  origin: ["http://localhost:9000", "https://localhost"],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get(base, (req, res) => {
  //run();
  res.json({ message: "Welcome to PRESISIPEDIA API." });
});

app.use(`${base}auth`, authRoutes);
app.use(`${base}devices`, deviceRoutes);
app.use(`${base}gnss`, gnssRoutes);
app.use(`${base}observations`, observationRoutes);
app.use(`${base}projects`, projectRoutes);
app.use(`${base}rain-fall`, rainFallRoutes);
app.use(`${base}water-level`, waterLevelRoutes);
app.use(`${base}wave`, waveRoutes);
//run();
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
