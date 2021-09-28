import React, {useState, useEffect} from 'react';
import './Cards.css';
import EnglishCardItem from './EnglishCardItem';
import ServicesCardItem from './ServicesCardItem';
import {CircularProgress} from '@material-ui/core';

import { useTranslation} from "react-i18next";
import i18n from "i18next";


function Cards({enCards, sCards}) {
  const { t } = useTranslation();


  return (
    <div className='cards'>
      <h1>{t('check_programs')}</h1> 
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
          {enCards && sCards? (
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
  );
}

export default Cards;