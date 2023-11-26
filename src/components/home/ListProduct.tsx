import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../interfaces/models/product";
import BasePageContainer from "../layout/PageContainer";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import ProductCard from "./ProductCard";

import "./ListProduct.css";
import { ProductDataResponse } from "../../interfaces/interface";
import { Card, Divider, Typography } from "antd";

const { Text, Title } = Typography
const ListProduct = ({ products, loading, title }: { products: ProductDataResponse[], loading: boolean, title: string }) => {
    const [slidesToShow, setSlidesToShow] = useState(5);


    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        nextArrow: <AiFillCaretRight />,
        prevArrow: <AiFillCaretLeft />,
    };

    return (
        <div>
            <BasePageContainer loading={loading}>
            <div>
                <h2 className="text-center text-lightRed">{title}</h2>
                <Divider />
                <Slider {...settings} >
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </Slider>
            </div>
        </BasePageContainer>
        </div>
    );
};

export default ListProduct;
