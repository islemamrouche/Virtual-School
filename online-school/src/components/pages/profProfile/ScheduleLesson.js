import React,{useState} from 'react'
import './ScheduleLesson.css'
import {Link} from 'react-router-dom'
import { getCookie } from '../../Helpers/Cookie';


function Schedule(){
	const [signup,setSignUp]=useState({
		first_name:'',
		last_name:'',
		username:'',
		email:'',
		password:'',
		confirm_password:'',
		phoneNumber:'',
	});


	const signupHandler = (e) =>{
		const { name,value} = e.target;
		setSignUp(prevState => ({
			...prevState,
			[name]:value,
		}))
	}

	

	const submitSignup = (e)=>{
		e.preventDefault();
		var data = {
			user:{
				first_name:signup.first_name,
				last_name:signup.last_name,
				username:signup.username,
				email:signup.email,
				password:signup.password
			},
			phoneNumber:signup.phoneNumber,
		};
		const csrftoken = getCookie('csrftoken');
		if (signup.password === signup.confirm_password){
			fetch('http://localhost:8000/api/register',
			{
			method:'POST',
			mode:'cors',
			headers: new Headers({'x-csrftoken':csrftoken,'content-type': 'application/json'}),
			body:JSON.stringify(data),
			})
			.then(res=> res.json())
			.then(data => console.log(data))
	}
}

	

	return (
		<div className="signup-form">
		  <form method='POST' style={formCard} onSubmit={submitSignup}> 
				<h2>Schedule a lesson</h2>
				<p className="hint-text">Details about next lesson</p>
		    <div className="form-group">
					<div className="row">
						<div className="col">
              <input type="text" className="form-control" name="first_name" onChange={signupHandler} placeholder="Lesson title" required="required" />
              </div>
						<div className="col">
              <input type="text" className="form-control" name="last_name" onChange={signupHandler} placeholder="Date" required="required" />
              </div>
					</div>        	
		        </div>
		        <div className="form-group">
		        	<textarea style={{height:'80px'}} type="text" className="form-control" name="username" onChange={signupHandler}  placeholder="Describe your lesson" required="required" />
		        </div>
            <div className="form-group">
              <input className="form-control-file"
                  type="file"
                   id="image"
                   accept="image/png, image/jpeg" required/>
              </div>  
			    	<div className="form-group">
		            <button type="submit" className="btn btn-success btn-lg btn-block">Submit
                </button>
		        </div>
		  </form>
		</div>
		)
}

const formCard={
	borderRadius:'15px'
}

export default Schedule
