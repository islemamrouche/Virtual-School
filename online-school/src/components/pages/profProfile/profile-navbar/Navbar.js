import React, { useState, useEffect } from 'react';
// import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import * as faIcon from 'react-icons/fa'

import {getCookie, getToken} from '../../../Helpers/Cookie'

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [teacher, setteacher]=useState({
    firstName:undefined,
    lastName:undefined,
    phoneNumber:undefined
  })

   const handleClick = () => setClick(!click);
   const closeMobileMenu = () => setClick(false);
   const deleteCookie =(e)=>{
    document.cookie='tkey=;max-age=;Path=/;'
    localStorage.removeItem('tkey')
    sessionStorage.removeItem('tkey')
   }

  const csrftoken = getCookie('csrftoken');
  useEffect(() => {
    if(document.cookie.includes('key=') == true ) {
      fetch('http://localhost:8000/api/prof-data',
      {
      method:'GET',
      mode:'cors',
      headers: new Headers({'x-csrftoken':csrftoken,'content-type': 'application/json','Authorization':`tkey ${getToken('tkey')}`}),
      })
        .then(res=> res.json())
        .then(data=>{
          setteacher({
            firstName:data.user.first_name,
            lastName:data.user.last_name,
            phoneNumber:data.phoneNumber
          })
        })
    }
  }, []);

teacher.firstName ? (console.log(teacher.firstName)):(console.log("Didn't fetch yet"))
// document.cookie.includes('key=')? (console.log('The result of get cookie =>', getCookie('key'))):(console.log('your not logged in'))
  


  return (
    <>
      <nav id="prof" className='navbar'>
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
              <Link to='/teacher-space/schedule-lesson' className='nav-links' onClick={closeMobileMenu}>
                Schedule
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/teacher-space/mygroups' className='nav-links' onClick={closeMobileMenu}>
                My Groups
              </Link>
            </li>
            {getToken('key') ? (
              <React.Fragment>
                <li className="Nav-item">
                  <span 
                    className='nav-links'
                    onClick={closeMobileMenu}
                    >
                    {teacher.firstName}
                  </span>
                </li>
                <li>
                  <Link
                    className='btn btn-info mt-3 btn--m'
                    onClick={deleteCookie}
                  >
                    Logout
                  </Link>
               </li>

              </React.Fragment>

            ): (
              <li>
              <Link
                className='btn btn-info mt-3 btn--m'
                onClick={deleteCookie}
              >
                Logout
              </Link>
           </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;