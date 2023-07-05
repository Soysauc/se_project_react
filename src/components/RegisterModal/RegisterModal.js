import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import '../ModalWithForm/ModalWithForm.css';

const RegisterModal = ({
  isOpen,
  onClose,
  handleRegistration,
  handleToggleModal,
  isLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const history = useHistory();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setAvatar('');
  }, [isOpen]);

  const Validation = useMemo(() => {
    return password.length >= 8 && email.length >= 1;
  }, [email, password]);

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleName = (evt) => {
    setName(evt.target.value);
  };

  const handleAvatar = (evt) => {
    setAvatar(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    handleRegistration(name, avatar, email, password);
    history.push('/profile');
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type='register'
      title='Sign up'
      buttonText={isLoading ? 'Loading...' : 'Next'}
      onClose={onClose}
      onSubmit={onSubmit}
      disabled={!Validation}
    >
      <h4 className='form__label'>Email *</h4>
      <input
        className='form__input'
        name='email'
        type='email'
        value={email}
        onChange={handleEmail}
        placeholder='Email'
        required
      />
      <h4 className='form__label'>Password *</h4>
      <input
        className='form__input'
        name='password'
        type='text'
        value={password}
        onChange={handlePassword}
        placeholder='Password'
        required
      />
      <h4 className='form__label'>Name</h4>
      <input
        className='form__input'
        name='name'
        type='text'
        value={name}
        onChange={handleName}
        placeholder='Name'
      />
      <h4 className='form__label'>Avatar URL</h4>
      <input
        className='form__input'
        name='avatar'
        type='url'
        value={avatar}
        onChange={handleAvatar}
        placeholder='Avatar URL'
      />

      <p className='modal__form-btn_alt' onClick={handleToggleModal}>
        or Log in
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
