import React, {useState, useEffect} from 'react'
import './playlist.css'
import axios from 'axios';
import {CircularProgress} from '@material-ui/core';

function Playlist() {
  const [closeNav, setCloseNav]=useState(false)
  const [programs, setPrograms]=useState()

  const closeNavHandler=()=>{
    setCloseNav(!closeNav)
  }
  const mySideBar={
    width: closeNav? '0px': '250px'
  }

  const main={
    marginLeft: closeNav? '0px': '250px'
  }



  function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
  }

  function getToken(name) {
    let result = ""
    const cookieString = document.cookie
       if (cookieString) {
      const cookies = cookieString.split(";")
      cookies.forEach(cookie => {
        const cookiePair = cookie.split("=", 2)
        const cookieName = cookiePair[0].trim()
        if (cookieName === name) {
          const cookieVal = cookiePair[1]
          result = cookieVal
        }
      })
    }
    return result
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

  // let options={
  //   root:null,
  //   rootMargin:'0px',
  //   threshold=1.0
  // };
  // let callback=()=>{
  //   entries.forEach(entry=>{
  //     if(entry.target.id=='myVideo'){
  //       if(entry.isIntersecting){
  //         entry.target.play();
  //       }else{
  //         entry.target.pause();
  //       }
  //     }
  //   })
  // }
  // let observer=new IntersectionObserver(callback, options)
  // observer.observe(document.querySelector('#myVideo'))

  console.log('width haha', window.innerWidth)

programs? (console.log(programs)):(console.log('Didint fetch yet'))
  return (
    <section>
        <div style={mySideBar} id="mySidebar" class="nav ac sidebar-p">
            {/* <a href="javascript:void(0)" class="closebtn" onClick={closeNavHandler}>x</a> */}
            {programs? (
              <>
              {console.log('hahahaha', programs)}
                {programs.map((program, index)=>{
                  const strr=program.title.replace(/\s+/g, '');
                  
                  return(
                    <>
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    <a className="nav-link" href={`#${strr}`} data-toggle="tab">{program.title}</a>                  
                    </>
                    
                  )
                  

                })}

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
                    <div class="tab-pane" id={`${strr}`}>
                      {closeNav? 
                      (<button class="openbtn" onClick={closeNavHandler}>☰ Open Lessons</button>) :(<button class="openbtn" onClick={closeNavHandler}>X Close Lessons</button>)
                      }
                    <center>
                      <h2>{program.title}</h2>
                        <video id={`${strr}`} id="MyVideo" controlsList="nodownload" controls>
                          <source src={`http://localhost:8000${program.video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      <p>{program.content}</p>
                    </center>
                  </div>
                  )
                  programs.map((program)=>{
                    
                  })

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
