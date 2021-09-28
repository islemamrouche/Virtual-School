import React,{useState} from 'react'
import './TeacherLogin.css'
import {Link} from 'react-router-dom'
import { getCookie } from '../Helpers/Cookie'
function TeacherLoginComp(){

	const [login,setLogin] = useState({
		username:'',
		password:'',

	})

	const loginHandler = (e)=>{
		const {name,value}= e.target;
		setLogin(prevState=>({
			...prevState,
			[name]:value,

		}))
	}


	const submitLogin = (e) =>{
		e.preventDefault();
		const csrftoken = getCookie('csrftoken');
		fetch('http://localhost:8000/api/login_teacher',
		{
		method:'POST',
		mode:'cors',
		headers: new Headers({'x-csrftoken':csrftoken,'content-type': 'application/json'}),
		body:JSON.stringify(login),
		})
		.then(res=> res.json())
		.then(data => 
			{if(data.user == true && data.tkey){
			
		
			document.cookie ="tkey="+data.tkey+";max-age=" + (60 * 60 * 24 * 365) + ";Path=/;" 
			window.location.replace('http://localhost:8000/teacher-space/schedule-lesson')

			}
		else if (data.user == false){
			alert('username or password do not exist!!');
		}

		})}

	return (
		<div className="login-form">
		  <form style={formCard} onSubmit={submitLogin}>
				<h2>Login</h2>
				<p className="hint-text">For teachers</p>
		    <div className="form-group">   	
		        </div>
		        <div className="form-group">
		        	<input type="text" className="form-control" name="username" onChange={loginHandler} placeholder="Username" required="required" />
		        </div>
			    	<div className="form-group">
		            <input type="password" className="form-control" name="password" onChange={loginHandler} placeholder="Password" required="required" />
		        </div>      
			    	<div className="form-group">
		            <button type="submit" className="btn btn-success btn-lg btn-block">Login
                </button>
		        </div>
		  </form>
			<div className="text-center">Don't have an account? <Link to="/sign-up">SignUp here</Link></div>
		</div>
		)
	}


const formCard={
	borderRadius:'15px'
}

export default TeacherLoginComp
