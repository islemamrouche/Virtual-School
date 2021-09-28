import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function LinkComp({program, pr, group}) {
  const [locked, setLocked]=useState(false)

  useEffect(() =>{
      pr.locked.map((prLocked)=>{
        if(group.id===prLocked){
          {console.log('Lesson Locked')}
          setLocked(true)
        }
      })
  }, [])
  return (
    <div>
      <Link 
      style={{
        color: program && pr.title===program.title && 'white',
        fontSize: program && pr.title===program.title && '25px' 
        }} 
        to={`/teacher-space/${group.id}/${pr.id}`}>
        <>
          {pr.title}
          {locked && <i className="ml-1 fa fa-lock" aria-hidden="true"></i>}
        </>
          
      </Link>
    </div>
  )
}

export default LinkComp
