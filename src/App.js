import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
function App() {
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
