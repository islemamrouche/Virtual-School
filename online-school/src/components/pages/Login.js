import React from 'react'
import {getToken} from '../Helpers/Cookie'
import GoHome from '../GoHome'
import LoginComp from '../login/LoginComp'

function Login() {

  // if (getToken('key')){
	// 	window.location.replace('http://localhost:8000/student-space/plans')
	// }else{
  //   const removeHome=true;
  return (
      <LoginComp/>
  )}
// }

export default Login
