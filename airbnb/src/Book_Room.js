import React ,{useState} from 'react';
import './Profile.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import axios from 'axios'

import { useStateValue } from './StateProvider';
import { Link , useLocation} from "react-router-dom";



function Profile() {


    const {state} = useLocation();

    console.log(state)

    const  [extm ,  setExtm] =  useState(0)

    const getToday  =  ()=>{
        const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

return formattedToday;
    }

    const [bkd , setBkd]= useState(getToday())
    const [sd , setsd]= useState("06/30/2019")
    const [ed , seted]= useState("06/30/2019")
    const [nd , setNd] = useState(1)



    var postUrl = "http://localhost:8000/reservation"


    async function add(){
        var data   = {
           roomId : state.state.data.room_id, 
           custId  :localStorage.getItem('userId'),
           bookingDate  :bkd,
           startDate  :sd, 
           endDate : ed,
           amount : state.state.total_cost +  parseInt(extm) * 200,
           extra_matress :extm
          }
          console.log(data)
          var request = await axios.post(postUrl,data);
            alert(request.data)
    }


    const stdate = (e)=>{
        setsd(e.target.value)
        
        days(e.target.value, ed)

    }
    const eddate = (e)=>{

        seted(e.target.value)
        days(sd,e.target.value)
    }

   
      

const days = (date_1, date_2) =>{
    var date1 = new Date(date_1);
    var date2 = new Date(date_2);
      
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      
    //To display the final no. of days (result)
    setNd(Difference_In_Days)
   return  Difference_In_Days;
}




  
    return (

    
        
        <div className='profile container'>
            
             <h4>Booking Details</h4>
            
             
             <table>
                 <tr>
                     <td> Facilities </td>
                     <td><input type="text" className="p_input" placeholder={state.state.faci_list}  disabled={true}/></td>
                 </tr>
                 <tr>
                     <td> Price</td>
                     <td><input type="number" className="p_input" placeholder={state.state.total_cost}  disabled={true}/></td>
                 </tr>
                 <tr>
                     <td>Booking Date</td>
                     <td><input type="number" className="p_input" placeholder={bkd}  disabled={true}/></td>
                 </tr>
                 <tr>
                     <td>Start Date</td>
                     <td><input type="date"  onChange={stdate} className="p_input" placeholder="Select Start Date"  /></td>
                 </tr>
                 <tr>
                     <td>End Date</td>
                     <td><input type="date" onChange={eddate} className="p_input" placeholder="Select End Date"  /></td>
                 </tr>
                 <tr>
                     <td>Days</td>
                     {/* <td>{days(sd,nd)}</td> */}
                 </tr>
                 <tr>
                     <td>Exta Metress</td>
                     <td><input type="number" value={extm} onChange={(e)=> setExtm(e.target.value)}  className="p_input" placeholder="Extra Metress"  disabled={false}/></td>
                     
                 </tr>
                 <tr>
                     <td>Total Price <span style={{fontSize:12  ,  color:"red"}}><i>(Cost of Extra Metress will be Charged 200 INR / Metress , Seperately )</i></span></td>
                     <td><h1>&#8377; {state.state.total_cost +  parseInt(extm) * 200 } </h1></td>
                     
                 </tr>
             </table>
             <button onClick={add} className="button" ><Link to="/edituser" style={{textDecration:"none",color:"white"}}>  Edit </Link></button>
          
            
       
        </div>
    )
}

export default Profile