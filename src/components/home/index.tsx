import { useEffect, useState } from "react";
import ProfileCard from "../profile/ProfileCard";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { handleErrorResponse } from "../../utils";
import ListProduct from "./ListProduct";
import { Product } from "../../interfaces/models/product";
import { ProductDataResponse, ProductInfoResponse } from "../../interfaces/Interface";
import Carousel from "../layout/Carousel";

const imageUrls = [
    "https://cf.shopee.vn/file/vn-50009109-2eb798374b65de905510aa91380aaf62_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-3b4844af326ff3b9c1e1793d0dbda9f3_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-31751216f4ecebd91cd98b2aabe69c70_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-1f18bb1d3f752570668b28ee92501320_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-0fffe0b1b0b7e9af17ad1e53346f4311_xhdpi"
]
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
            <div className="flex justify-center pt-10 pb-5 bg-white">
                <div className="w-4/12">
                    <Carousel images={imageUrls} loading={false} title="" />
                </div>
                <div className="w-2/12">
                    <Carousel images={imageUrls} loading={false} title="" />
                    <Carousel images={imageUrls} loading={false} title="" />
                </div>
            </div>
            <div className="flex justify-center  bg-white pb-2">
                <div className="w-6/12 flex justify-around">
                    <div>
                        <div className="flex justify-center">
                            <img width="60%" src="https://cf.shopee.vn/file/vn-50009109-c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi" />
                        </div>
                        <div className="flex justify-center">
                            <p> Miễn phí ship </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <img width="60%" src="https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi" />
                        </div>
                        <div className="flex justify-center">
                            <p> Gì cũng rẻ</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <img width="60%" src="https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi" />
                        </div>
                        <div className="flex justify-center">
                            <p>Mã giảm giá</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <img width="60%" src="https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi" />
                        </div>
                        <div className="flex justify-center">
                            <p>Hàng quốc tế</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <img width="60%" src="https://cf.shopee.vn/file/vn-50009109-1975fb1af4ae3c22878d04f6f440b6f9_xhdpi" />
                        </div>
                        <div className="flex justify-center">
                            Giá sốc
                        </div>
                    </div>
                </div>
            </div>
            <ListProduct products={hotProducts} loading={loading} title={"Sản phẩm xem nhiều hôm nay"} />
            <ListProduct products={allProducts} loading={loading} title={"Sản phẩm mới"} />
        </div>
    )
}

export default Home;