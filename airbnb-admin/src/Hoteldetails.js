import React,{useState,useEffect} from 'react'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import {FaHotel} from "react-icons/fa"
import {MdLocationOn} from "react-icons/md"

import {BsFillTrashFill} from "react-icons/bs"

import {} from "react-icons/fa"
import axios from "axios"
import { useHistory, useLocation } from 'react-router-dom'


function Hoteldetails() {
    const {state} =  useLocation()
    console.log("****************")
    console.log(state)
    console.log("****************")
    var [types,setTypes]=useState([])
    var [deleteid,setDeleteID]=useState("")


    var fetchRoomfacilities = "http://localhost:8000/facilities";

    var [facilities,setFacilities] = useState([]);

  var fetchUrl = "http://localhost:8000/hotel_details_view";

   var [hotel_details,setHotel] = useState([]);
  
  async function deletefacility(e){
      var id_= e.target.id
      console.log(id_)
        const res = await axios.delete(`http://localhost:8000/facility/delete/${id_}`, { data: { id : 5 } });
        console.log(res.data)

  }


   var fetchRoomType = "http://localhost:8000/room_types"

   var history = useHistory()

   useEffect(()=>{
        
        async function fetchData(){
            var request = await axios.get(fetchUrl , {params : {hotel_id : state.state.hotel_id}});
  
            setHotel(request.data)

        
      }

      async function fetchType(){
        var request = await axios.get(fetchRoomType , {params : {hotel_id :  state.state.hotel_id}});
       console.log(request.data);
       setTypes(request.data)

    
  }

  async function fetchFacility(){
    var request = await axios.get(fetchRoomfacilities , {params : {hotel_id :  state.state.hotel_id}});
   console.log(request.data);
   setFacilities(request.data)
}
    
        fetchData();
         fetchFacility();
        fetchType();
      },[fetchUrl,fetchRoomType]);



      var renderFacilityHeader =()=> {
        let header =[
            "facility Type","Facility Cost"
        ];

        return header.map((key_) => {
           return <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">{key_}</a></div>
        })
     }
  

     var renderTypesHeader =()=> {
        let header =[
            "Room Type","Room Cost"
        ];

        return header.map((key_) => {
           return <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">{key_}</a></div>
        })
     }
  

    return (
        <div>
            <div className='container' >
            <button className="button" style={{"backgroundColor":"orange","border":"none","padding":"10px 20px" , width:"50%",margin : "20px"}} onClick={()=>{history.push(`/edithotel/${state.state.hotel_id}` , {state : {hotel_id :  state.state.hotel_id}})}}> <MdEdit /> Edit HOtel</button>

             <h3 style={{"textDecoration":"underline"}}>Hotel Details of {Array.isArray(hotel_details) && hotel_details.length > 0 ? hotel_details[0].hotel_name : ""} </h3>
             <br></br>
             {
                 hotel_details?.map((item)=>(
                    <div className="table">
                    <div className="table-row">
                        <div className="table-data"><FaHotel /> Hotel Name</div>
                        <div className="table-data">{item?.hotel_name}</div>
                    </div>
                    <div className="table-row">
                        <div  className="table-data"><AiFillPhone /> Number</div>
                        <div  className="table-data">{item.hotel_phone}</div>
                    </div>
                    <div  className="table-row">
                        <div className="table-data"><MdEmail /> EmailID</div>
                        <div  className="table-data">{item.hotel_email}</div>
                    </div>
                    <div  className="table-row">
                        <div  className="table-data"><MdLocationOn /> Address</div>
                        <div  className="table-data">{item.hotel_addr}</div>
                    </div>
                </div>
                 ))
             }
          
           
           
                <h3 style={{"textDecoration":"underline"}}>Room Facilities </h3>
                <button className="button" style={{"backgroundColor":"orange","border":"none","padding":"10px 20px" , width:'50%',margin : '10px'}} onClick={()=>{history.push(`/addDetails/${state.state.hotel_id}` , {state : {hotel_id :  state.state.hotel_id}})}}> <MdEdit /> Add Facilities</button>

                <br></br>
                <div className="table">
                <div className="table-header">
               {renderFacilityHeader()}
            </div>
                {
                 facilities?.map((item)=>(

                    
                    <div className="table-row">
                        <div className="table-data">{item.facility}</div>
                        <div className="table-data">{item.facility_cost}</div>

                        {/* <div className="table-data" ><span id={item.facility_id} onClick={
                         deletefacility
                            
                        }>delete</span></div> */}
                    </div>
                
               
                 ))
             }
</div>
{/* <button className="button" style={{"backgroundColor":"#6DECAF","border":"none","padding":"10px 20px"}}> <MdEdit /> Edit Facility</button>
            */}


<h3 style={{"textDecoration":"underline"}}>Room Types </h3>
                <br></br>
                <div className="table">
                <div className="table-header">
               {renderTypesHeader()}
            </div>
                {
                 types?.map((item)=>(
                   
               
                    <div  className="table-row">
                        <div className="table-data"> {item.type_name}</div>
                        <div  className="table-data">{item.cost}</div>
                    </div>
                
                 ))
             }
</div>

{/* <button className="button" style={{"backgroundColor":"#6DECAF","border":"none","padding":"10px 20px"}}> <MdEdit /> Edit Room Cost</button>
           
               */}
              
            
        </div>
        
        
        </div>
    )
}

export default Hoteldetails
