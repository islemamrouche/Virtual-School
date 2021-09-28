import React, {useState, useEffect} from 'react'
import '../../App.css';
import Cards from '../cards/Cards.js'
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import AboutUs from '../aboutUs/AboutUs';
import HomeSlideShow from '../slideshow/HomeSlider';




function Home({enCards, sCards}) {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <Navbar />
      <HomeSlideShow />
      <Cards enCards={enCards} sCards={sCards}/>
      <AboutUs />
      <Footer />
    </>
  );
}

export default Home;