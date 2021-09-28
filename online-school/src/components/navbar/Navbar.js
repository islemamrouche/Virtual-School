import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import * as faIcon from 'react-icons/fa'
//Translations
import { useTranslation} from "react-i18next";
import i18n from "i18next";
import cookies from 'js-cookie'
import { languages } from '../Helpers/languages'

function Navbar() {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l)=>l.code=== currentLanguageCode)
  const { t } = useTranslation();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    document.body.dir = currentLanguage.dir || 'ltr'
    document.body.style.textAlign= currentLanguage.align? 'right' : ''
  }, [currentLanguage]);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
             MAS E-LEARNING
             <faIcon.FaGraduationCap className="mx-2"/>
          </Link>
          
          {/* LANGUAGES DROP DOWN START*/}
            <div className="dropdown float-right mb-2 languages indexed">
              <button className="btn btn-link dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-language mb-2" style={{fontSize:'30px'}}></i>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <center>
                  <p className="dropdown-item-text text-capitalize"> {t('language')}</p>
                </center>
                {languages.map(({code, name, country_code})=>(
                  <a className={code===currentLanguageCode? 'text-muted dropdown-item': 'dropdown-item'} 
                  style={{pointerEvents: code===currentLanguageCode? 'None' : '', cursor: code===currentLanguageCode? 'default': 'pointer'}} 
                  key={country_code}
                  onClick={()=>i18n.changeLanguage(code)}
                  disabled={code===currentLanguageCode}
                  >
                    <span style={{opacity: code===currentLanguageCode? '0.5' : '1'}} className={`flag-icon flag-icon-${country_code} mx-2`}>
                    </span>
                    {name}
                  </a>
                ))}
              </div>
            </div>
          {/* LANGUAGES DROPDOWN END */}

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu mt-2'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links text-capitalize' onClick={closeMobileMenu}>
              {t('home')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/english/offers'
                className='nav-links text-capitalize'
                onClick={closeMobileMenu}
              >
                {t('english')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services/offers'
                className='nav-links text-capitalize'
                onClick={closeMobileMenu}
              >
                {t('services')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/training/offers'
                className='nav-links text-capitalize'
                onClick={closeMobileMenu}
              >
                {t('training')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact-us'
                className='nav-links text-capitalize'
                onClick={closeMobileMenu}
              >
                {t('contact_us')}
              </Link>
            </li>
                <li className="nav-item mymb">
                <Link
                  to='/sign-up'
                  className='btn btn-info mt-3 btn--m text-capitalize'
                  onClick={closeMobileMenu}
                >
                  {t('sign_up')}
                </Link>
              </li>
                <li className="nav-item mymb">
                <Link
                  to='/logout'
                  className='btn btn-info mt-3 btn--m text-capitalize'
                  onClick={closeMobileMenu}
                >
                  LOGOUT
                </Link>
              </li>
          </ul>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;