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

import ProgressBar from 'react-bootstrap/ProgressBar'
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';


function Edithotel() {
  
  var history = useHistory();

  var [roomImage , setRoomImage]=useState('')
  var [uploadPercentage,setPercent] = useState(0);

  var uploadFile = ({target : { files }})=>{
    // console.log(files[0])
    let data = new FormData();
    data.append('profile', files[0])

    const options = {
        onUploadProgress : (progressEvent)=>{

            console.log(progressEvent)
            const {loaded, total} = progressEvent;
            let percent = Math.floor( (loaded * 100)/total);
            console.log(percent);

            if(percent < 100){
                   setPercent(percent)
            }

            
        }
    }

    axios.post("http://localhost:8000/upload",data, options).then(res =>{
        console.log(res.data.profile_url)
        setRoomImage(res.data.profile_url)
        setPercent(100)
        setTimeout(()=>{setPercent(0)},2000)
        ToastsStore.success(`Uploaded Successfully `); 

    })
  }
  
   
    var [email,setEmail]=useState("");
    var [name,setName]=useState("");
    var [addr,setAddr]=useState("");
    var [phone,setPhone]=useState("");
    
  
    //  useEffect(()=>{
          
    //       async function fetchData(){
    //           var request = await axios.get(fetchUrl , {params : {hotel_id :  edit_id}});

    //           setHotelDetails(request.data)

    //           setEditEmail(request.data.hotel_email)      
    //            setEditName(request.data.hotel_name)
    //            setEditAddr(request.data.hotel_addr)
  
    //            setEditPhone(request.data.hotel_phone)
  
    //     }
    //       fetchData();
    //     },[fetchUrl]);   
 
  

    var addUrl = `http://localhost:8000/addhotel`

     async function add(e){
      e.preventDefault()
        if(name == "")
        {
            alert("Please Enter Hotel Name")
        }
        else if(email == "")
        {
            alert("Please Enter Email")
        }
        else if(phone == "")
        {
            alert("Please Enter Phone number")
        }
        else if(addr == "")
        {
            alert("Please Enter Address")
        }
        else{

    
        var data   = {
          hotelname:name,
            hotelemail:email,
            phone:phone,
           addr:addr,
           image : roomImage
        }
        console.log(data)
        var request = await axios.post(addUrl,data);
          alert(request.data)
          console.log(request.data)
          history.push('/hotel_list')
    }
    }
    return (

    
        
        <div  className="container">
                       <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />

       
          <>
                    <h2 style={{textAlign:"center",fontSize:"16px",borderBottom:"2px sollid lightgrey",marginBottom:"10px"}}>Add Hotel</h2>
                 
                 <label className="label" style={{paddingLeft:"0px" , textAlign:"left"}}><FaHotel /> HotelName</label>
                 <input type="text" name='name' value={name} className="p_input" placeholder="Enter Hotel Name" onChange={(e)=>{setName(e.target.value)}}/>
             
             <label className="label" style={{paddingLeft:"0px"}}> Number</label>
                 <input type="text" name='phone' value={phone} className="p_input" placeholder="Ente Hotel Phone" onChange={(e)=>{setPhone(e.target.value)}}/>
                 <label className="label" style={{paddingLeft:"0px"}}> EmailID</label>
               <input type="text" className="p_input" name='email' value={email} placeholder="Enter Hotel Email" onChange={(e)=>{setEmail(e.target.value)}} />
                 <label className="label" style={{paddingLeft:"0px"}}> Address</label>
                 <input type="text" className="p_input" name="addr" value={addr} placeholder="Enter Hotel Address" onChange={(e)=>{setAddr(e.target.value)}} />
  
                 <label> Upload the Hotel image </label>

<input type="file" name="profile" onChange={uploadFile} /> 
{uploadPercentage>0 &&  <ProgressBar striped variant="success" now={uploadPercentage} label={`${uploadPercentage}%`} style={{background:"#EFE9AE",color:"black", fontWeight:"800"}} />}
         <button className="button" onClick={(e)=>add(e)}> <MdEdit />Save</button>
         </>
      
           
        </div>
    )
}

export default Edithotel