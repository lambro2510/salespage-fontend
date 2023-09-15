import React from "react";
import { Button, Card, Rate } from "antd";
import { Product } from "../../interfaces/models/product";
import Meta from "antd/es/card/Meta";
import defaultImage from '../../assets/img/default-image.png';
import { BiCart, BiCartAdd, BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "../../routes/web";
import LazyImage from "../lazy-image";

const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const imageUrl = product.imageUrl || defaultImage;

    return (
        <div className="">
            <Card
                cover={<LazyImage placeholder={product.productName} src={imageUrl}/>}
            >
                <Meta
                    title={<div className="text-sm">{product.productName}</div>}
                    description={
                        <div >
                            <Rate defaultValue={product.productRate.avgPoint} disabled />
                            <p className="">{product.productPrice}</p>
                                <Button className="w-full" type="primary" onClick={() => {navigate(`${webRoutes.products}/${product.productId}`)}}><BiCartAdd /></Button>
                        
                        </div>
                    }
                />
            </Card>
        </div>
    );
};

export default ProductCard;
