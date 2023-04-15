import React ,{useState,useEffect} from 'react';

import './Profile.css'
import './Bookings.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import {FaHotel} from "react-icons/fa"
import axios from "axios"
import tableIcons from './Config/IconsFile'

import VisibilityIcon from '@mui/icons-material/Visibility';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useLocation} from 'react-router-dom'


import { useStateValue } from './StateProvider';
import { Link, useHistory  } from "react-router-dom";
import MaterialTable from 'material-table';
import {ThemeProvider , createTheme} from '@mui/material'



function Bookings() {
    const defaultMaterialTheme = createTheme();

    const {state} =  useLocation()

 
   
    var [hotel_details,setHotels]=useState([]);
    

   

  


    
  

    var fetchbookings = "http://localhost:8000/rooms_list";
    var [facility_details, setFacilityDetails]=useState([])
    
    var fetchRoomfacilities = "http://localhost:8000/facilities_for_cust";

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

      const setFacilitiesCost = (dt , td) =>{
        console.log(":" , dt)
        var a  =  dt.split(",")
        var faci_list = "";
        var ac_cost =  td == 1 ? 1500 : 750
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
        return total_cost  + ac_cost
        

      }


    useEffect(()=>{
        async function fetchFacility(){
            var request = await axios.get(fetchRoomfacilities , {params : {hotel_id :  state.state.hotel_id}});
            console.log(request.data)
           setFacilityDetails(request.data)
        }

        fetchFacility();
   
        async function bookings(){
            var request = await axios.get(fetchbookings , {params : {hotel_id :  state.state.hotel_id}});
         
       
          
          setHotels(request.data);

        console.log(request.data)
        }
             
        bookings();
    },[fetchbookings,fetchRoomfacilities]);
  
    var history = useHistory()

   
    
    
    return (

    
        
        
<div className='table-container'>
        
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          {/* <Button onClick={()=>{history.push(`/hotel_add` )}} color="inherit">Add Hotel</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
<>

<ThemeProvider theme={defaultMaterialTheme}>

<MaterialTable
      icons={tableIcons}      
      title="Added Hotles"
      columns={[
        { title: 'ID', field: 'room_id',editable: "never", },
        { title: 'Facilities', render : rowData=> (rowData.facilites_com != null &&  rowData.facilites_com != 'undefined' ? setFacilitiesValues(rowData.facilites_com) :  "NA") },     
        { title: 'AC/ NON-AC', render : rowData=> (rowData.type_id == 1 ?  "AC" :  "NON-AC") },     
        { title: 'Room Cost', render : rowData=> (rowData.facilites_com != null &&  rowData.facilites_com != 'undefined' ? setFacilitiesCost(rowData.facilites_com ,  rowData.type_id) :  "NA") },     
        { title: 'Availability', render : rowData => (rowData.status_id == 2 ?  "Available"  : "Not Available")  },     

        // {title: 'Action',
        // render: rowData => (        
        //     <VisibilityIcon onClick={()=>{history.push(`/hotel_details/${rowData.hotel_id}` , {state : {hotel_id  : rowData.hotel_id}})}} style={{cursor:"pointer"}} />
        // ),},      
        
      ]}
      data={hotel_details}
        options={{
                selection: false,
                textAlign: "center",
                headerStyle: { textAlign: "left" },
                rowStyle: { textAlign: "center" }
              }}

    />

    </ThemeProvider>


</>
         
</div>     
                
            
           
                 
                
                 
            
             
          
            
       
        // </div>
    )
}

export default Bookings