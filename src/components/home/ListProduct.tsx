import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../interfaces/models/product";
import BasePageContainer from "../layout/PageContainer";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import ProductCard from "./ProductCard";

import "./ListProduct.css";

const ListProduct = ({ products }: { products: Product[] }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setSlidesToShow(4);
            } else if (window.innerWidth >= 992) {
                setSlidesToShow(3);
            } else if (window.innerWidth >= 768) {
                setSlidesToShow(2);
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
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        nextArrow: <AiFillCaretRight />,
        prevArrow: <AiFillCaretLeft />,
    };

    return (
        <BasePageContainer>
            <Slider {...settings}>
                {products?.map((product) => (
                    <div key={product.productId} className="product-slide">
                        <ProductCard product={product} />
                    </div>
                ))}
            </Slider>
        </BasePageContainer>
    );
};

export default ListProduct;
