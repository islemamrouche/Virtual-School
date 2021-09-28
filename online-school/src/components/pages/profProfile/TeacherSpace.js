import React, {useState, useEffect} from 'react'
import Navbar from './profile-navbar/Navbar'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import ScheduleLesson from './ScheduleLesson'
import MyGroups from './MyGroups';
import { getCookie, getToken } from '../../Helpers/Cookie';
import Trial from './lessons/Trial'
import Lessons from './lessons/Lessons'




function TeacherSpace() {
  const [groups, setGroups]=useState()
    const csrftoken = getCookie('csrftoken');
    useEffect(() => {
      if (getCookie('tkey')){
        axios('http://localhost:8000/api/prof-groups',
        {
        method:'GET',
        // mode:'cors',
        headers: {
          'x-csrftoken':csrftoken,
          'content-type': 'multipart/form-data',
          'Authorization':`tkey ${getToken('tkey')}`
        }
        })
          .then(res=> setGroups(res.data))
    }}, []);

  if (getCookie('tkey')){
  return (
    <div> 
      <Navbar />
         <Switch>
            <Route path='/teacher-space/schedule-lesson' component={ScheduleLesson} />
            {groups? (
              <>
                <Route
                  path='/teacher-space/mygroups'
                  render={(props) => (
                  <MyGroups {...props} groups={groups}/> ) }
                />
              <>
               {groups.map((group)=>(
                 <>
                  <Route
                    path={`/teacher-space/${group.id}`}
                    render={(props) => (
                    <Lessons {...props} group={group}/> ) }
                  />
                 </>
               ))}
              </>
              </>
            ): (console.log('no groups'))} 
          </Switch>
 
    </div>
  ) }   else {
    window.location.replace('http://localhost:8000/teacher-login');
  }
}

export default TeacherSpace
