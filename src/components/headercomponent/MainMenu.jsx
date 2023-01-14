import React from "react";
import "./MainMenu.css"
import MenuProfile from "./menucomponent/MenuProfile/MenuProfile";
import SearchMenu from "./menucomponent/SearchMenu/SearchMenu";
function MainMenu({profile, setProfile, setIsLogin, language, setLanguage}) {
    return (
        <div className="header">
            <div className="header-container">
                <div className="header-menu">
                    <MenuProfile profile={profile} setIsLogin={setIsLogin} language={language} setLanguage={setLanguage}/>
                </div>
                <div>
                    <SearchMenu />
                </div>
            </div>
        </div>
    )
}

export default MainMenu;