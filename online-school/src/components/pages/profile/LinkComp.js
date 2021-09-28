import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function LinkComp({program, pr, student}) {
  const [locked, setLocked]=useState(false)

  useEffect(() =>{
    student.groups.map((prGroup)=>{
      pr.locked.map((prLocked)=>{
        if(prGroup.id===prLocked){
          {console.log('Lesson Locked')}
          setLocked(true)
        }
      })
    })
  }, [])
  return (
    <div>
      <Link 
      style={{
        color: program && pr.title===program.title && 'white',
        fontSize: program && pr.title===program.title && '25px' 
        }} 
        to={`/student-space/lessons/${pr.id}`}>
        <>
          {pr.title}
          {locked && <i className="ml-1 fa fa-lock" aria-hidden="true"></i>}
        </>
          
      </Link>
    </div>
  )
}

export default LinkComp
