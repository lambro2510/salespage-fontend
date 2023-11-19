import { useEffect, useState } from "react";
import ProfileCard from "../profile/ProfileCard";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { handleErrorResponse } from "../../utils";
import ListProduct from "./ListProduct";
import { Product } from "../../interfaces/models/product";
import { ProductDataResponse, ProductInfoResponse } from "../../interfaces/Interface";

const Home = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [hotProducts, setHotProducts] = useState<ProductDataResponse[]>([]);
    const [allProducts, setAllProduct] = useState<ProductDataResponse[]>([]);
    const [saleProducts, setSaleProducts] = useState<[]>([]);
    const [suggestProduct, setSuggestProduct] = useState<[]>([]);

    const loadHotProduct = async () => {
        await http.get(`${apiRoutes.products}/hot-product`)
            .then((response) => {
                setHotProducts(response?.data?.data as ProductDataResponse[]);
            })
            .catch((err) => {
                handleErrorResponse(err);
            })
    }

    const loadAllProduct = async () => {
        try {
            const response = await http.get(`${apiRoutes.products}`);
            setAllProduct(response?.data?.data?.data)
        } catch (error) {
            handleErrorResponse(error);
        }
    }

    useEffect(() => {
        Promise.all([loadHotProduct()])
            .then(() => {
                setLoading(false)
            })
            .catch((error) => {
                handleErrorResponse(error);
            });
        loadAllProduct();
    }, []);

    return (
        <div>
            <ListProduct products={hotProducts} loading={loading} title={"Sản phẩm xem nhiều hôm nay"} />
            <ListProduct products={allProducts} loading={loading} title={"Sản phẩm mới"} />
        </div>
    )
}

export default Home;