import './bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import 'flag-icon-css/css/flag-icon.min.css'

import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//Translations
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend'

import languageEN from './assets/locales/en/translation.json'
import languageFR from './assets/locales/fr/translation.json'
import languageAR from './assets/locales/ar/translation.json'

i18n
  .use(XHR)
  .use(initReactI18next) 
  .use(LanguageDetector)
  .init({
    resources: {
      en: languageEN,
      fr: languageFR,
      ar: languageAR
  },
    supportedLngs:['en', 'fr', 'ar'],
    fallbackLng: "en",
    detection: {
      order:  ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches:['cookie'],
    }
  });

const loadingMarkup=()=>(
  <div className="py-4 text-center">
    <h2>Loading..</h2>
  </div>
)
ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
