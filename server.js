const express = require("express");
const cors = require("cors");

global.__basedir = __dirname;
const base = "/api/v1/";

//routes
const observationRoutes = require("./app/routes/observationRoutes");

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

app.use(`${base}observations`, observationRoutes);

//run();
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
