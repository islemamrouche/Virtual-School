import React, {useEffect} from 'react';
import '../../App.css';
import GoHome from '../GoHome';
import SignUpComp from '../signup/SignUpComp'

export default function SignUp() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
      <SignUpComp />
  )
}