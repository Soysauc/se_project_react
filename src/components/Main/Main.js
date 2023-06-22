import './Main.css';
import React, { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

import ItemCard from '../ItemCard/ItemCard';
import WeatherCard from '../WeatherCard/WeatherCard';

function Main({ weatherData, clothingItems, handleCardClick }) {
  // const currentWeather = weatherData.temperature;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const currentTemp =
    currentTemperatureUnit === 'F'
      ? weatherData?.temperature?.F
      : weatherData?.temperature?.C;

  const HOT_WEATHER = 86;
  const COLD_WEATHER = 64;

  const getWeatherType = () => {
    if (currentTemp >= HOT_WEATHER) {
      return 'hot';
    } else if (
      currentTemp >= COLD_WEATHER - 1 &&
      currentTemp <= HOT_WEATHER - 1
    ) {
      return 'warm';
    } else if (currentTemp <= COLD_WEATHER) {
      return 'cold';
    }
  };

  function filterClothing(card) {
    return card.weather === getWeatherType();
  }

  const clothingChoices = Array.isArray(clothingItems)
    ? clothingItems.filter(filterClothing)
    : [];

  return (
    <main className='main'>
      <WeatherCard weatherData={weatherData} currentTemp={currentTemp} />
      <h3 className='main__header'>
        Today is
        {` ${currentTemp}°${currentTemperatureUnit} `} / You may want to wear:
      </h3>
      <ul className='main__gallery'>
        {clothingChoices.map((item) => (
          <ItemCard
            isOpen='false'
            clothingChoice={item}
            key={item.id}
            // name={item.name}
            // image={item.link}
            //weather={item.weather}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </main>
  );
}
export default Main;
