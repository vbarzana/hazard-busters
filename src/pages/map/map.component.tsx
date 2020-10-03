import React from 'react';
import { IonContent, IonPage } from '@ionic/react';

import ExploreContainer from '../../components/ExploreContainer';
import Header from '../../components/header/header.component';

import './map.styles.scss';

const Map: React.FC = () => {
  return (
    <IonPage>
      <Header title='Map' />
      <IonContent fullscreen>
        <ExploreContainer name='map' />
      </IonContent>
    </IonPage>
  );
};

export default Map;
