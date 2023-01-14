import React from "react";
import MainMenu from "../headercomponent/MainMenu";
function Home(profile, setProfile,setIsLogin, language, setLanguage) {
    return (
        <div>
            <MainMenu profile={profile} setProfile={setProfile} setIsLogin={setIsLogin} language={language} setLanguage={setLanguage} />
        </div>
    )
}

export default Home