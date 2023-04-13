import React ,{useState,useEffect} from 'react';

import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import axios from "axios"
import {FaHotel} from "react-icons/fa"
import {MdLocationOn} from "react-icons/md"
import { useStateValue } from './StateProvider';
import "./AdminRegister.css"
import { useHistory , useLocation} from 'react-router-dom';


function Edithotel() {
  
  var history = useHistory();
  const {state} =  useLocation()
  console.log("****************")
  console.log(state)
  console.log("****************")

    const [hotel_details,setHotelDetails] = useState([]);
    console.log(hotel_details)
    var fetchUrl = "http://localhost:8000/hotel_details_view";
  
   
    var [edit_email,setEditEmail]=useState(Array.isArray(hotel_details) && hotel_details.length > 0 ? hotel_details[0].hotel_email : "");
    var [edit_name,setEditName]=useState(Array.isArray(hotel_details) && hotel_details.length > 0 ? hotel_details[0].hotel_name : "");
    var [edit_id ,  setEditId] = useState(state.state.hotel_id)
    
    var [edit_addr,setEditAddr]=useState(Array.isArray(hotel_details) && hotel_details.length > 0 ? hotel_details[0].hotel_addr : "");
    var [edit_phone,setEditPhone]=useState(Array.isArray(hotel_details) && hotel_details.length > 0 ? hotel_details[0].hotel_phone : "");
    
  
     useEffect(()=>{
          
          async function fetchData(){
              var request = await axios.get(fetchUrl , {params : {hotel_id :  edit_id}});

              setHotelDetails(request.data)

              setEditEmail(request.data.hotel_email)      
               setEditName(request.data.hotel_name)
               setEditAddr(request.data.hotel_addr)
  
               setEditPhone(request.data.hotel_phone)
  
        }
          fetchData();
        },[fetchUrl]);   
 
  

    var editUrl = `http://localhost:8000/edithotel`

     async function edit(e){
      e.preventDefault()
      console.log(hotel_details)
        console.log([edit_name,edit_email,edit_phone,edit_addr ])
        console.log((edit_email == "" || edit_email == 'undefined'))
        console.log(edit_email == "" )
        console.log(edit_email == null )
        var data   = {
          hotelname:edit_name == null ?  hotel_details[0].hotel_name : edit_name ,
            hotelemail:edit_email == null ?  hotel_details[0].hotel_email : edit_email,
            phone:edit_phone == null ?  hotel_details[0].hotel_phone : edit_phone,
           addr:edit_addr == null ?  hotel_details[0].hotel_addr : edit_addr,
           hotel_id : edit_id
        }
        console.log(data)
        var request = await axios.post(editUrl,data);
          alert(request.data)
          console.log(request.data)
          // history.push('/hotel_list')
    }
    return (

    
        
        <div  className="container">
              
       
             {
               hotel_details.map((item)=>(
          //  <form action={`/edithotel/${edit_id}`} >
          <>
                    <h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Edit Hotel</h2>
                 
                 <label className="label" style={{paddingLeft:"0px"}}><FaHotel /> HotelName</label>
                 <input type="text" className="p_input" placeholder={item.hotel_name} onChange={(e)=>{setEditName(e.target.value)}}/>
             
             <label className="label" style={{paddingLeft:"0px"}}> Number</label>
                 <input type="text" className="p_input" placeholder={item.hotel_phone} onChange={(e)=>{setEditPhone(e.target.value)}}/>
                 <label className="label" style={{paddingLeft:"0px"}}> EmailID</label>
               <input type="text" className="p_input" placeholder={item.hotel_email} onChange={(e)=>{setEditEmail(e.target.value)}} />
                 <label className="label" style={{paddingLeft:"0px"}}> Address</label>
                 <input type="text" className="p_input" placeholder={item.hotel_addr} onChange={(e)=>{setEditAddr(e.target.value)}} />
  
     
         <button className="button" onClick={(e)=>edit(e)}> <MdEdit />Save</button>
         </>
        // </form>
               ))
             }
      
           
        </div>
    )
}

export default Edithotel