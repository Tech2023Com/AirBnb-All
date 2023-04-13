import React ,{useState,useEffect} from 'react';

import './Profile.css'
import './Bookings.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import {FaHotel} from "react-icons/fa"
import axios from "axios"

import { useStateValue } from './StateProvider';
import { Link, useHistory  } from "react-router-dom";



function Bookings() {
 
   
    var [hotel_details,setHotels]=useState([]);
    

   

  


    
  

    var fetchbookings = "http://localhost:8000/hotel_details";

    useEffect(()=>{
   
        async function bookings(){
            var request = await axios.get(fetchbookings);
         
       
          
          setHotels(request.data);

        console.log(request.data)
        }
             
        bookings();
    },[fetchbookings]);
  
    var history = useHistory()

    var renderTableHeader =()=> {
        let header =[
            "HotelID","Hotel Name","Email","Phone","Address"
        ];

        return header.map((key_) => {
           return <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">{key_}</a></div>
        })
     }

     

    var renderTable = () => {
        return hotel_details.map(item=> {
            var { hotel_id, hotel_name, hotel_email, hotel_phone, hotel_addr } = item
            return (
              
                <div className="table-row">
                    
                  
                    <div className="table-data">{hotel_id}</div>
				<div className="table-data">{hotel_name}</div>
				<div className="table-data">{hotel_email}</div>
				<div className="table-data">{hotel_phone}</div>
				<div className="table-data">{hotel_addr}</div>
				<div className="table-data">             
                <button className="button" style={{"backgroundColor":"#6DECAF","border":"none","padding":"10px 20px"}} onClick={()=>{history.push(`/hotel_details/${hotel_id}` , {state : {hotel_id  : hotel_id}})}}>  View  Hotel</button>
</div>
				
                </div>
         
            )
        })
    }
    
    
    return (

    
        
        <div className="container">
                            <button className="button" style={{"backgroundColor":"orange","border":"none","padding":"10px 20px" , width : '50%' , borderRadius:'10px'}} onClick={()=>{history.push(`/hotel_add` )}}>Add New Hotel</button>

            <h4 style={{"textAlign":"left","color":""}}><FaHotel />  Added Hotel Details</h4>

            <div className="table">
            <div className="table-header">
               {renderTableHeader()}
            </div>

            <div className="table-content">
          
         
                   {
                       renderTable()
                   }  
                 
            </div>
                
             
            </div>
           

         
            
                
            
           
                 
                
                 
            
             
          
            
       
        </div>
    )
}

export default Bookings