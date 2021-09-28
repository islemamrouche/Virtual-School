import React, {useState, useEffect, useRef} from 'react'
import {getCookie, getToken} from '../../Helpers/Cookie'
import axios from 'axios';
import {CircularProgress} from '@material-ui/core';
import VideoLesson from './VideoLesson';
import TrackVisibility from 'react-on-screen';




function Playlist() {
  const [closeNav, setCloseNav]=useState(false)
  const [programs, setPrograms]=useState()
  const videoInput = useRef(null);
  const videoDiv = useRef(null);

  const closeNavHandler=()=>{
    setCloseNav(!closeNav)
  }
  const mySideBar={
    width: closeNav? '0px': '250px'
  }

  const main={
    marginLeft: closeNav? '0px': '250px'
  }


  const csrftoken = getCookie('csrftoken');
  useEffect(() => {
      axios('http://localhost:8000/api/lessons/',
      {
      method:'GET',
      // mode:'cors',
      headers: {
        'x-csrftoken':csrftoken,
        'content-type': 'multipart/form-data',
        'Authorization':`key ${getToken('key')}`
      }
      })
        .then(res=> setPrograms(res.data))
    
  }, []);



  const playHandler=(e)=>{
      e.target.pause()
    }

    console.log('Heres the video ref haha ', videoInput)

programs? (console.log(programs)):(console.log('Didnt fetch yet'))
  return (
    <section>
        <div style={mySideBar} id="mySidebar" class="nav ac sidebar-p">
            {/* <a href="javascript:void(0)" class="closebtn" onClick={closeNavHandler}>x</a> */}
            {programs? (
              <>
                {programs.map((program, index)=>{
                  const strr=program.title.replace(/\s+/g, '');
                  
                  return(
                    <>
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                                  
                    </>
                    
                  )
                })}
                <a className="nav-link">Neglected Item</a>

              </>
              ):(
            <center>
             <CircularProgress />
            </center>
            
        )}

      </div>

        <div style={main} id="main-p">

          <div class="tab-content">
            <div class="tab-pane active" id="about">
              {closeNav && 
                <button class="openbtn" onClick={closeNavHandler}>☰ Open Lessons</button>
              }  
              <h2>Your lessons</h2>
            </div>
            {programs? (
              <React.Fragment>
                {programs.map((program, index)=>{
                  const strr=program.title.replace(/\s+/g, '');
                  return(
                    <div ref={videoDiv} class="tab-pane" id={`${strr}`}>
                      {closeNav? 
                      (<button class="openbtn" onClick={closeNavHandler}>☰ Open Lessons</button>) :(<button class="openbtn" onClick={closeNavHandler}>X Close Lessons</button>)
                      }
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    <center>
                        <VideoLesson program={program} playHandler={playHandler}/>
                        {/* <video ref={videoInput} onBlur={playHandler} id={`${strr}`} id="MyVideo" controlsList="nodownload" controls>
                          <source src={`http://localhost:8000${program.video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      <p>{program.content}</p> */}
                    </center>
                  </div>
                  )

                })}

            </React.Fragment>
            ):(
              <center>
                 <CircularProgress />
             </center>
            )}



          </div>

        </div>
      </section>

  )
}

export default Playlist
