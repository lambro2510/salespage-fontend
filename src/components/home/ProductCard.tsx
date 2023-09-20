import React from "react";
import { Button, Card, Rate, Typography, Tag } from "antd";
import { Product } from "../../interfaces/models/product";
import Meta from "antd/es/card/Meta";
import defaultImage from '../../assets/img/default-image.png';
import { BiCartAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "../../routes/web";
import LazyImage from "../lazy-image";

const { Text } = Typography;

const PriceInfo = ({ product }: { product: Product }) => {
    if (product.discountPercent > 0) {
        return (
            <p className="product-price">
                <Text strong>{product.sellPrice} </Text>
                <Text delete>{product.productPrice}</Text>
                <Text type="danger"> ({product.discountPercent}% off)</Text>
            </p>
        );
    } else {
        return (
            <p className="product-price">
                <Text strong>{product.productPrice}</Text>
            </p>
        );
    }
};

const ProductInfo = ({ product }: { product: Product }) => {
    return (
        <div className="product-info">
            <Rate value={product.productRate.avgPoint} allowHalf disabled />
            <PriceInfo product={product} />
            {product.isHot && <Tag color="red">Hot</Tag>}
            <Button className="add-to-cart-button" type="primary" icon={<BiCartAdd />}>
                Thêm vào giỏ hàng
            </Button>
        </div>
    );
};

const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const imageUrl = product.imageUrl || defaultImage;

    const handleCardClick = () => {
        navigate(`${webRoutes.products}/${product.productId}/${product.productName}`);
    };

    return (
        <div className={`product-card ${product.isHot ? 'hot-product' : ''}`} onClick={handleCardClick}>
            <Card
                hoverable
                cover={<LazyImage placeholder={product.productName} src={imageUrl} />}
            >
                <Meta
                    title={<Text strong className="product-name">{product.productName}</Text>}
                    description={<ProductInfo product={product} />}
                />
            </Card>
        </div>
    );
};

export default ProductCard;
