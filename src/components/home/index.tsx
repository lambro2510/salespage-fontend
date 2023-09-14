import { useEffect, useState } from "react";
import ProfileCard from "../profile/ProfileCard";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { handleErrorResponse } from "../../utils";
import ListProduct from "./listProduct";
import { Product } from "../../interfaces/models/product";

const Home = () => {

    const [hotProducts, setHotProducts] = useState<Product[]>([]);
    const [saleProducts, setSaleProducts] = useState<[]>([]);
    const [suggestProduct, setSuggestProduct] = useState<[]>([]);

    const loadHotProduct = () => {
        http.get(apiRoutes.products)
        .then((response) => {
            setHotProducts(response?.data?.data);
        })
    }

    useEffect(() => {
        console.log("---eff");
        
        Promise.all([loadHotProduct()])
            .then(() => {
                
            })
            .catch((error) => {
                handleErrorResponse(error);
            });
    }, []);

    return(
        <ListProduct product={hotProducts} />
    )
}

export default Home;