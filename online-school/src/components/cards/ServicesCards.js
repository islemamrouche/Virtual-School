import React, {useState, useEffect} from 'react';

import './ServicesCards.css';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './ServicesCards.css';
import ServicesCardItem from './ServicesCardItem';
import ServicesSlideShow from '../services_slideshow/ServicesSlideShow'
import {CircularProgress} from '@material-ui/core';

import { useTranslation} from "react-i18next";
import i18n from "i18next";

function ServicesCards({sCards}) {
  const { t } = useTranslation();
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
    <Navbar />
    <ServicesSlideShow />
    <div className='cards'>
    <h1 className="text-uppercase">{t('services')}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
          {sCards? (
          <>         
              <div className="row justify-content-center">  
                {sCards.map((sCard, index)=>{   
                  return(
                    <>
                      <div className="col-md-4 center-align mb-3">
                      { i18n.language==="en"? 
                        <ServicesCardItem
                        src={`http://localhost:8000${sCard.image}`}
                        text={sCard.description_English}
                        label={sCard.title_English}
                        path={`/services/${sCard.id}`}
                        price='99$'
                        />
                      :i18n.language==="fr"? 
                        <ServicesCardItem
                        src={`http://localhost:8000${sCard.image}`}
                        text={sCard.description_French}
                        label={sCard.title_French}
                        path={`/services/${sCard.id}`}
                        price='99$'
                        />
                      :
                        <ServicesCardItem
                        src={`http://localhost:8000${sCard.image}`}
                        text={sCard.description_Arabic}
                        label={sCard.title_Arabic}
                        path={`/services/${sCard.id}`}
                        price='99$'
                        />
                      }  
                    </div>
                  </>
                  )
                })} 
              </div> 
          </> 
        ) :<CircularProgress />}
        </ul>

        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}

export default ServicesCards;