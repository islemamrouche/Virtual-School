import React, {useEffect,useState} from 'react'
import {getCookie, getToken} from '../../Helpers/Cookie'
import './Subscription.css'
import axios from 'axios'


function Subscription() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  const [state, setState]=useState({
    title:'',
    content:'',
    image:null
  })

	const handleChange = (e) =>{
		const { id,value} = e.target;
		setState(prevState => ({
			...prevState,
			[id]:value,
    }))
    console.log('onchange title', state.title)
	}

  const handleImageChange = (e) => {
    setState(prevState => ({
			...prevState,
			[e.target.id]: e.target.files[0]
    }))
    console.log('In imageChange', state.title);
  };

  const handleSubmit = (e) => {
    console.log('Before prevent default', state.title);
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('image', state.image, state.image.name);
    form_data.append('title', state.title);
    form_data.append('content', state.content);
    console.log('Thats the form data', form_data)
    let url = 'http://localhost:8000/api/posts/';
    const csrftoken = getCookie('csrftoken');
    axios.post(url, form_data, {
      headers: {
        'x-csrftoken':csrftoken,
        'content-type': 'multipart/form-data',
        'Authorization':`key ${getToken('key')}`
      }
    })
        .then(res => {
          console.log('Thats the res data', res.data);
        })
        .catch(err => console.log(err))
  };
  

	

  // if (getToken('key')){
  return (
    <React.Fragment>
      <div className="subscription-form">
        <form onSubmit={handleSubmit}>
      <h3 className="navbar-color">Our CCP Acount is xxxx</h3>
          <h2>Subscription</h2>
          <p className="hint-text">Prove you payed</p>
          <div className="form-group">   	
              </div>
              <div className="form-group">
              <input className="form-control" type="text" placeholder='Title' id='title' value={state.title} onChange={handleChange} required/>
              </div>  
              <div className="form-group">
                <input className="form-control" type="text" placeholder='Content' id='content' value={state.content} onChange={handleChange} required/>
              </div>      
              <div className="form-group">
              <input className="form-control-file"
                  type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={handleImageChange} required/>
              </div>      
              <div className="form-group">
                  <button className="btn btn-success btn-lg btn-block">Subscribe
                  </button>
              </div>
            </form>
      </div>
    </React.Fragment>

  )
// }else {
//     window.location.replace('http://localhost:8000/login');
//   }
}

const formCard={
  borderRadius:'15px'
}

export default Subscription
