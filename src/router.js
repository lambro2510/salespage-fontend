import { Route, Routes } from "react-router-dom";
import Home from "./module/home";
import Login from "./module/login";
const Router = () => {
    return(
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    )
}

export default Router;