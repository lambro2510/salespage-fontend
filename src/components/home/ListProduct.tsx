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

const data = [
    {
        username : '1 ngày 3 bữa',
        storeId : '',
        storeName : 'Cửa hàng trọ',
        title : 'Đánh giá sản phẩm bim bim lays',
        description : 'Sản phẩm chất lượng khá tốt, hạn sử dụng còn dài, ...',
        star : 5,
    }
]
const ListReview = () => {

    return (
        <div>
            
        </div>
    );
};

export default ListReview;
