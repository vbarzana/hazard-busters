import React, { useState } from 'react';

import {
  IonButton,
  IonInput,
  IonContent,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonText,
  IonImg,
  IonPage
} from '@ionic/react';

import './sign-in.styes.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectError } from '../../redux/user/user.selectors';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

import { useHistory } from 'react-router';

const SignIn = ({ emailSignInStart, googleSignInStart, error }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const history = useHistory();

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='light'>
          <IonButtons slot='start' />
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p align='center' style={{ width: '100%' }}>
          <IonImg
            style={{ width: '100px' }}
            src={process.env.PUBLIC_URL + '/assets/hazard-buster-logo.png'}
            alt='Logo'
          />
        </p>
        <form onSubmit={handleSubmit}>
          <IonText
            color='danger'
            padding
            style={{ color: 'red', display: 'flex', margin: 10 }}
          >
            {error}
          </IonText>

          <IonItem>
            <IonLabel position='floating'>Email Address</IonLabel>
            <IonInput
              name='email'
              type='email'
              value={email}
              autoComplete='email'
              onIonChange={handleChange}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Password</IonLabel>
            <IonInput
              name='password'
              type='password'
              autoComplete='password'
              value={password}
              onIonChange={handleChange}
              required
            />
          </IonItem>
          <div style={{ padding: 10, paddingTop: 20 }}>
            <IonButton type='submit' expand='full'>
              Sign In
            </IonButton>

            <IonButton
              type='button'
              onClick={googleSignInStart}
              isGoogleSignIn
              expand='full'
            >
              Sign In With Google
            </IonButton>
            <IonLabel
              expand='full'
              style={{ margin: 20 }}
              onClick={e => {
                e.preventDefault();
                history.push('/signup');
              }}
            >
              Don't have an account? Sign up
            </IonLabel>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

const mapStateToProps = createStructuredSelector({
  error: selectError
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
