import React from 'react';
import './Card.css'
import {Link, useHistory} from "react-router-dom"

function Card({hid, h_data, src, title, description, price ,startDate}) {
    const history = useHistory();
    return (
        <div  onClick={()=> history.push('/room_list',{state: h_data}) } className='card'>
            <img src={src} alt="" />
            <div  className="card__info">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <h3>{price}</h3>
            </div>
        </div>
    )
}

export default Card