import { CircularProgress } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getCookie } from '../../../Helpers/Cookie'

import Lesson from './Lesson'

import './Lessons.css'
import LinkComp from './LinkComp'


function Profile({group, programs, program}) {
  const [closeNav, setCloseNav]=useState(false)
  const[unitsArray, setUnitsArray]=useState()

  useEffect(()=>{
    if (window.innerWidth <= 960) {
      setCloseNav(true);
    }
    window.scrollTo(0, 0);
  }, [])

  const closeNavHandler=()=>{
    setCloseNav(!closeNav)
  }
  const mySideBar={
    width: closeNav? '0px': '200px'
  }

  const main={
    marginLeft: closeNav? '0px': '200px'
  }

  useEffect(() => {
    if (programs){
      let unitsDup = programs.map(function(program) {
        return program.unit.name;
      });
      let  unitsArrayy= [...new Set(unitsDup)]
      unitsArrayy.sort()
      setUnitsArray(unitsArrayy);
    }
  
}, []);


 


if (getCookie('tkey')){
  return (

<React.Fragment>
    <div style={mySideBar} id="mySidenav" class="ac sidenav-l">
      {/* <a class="closebtn" onClick={closeNavHandler}>&times;</a> */}
      <h2 className="text-white pb-4">{group.name}</h2>
      {unitsArray && unitsArray.map((unit)=>(
        <React.Fragment>
        <h2 style={{color:'white', textDecoration:'underline'}}>{unit}</h2>
        {programs? (programs.map((pr)=>(
          <>
            {unit===pr.unit.name && (
            <LinkComp program={program} pr={pr} group={group}/> ) }
          </>
        ))) :(<CircularProgress />)}
     </React.Fragment>
      ))}
 
    </div>

    <div style={main} id="main">
    {closeNav? 
          (<button class="openbtn" onClick={closeNavHandler}>Open Lessons</button>) 
          :(<button class="openbtn" onClick={closeNavHandler}>Close Lessons</button>)
        }
 
    {program? (
        <center>
          <Lesson className="mt-4 pt-4" program={program} group={group}/>
        </center>
    ):(<h1>{group.name} lessons</h1>)
    }
    </div>
</React.Fragment>

  ) }
  else {
    window.location.replace('http://localhost:8000/teacher-login');
  }
}

export default Profile
