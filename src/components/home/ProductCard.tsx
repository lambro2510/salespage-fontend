import React from "react";
import { Card, Rate, Typography, Tag, Button, Space } from "antd";
import { Product } from "../../interfaces/models/product";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "../../routes/web";
import LazyImage from "../lazy-image";
import defaultImage from "../../assets/img/product-default-image.png";
import { BiSolidCartAdd } from "react-icons/bi";
import { formatCurrency } from "../../utils";

const { Text, Title } = Typography;

const ProductCard = ({ product }: { product: ProductDataResponse }) => {
    const navigate = useNavigate();
    const imageUrl = product.imageUrl || defaultImage;

    const handleCardClick = () => {
        navigate(`${webRoutes.products}/${product.productId}/${product.productName}`);
    };

    const renderPrice = () => {
        if (product.minSellPrice != product.maxSellPrice) {
            if (product.minOriginPrice != product.maxOriginPrice) {
                return (
                    <div className="flex justify-around">
                        <Text delete>
                            {formatCurrency(product.minOriginPrice)} - {formatCurrency(product.maxOriginPrice)}
                        </Text>
                        <Text >
                            {formatCurrency(product.minSellPrice)} - {formatCurrency(product.maxSellPrice)}
                        </Text>
                    </div>

                )
            } else {
                return (
                    <Text >
                        {formatCurrency(product.minSellPrice)} - {formatCurrency(product.maxSellPrice)}
                    </Text>
                )
            }
        } else {
            return (
                <Text >
                    {formatCurrency(product.minSellPrice)}
                </Text>
            )
        }
    }
    return (
        <div
            className='relative h-full bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col w-11/12'
            onClick={handleCardClick}
        >
            <div className="flex-grow h-full">
                <LazyImage className="w-full h-auto overflow-hidden" placeholder={<img src={defaultImage} className="w-full" />} src={imageUrl} />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between h-full">
                <div>
                    <Title level={5}>
                        {product.productName}
                    </Title>
                    {renderPrice()}
                    <br />
                    <Rate allowHalf disabled defaultValue={product.productRate.avgPoint} />
                </div>
                <div className="mt-4 text-center">
                    <Button
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
