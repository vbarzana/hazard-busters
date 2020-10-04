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
import { flame, people, map } from 'ionicons/icons';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Map from './components/map/map-container.component';
import Notifications from './pages/notifications/notifications.component';
import About from './pages/about/about.component';
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
const PUBLIC_URL = process.env.PUBLIC_URL;

const App = ({ currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path={`${PUBLIC_URL}/map`} component={Map} exact />
            <Route
              path={`${PUBLIC_URL}/notifications`}
              component={Notifications}
              exact
            />
            <Route path={`${PUBLIC_URL}/about`} component={About} exact />
            <Route
              exact
              path={`${PUBLIC_URL}/signin`}
              render={() =>
                currentUser ? <Redirect to={`${PUBLIC_URL}/`} /> : <SignIn />
              }
            />
            <Route
              exact
              path={`${PUBLIC_URL}/signup`}
              render={() =>
                currentUser ? <Redirect to={`${PUBLIC_URL}/`} /> : <SignUp />
              }
            />
            <Route
              path={`${PUBLIC_URL}/`}
              exact
              render={() => (
                <Redirect
                  to={
                    !currentUser ? `${PUBLIC_URL}/signin` : `${PUBLIC_URL}/map`
                  }
                />
              )}
            />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='map' href={`${PUBLIC_URL}/map`}>
              <IonIcon icon={map} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab='hazards' href={`${PUBLIC_URL}/hazards`}>
              <IonIcon icon={flame} />
              <IonLabel>Hazards</IonLabel>
            </IonTabButton>
            <IonTabButton tab='about' href={`${PUBLIC_URL}/about`}>
              <IonIcon icon={people} />
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
