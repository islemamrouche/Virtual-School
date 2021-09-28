import React, {useState, useEffect} from 'react';


import './TrainingCards.css';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import TrainingCardItem from './TrainingCardItem';
import TrainingSlideShow from '../training_slideshow/TrainingSlideShow'
import EnglishTest from '../EnglishTest/EnglishTest'
import {CircularProgress} from '@material-ui/core';
import EnglishOffer from '../pages/EnglishOffer';

import { useTranslation} from "react-i18next";
import i18n from "i18next";

function TrainingCards({tCards}) {
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
      <TrainingSlideShow />
    <div className='cards'>
      {/* <h1 className="text-uppercase">{t('training')}</h1> */}
      <h1>Administrative</h1> 
      
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
          {tCards? (
          <>     
            <div className="row justify-content-center">
            {tCards.map((tCard, index)=>{   
                  return(
                    <>
                    {tCard.tag.name==="Administrative" &&
                    <div className="col-md-4 center-align mb-3">
                    { i18n.language==="en"? 
                      <TrainingCardItem
                      src={`http://localhost:8000${tCard.image}`}
                      text={tCard.description_English}
                      label={tCard.title_English}
                      path={`/training/${tCard.id}`}
                      price='99$'
                     />
                    :i18n.language==="fr"? 
                      <TrainingCardItem
                      src={`http://localhost:8000${tCard.image}`}
                      text={tCard.description_French}
                      label={tCard.title_French}
                      path={`/training/${tCard.id}`}
                      price='99$'
                      />
                    :
                      <TrainingCardItem
                      src={`http://localhost:8000${tCard.image}`}
                      text={tCard.description_Arabic}
                      label={tCard.title_Arabic}
                      path={`/training/${tCard.id}`}
                      price='99$'
                      />
                     }
                    </div> }
                  </>
                  )
                })}  
            </div>       
          </> 
        ) :<CircularProgress />}
        </ul>

        </div>
      </div>

      <h1>Artisanat</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
          {tCards? (
          <>     
            <div className="row justify-content-center">
            {tCards.map((tCard, index)=>{   
                  return(
                    <>
                    {tCard.tag.name==="Handicraft" &&
                    <div className="col-md-4 center-align mb-3">
                    { i18n.language==="en"? 
                      <TrainingCardItem
                      src={`http://localhost:8000${tCard.image}`}
                      text={tCard.description_English}
                      label={tCard.title_English}
                      path={`/training/${tCard.id}`}
                      price='99$'
                     />
                    :i18n.language==="fr"? 
                      <TrainingCardItem
                      src={`http://localhost:8000${tCard.image}`}
                      text={tCard.description_French}
                      label={tCard.title_French}
                      path={`/training/${tCard.id}`}
                      price='99$'
                      />
                    :
                      <TrainingCardItem
                      src={`http://localhost:8000${tCard.image}`}
                      text={tCard.description_Arabic}
                      label={tCard.title_Arabic}
                      path={`/training/${tCard.id}`}
                      price='99$'
                      />
                     }
                    </div> }
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

export default TrainingCards;