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

const Header = ({ title, currentUser, signOutStart }) => {
  const [showPopover, setShowPopover] = useState(false);
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

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='secondary'>
          <IonButton>
            <IonIcon slot='icon-only' icon={search} />
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
              <IonItem>
                <IonLabel>Notifications</IonLabel>
                <IonIcon icon={notifications} size='large' slot='end' />
              </IonItem>
              <IonItem onClick={signOutStart}>
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
