import React from 'react'
import {getCookie, getToken} from '../Helpers/Cookie'
import GoHome from '../GoHome'
import TeacherLoginComp from '../teacher_login/TeacherLoginComp'

function TeacherLogin() {
  if (getToken('tkey')){
		window.location.replace('http://localhost:8000/teacher-space/schedule-lesson')
	}else{
    // const removeHome=false;
  return (
    <div className="login-body">
      <GoHome />
      <TeacherLoginComp />
    </div>
  )}
}

export default TeacherLogin
