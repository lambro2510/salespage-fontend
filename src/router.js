import { Route, Routes } from "react-router-dom";
import Home from "./module/home";
import Login from "./module/login";
import ProductDetail from "./module/product/productDetail";
import HomeProductMenu from "./module/home/homeProductScreen";
import SellerListProduct from "./module/product/sellerListProduct";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="products/:productId" element={<ProductDetail />} />
                <Route path="/" element={<HomeProductMenu />} />
            </Route>
            <Route path="/seller" element={<SellerListProduct />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default Router;
