import React, {useState, useEffect, useRef} from 'react'
import { getCookie, getToken } from '../../../Helpers/Cookie'


function Lesson({program, group}) {
  const [locked, setLocked]=useState(false)
  
  useEffect(() =>{
     setLocked(false)
      program.locked.map((prLocked)=>{
        if(group.id===prLocked){
          {console.log('Lesson Locked')}
          setLocked(true)
        }
      })
  })

  const lockHandler=()=>{
      const csrftoken = getCookie('csrftoken');
      fetch('http://localhost:8000/api/lock-lesson/',
      {
      method:'POST',
      mode:'cors',
      headers: new Headers({
        'x-csrftoken':csrftoken,
        'content-type': 'application/json'
      }),
      body:JSON.stringify({group: group, program:program})
      })
        .then(res=>res.json())
        .then(window.location.reload())   
  }

  const unlockHandler=()=>{
      const csrftoken = getCookie('csrftoken');
      fetch('http://localhost:8000/api/unlock-lesson/',
      {
      method:'POST',
      mode:'cors',
      headers: new Headers({
        'x-csrftoken':csrftoken,
        'content-type': 'application/json'
      }),
      body:JSON.stringify({group: group, program:program})
      })
        .then(res=>res.json())
        .then(window.location.reload())   
  }
  const vidLesson = useRef(null);
  return (
    <div>
      {locked? (
        <>
          <h2>Lesson is locked</h2>
          <button onClick={unlockHandler} className="btn btn-danger">Unlock lesson</button>
        </>
      ):(
        <>
        <h2>Lesson is unlocked</h2>
        <button onClick={lockHandler} className="btn btn-info">Lock lesson</button>
      </>
      )}
     {program.unit && <h1>{program.unit.name}</h1>}
     <h1>{program.title}</h1>
     <>
        <video key={program.id} ref={vidLesson} controlsList="nodownload" controls>
        <source src={`http://localhost:8000${program.video}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
     </>
    </div>
  )
}

export default Lesson
