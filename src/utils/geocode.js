const request = require("request");

function geoCode(address, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=d9b1d13f245daade07a4f6601805ad71&query=" +
    address;
  //destructuring is used here
  // request({ url: url, json: true }, (error, response) => {
  request({ url: url, json: true }, (error, response) => {
    if (error) callback("unable to connect to server", undefined);
    // else if (response.body.error)
    else if (response.body.error)
      callback("error in the url ", response.body.error.code);
    //callback("error in the url ", body.error.code);
    else
      callback(
        undefined,
        "Temperature is " + response.body.current.temperature

        //"Temperature is " + body.current.temperature
      );
  });
}
// Geocode("Mysuru", (error, data) => {
//   console.log("Error occured" + error);
//   console.log("Received data is " + data);
// });

//module.exports = GeoCode;

module.exports = geoCode;

// const request = require("request");

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     address +
//     ".json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1";

//   request({ url, json: true }, (error, { body }) => {
//     if (error) {
//       callback("Unable to connect to location services!", undefined);
//     } else if (body.features.length === 0) {
//       callback("Unable to find location. Try another search.", undefined);
//     }
//     {
//       callback(undefined, {
//         latitude: body.features[0].center[1],
//         longitude: body.features[0].center[0],
//         location: body.features[0].place_name,
//       });
//     }
//   });
// };

// module.exports = geocode;
