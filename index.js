const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiKey = "11fe79405abd4d7084a95417231611";
const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`;

// HTML Elements
const locationText = document.querySelector(".locationText");
const conditionText = document.querySelector(".weatherText");
const tempText = document.querySelector(".celsius");
const time = document.querySelector(".time");
const weatherImage = document.querySelector(".weatherImage");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getData() {
  let data = await fetchData(currentWeatherUrl);
  locationText.innerText = data.location.name;
  conditionText.innerText = data.current.condition.text;
  tempText.innerText = data.current.temp_c;
  time.innerText = data.location.localtime;
  weatherImage.src = `https:${data.current.condition.icon}`.replace(
    "64x64",
    "128x128"
  );
  document.querySelector(".container").style.visibility = "visible";
}

getData();
