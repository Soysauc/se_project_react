const getForecastWeather = (location, APIKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${APIKey}&units=imperial`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: $(res.status)`);
    }
  });
};

const filterDataFromWeatherAPI = (res) => {
  if (!res) {
    return null;
  }
  const weather = {};
  weather.city = res.name;
  weather.temperature = res.main.temp;
  weather.temperature.F = `${Math.round(res.main.temp)}°F`;
  weather.temperature.C = `${Math.round(((res.main.temp - 32) * 5) / 9)}°C`;
  weather.conditions = res.weather[0].main;
  return weather;
};

export { getForecastWeather, filterDataFromWeatherAPI };
