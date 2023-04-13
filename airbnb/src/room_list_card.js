import React , {useEffect , useState} from 'react';
import './Card.css'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'

function Card({ src, title, full_data , hotel_id }) {


    const history = useHistory();
    var [facility_details, setFacilityDetails]=useState([])
    
    var fetchRoomfacilities = "http://localhost:8000/facilities_for_cust";

    useEffect(()=>{
        async function fetchFacility(){
            var request = await axios.get(fetchRoomfacilities , {params : {hotel_id :  hotel_id}});
            console.log(request.data)
           setFacilityDetails(request.data)
        }
            
                 fetchFacility();
                
              },[fetchRoomfacilities]);

              const setFacilitiesValues = (dt) =>{
                console.log(":" , dt)
                var a  =  dt.split(",")
                var faci_list = "";
                var total_cost  = 0
                for(let i = 0 ; i < a.length ;  i++)
                {
                    for(let j = 0 ; j < facility_details.length ;  j++)
                    {
                        if(a[i] == facility_details[j].facility_id)
                        {
                            faci_list += facility_details[j].facility + ","
                            total_cost += facility_details[j].facility_cost
                        }
                    }
                }
                return faci_list
                

              }

              const setFacilitiesCost = (dt) =>{
                console.log(":" , dt)
                var a  =  dt.split(",")
                var faci_list = "";
                var total_cost  = 0
                for(let i = 0 ; i < a.length ;  i++)
                {
                    for(let j = 0 ; j < facility_details.length ;  j++)
                    {
                        if(a[i] == facility_details[j].facility_id)
                        {
                            faci_list += facility_details[j].facility + ","
                            total_cost += facility_details[j].facility_cost
                        }
                    }
                }
                return total_cost
                

              }

              

    return (
        <div   className='card'>
            <img src={src} alt="" />
            <div  className="card__info">
                <h2>{title == 1 ? "AC Room" : "NON AC ROOM"}</h2>
                <h4 style={{fontWeight:"bold"}}>{ full_data.facilites_com != null &&  full_data.facilites_com != 'undefined' ?  "Facilities " + setFacilitiesValues(full_data.facilites_com) :  null}</h4>
                <h4 style={{fontWeight:"bold"}}>{ full_data.facilites_com != null &&  full_data.facilites_com != 'undefined' ?  "Price " + setFacilitiesCost(full_data.facilites_com) :  null}</h4>
                <br></br>
                <button onClick={()=> history.push(`/bookroom/${full_data.room_id}`,{state: {data  : full_data ,  faci_list : full_data.facilites_com != null &&  full_data.facilites_com != 'undefined' ? setFacilitiesValues(full_data.facilites_com) :  null ,  total_cost :full_data.facilites_com != null &&  full_data.facilites_com != 'undefined' ? setFacilitiesCost(full_data.facilites_com) :  null  }}) }  >Book</button>
                {/* <h3>{price}</h3> */}
            </div>
        </div>
    )
}

export default Card