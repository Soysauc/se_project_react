import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import '../ModalWithForm/ModalWithForm.css';

const LoginModal = ({
  isOpen,
  onClose,
  handleLogin,
  handleToggleModal,
  showFormError,
  setShowFormError,
  isLoading,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [isOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password).then(() => {
      history.push('/profile');
    });
  };
  const Validation = useMemo(() => {
    return password.length >= 8 && email.length >= 1;
  }, [email, password]);

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      type='login'
      title='Log in'
      buttonText={isLoading ? 'Loading...' : 'Log in'}
      onClose={onClose}
      disabled={!Validation}
      onSubmit={onSubmit}
    >
      <h4 className={showFormError ? 'form__label_error' : 'form__label'}>
        {showFormError ? 'Incorrect email or password' : 'Email'}
      </h4>{' '}
      <input
        className={showFormError ? 'form__input_error' : 'form__input'}
        name='email'
        type='email'
        value={email}
        onChange={handleEmail}
        // onChange={(evt) => setEmail(evt.target.value)}
        placeholder='Email'
        required
      />
      <h4 className={showFormError ? 'form__label_error' : 'form__label'}>
        {showFormError ? 'Incorrect email or password' : 'Password'}
      </h4>{' '}
      <input
        className={showFormError ? 'form__input_error' : 'form__input'}
        name='password'
        type='text'
        value={password}
        onChange={handlePassword}
        // onChange={(evt) => setPassword(evt.target.value)}
        placeholder='Password'
        required
      />
      <p className='modal__form-btn_alt' onClick={handleToggleModal}>
        or Register
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
