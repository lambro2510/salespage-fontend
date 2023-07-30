import { Card, Rate, Button } from "antd";
import { HeartOutlined, HeartTwoTone, ShoppingOutlined, FireFilled } from "@ant-design/icons"; // Updated icons
import React, { useState } from "react";
import ProductService from "../../../../service/ProductService";

const ProductCard = ({ productDetail, handleUpdatePoint }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleRating = async (point) => {
    const rate = await ProductService.ratingProduct(productDetail?.productId, point);
    handleUpdatePoint(rate);
  };

  const handleLike = async () => {
    
    setIsLiked(!isLiked);
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', margin: "16px auto" }}
      title={productDetail?.productName}
      extra={productDetail?.isHot ? null : <FireFilled type="fire" theme="filled" />}
      actions={[
        <Button
          onClick={handleLike}
          icon={isLiked ? <HeartTwoTone twoToneColor="#eb2f96" /> : <HeartOutlined />}
          size="large"
          type="link"
        >
          {isLiked ? "Đã thích" : "Yêu thích"}
        </Button>,
        <Button onClick={handleLike} icon={<ShoppingOutlined />} size="large" type="link">
          Mua hàng
        </Button>,
      ]}
    >
      <p>Giá tiền: {productDetail?.productPrice} VND</p>
      <p>Mô tả: {productDetail?.description}</p>
      <p>Người bán: {productDetail?.sellerUsername}</p>
      <p>Cửa hàng bán: {productDetail?.storeName}</p>
      <p>Địa chỉ bán hàng: {productDetail?.sellingAddress}</p>
      <p>Đánh giá trung bình: <Rate value={productDetail?.productRate?.avgPoint} onChange={handleRating} /></p>
      <p>Tổng điểm đánh giá: {productDetail?.productRate?.totalPoint}</p>
      <p>Tổng số đánh giá: {productDetail?.productRate?.totalRate}</p>
    </Card>
  );
};

export default ProductCard;
