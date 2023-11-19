const apiKey = "90beb9da989dd815229f8351c86f04e4";
// HTML Elements
const locationText = document.querySelector(".locationText");
const conditionText = document.querySelector(".weatherText");
const tempText = document.querySelector(".celsius");
const time = document.querySelector(".time");
const conditionIcon = document.querySelector(".conditionIcon");
const textHumidity = document.querySelector(".textHumidity");
const textWindSpeed = document.querySelector(".textWindSpeed");
const search = document.querySelector(".search");

async function getData(searchedLocation) {
  try {
    if (searchedLocation) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation}&units=metric&appid=${apiKey}`;
      let promisedData = await fetch(weatherUrl);
      let data = await promisedData.json();
      console.log(data);
      return data;
    } else {
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
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function updatePage(data) {
  try {
    if (!data) {
      let searchedLocation = locationText.value;
      data = await getData(searchedLocation);
    }
    locationText.value = data.name;
    conditionText.innerText = data.weather[0].main;
    tempText.innerText = data.main.temp;
    textHumidity.innerText = `${data.main.humidity}%`;
    textWindSpeed.innerText = `${data.wind.speed} m/s`;
    conditionIcon.className = conditionIcon.className.replace(
      /\bwi-owm-\d{3}\b/,
      `wi-owm-${data.weather[0].id}`
    );
    document.querySelector(".container").style.visibility = "visible";
  } catch (error) {
    console.error("Error updating page: ", error);
  }
}

search.addEventListener("click", async (event) => {
  event.preventDefault();
  let searchedLocation = locationText.value;
  let data = await getData(searchedLocation);
  updatePage(data);
});

updatePage();
