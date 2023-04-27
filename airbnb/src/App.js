import React,{Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"

import Fallback from './Fallback';
import Login from "./Login"
import "./AdminRegister.css"
import Rsgister from "./Rsgister"


import { useStateValue } from './StateProvider'
const Footer = React.lazy(()=>import('./Footer'));
const Header = React.lazy(()=>import('./Header'));
const Home = React.lazy(()=>import('./Home'));
const SearchPage = React.lazy(()=>import('./SearchPage'));
const Profile = React.lazy(()=>import('./Profile'));
const Bookings = React.lazy(()=>import('./Bookings'));
const Edituser = React.lazy(()=>import('./Edituser'));
const Order = React.lazy(()=>import('./Order'));
const RoomList = React.lazy(()=>import('./RoomList'));
const BookRoom = React.lazy(()=> import('./Book_Room'))


function App() {
  const [{isAuth}, dispatch] = useStateValue();




  return (
    <div className="app">

   
      <Router>
  
      
            
        <Switch>
              <Suspense fallback={<Fallback />} >

              <Route path="/search/:startdate/:enddate/:persons">   
              <div><Header /><SearchPage />      <Footer /></div> </Route>
              <Route path="/edituser">     
              {isAuth ? ( <div><Header /><Edituser /><Footer /></div>) : ( <Redirect to="login" />) }</Route> 
              <Route path="/login">       <Login /></Route>
              <Route path="/user_register"><Rsgister /></Route>
              <Route path="/profile">{isAuth ? ( <div><Header /><Profile />      <Footer /></div>) : ( <Redirect to="login" />) }</Route>
              <Route path="/bookings">{isAuth ? ( <div><Header /><Bookings />       <Footer /></div>) : ( <Redirect to="login" />) }</Route>
              <Route path="/bookroom/:id">{isAuth ? ( <div><Header /><BookRoom />       <Footer /></div>) : ( <Redirect to="login" />) }</Route>
              <Route path="/checkout/:id" ><Header />       <Order />      <Footer /></Route>
              <Route path="/room_list" ><Header />       <RoomList />      <Footer /></Route>
              <Route path="/" exact><Header />       <Home />      <Footer /></Route>
        
     
       </Suspense>

        </Switch>
    </Router>
    

    </div>
  );
}

export default App;
