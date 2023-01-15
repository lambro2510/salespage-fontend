import React, { useState } from 'react';
import MainMenu from './components/headercomponent/MainMenu.jsx';
import Home from './components/main/Home.jsx';
import LoginPage from './components/headercomponent/logincomponent/LoginPage.jsx';
import RegistrationForm from './components/headercomponent/logincomponent/signup/RegistrationForm.jsx';
import { Route, Routes, Link } from 'react-router-dom';
function App() {
  const [profile, setProfile] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''
  })
  const [language, setLanguage] = useState('English');

  return (
    <div>
      <Routes>
        <Route exec path='/' element={<MainMenu profile={profile} setProfile={setProfile} language={language} setLanguage={setLanguage} />} />
        <Route path='/login' element={<LoginPage form={'login'} setProfile={setProfile}  language={language} setLanguage={setLanguage} />} />
        <Route path='/registration' element={<LoginPage form={'registration'}/>} />
      </Routes>
    </div>
    
  );
}

export default App;
