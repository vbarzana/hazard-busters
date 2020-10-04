import React from 'react';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const About = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>About us</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: 20 }}>
          <h2>The Team</h2>
          <p>
            We combined a team of experts in every field to make this dream true
          </p>
          <IonList>
            <IonItem>
              <IonAvatar slot='start'>
                <img
                  src='https://pbs.twimg.com/profile_images/1197649372009381893/N4LgBVPa_400x400.jpg'
                  alt='user'
                />
              </IonAvatar>
              <IonLabel>
                <h2>Victor Antonio Barzana Crespo</h2>
                <p>Senior Software Engineer</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img
                  src='https://ca.slack-edge.com/T019ULCSVL5-U01CF89EGTA-86f68d459aee-512'
                  alt='user'
                />
              </IonAvatar>
              <IonLabel>
                <h2>Irina Ivanova</h2>
                <p>UX/UI Designer</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img
                  src='https://ca.slack-edge.com/T019ULCSVL5-U01C41ZA7MF-g4a432d187e1-512'
                  alt='user'
                />
              </IonAvatar>
              <IonLabel>
                <h2>Mahabir</h2>
                <p>Data Scientist</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img
                  src='https://ca.slack-edge.com/T019ULCSVL5-U01BV2P9491-19801a4b46b0-512'
                  alt='user'
                />
              </IonAvatar>
              <IonLabel>
                <h2>Shenaha Sivakumar</h2>
                <p>Remote sensing, GIS, Python and R</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot='start'>
                <img
                  src='https://media-exp1.licdn.com/dms/image/C5603AQGP75vYPwumzA/profile-displayphoto-shrink_100_100/0?e=1606953600&v=beta&t=9xZI1MI0UqnZPjAHqfWSVqxXgtjD2o2uN5yrkPJlmVo'
                  alt='user'
                />
              </IonAvatar>
              <IonLabel>
                <h2>Shravan Koundinya Vutukuru</h2>
                <p>Researcher, Riga Technical University</p>
              </IonLabel>
            </IonItem>
          </IonList>
          <h2>The Challenge</h2>
          <p>
            Countless phenomena such as floods, fires, and algae blooms
            routinely impact ecosystems, economies, and human safety. Your
            challenge is to use satellite data to create a machine learning
            model that detects a specific phenomenon and build an interface that
            not only displays the detected phenomenon, but also layers it
            alongside ancillary data to help researchers and decision-makers
            better understand its impacts and scope.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
