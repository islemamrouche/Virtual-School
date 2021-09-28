import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { getCookie, getToken } from '../../Helpers/Cookie'
import axiosInstance from '../../Helpers/axiosM'

import LessonsComp from './LessonsComp'
import { CircularProgress } from '@material-ui/core'

function Lessons({student}) {

const [pro, setPro]=useState(["hello", "hey"])
const [programs, setPrograms]=useState()

const csrftoken = getCookie('csrftoken');
  // useEffect(() => {
  //     axios('http://localhost:8000/api/lessons/',
  //     {
  //     method:'GET',
  //     // mode:'cors',
  //     headers: {
  //       'x-csrftoken':csrftoken,
  //       'content-type': 'multipart/form-data',
  //       'Authorization':`key ${getToken('key')}`
  //     }
  //     })
  //       .then(res=> setPrograms(res.data))
    
  // }, []);

  useEffect(()=>{
  axiosInstance
  .get(`lessons/`)
  .then(res=> setPrograms(res.data))  
}, []);
programs ? (console.log('Haha ', programs)) : console.log('couldnt fetch lessons')

  return (
    <div>
 
      {programs ? (
        <React.Fragment>
          <Switch>
          <Route
              path={`/student-space/lessons/mylessons`}
              render={(props) => (
              <LessonsComp {...props} programs={programs} student={student} /> ) }
            />
            {programs.map((program)=>(
            <Route
              path={`/student-space/lessons/${program.id}`}
              render={(props) => (
              <LessonsComp {...props} program={program} programs={programs} student={student} /> ) }
            />
            ))}
          </Switch>
        </React.Fragment>
        ) : (<CircularProgress />)
      }
    
    </div>
  )
}

export default Lessons
