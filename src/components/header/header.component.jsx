import React, { useState } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';

import {
  IonHeader,
  IonButton,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonPopover,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel
} from '@ionic/react';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { cog, personCircle, search, notifications, exit } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Header = ({ title, currentUser, signOutStart }) => {
  const [showPopover, setShowPopover] = useState(false);
  const history = useHistory();

  const getAvatarForCurrentUser = () => {
    if (currentUser && currentUser.email) {
      const username = md5(
        currentUser && currentUser.email ? currentUser.email : null,
        { encoding: 'binary' }
      );
      const url = `https://gravatar.com/avatar/${username}?s=30`;
      return url;
    }
  };
  const avatar = getAvatarForCurrentUser();
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return (
    <IonHeader>
      <IonToolbar>
        <img
          src={`${PUBLIC_URL}/assets/hazard-buster-logo.png`}
          alt='Hazard Busters logo'
          style={{
            width: 25,
            float: 'left',
            marginLeft: 10,
            cursor: 'pointer'
          }}
          onClick={e => {
            e.preventDefault();
            history.push(`${PUBLIC_URL}/map`);
          }}
        />
        <IonButtons slot='secondary'>
          <IonButton>
            <IonIcon slot='icon-only' icon={search} />
          </IonButton>
          <IonButton
            onClick={e => {
              e.preventDefault();
              history.push(`${PUBLIC_URL}/notifications`);
            }}
          >
            <IonIcon icon={notifications} slot='icon-only' />
          </IonButton>
          <IonButton onClick={() => setShowPopover(true)}>
            {avatar ? (
              <img src={getAvatarForCurrentUser()} alt='User avatar' />
            ) : (
              <IonIcon slot='icon-only' icon={personCircle} />
            )}
          </IonButton>
        </IonButtons>
        <IonTitle>{title}</IonTitle>

        <IonButtons slot='primary'>
          <IonPopover
            isOpen={showPopover}
            onDidDismiss={e => setShowPopover(false)}
          >
            <IonContent>
              <IonItem>
                <IonLabel>Settings</IonLabel>
                <IonIcon icon={cog} size='large' slot='end' />
              </IonItem>
              <IonItem
                onClick={() => {
                  signOutStart();
                  setShowPopover(false);
                  history.push(`${PUBLIC_URL}/signin`);
                }}
              >
                <IonLabel>Logout</IonLabel>
                <IonIcon icon={exit} size='large' slot='end' />
              </IonItem>
            </IonContent>
          </IonPopover>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
