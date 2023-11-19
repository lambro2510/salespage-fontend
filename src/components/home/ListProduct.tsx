import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../interfaces/models/product";
import BasePageContainer from "../layout/PageContainer";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import ProductCard from "./ProductCard";

import "./ListProduct.css";
import { ProductDataResponse } from "../../interfaces/Interface";
import ProductCarousel from "../share-component/Sider";
import { Divider, Typography } from "antd";

const {Text, Title} = Typography
const ListProduct = ({ products, loading, title }: { products: ProductDataResponse[], loading: boolean, title: string }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);


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
        <BasePageContainer loading={loading}>
            <div>
                <h1 className="text-center">{title}</h1>
                <Divider />
                <ProductCarousel products={products} />
            </div>
        </BasePageContainer>
    );
};

export default ListProduct;
