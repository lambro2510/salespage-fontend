import { useEffect, useState } from "react";
import ProfileCard from "../profile/ProfileCard";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { handleErrorResponse } from "../../utils";
import ListProduct from "./ListProduct";
import { Product } from "../../interfaces/models/product";

const Home = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [hotProducts, setHotProducts] = useState<Product[]>([]);
    const [saleProducts, setSaleProducts] = useState<[]>([]);
    const [suggestProduct, setSuggestProduct] = useState<[]>([]);

    const loadHotProduct = async () => {
        await http.get(`${apiRoutes.products}/hot-product`)
        .then((response) => {
            setHotProducts(response?.data?.data as Product[]);
        })
        .catch((err) => {
            handleErrorResponse(err);
        })
    }

    useEffect(() => {
        Promise.all([loadHotProduct()])
            .then(() => {
                setLoading(false)
            })
            .catch((error) => {
                handleErrorResponse(error);
            });
    }, []);

    return(
        <div>
            <ListProduct products={hotProducts} loading={loading} title={"Sản phẩm xem nhiều hôm nay"}/>
        </div>
    )
}

export default Home;