import React from 'react';
import './EventsCards.css';
import EventsCardItem from './EventsCardItem';

//Images
import training from '../../assets/images/training.jpg'
import administrative from '../../assets/images/administrative.jpg'
import industrial from '../../assets/images/industrial.jpg'

function EventsCards() {
  return (
    <div className='cards'>
      <h1>TRAINING</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <EventsCardItem
              src={training}
              text='We do provide Artisanal training'
              label='Artisanal'
              path='/Specialties'
            />
            <EventsCardItem
              src={administrative}
              text='We do provide Administrative training'
              label='Administrative'
              path='/events'
            />
            <EventsCardItem
              src={industrial}
              text='We do provide industrial training'
              label='Industrial'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EventsCards;