import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { notifications, square, map } from 'ionicons/icons';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Map from './pages/map/map.component';
import Tab2 from './pages/notifications/notifications.component';
import Tab3 from './pages/Tab3';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import PrivateRoute from './components/private-route/private-route.component';

const App = ({ currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <PrivateRoute path='/map' component={Map} exact />
            <PrivateRoute path='/tab2' component={Tab2} exact />
            <PrivateRoute path='/tab3' component={Tab3} exact />
            <Route
              exact
              path='/signin'
              render={() => (currentUser ? <Redirect to='/' /> : <SignIn />)}
            />
            <Route
              exact
              path='/signup'
              render={() => (currentUser ? <Redirect to='/' /> : <SignUp />)}
            />
            <Route
              path='/'
              exact
              render={() => <Redirect to={!currentUser ? '/signin' : '/map'} />}
            />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='map' href='/map'>
              <IonIcon icon={map} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab='notifications' href='/notifications'>
              <IonIcon icon={notifications} />
              <IonLabel>Notifications</IonLabel>
            </IonTabButton>
            <IonTabButton tab='tab3' href='/tab3'>
              <IonIcon icon={square} />
              <IonLabel>About</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
