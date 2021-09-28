import React from 'react'
import {Link} from 'react-router-dom'

function GoHome({removeHome}) {
  return (
    <div align="center">
      <Link className="btn btn-success" style={GoHomeStyle} to="/">Go Home</Link> &nbsp;
      {removeHome &&
      <Link className="btn btn-success" style={GoHomeStyle} to="/teacher-login">Teacher Space</Link> }
    </div>
  )
}
const GoHomeStyle={
position:''
}
export default GoHome
