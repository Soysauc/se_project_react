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
  return weather;
};

export { getForecastWeather, filterDataFromWeatherAPI };
