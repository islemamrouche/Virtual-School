import React from 'react';
import {useEffect} from 'react'
import '../../App.css';
import EventsCards from '../cards/EventsCards';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';


export default function Events() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <React.Fragment>
      <Navbar />
      <EventsCards />
      <Footer />
    </React.Fragment>
  );
}