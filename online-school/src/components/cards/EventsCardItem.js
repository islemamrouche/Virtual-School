import React from 'react';
import { Link } from 'react-router-dom';

function EventsCardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link style={{textDecoration: 'none'}} className='cards__item__link' to={props.path}>
          <center>
            <h2 style={{color:'#002129'}} className="text-uppercase d-block">{props.label}</h2>  
          </center>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt={props.label}
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default EventsCardItem;