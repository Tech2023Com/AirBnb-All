
import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import "./Home.css"
import Card from "./Card"
import axios from 'axios'

function Home() {

    const [data,setData ] =  useState([])

    var fetchbookings = "http://localhost:8000/hotel_details";

    useEffect(()=>{
   
        async function bookings(){
            var request = await axios.get(fetchbookings);
         
       
          
          setData(request.data);

        console.log(request.data)
        }
             
        bookings();
    },[fetchbookings]);

    return (
        <div className="home">
       
            {/* <Banner /> */}
            <div className='home_section'>

            {data.map((el,i)=>(
 <Card
 hid={el.hotel_id}
 h_data = {el}
 src={el.image}
 title={el.hotel_name}
 description={el.hotel_addr}
/>
            ))}  
           
            {/* <Card
                src="https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720"
                title="Unique stays"
                description="Spaces that are more than just a place to sleep."
            />
            <Card
                src="https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720"
                title="Entire homes"
                description="Comfortable private places, with room for friends or family."
            />
            </div>
            <div className='home_section'>
            <Card
                src="https://media.nomadicmatt.com/2019/airbnb_breakup3.jpg"
                title="3 Bedroom Flat in Bournemouth"
                description="Superhost with a stunning view of the beachside in Sunny Bournemouth"
                price="£130/night"
            />
            <Card
                src="https://thespaces.com/wp-content/uploads/2017/08/Courtesy-of-Airbnb.jpg"
                title="Penthouse in London"
                description="Enjoy the amazing sights of London with this stunning penthouse"
                price="£350/night"
            />
            <Card
                src="https://media.nomadicmatt.com/2018/apartment.jpg"
                title="1 Bedroom apartment"
                description="Superhost with great amenities and a fabolous shopping complex nearby"
                price="£70/night"
            /> */}
            </div>

        </div>
    )
}

export default React.memo(Home)
