import React, {useEffect} from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Safe from 'react-safe'

function TrainingOffer({tCard}) {
  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <Navbar />
      <div className="cov_container" style={{backgroundColor:'black'}} >
        <img className="w-100 cov_img_height" src={`http://localhost:8000${tCard.cover_image}`} />
        <div className="centered"><h1 className="display-4 text-uppercase text-white"><strong>{tCard.title_English} </strong> </h1></div>
      </div>
      <div className="container">
        <h1>{tCard.title_French}</h1>
        <Safe.p>{tCard.content_French}</Safe.p>
      </div>
      <Footer />
    </div>
  )
}

export default TrainingOffer
