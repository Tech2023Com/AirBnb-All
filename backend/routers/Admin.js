const express = require("express");
const mysql = require('mysql');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require("express");


var  mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: 'root',
	password: 'root',
	database: 'hotelmanagement',

});

mysqlConnection.connect((err)=>{
 if(!err){
     //console.log("SUccessfully connected to database ...!!");
 }
 else{
     //console.log(err);
 }
});

const router = express.Router();



router.get("/adminlogin/:email/:password",(req,res)=>{
    mysqlConnection.query("SELECT * from admin where admin_email=? and admin_password=? ",[req.params.email,req.params.password],(err, rows, fields)=>{
        if(!err){
         
            res.send(rows);
        }
        else{
            //console.log(err);
        }
    })
})


router.post("/hotel/addHotel",  (req,res)=>{
    var data=[hotel_name,hotel_email,hotel_phone,hotel_addr,image];
    let sql = "INSERT INTO hotel(hotel_name,hotel_email,hotel_phone,hotel_addr,image) VALUES( ?, ? ,?,?,?)";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
    
            if(!err ){
                res.status(201).send('Hotel Added!');
            }                


    })
})

router.get("/hotel/details/",(req,res)=>{
    mysqlConnection.query("SELECT * from hotel",(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            //console.log(err);
        }
    })
})


router.get("/get_rooms",(req,res)=>{
    console.log(req.query)
    mysqlConnection.query("SELECT * from room where hotel_id = ?" , [req.query.hotel_id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


router.get("/room_types",(req,res)=>{
    mysqlConnection.query("SELECT * from room_type ",(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

router.get("/facilities_for_cust",(req,res)=>{
    mysqlConnection.query("SELECT * from facilities where hotel_id = ?" ,[req.query.hotel_id],(err, rows, fields)=>{
        if(!err){

            //console.log(rows)
            res.send(rows);
        }
        else{
            //console.log(err);
        }
    })
})

router.get("/facilities",(req,res)=>{
    mysqlConnection.query("SELECT * from facilities ",(err, rows, fields)=>{
        if(!err){

            //console.log(rows)
            res.send(rows);
        }
        else{
            //console.log(err);
        }
    })
})



router.post("/addcustomer",(req,res)=>{
    var cust = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    //console.log("Register");
    const email = req.body.useremail;
    const name = req.body.username;
    const phone = req.body.phone;
    const password = req.body.password;


    const returnHash = async ()=>{
            return await bcrypt.hash(password, 12);
    }
    const hashedPw = returnHash();
        bcrypt.hash(password,12).then((hashedPw)=>{
            var data=[name,email,phone,hashedPw];
            //console.log(hashedPw);

            let sql = "INSERT INTO customer(cust_name,cust_email,cust_phone,cust_password) VALUES( ?, ? ,?,?)";
            mysqlConnection.query(sql,data,(err, rows, fields)=>{
            
                    if(!err ){
                        res.status(201).send('User created!');
                    }                


            })
        })
         
 

})



router.post("/addnewroom",(req,res)=>{
    var room = req.body;
    console.log(room)
    var data=[room.roomtype,room.roomfacility,room.roomimage,room.hotelid,room.statusid, room.facilityCom]
    let sql = "INSERT INTO room(type_id, facility_id, images, hotel_id, status_id,facilites_com) VALUES( ? ,?,?, ? ,?,?)";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){res.send("New Room Added Succesfully")
        }
        else{
            console.log(err);
        }
    })
})


router.post("/addfacility",(req,res)=>{
    var facility = req.body;
    //console.log(facility)
    var data=[facility.facility, facility.facility_cost ,facility.hotel_id]
    let sql = "INSERT INTO facilities(facility, facility_cost , hotel_id) VALUES( ?,?,?) ";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
            res.json({"text":"success"});

        }
        else{
            //console.log(err);
        }
    })
})


router.post("/addhotel",(req,res)=>{
    console.log(req.body)
    var hotel = req.body;
    //console.log(hotel)
    var data=[hotel.hotelname,hotel.hotelemail,hotel.phone,hotel.addr , hotel.image]
    let sql = "insert into hotel(hotel_name,hotel_email,hotel_phone,hotel_addr,image) values(?,?,?,?,?)";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(err)
        {
            res.send("Something went Wrong")
        }
        else

        {

            res.send("Added Succesfully")
        }
    })
})


router.post("/edithotel",(req,res)=>{
    console.log(req.body)
    var hotel = req.body;
    //console.log(hotel)
    var data=[hotel.hotelname,hotel.hotelemail,hotel.phone,hotel.addr , hotel.hotel_id]
    let sql = "update hotel set hotel_name = ? , hotel_email = ?, hotel_phone = ? ,hotel_addr = ? where hotel_id  =  ?  ";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(err)
        {
            console.log(err)
        }
            res.send("updated Succesfully")
    })
})


router.put("/editroomscost",(req,res)=>{
    var room = req.body;
    //console.log(room)
    var data=[room.ac_cost, "AC"]
    let sql = "update room_type set cost = ? where type_name = ?  ";
    mysqlConnection.query(sql,data,(err, rows, fields)=>{
        if(!err){
      //console.log("Updated SUccessfully");
      
        }
        else{
            //console.log(err);
        }
    })


    var data2=[room.non_ac_cost, "NON AC"]
    let sql2 = "update room_type set cost = ? where type_name = ?  ";
    mysqlConnection.query(sql2,data2,(err, rows, fields)=>{
        if(!err){
      //console.log("Updated SUccessfully");
      
        }
        else{
            //console.log(err);
        }
    })
})




router.get("/reservations/:id",(req,res)=>{
    mysqlConnection.query("SELECT * from reservation where cust_id = ? ",[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
            //console.log(rows)
        }
        else{
            //console.log(err);
        }
    })
})

router.get("/bookings",(req,res)=>{
    mysqlConnection.query("SELECT * from reservation order by booking_date",(err, rows, fields)=>{
        if(!err){
            res.send(rows);
            //console.log(rows)
        }
        else{
            //console.log(err);
        }
    })
})
router.get("/hotel_details",(req,res)=>{
    mysqlConnection.query("SELECT * from hotel order by hotel_id",(err, rows, fields)=>{
        if(!err){
            res.send(rows);
            //console.log(rows)
        }
        else{
            //console.log(err);
        }
    })
})
router.get("/hotel_details_view",(req,res)=>{
    // console.log(req)
    // console.log(req.params)
    // console.log(req.params.hotel_id)
    mysqlConnection.query("SELECT * from hotel where hotel_id = ?",[req.query.hotel_id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
            //console.log(rows)
        }
        else{
            //console.log(err);
        }
    })
})





router.delete("/facility/delete/:id",(req,res)=>{

    mysqlConnection.query("DELETE from facilities where facility_id= ?",[req.params.id],(err, rows, fields)=>{
        if(!err){

            res.send("deleted successfully")
        }
        else{
            //console.log(err);
        }
    })
})



module.exports = router;