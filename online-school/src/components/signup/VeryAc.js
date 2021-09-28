import React,{useState} from 'react'
import {getCookie, getToken} from '../Helpers/Cookie'
import './SignUp.css'
import {Link} from 'react-router-dom'


function SignUp(){
	const [signup,setSignUp]=useState({
		first_name:'',
		last_name:'',
		username:'',
		email:'',
		password:'',
		confirm_password:'',
		phone_number:'',
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
				password:signup.password,
			},
			phone_number:signup.phone_number,
			groups: []
		};
		console.log("JASON DATA ", JSON.stringify(data))
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
				<h2>Register</h2>
				<p className="hint-text">Create your account. It's free and only takes a minute.</p>
		    <div className="form-group">
					<div className="row">
						<div className="col">
              <input type="text" className="form-control" name="first_name" onChange={signupHandler} placeholder="First Name" required="required" />
              </div>
						<div className="col">
              <input type="text" className="form-control" name="last_name" onChange={signupHandler} placeholder="Last Name" required="required" />
              </div>
					</div>        	
		        </div>
		        <div className="form-group">
		        	<input type="text" className="form-control" name="username" onChange={signupHandler}  placeholder="Username" required="required" />
		        </div>
		        <div className="form-group">
		        	<input type="email" className="form-control" name="email" onChange={signupHandler} placeholder="Email" required="required" />
		        </div>
		        <div className="form-group">
		        	<input type="text" className="form-control" name="phone_number" onChange={signupHandler} placeholder="Phone Number" required="required" />
		        </div>
			    	<div className="form-group">
		            <input type="password" className="form-control" name="password" onChange={signupHandler} placeholder="Password" required="required" />
		        </div>
			    	<div className="form-group">
		            <input type="password" className="form-control" name="confirm_password" onChange={signupHandler}  placeholder="Confirm Password" required="required" />
		        </div>        
		        <div className="form-group">
					    <label className="form-check-label">
                <input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
              </label>
				    </div>
			    	<div className="form-group">
		            <button type="submit" className="btn btn-success btn-lg btn-block">Register Now
                </button>
		        </div>
		  </form>
			<div className="text-center">Already have an account? <Link to="/login">Sign in</Link></div>
		</div>
		)
}

const formCard={
	borderRadius:'15px'
}

export default SignUp
