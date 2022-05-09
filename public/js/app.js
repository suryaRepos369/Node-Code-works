console.log("Client side javascript file is loaded!");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const place = document.querySelector("input");
const msg1 = document.querySelector("#p1");
const msg2 = document.querySelector("#p2");
//msg1.textContent = "loading.......";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = place.value;
  msg2.textContent = "";
  console.log(location);
  fetch(
    "http://api.weatherstack.com/current?access_key=d9b1d13f245daade07a4f6601805ad71&query=" +
      location
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) msg1.textContent = error;
      //console.log(error);
      else console.log(data.current.temperature);
      msg2.textContent = "Temperature is " + data.current.temperature;
    });
  });
});
