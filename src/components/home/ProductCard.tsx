import React from "react";
import { Card, Rate, Typography, Tag, Button } from "antd";
import { Product } from "../../interfaces/models/product";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "../../routes/web";
import LazyImage from "../lazy-image";
import defaultImage from "../../assets/img/product-default-image.png";
import { BiSolidCartAdd } from "react-icons/bi";

const { Text } = Typography;

const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const imageUrl = product.imageUrl || defaultImage;

    const handleCardClick = () => {
        navigate(`${webRoutes.products}/${product.productId}/${product.productName}`);
    };

    return (
        <div
            className='relative h-full bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col w-11/12'
            onClick={handleCardClick}
        >
            <div className="flex-grow h-full">
                <LazyImage className="w-full h-auto overflow-hidden" placeholder={<img src={defaultImage} className="w-full"/>} src={imageUrl} />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between h-full">
                <div>
                    {product.discountPercent > 0 && (
                        <div className="absolute top-2 right-2">
                            <Tag color="gold">-{product.discountPercent}%</Tag>
                        </div>
                    )}
                    {product.isHot && (
                        <div className="absolute top-2 left-2">
                            <Tag color="red">Hot</Tag>
                        </div>
                    )}
                    <Text strong className="product-name">
                        {product.productName}
                    </Text>
                    <div className="mt-2 text-center">
                        <Rate value={product.productRate.avgPoint} allowHalf disabled />
                    </div>
                    <div className="mt-2 text-center">
                        <Text strong className="text-xl  text-red-500">{product.sellPrice}</Text>
                    </div>
                    <div className="mt-1 text-center h-5">
                        {product.discountPercent > 0 && (
                            <Text delete className="text-red-200">
                                {product.productPrice}
                            </Text>
                        )}
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <Button
                        className="rounded-full"
                        icon={<BiSolidCartAdd />}
                    >
                        Mua ngay
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
