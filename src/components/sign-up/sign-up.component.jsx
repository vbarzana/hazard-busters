import React, { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonContent,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonItem,
  IonLabel,
  IonPage
} from '@ionic/react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { emailSignUpStart } from '../../redux/user/user.actions';
import { selectSignUpError } from '../../redux/user/user.selectors';

import { useHistory } from 'react-router';

import './sign-up.styles.scss';

const SignUp = ({ emailSignUpStart, signUpError }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    emailSignUpStart({
      email,
      password,
      displayName
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='light'>
          <IonButtons slot='start' />
          <IonTitle>Sign up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='sign-up'>
          <form className='sign-up-form' onSubmit={handleSubmit}>
            <p align='center' style={{ width: '100%' }}>
              <IonImg
                style={{ width: '100px' }}
                src={process.env.PUBLIC_URL + '/assets/hazard-buster-logo.png'}
                alt='Logo'
              />
            </p>
            <IonItem>
              <IonLabel position='floating'>Email Address</IonLabel>
              <IonInput
                type='text'
                name='displayName'
                value={displayName}
                onIonChange={handleChange}
                label='Display Name'
                autoComplete='displayName'
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Email Address</IonLabel>
              <IonInput
                type='email'
                name='email'
                value={email}
                autoComplete='new-email'
                onIonChange={handleChange}
                label='Email'
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Password</IonLabel>
              <IonInput
                type='password'
                name='password'
                value={password}
                autoComplete='new-password'
                onIonChange={handleChange}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Confirm password</IonLabel>
              <IonInput
                type='password'
                name='confirmPassword'
                autoComplete='new-password-confirm'
                value={confirmPassword}
                onIonChange={handleChange}
                required
              />
            </IonItem>
            <span
              style={{ color: 'red', display: 'flex', margin: 10 }}
            >
              {signUpError}
            </span>
            <div style={{ padding: 10 }}>
              <IonButton
                type='submit'
                expand='full'
                style={{ marginBottom: 10 }}
              >
                Sign Up
              </IonButton>
              <IonLabel
                onClick={e => {
                  e.preventDefault();
                  history.push('/signin');
                }}
              >
                Already have an account? Sign in
              </IonLabel>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = dispatch => ({
  emailSignUpStart: userCredentials =>
    dispatch(emailSignUpStart(userCredentials))
});

const mapStateToProps = createStructuredSelector({
  signUpError: selectSignUpError
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
