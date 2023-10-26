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

const ListProduct = ({ products, loading, title }: { products: ProductDataResponse[], loading : boolean, title : string }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;

            if (windowWidth >= 1920) {
                setSlidesToShow(4);
            } else if (windowWidth >= 1680) {
                setSlidesToShow(4);
            } else if (windowWidth >= 1280) {
                setSlidesToShow(3);
            } else if (windowWidth >= 1024) {
                setSlidesToShow(2);
            } else if (windowWidth >= 768) {
                setSlidesToShow(1);
            } else if (windowWidth >= 320) {
                setSlidesToShow(1);
            } else {
                setSlidesToShow(1);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
            <h3>{title}</h3>
            <Slider {...settings}>
                {products?.map((product) => (
                    <div key={product.productId}>
                        <div >
                            <ProductCard product={product} />
                        </div>
                    </div>
                ))}
            </Slider>
        </BasePageContainer>
    );
};

export default ListProduct;
