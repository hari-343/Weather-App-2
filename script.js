const apiKey = "3097363db227f665c88ddebd2556bff2";

const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found-city')
const searchCitySection = document.querySelector('.search-city')
const weatherInfoSection = document.querySelector('.weather-info');
const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

searchBtn.addEventListener("click", (event) => {
  event.preventDefault()
  if (cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value)
    cityInput.value = "";
    cityInput.blur();
  }
}); 

cityInput.addEventListener('keydown', (event) => {
  if(event.key == 'Enter' && cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value)
    cityInput.value = "";
    cityInput.blur();
  }
  console.log(event)
})

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}

async function updateWeatherInfo(city) {
  try {
    const { lat, lon, name } = await getCoordinates(city);
    const weatherData = await getWeatherByCoords(lat, lon);

    const { main: { temp, humidity }, wind: { speed }, weather: [{ id, main }] } = weatherData;

    countryTxt.textContent = name;
    tempTxt.textContent = `${Math.round(temp)} °C`;
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = `${humidity}%`;
    windValueTxt.textContent = `${speed} m/s`;

    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;

    // ✅ pass coordinates to forecast
    updateForecast(lat, lon);

    showDisplaySection(weatherInfoSection);

  } catch (error) {
    console.error(error);
    showDisplaySection(notFoundSection);
  }
}




function getWeatherIcon(id) {
  if (id >= 200 && id <= 232) return 'thunderstorm.svg';
  if (id >= 300 && id <= 321) return 'drizzle.svg';
  if (id >= 500 && id <= 531) return 'rain.svg';
  if (id >= 600 && id <= 622) return 'snow.svg';
  if (id >= 701 && id <= 781) return 'atmosphere.svg';
  if (id === 800) return 'clear.svg';
  if (id >= 801 && id <= 804) return 'clouds.svg';
  return 'clear.svg';
}


function getCurrentDate() {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
}


function showDisplaySection(sectionToShow) {
  [weatherInfoSection, searchCitySection, notFoundSection]
    .forEach(sec => sec.style.display = 'none');

  sectionToShow.style.display = "flex";
}

async function updateForecast(lat, lon) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const forecastData = await response.json();

    // pick one forecast per day (~12:00)
    const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 4);

    const forecastItems = document.querySelectorAll('.forecast-item');
    daily.forEach((day, index) => {
      if (forecastItems[index]) {
        const dateTxt = forecastItems[index].querySelector('.forecast-item-date');
        const tempTxt = forecastItems[index].querySelector('.forecast-item-temp');
        const img = forecastItems[index].querySelector('.forecast-item-img');

        const options = { day: "2-digit", month: "short" };
        const date = new Date(day.dt_txt).toLocaleDateString("en-US", options);

        dateTxt.textContent = date;
        tempTxt.textContent = `${Math.round(day.main.temp)} °C`;
        img.src = `assets/weather/${getWeatherIcon(day.weather[0].id)}`;
        img.alt = day.weather[0].main;
      }
    });
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}


async function getCoordinates(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},IN&limit=1&appid=${apiKey}`;
  const response = await fetch(geoUrl);
  const data = await response.json();
  if (data.length === 0) throw new Error("City not found");
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
}

async function getWeatherByCoords(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}  