import React, {useState, useEffect} from 'react';

import './EnglishCards.css';
import './EnglishCards.css';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import EnglishCardItem from './EnglishCardItem';
import EnglishSlideShow from '../english_slideshow/EnglishSlideShow'
import EnglishTest from '../EnglishTest/EnglishTest'
import {CircularProgress} from '@material-ui/core';
import EnglishOffer from '../pages/EnglishOffer';

import { useTranslation} from "react-i18next";
import i18n from "i18next";

function EnglishCards({enCards}) {
  const { t } = useTranslation();
  const [showTest, setShowTest]=useState(false)

  const testHandler=()=>{
    setShowTest(!showTest)
  }
  const testStyle={
    display: showTest? 'block': 'none'
  }
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
    <Navbar />
      <EnglishSlideShow />
    <div className='cards'>
      <h1 className="text-uppercase">{t('english')}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
          {enCards? (
          <>     
            <div className="row justify-content-center">
            {enCards.map((enCard, index)=>{   
                  return(
                    <>
                    <div className="col-md-4 center-align mb-3">
                    { i18n.language==="en"? 
                      <EnglishCardItem
                      src={`http://localhost:8000${enCard.image}`}
                      text={enCard.description_English}
                      label={enCard.title_English}
                      path={`/english/${enCard.id}`}
                      price='99$'
                     />
                    :i18n.language==="fr"? 
                      <EnglishCardItem
                      src={`http://localhost:8000${enCard.image}`}
                      text={enCard.description_French}
                      label={enCard.title_French}
                      path={`/english/${enCard.id}`}
                      price='99$'
                      />
                    :
                      <EnglishCardItem
                      src={`http://localhost:8000${enCard.image}`}
                      text={enCard.description_Arabic}
                      label={enCard.title_Arabic}
                      path={`/english/${enCard.id}`}
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
    <center>
        <h2 className="text-uppercase">{t('want_to_test_your_english_level_?')}</h2>
        <button style={{cursor: 'pointer', width:'200px'}} className="btn btn-lg btn-info mb-4 text-uppercase" onClick={testHandler}>{t('english_test')}</button>
      </center>
      <div className="mb-4 justify-content-center" style={testStyle}>
       <EnglishTest/>
      </div>
    <Footer />
  </>
  );
}

export default EnglishCards;