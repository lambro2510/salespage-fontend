import { Route, Routes } from "react-router-dom";
import Home from "./module/user/home";
import Login from "./module/login";
import ProductDetail from "./module/user/product/productDetail";
import HomeProductMenu from "./module/user/home/homeProductScreen";
import SellerDashboard from "./module/seller/dashboard";
import SellerHome from "./module/seller";
import SellerListProduct from "./module/seller/product/sellerListProduct";
import UnauthorizedPage from "./component/403Error";
import SellerListStore from "./module/seller/store";
import ProfileScreen from "./module/user/profile";
const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/products/:productId" element={<ProductDetail />} />
                <Route path="profile" element={<ProfileScreen />} />
                <Route path="/" element={<HomeProductMenu />} />
            </Route>
            <Route path="/seller" element={<SellerHome />} >
                <Route path="/seller/products" element={<SellerListProduct />} />
                <Route path="/seller/store" element={<SellerListStore />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/403Error" element={<UnauthorizedPage />} />
        </Routes>
    )
}

export default Router;
