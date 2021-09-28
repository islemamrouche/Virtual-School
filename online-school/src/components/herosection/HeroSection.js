import React from 'react';
import '../../App.css';
import { Button } from '../button/Button';
import './HeroSection.css';

//import video2 from '../../assets/videos/video-2.mp4'
import bgHome from '../../assets/images/bghome.png'


function HeroSection() {
  return (
    <div className='hero-container'>
      <img src={bgHome} alt=""/>
      <h1>LEARN ENGLISH ONLINE</h1>
      <p>The only Algerian platform that teaches English ONLINE</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          path='/sign-up'
        >
          START LEARNING <i class="far fa-star"></i>
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path='/english-test'
        >
          TEST YOUR ENGLISH <i class="fas fa-weight"></i>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;