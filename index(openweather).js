const apiKey = "90beb9da989dd815229f8351c86f04e4";

async function getData() {
  let locationResponse = await fetch("http://ip-api.com/json/");
  let locationData = await locationResponse.json();
  const lat = locationData.lat;
  const lon = locationData.lon;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let promisedData = await fetch(weatherUrl);
  let data = await promisedData.json();
  console.log(data);
  return data;
}

// HTML Elements
const locationText = document.querySelector(".locationText");
const conditionText = document.querySelector(".weatherText");
const tempText = document.querySelector(".celsius");
const time = document.querySelector(".time");
const conditionIcon = document.querySelector(".conditionIcon");
const textHumidity = document.querySelector(".textHumidity");
const textWindSpeed = document.querySelector(".textWindSpeed");

async function updatePage() {
  let data = await getData();
  locationText.innerText = data.name;
  conditionText.innerText = data.weather[0].main;
  tempText.innerText = data.main.temp;
  textHumidity.innerText = `${data.main.humidity}%`;
  textWindSpeed.innerText = `${data.wind.speed} m/s`;
  conditionIcon.classList.replace("wi-owm-000", `wi-owm-${data.weather[0].id}`);

  document.querySelector(".container").style.visibility = "visible";
}

updatePage();
