import React, { useState } from 'react';
import MainMenu from './components/headercomponent/MainMenu.jsx';
import Home from './components/main/Home.jsx';
import LoginPage from './components/headercomponent/logincomponent/LoginPage.jsx';
import RegistrationForm from './components/headercomponent/logincomponent/signup/RegistrationForm.jsx';
function App() {
  const [profile, setProfile] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''
  })
  const [isLogin, setIsLogin] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <div className="App">
      <Home profile={profile} setProfile={setProfile} setIsLogin={setIsLogin} language={language} setLanguage={setLanguage} />
    </div>
  );
}

export default App;
