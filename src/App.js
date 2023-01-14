import React, { useState } from 'react';
import MainMenu from './components/headercomponent/MainMenu.jsx';
import LoginPage from './components/headercomponent/logincomponent/LoginPage.jsx';

function App() {
  const [profile, setProfile] = useState()
  const [isLogin, setIsLogin] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <div className="App">
      {isLogin ? <LoginPage /> : <MainMenu profile={profile} setProfile={setProfile} setIsLogin={setIsLogin} language={language} setLanguage={setLanguage} />}
    </div>
  );
}

export default App;
