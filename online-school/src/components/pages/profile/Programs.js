import React, { useState, useEffect } from 'react';
import {getCookie, getToken} from '../../Helpers/Cookie'
import axios from 'axios';
import {CircularProgress} from '@material-ui/core';

function Programs(props) {

  const [programs, setPrograms]=useState()

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