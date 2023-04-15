import React ,{useState,useEffect} from 'react';

import './Profile.css'
import './Bookings.css'
import {AiFillPhone,AiFillCreditCard} from "react-icons/ai"
import {BsFillPersonFill} from "react-icons/bs"
import {MdEmail,MdEdit} from "react-icons/md"
import {FaHotel} from "react-icons/fa"
import axios from "axios"

import { useStateValue } from './StateProvider';
import { Link, useHistory } from "react-router-dom";

import tableIcons from './Config/IconsFile'

import VisibilityIcon from '@mui/icons-material/Visibility';

import MaterialTable from 'material-table';
import {ThemeProvider , createTheme} from '@mui/material'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Bookings() {
   
    var [booking_details,setBookings]=useState([]);
    var [book_details,setBook]=useState([{
        "room_id" : "123",
        "booking_date" : "20/11/2020",
        "start_date" : "12/12/2020",
        "end_date" : "15/11/2020",
        "amount" : 100 
    },{
        "room_id" : "123",
        "booking_date" : "20/11/2020",
        "start_date" : "12/12/2020",
        "end_date" : "15/11/2020",
        "amount" : 100 
    }]);

    var [arr,setArr]=useState([]);


    // var bookingsurl="http://localhost:8000/customer"

  


    
  

    var fetchbookings = "http://localhost:8000/bookings";

    useEffect(()=>{
   
        async function bookings(){
            var request = await axios.get(fetchbookings);
         
       
          
          setBookings(request.data);

        console.log(request.data)
        }
             
        bookings();
    },[fetchbookings]);
  
    var history = useHistory()
    const defaultMaterialTheme = createTheme();


    var renderTableHeader =()=> {
        let header =[
            "RoomID","Booking_date","Start_Date","End_Date","Extra matress","Amount"
        ];

        return header.map((key_) => {
           return <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">{key_}</a></div>
        })
     }

     var formatDate = (date)=>{
         var d =new Date(date);
         return (d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear() )
     }
  

    var renderTable = () => {
        return booking_details.map(item=> {
            var { room_id, booking_date, start_date, end_date, amount , extra_matress} = item
            return (
              
                <div className="table-row">
                    
                  
                    <div className="table-data">{room_id}</div>
				<div className="table-data">{booking_date}</div>
				<div className="table-data">{formatDate(start_date)}</div>
				<div className="table-data">{formatDate(end_date)}</div>
				<div className="table-data">{extra_matress}</div>
				<div className="table-data">{amount}</div>
				
                </div>
         
            )
        })
    }
    
    
    return (

    
        
        // <div className="container">
            
        //     <h4 style={{"textAlign":"left","color":""}}><FaHotel />  Reservation Details</h4>

        //     <div className="table">
        //     <div className="table-header">
        //        {renderTableHeader()}
        //     </div>

        //     <div className="table-content">
          
         
        //            {
        //                renderTable()
        //            }  
                 
        //     </div>
                
             
        //     </div>
           

         
            
                
            
           
                 
                
                 
             
             
          
             
          
            
       
        // </div>


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
      title="Booking Details"
      columns={[
        { title: 'Booking ID', field: 'r_id',editable: "never", },
        { title: 'Booking Date', field: 'booking_date',editable: "never", },
        { title: 'Customer Name', field: 'cust_name',editable: "never", },
        { title: 'Cust. Phone', field: 'cust_phone',editable: "never", },
        { title: 'Cust. Email', field: 'cust_email',editable: "never", },
        { title: 'Amount', field: 'amount',editable: "never",  },     
        { title: 'Ext. Matress', field: 'extra_matress',editable: "never", },     
        { title: 'Start Date',field: 'start_date',editable: "never",  },     
        { title: 'End Date', field: 'end_date',editable: "never",  },     

        // {title: 'Action',
        // render: rowData => (        
        //     <VisibilityIcon onClick={()=>{history.push(`/hotel_details/${rowData.hotel_id}` , {state : {hotel_id  : rowData.hotel_id}})}} style={{cursor:"pointer"}} />
        // ),},      
        
      ]}
      data={booking_details}
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
                
    )
}

export default Bookings