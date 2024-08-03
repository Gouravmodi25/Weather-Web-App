const container = document.querySelector(".container");
const weatherCard = document.querySelector(".weather-card");
const searchBox = document.querySelector(".search-box button");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

searchBox.addEventListener("click", () => {
  const APIKey = "8901131decf8af281fae54f7e2c8c25d";
  const city = document.querySelector(".search-box input").value;
  if (city == "") {
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherCard.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }
      container.style.height = "555px";
      container.classList.add("active");
      weatherCard.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      setTimeout(() => {
        container.classList.remove("active");
      }, 2500);

      const image = document.querySelector(".weather-card img");
      let temperature = document.querySelector(".weather-card .temperature");
      const description = document.querySelector(".weather-card .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const windSpeed = document.querySelector(".weather-details .wind span");
      console.log(data);

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = "555px";
        weatherCard.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        switch (data.weather[0].main) {
          case "Clear":
            image.src = "weatherimg/clear.png";
            break;
          case "Rain":
            image.src = "weatherimg/rain.png";
            break;
          case "Snow":
            image.src = "weatherimg/snow.png";
            break;
          case "Clouds":
            image.src = "weatherimg/cloud.png";
            break;
          case "Mist":
            image.src = "weatherimg/mist.png";
            break;
          case "Haze":
            image.src = "weatherimg/mist.png";
            break;
          default:
            image.src = "weatherimg/cloud.png";
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>c</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        windSpeed.innerHTML = `${parseInt(data.wind.speed)} Km/h`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWInd = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");
        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");
        elCloneInfoWInd.id = "clone-info-wind";
        elCloneInfoWInd.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWInd);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll(
          ".info-weather.active-clone "
        );
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll(
          ".info-humidity.active-clone "
        );
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll(
          ".info-wind.active-clone "
        );
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 2200);
        }
      }
    });
});
