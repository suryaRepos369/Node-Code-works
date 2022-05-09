const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setting up the heroku port 
const port = process.env.PORT||3000;

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Surya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Surya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Surya",
  });
});
///query string is address
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(req.query.address, (err, data) => {
    if (err) res.send(err);
    else res.send({ weather: data, msg: "surya sent this msg" });
  });

  // res.send({
  //   forecast: "It is snowing",
  //   address: req.query.address,
  // });
});
// query string is search
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/location", (req, res) => {
  if (!req.query.lat || !req.query.long) {
    res.send("Please enter the cordinates");
  } else {
    forecast(req.query.lat, req.query.long, (err, data) => {
      if (err) res.send(err);
      else res.send(data);
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Surya",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Surya",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port ." + port);
});
