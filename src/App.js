import React, { useState,useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Cookies from "js-cookie";
import UserService from "./services/UserService"
function App() {

  useEffect(() => {
    const token = Cookies.get("token")
    if(typeof(token) != 'undefined'){
        const profile = UserService.getProfile(Cookies.get("token"))
        Cookies.set("username",profile.username)
    }
},[])

  return (
    <div>
      <Routes>
        <Route exec path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    
  );
}

export default App;
