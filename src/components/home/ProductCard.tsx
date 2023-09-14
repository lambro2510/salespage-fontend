import React from "react";
import { Card } from "antd";
import { Product } from "../../interfaces/models/product";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card
            hoverable
            className="h-1/3 w-auto flex flex-col justify-center items-center" // Căn chỉnh và căn giữa các thành phần
        >
            <img alt={product.productName} src={product.imageUrl} className="h-48" />
            <div className="text-center mt-4">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
            </div>
        </Card>
    );
};

export default ProductCard;
