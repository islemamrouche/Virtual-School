import React, {useEffect} from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './Offer.css'
import Safe from 'react-safe'

function EnglishOffer({enCard}) {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <Navbar />
      <div className="cov_container" style={{backgroundColor:'black'}} >
        <img className="w-100 cov_img_height" src={`http://localhost:8000${enCard.cover_image}`} />
        <div className="centered"><h1 className="display-4 text-uppercase text-white"><strong>{enCard.title_English} </strong> </h1></div>
      </div>
      <h1>Sneaky</h1>
      <Safe.p>{enCard.content_English}</Safe.p>
      <Footer />
    </div>
  )
}

export default EnglishOffer
