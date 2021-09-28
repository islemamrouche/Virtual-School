import React, {useState, useEffect} from 'react';
import './Slideshow.css'
import axios from 'axios';
import { Carousel } from 'react-bootstrap'
import {getCookie} from '../Helpers/Cookie'
import Image from 'react-bootstrap/Image'
import {CircularProgress} from '@material-ui/core';

import i18n from "i18next";
import { useTranslation} from "react-i18next";

function CarouselContainer() {
  const { t } = useTranslation();
  const [slides, setSlides]=useState()

  const csrftoken = getCookie('csrftoken');
  useEffect(() => {
      axios('http://localhost:8000/api/slide_show/',
      {
      method:'GET',
      // mode:'cors',
      headers: {
        'x-csrftoken':csrftoken,
        'content-type': 'multipart/form-data'
      }
      })
        .then(res=> setSlides(res.data))
    
  }, []);

  return (
    <>
    {slides?
    <Carousel fade={true} pause={false} style={{height: '70%'}}>
        {slides.map((slide, index)=>{
          return(
            <Carousel.Item className="caro-height" interval={2000}>
            <div style={{backgroundColor:'black'}} >
            <Image
              className="d-block w-100 img-height"
              src={`http://localhost:8000${slide.image}`}
              alt={slide.title_English}
            />
            { i18n.language==="en"? 
              <Carousel.Caption>
                <h3>{slide.title_English}</h3>
                <p>{slide.content_English}</p>
              </Carousel.Caption>
            :i18n.language==="fr"?
              <Carousel.Caption>
                <h3>{slide.title_French}</h3>
                <p>{slide.content_French}</p>
              </Carousel.Caption>
            :
              <Carousel.Caption>
                <h3>{slide.title_Arabic}</h3>
                <p>{slide.content_Arabic}</p>
              </Carousel.Caption>
            }
            </div>
          </Carousel.Item>
        )})} 
    </Carousel>
      : <CircularProgress /> }
    </>
  )
}

export default CarouselContainer;