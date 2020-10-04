import React from 'react';
import {
  // IonTitle,
  IonPage,
  IonContent
  // IonPopover
} from '@ionic/react';

import Header from '../header/header.component';
// import HazardInfo from './hazard-info.component';

import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
  state = {
    selectedHazard: null,
    showPopover: false
  };
  onMarkerClick = () => {};
  onInfoWindowClose = () => {};
  render() {
    const { google } = this.props;
    // const { selectedHazard } = this.state;
    const setSelectedHazard = hazard => {
      this.setState({
        selectedHazard: hazard
      });
    };
    return (
      <IonPage>
        <Header title='Map' />
        <IonContent fullscreen>
          <Map
            center={{ lat: 37.775, lng: -122.434 }}
            onReady={(mapProps, map) => {
              map.data.loadGeoJson(process.env.PUBLIC_URL + '/data/usa.json');
              map.data.setStyle(function (feature) {
                let size = Math.random() * (30 - 10) + 10;
                return {
                  icon: {
                    scaledSize: new google.maps.Size(size, size),
                    url: process.env.PUBLIC_URL + '/assets/img/flame.png'
                  }
                };
              });
              var infowindow = new google.maps.InfoWindow({
                content: 'Please click a marker'
              });
              map.data.addListener('click', function (event) {
                let properties = '<h3>Hazard description</h3>';
                setSelectedHazard(event.feature);
                event.feature.forEachProperty(function (prop, key) {
                  properties += `<b>${key}:</b> ${prop}<br>`;
                });
                infowindow.setContent(properties); // show the html variable in the infowindow
                infowindow.setPosition(event.latLng);
                infowindow.setOptions({
                  pixelOffset: new google.maps.Size(0, 0)
                }); // move the infowindow up slightly to the top of the marker icon
                infowindow.open(map);
              });
            }}
            zoom={4}
            mapTypeControl={false}
            streetViewControl={false}
            className='map'
            mapType='SATELLITE'
            google={google}
            initialCenter={{ lat: 47.444, lng: -122.176 }}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_BACKEND_GOOGLE_MAPS_API
})(MapContainer);

// {selectedHazard ? (
//   <IonPopover
//     isOpen={!!selectedHazard}
//     onDismiss={() => {
//       setSelectedHazard(null);
//     }}
//   >
//     <IonTitle>Fire Hazard</IonTitle>
//     <HazardInfo hazard={selectedHazard} />
//   </IonPopover>
// ) : null}
