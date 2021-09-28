import React,{useState} from 'react'
import {getCookie, getToken} from '../Helpers/Cookie'
import './Login.css'
import {Link} from 'react-router-dom'






function VeryAc(){

	const [login, setLogin] = useState({
		email:'',
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
		fetch('http://localhost:8000/api/login',
		{
		method:'POST',
		mode:'cors',
		headers: new Headers({'x-csrftoken':csrftoken,'content-type': 'application/json'}),
		body:JSON.stringify(login),
		})
		.then(res=> res.json())
		.then(data => 
			{if(data.user == true ){
			
		
			document.cookie ="key="+data.key+";max-age=" + (60 * 60 * 24 * 365) + ";Path=/;" 
			window.location.replace('http://localhost:8000/student-space/plans')

			}
		else if (data.user == false){
			alert('email or password do not exist!!');
		}

		})}

	return (
		<div className="login-form">
		  <form style={formCard} onSubmit={submitLogin}>
				<h2>Login</h2>
				<p className="hint-text">For students</p>
		    <div className="form-group">   	
		        </div>
		        <div className="form-group">
		        	<input type="text" className="form-control" name="email" onChange={loginHandler} placeholder="Email" required="required" />
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

export default VeryAc
