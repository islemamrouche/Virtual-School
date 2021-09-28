import React, {useState, useEffect} from 'react'
import Navbar from './profile-navbar/Navbar'
import axiosInstance from '../../Helpers/axios'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Plans from './Plans'
import Lessons from './Lessons'
import Subscription from './Subscription'
import Programs from './Programs'
import Playlist from './Playlist'
import {UserInfo} from '../../Helpers/UserInfo'
import { getCookie, getToken } from '../../Helpers/Cookie'
import { CircularProgress } from '@material-ui/core'


function StudentSpace() {
  const [student, setStudent]=useState({
    firstName:undefined,
    lastName:undefined,
    phoneNumber:undefined,
    groups:undefined
  })

  const csrftoken = getCookie('csrftoken');
  useEffect(() => {
      axiosInstance
        .get(`student-data/`)
        .then(res=>{
          console.log('RES . DATA ', res.data)
          setStudent({
            firstName:res.data.first_name,
            lastName:res.data.last_name,
            phoneNumber:res.data.phoneNumber,
            groups:res.data.groups
          })
        })
  }, []);

  return (
    <div> 
      {student.firstName? (
        <>
          <UserInfo.Provider value={{student}}>
            <Navbar />
          </UserInfo.Provider>
          <Route
              path={`/student-space/lessons`}
              render={(props) => (
              <Lessons {...props} student={student} /> ) }
            />
        </>
      ): (
        <CircularProgress />
      )}
         <Switch>
            <Route path='/student-space/plans' component={Plans} />
            {/* <Route path='/student-space/lessons' component={Lessons} /> */}
            <Route path='/student-space/subscription' component={Subscription} />
            <Route path='/student-space/programs' component={Programs} />
            <Route path='/student-space/playlist' component={Playlist} />
          </Switch>
 
    </div>
  )
}

export default StudentSpace
