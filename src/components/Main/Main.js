import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData, defaultClothing, handleCardClick }) {
  const currentWeather = weatherData.temperature;

  const HOT_WEATHER = 86;
  const COLD_WEATHER = 64;

  const getWeatherType = () => {
    if (currentWeather >= HOT_WEATHER) {
      return "hot";
    } else if (
      currentWeather >= COLD_WEATHER - 1 &&
      currentWeather <= HOT_WEATHER - 1
    ) {
      return "warm";
    } else if (currentWeather <= COLD_WEATHER) {
      return "cold";
    }
  };

  function filterClothing(card) {
    if (card.weather === getWeatherType()) {
      return true;
    } else {
      return false;
    }
  }

  const clothingChoices = defaultClothing.filter((items) =>
    filterClothing(items)
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
        Today is {Math.round(currentWeather)}&deg;F / You may want to wear:
      </h3>
      <ul className="main__gallery">
        {clothingChoices.map((item) => (
          <ItemCard
            isOpen="false"
            clothingChoice={item}
            key={item._id}
            name={item.name}
            image={item.link}
            weather={item.weather}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </main>
  );
}
export default Main;
