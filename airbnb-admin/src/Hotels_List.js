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
import AccountBalance from '@mui/icons-material/AccountBalance';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import { useStateValue } from './StateProvider';
import { Link, useHistory  } from "react-router-dom";
import MaterialTable from 'material-table';
import {ThemeProvider , createTheme} from '@mui/material'



function Bookings() {
    const defaultMaterialTheme = createTheme();

 
   
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
          <Button onClick={()=>{history.push(`/hotel_add` )}} color="inherit">Add Hotel</Button>
        </Toolbar>
      </AppBar>
    </Box>
<>

<ThemeProvider theme={defaultMaterialTheme}>

<MaterialTable
      icons={tableIcons}      
      title="Added Hotles"
      columns={[
        { title: 'ID', field: 'hotel_id',editable: "never", },
        { title: 'Hotel Name', field: 'hotel_name',editable: "never", },     
        { title: 'Address', field: 'hotel_addr',editable: "never", },     
        { title: 'Phone', field: 'hotel_phone',editable: "never", },     
        { title: 'Email', field: 'hotel_email',editable: "never", },
        {title: 'View Hotel',
        render: rowData => (        
            <VisibilityIcon onClick={()=>{history.push(`/hotel_details/${rowData.hotel_id}` , {state : {hotel_id  : rowData.hotel_id}})}} style={{cursor:"pointer"}} />
        ),},      
        {title: 'View Hotel Rooms',
        render: rowData => (        
            <AccountBalance onClick={()=>{history.push(`/room-list/${rowData.hotel_id}` , {state : {hotel_id  : rowData.hotel_id}})}} style={{cursor:"pointer"}} />
        ),},      
        
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