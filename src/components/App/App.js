import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import { signup, signin, getUser, updateUser } from '../../utils/auth';
import LoginModal from '../LoginModal/LoginModal';
import ItemModal from '../ItemModal/ItemModal';
import AddItemModal from '../AddItemModal/AddItemModal';
import './App.css';
import Profile from '../Profile/Profile';
// import { getItems, addItem, deleteItem } from '../../utils/api';
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
import * as api from '../../utils/api';

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [activeModal, setActiveModal] = useState('');
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  //sprint 14
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    avatar: '',
    _id: '',
  });
  const [showFormError, setShowFormError] = useState(false);

  const handleRegistration = async (name, avatar, email, password) => {
    return signup({ name, avatar, email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        onClose();
      })
      .catch((err) => console.log(err));
  };
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
        onClose();
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
        onClose();
      }
    }
    document.addEventListener('click', handleOverlay);
    return () => document.removeEventListener('click', handleOverlay);
  }, []);

  const onClose = () => {
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
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        onClose();
      })
      .catch((err) => console.log(err));
  };
  // const addCardLike = (id, token) => {};
  // const removeCardLike = (id, token) => {};

  const handleLike = (cardId) => {
    api
      .addCardLike(cardId)
      .then((likedCard) => {
        setClothingItems((state) =>
          state.map((card) => (card._id === cardId ? likedCard : card))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = (cardId) => {
    api
      .removeCardLike(cardId)
      .then((likedCard) => {
        setClothingItems((state) =>
          state.map((card) => (card._id === cardId ? likedCard : card))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleLikeClick = (cardId, isLiked) => {
    if (isLiked) {
      handleDislike(cardId);
    } else {
      handleLike(cardId);
    }
  };
  const handleFormError = () => {
    setShowFormError(false);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };
  const handleToggleModal = () => {
    activeModal === 'login'
      ? setActiveModal('register')
      : setActiveModal('login');
  };
  const handleProfileUpdate = async ({ name, avatar, token }) => {
    setIsLoading(true);
    updateUser(name, avatar, token)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const handleAuthorization = (email, password) => {
    setIsLoading(true);
    setShowFormError(false);
    signin(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        onClose();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setShowFormError(true);
      });
  };
  // const handleLogin = (email, password) => {
  //   signin(email, password)
  //     .then(() => {
  //       setIsLoggedIn(true);
  //       onClose();
  //     })
  //     .catch((err) => console.log(err));
  //}

  const fetchClothingItems = () => {
    api
      .getItems()
      .then(({ data }) => {
        console.log({ data });
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      setIsLoggedIn(true);
      getUser(jwt)
        .then((data) => {
          setCurrentUser({
            name: data.name,
            avatar: data.avatar,
            id: data._id,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isLoggedIn]);

  const handleLogout = (evt) => {
    evt.preventDefault();
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetchClothingItems();
  }, []);

  //changed item

  const handleAddItemSubmit = (name, imageUrl, weatherType) => {
    setIsLoading(true);
    console.log(
      `Adding item with name: ${name}, imageUrl: ${imageUrl}, weatherType: ${weatherType}`
    ); // Log the values

    api
      .addItem(name, imageUrl, weatherType)
      .then((item) => {
        const items = [...clothingItems, item];
        setClothingItems(items);
        onClose();
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            openAddModal={() => {
              setActiveModal('add');
            }}
            openLoginModal={() => {
              setActiveModal('login');
            }}
            openRegisterModal={() => {
              setActiveModal('register');
            }}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <Route exact path={'/'}>
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                loggedIn={isLoggedIn}
              />
            </Route>
            {/* <Route path={'/profile'}>  Legacy code*/}
            <ProtectedRoute isLoggedIn={isLoggedIn} path='/profile'>
              <Profile
                currentUser={currentUser}
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                openEditModal={() => {
                  setActiveModal('update');
                }}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                isLoading={isLoading}
                openModal={() => {
                  setActiveModal('add');
                }}
              />
            </ProtectedRoute>
            {/* </Route> */}
          </Switch>

          <Footer />

          <AddItemModal
            isOpen={activeModal === 'add'}
            isLoading={isLoading}
            type={'add'}
            onAddItem={handleAddItemSubmit}
            onClose={onClose}
          />
          {/* Sprint 14 */}
          <LoginModal
            isOpen={activeModal === 'login'}
            type={'login'}
            onClose={onClose}
            handleToggleModal={handleToggleModal}
            handleLogin={handleAuthorization}
            handleProfileUpdate={handleProfileUpdate}
            showFormError={showFormError}
            setShowFormError={handleFormError}
            isLoading={isLoading}
          />
          <ItemModal
            isOpen={activeModal === 'item'}
            type={'item'}
            card={selectedCard}
            onClose={onClose}
            onDeleteClick={handleDeleteClick}
          />
          {/* Sprint 14 */}

          <RegisterModal
            isOpen={activeModal === 'register'}
            type={'register'}
            showFormError={showFormError}
            setShowFormError={handleFormError}
            isLoading={isLoading}
            onClose={onClose}
            handleRegistration={handleRegistration}
            handleToggleModal={handleToggleModal}
          />

          <ConfirmationModal
            isOpen={activeModal === 'confirm'}
            type={'confirm'}
            onClose={onClose}
            onCardDelete={handleCardDelete}
          />

          {/* Sprint 14 */}

          <EditProfileModal
            isOpen={activeModal === 'update'}
            type={'update'}
            onClose={onClose}
            isLoading={isLoading}
            currentUser={currentUser}
            handleUserUpdate={handleProfileUpdate}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
