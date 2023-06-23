import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import './App.css';
import Profile from '../Profile/Profile';
import { getItems, addItem, deleteItem } from '../../utils/api';
import { location, APIKey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from '../../utils/weatherApi';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [activeModal, setActiveModal] = useState('');
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  //sprint 14

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    function handleEscape(evt) {
      if (evt.code === 'Escape') {
        closeModal();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    function handleOverlay(evt) {
      if (
        evt.target.classList.contains('modal') ||
        evt.target.classList.contains('item-modal') ||
        evt.target.classList.contains('confirm-modal')
      ) {
        closeModal();
      }
    }
    document.addEventListener('click', handleOverlay);
    return () => document.removeEventListener('click', handleOverlay);
  }, []);

  const closeModal = () => {
    setActiveModal('');
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal('item');
  };

  const handleDeleteClick = () => {
    setActiveModal('confirm');
  };

  const handleCardDelete = () => {
    deleteItem(selectedCard.id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item.id !== selectedCard.id)
        );
        setSelectedCard({});
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  const fetchClothingItems = () => {
    getItems()
      .then(({ data }) => {
        console.log({ data });
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClothingItems();
  }, []);

  //changed item

  const handleAddItemSubmit = (name, imageUrl, weatherType) => {
    addItem(name, imageUrl, weatherType)
      .then((item) => {
        const items = [...clothingItems, item];
        setClothingItems(items);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn }}>
      <div className='App'>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            handleAddClick={() => {
              setActiveModal('add');
            }}
          />
          <Route exact path={'/'}>
            <Main
              weatherData={weatherData}
              clothingItems={clothingItems}
              handleCardClick={handleCardClick}
            />
          </Route>
          <Route path={'/profile'}>
            <Profile
              weatherData={weatherData}
              clothingItems={clothingItems}
              handleCardClick={handleCardClick}
              openModal={() => {
                setActiveModal('add');
              }}
            />
          </Route>
          <Footer />

          <AddItemModal
            isOpen={activeModal === 'add'}
            type={'add'}
            onAddItem={handleAddItemSubmit}
            onClose={closeModal}
          />

          <ItemModal
            isOpen={activeModal === 'item'}
            type={'item'}
            card={selectedCard}
            onClose={closeModal}
            onDeleteClick={handleDeleteClick}
          />
          <ConfirmationModal
            isOpen={activeModal === 'confirm'}
            type={'confirm'}
            onClose={closeModal}
            onCardDelete={handleCardDelete}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
