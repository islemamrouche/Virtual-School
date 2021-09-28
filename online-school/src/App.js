import './App.css';
import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import {CircularProgress} from '@material-ui/core';

//Pages
import Home from './components/pages/Home';
import Events from './components/pages/Events';
import Footer from './components/footer/Footer';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import EnglishTestPage from './components/pages/EnglishTestPage';
import EnglishOffer from './components/pages/EnglishOffer';
import ServicesOffer from './components/pages/ServicesOffer';
import TrainingOffer from './components/pages/TrainingOffer';
import EnglishCards from './components/cards/EnglishCards';
import ServicesCards from './components/cards/ServicesCards';

// Profile
import StudentSpace from './components/pages/profile/StudentSpace';
import TeacherSpace from './components/pages/profProfile/TeacherSpace';
import TeacherLogin from './components/pages/TeacherLogin';
import AboutUs from './components/aboutUs/AboutUs';
import TransTest from './components/transTest';
import { getCookie } from './components/Helpers/Cookie';
import TrainingCards from './components/cards/TrainingCards';
import Logout from './components/Logout';
import VeryAc from './components/login/VeryAc';

function App() {
  const [enCards, setEnCards]=useState()
  const [sCards, setSCards]=useState()
  const [tCards, setTCards]=useState()

  const csrftoken = getCookie('csrftoken');
  useEffect(() => {
      axios('http://localhost:8000/api/english_cards/',
      {
      method:'GET',
      // mode:'cors',
      headers: {
        'x-csrftoken':csrftoken,
        'content-type': 'multipart/form-data'
      }
      })
        .then(res=> setEnCards(res.data))

      axios('http://localhost:8000/api/services_cards/',
      {
      method:'GET',
      // mode:'cors',
      headers: {
        'x-csrftoken':csrftoken,
        'content-type': 'multipart/form-data'
      }
      })
        .then(res=> setSCards(res.data))

      axios('http://localhost:8000/api/training_cards/',
      {
      method:'GET',
      // mode:'cors',
      headers: {
        'x-csrftoken':csrftoken,
        'content-type': 'multipart/form-data'
      }
      })
        .then(res=> setTCards(res.data))
    
  }, []);
  enCards? console.log(' From APP JS English cards', enCards): console.log('DIDNT FETCH ENGLISH CARDS YET')
  sCards? console.log(' From APP JS SSS', sCards): console.log('DIDNT FETCH SS CARDS YET')
  return (
    <>
      <Router>
         <Switch>         
          {enCards && sCards && tCards? (
            <Route
              path='/'
              exact
              render={(props) => (
              <Home {...props} enCards={enCards} sCards={sCards} tCards={tCards}/> )}
            /> 
        ) :<CircularProgress />}

          <Route path='/events' component={Events} />
          <Route path='/contact-us' component={Footer} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/veryac' component={VeryAc} />
          <Route path='/teacher-login' component={TeacherLogin} />
          <Route path='/english-test' component={EnglishTestPage} />
          <Route path='/student-space' component={StudentSpace} /> 
          <Route path='/teacher-space' component={TeacherSpace} /> 
          <Route path='/about-us' component={AboutUs} /> 
          <Route path='/logout' component={Logout} /> 
          <Route path='/trans-test' component={TransTest} />  
          {enCards && sCards && tCards? (
          <>            
            {enCards.map((enCard, index)=>{   
                  return(
                      <Route
                        path={`/english/${enCard.id}`}
                        render={(props) => (
                        <EnglishOffer {...props} enCard={enCard}/> ) }
                      />
                  )
                })} 
                <Route
                  path={`/english/offers`}
                  render={(props) => (
                  <EnglishCards enCards={enCards}/>  ) }
                />  
            {sCards.map((sCard, index)=>{   
                  return(
                      <Route
                        path={`/services/${sCard.id}`}
                        render={(props) => (
                        <ServicesOffer {...props} sCard={sCard}/> ) }
                      />
                  )
                })} 
                <Route
                  path={`/services/offers`}   
                  render={(props) => (
                  <ServicesCards sCards={sCards}/>  ) }
                />  
            {tCards.map((tCard, index)=>{   
                  return(
                      <Route
                        path={`/training/${tCard.id}`}
                        render={(props) => (
                        <TrainingOffer {...props} tCard={tCard}/> ) }
                      />
                    )
                  })} 
                  <Route
                    path={`/training/offers`}   
                    render={(props) => (
                    <TrainingCards tCards={tCards}/>  ) }
                  />  
          </> 
        ) :<CircularProgress />}        
         </Switch>
      </Router>
      
    </>
  );
}

export default App;
