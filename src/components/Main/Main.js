import './Main.css';
import React, { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import ItemCard from '../ItemCard/ItemCard';
import WeatherCard from '../WeatherCard/WeatherCard';

function Main({
  weatherData,
  clothingItems,
  handleCardClick,
  handleLikeClick,
  isLoggedIn,
}) {
  // const currentWeather = weatherData.temperature;
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

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

  const clothingChoices = clothingItems.filter(filterClothing);
  //commented for

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
            key={item._id}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            handleLikeClick={() => {
              handleLikeClick(
                item._id,
                item.likes.includes(currentUser._id),
                currentUser
              );
            }}
            // name={item.name}
            // image={item.link}
            //weather={item.weather}
            handleCardClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </main>
  );
}
export default Main;
