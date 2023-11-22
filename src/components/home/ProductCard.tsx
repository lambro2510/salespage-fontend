import React from "react";
import { Card, Rate, Typography, Tag, Button, Space } from "antd";
import { Product } from "../../interfaces/models/product";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "../../routes/web";
import LazyImage from "../lazy-image";
import defaultImage from "../../assets/img/product-default-image.png";
import { BiSolidCartAdd } from "react-icons/bi";
import { formatCurrency } from "../../utils";
import { ProductDataResponse } from "../../interfaces/Interface";

const { Text, Title } = Typography;

const ProductCard = ({ product }: { product: ProductDataResponse }) => {
    const navigate = useNavigate();
    const imageUrl = product.imageUrl || defaultImage;

    const handleCardClick = () => {
        navigate(`${webRoutes.products}/${product.productId}/${product.productName}`);
    };


    return (
        <div
            className='rounded-none relative h-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition duration-300 flex flex-col w-11/12'
            onClick={handleCardClick}
        >
            <div className="flex-grow h-full">
                <LazyImage className="w-full h-auto overflow-hidden" placeholder={<img src={defaultImage} className="w-full" />} src={imageUrl} />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between h-full">
                <div>
                    <div className="h-12">
                        <p className="sx overflow-hidden line-clamp-2">
                            {product.productName}
                        </p>
                    </div>
                    <p>{formatCurrency(product.minSellPrice)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
