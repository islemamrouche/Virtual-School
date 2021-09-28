import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {CircularProgress} from '@material-ui/core';

function Programs(props) {

  const [programs, setPrograms]=useState()

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

programs? (console.log(programs)):(console.log('Didint fetch yet'))


return(
  <React.Fragment>
    {programs? (
      <div className="row">             
         {programs.map((program, index)=>{
              
              return(
                
                <div class="col-md-6 col-lg-3">
                <div class="card">
                 <video controlsList="nodownload" width="320" height="240" controls>
                    <source src={`http://localhost:8000${program.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div class="card-body">
                    <h4>{program.title}</h4>
                  </div>
                </div>
              </div>
              )
            })}  
      </div>

    ) :( <center>
          <CircularProgress />
        </center>
    )}
  </React.Fragment> 
)
}


export default Programs;