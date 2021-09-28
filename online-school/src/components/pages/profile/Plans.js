import React, {useEffect} from 'react'
import {getCookie, getToken} from '../../Helpers/Cookie'
import './Plans.css'
import {Link} from 'react-router-dom'


function Plans() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

// if (getToken('key')){
  return (
    <React.Fragment>
      <section>
      <h1>Our Programs</h1>
        <div class="row justify-content-center plans-body mt-5">
          <div class="col-8" align="center">
            <div class="card mt-3 tab-card">
              <div class="card-header tab-card-header">
                <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                      <a class="active nav-link font-weight-bold" id="one-tab" data-toggle="tab" href="#general-english" role="tab" aria-controls="One" aria-selected="true">General English</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link font-weight-bold" id="two-tab" data-toggle="tab" href="#medical-english" role="tab" aria-controls="Two" aria-selected="false">Medical English</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link font-weight-bold" id="three-tab" data-toggle="tab" href="#english-for-tourism" role="tab" aria-controls="Three" aria-selected="false">English for Tourism</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link font-weight-bold" id="three-tab" data-toggle="tab" href="#english-for-jobs" role="tab" aria-controls="Three" aria-selected="false">English for Jobs</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link font-weight-bold" id="three-tab" data-toggle="tab" href="#english-for-kids" role="tab" aria-controls="Three" aria-selected="false">English for Kids</a>
                  </li>
                </ul>
              </div>

              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active p-3" id="general-english" role="tabpanel" aria-labelledby="one-tab">
                  <h5 class="card-title">General English</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/student-space/subscription" class="btn btn-primary">Subscribe</Link>              
                </div>
                <div class="tab-pane fade p-3" id="medical-english" role="tabpanel" aria-labelledby="two-tab">
                  <h5 class="card-title">Tab Card Two</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/student-space/subscription" class="btn btn-primary">Subscribe</Link>               
                </div>
                <div class="tab-pane fade p-3" id="english-for-tourism" role="tabpanel" aria-labelledby="three-tab">
                  <h5 class="card-title">Tab Card Three</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/student-space/subscription" class="btn btn-primary">Subscribe</Link>               
                </div>
                <div class="tab-pane fade p-3" id="english-for-jobs" role="tabpanel" aria-labelledby="three-tab">
                  <h5 class="card-title">English for Jobs</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/student-space/subscription" class="btn btn-primary">Subscribe</Link>               
                </div>
                <div class="tab-pane fade p-3" id="english-for-kids" role="tabpanel" aria-labelledby="three-tab">
                  <h5 class="card-title">English for Kids</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Link to="/student-space/subscription" class="btn btn-primary">Subscribe</Link>               
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  ) }
//   else {
//     window.location.replace('http://localhost:8000/login');
//   }
// }

export default Plans
