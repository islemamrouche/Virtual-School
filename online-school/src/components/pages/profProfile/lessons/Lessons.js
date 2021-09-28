import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'

import LessonsComp from './LessonsComp'
import { CircularProgress } from '@material-ui/core'
import { getCookie, getToken } from '../../../Helpers/Cookie'

function Lessons({group}) {

const [programs, setPrograms]=useState()

const csrftoken = getCookie('csrftoken');
  useEffect(() => {
    if(group){
      fetch('http://localhost:8000/api/prof-lessons/',
      {
      method:'POST',
      mode:'cors',
      headers: new Headers({
        'x-csrftoken':csrftoken,
        'content-type': 'application/json',
        'Authorization':`tkey ${getToken('tkey')}`
      }),
      body:JSON.stringify(group)
      })
        .then(res=>res.json())
        .then(data=> setPrograms(data))
    
  }}, []);


  return (
    <div>
        {group && programs ? (
          <>
          
          <React.Fragment>
             {/* <LessonsComp group={group} programs={programs} /> */}
            <Switch>
              <Route
                path={`/teacher-space/${group.id}/lessons`}
                render={(props) => (
               <LessonsComp {...props} group={group} programs={programs} /> ) }
              />
              {programs.map((program)=>(
              <Route
                path={`/teacher-space/${group.id}/${program.id}`}
                render={(props) => (
                <LessonsComp {...props} group={group} program={program} programs={programs} /> ) }
              />
              ))}
            </Switch>
          </React.Fragment>
        </>
        ) : (<CircularProgress />)
      }

    
    </div>
  )
}

export default Lessons
