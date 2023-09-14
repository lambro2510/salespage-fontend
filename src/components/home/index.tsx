import { useEffect, useState } from "react";
import ProfileCard from "../profile/ProfileCard";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { handleErrorResponse } from "../../utils";
import ListProduct from "./ListProduct";
import { Product } from "../../interfaces/models/product";

const Home = () => {

    const [hotProducts, setHotProducts] = useState<Product[]>([]);
    const [saleProducts, setSaleProducts] = useState<[]>([]);
    const [suggestProduct, setSuggestProduct] = useState<[]>([]);

    const loadHotProduct = async () => {
        await http.get(apiRoutes.products)
        .then((response) => {
            console.log(response?.data?.data?.data as Product[]);
            
            setHotProducts(response?.data?.data?.data as Product[]);
        })
        .catch((err) => {
            handleErrorResponse(err);
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
        <div>
            <ListProduct products={hotProducts} />
        </div>
    )
}

export default Home;