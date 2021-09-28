import React, {useState, useEffect, useRef} from 'react'


function Lesson({program, student}) {
  const [locked, setLocked]=useState(false)

  useEffect(() =>{
    setLocked(false)
    student.groups.map((prGroup)=>{
      program.locked.map((prLocked)=>{
        if(prGroup.id===prLocked){
          {console.log('Lesson Locked')}
          setLocked(true)
        }
      })
    })
  })
  const vidLesson = useRef(null);
  return (
    <div>
     {program.unit && <h1>{program.unit.name}</h1>}
     <h1>{program.title}</h1>
     <>
     {locked? (
       <h1>Lesson is locked</h1>
     ):(
       <>
        <video key={program.id} ref={vidLesson} controlsList="nodownload" controls>
        <source src={`http://localhost:8000${program.video}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
       </>
     )}
     </>
    </div>
  )
}

export default Lesson
