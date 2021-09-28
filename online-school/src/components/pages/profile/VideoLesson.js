import React from 'react'

function VideoLesson({program, playHandler}) {
  return (
    <div>
      <h2>{program.title}</h2>
      <video onBlur={playHandler} id="MyVideo" controlsList="nodownload" controls>
        <source src={`http://localhost:8000${program.video}`} type="video/mp4" />
          Your browser does not support the video tag.
      </video>
      <p>{program.content}</p>
    </div>
  )
}

export default VideoLesson
