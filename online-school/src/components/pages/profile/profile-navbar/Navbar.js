import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import {UserInfo} from '../../../Helpers/UserInfo'
import * as faIcon from 'react-icons/fa'
import {getToken } from '../../../Helpers/Cookie';

function Navbar(pops) {
  const [click, setClick] = useState(false);

   const {student}=useContext(UserInfo)

   const handleClick = () => setClick(!click);
   const closeMobileMenu = () => setClick(false);
   const deleteCookie =(e)=>{
    document.cookie='key=;max-age=;Path=/;'
    localStorage.removeItem('key')
    sessionStorage.removeItem('key')
   }


student.firstName ? (console.log(student.firstName)):(console.log("Didn't fetch yet"))

  return (
    <>
      <nav id="student" className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
             MAS E-LEARNING
             <faIcon.FaGraduationCap className="ml-2"/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu mt-2'}>
            <li className='nav-item'>
              <Link to='/student-space/lessons/mylessons' className='nav-links' onClick={closeMobileMenu}>
                Lessons
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/student-space/plans'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Plans
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/student-space/programs'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Programs
              </Link>
            </li>
            <li className="Nav-item">
              <span 
                className='nav-links'
                onClick={closeMobileMenu}
                >
                {student.firstName && student.firstName}
              </span>
            </li>
            <li className="nav-item">
              <Link
                to='/logout'
                className='btn btn-danger mt-3 btn--m'
                onClick={closeMobileMenu}
              >
                LOGOUT
              </Link>
           </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;