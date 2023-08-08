import { Card, Rate, Button, Spin } from "antd";
import { HeartOutlined, HeartTwoTone, ShoppingOutlined, FireFilled } from "@ant-design/icons";
import React, { useState } from "react";
import ProductService from "../../../../service/ProductService";
import PaymentModal from "../PaymentModal";

const ProductCard = ({ productDetail, handleUpdatePoint }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading while rating

  const handleRating = async (point) => {
    setLoading(true); // Start loading
    try {
      const rate = await ProductService.ratingProduct(productDetail?.productId, point);
      handleUpdatePoint({ rate: rate, yourRate: point });
    } catch (error) {
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false); // Stop loading, whether the request is successful or not
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBuy = () => {
    setPaymentModalVisible(true);
  };

  if (loading) {
    return <Spin />;
  }

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
        <Button onClick={handleBuy} icon={<ShoppingOutlined />} size="large" type="link">
          Mua hàng
        </Button>,
      ]}
    >
      <PaymentModal product={productDetail} visible={isPaymentModalVisible} setVisible={setPaymentModalVisible} />
      <p>Giá tiền: {productDetail?.productPrice} VND</p>
      <p>Mô tả: {productDetail?.description}</p>
      <p>Người bán: {productDetail?.sellerUsername}</p>
      <p>Cửa hàng bán: {productDetail?.storeName}</p>
      <p>Địa chỉ bán hàng: {productDetail?.sellingAddress}</p>
      <p>Đánh giá của bạn: <Rate value={productDetail?.rate} onChange={handleRating} /></p>
      <p>Đánh giá trung bình: {productDetail?.productRate?.avgPoint} </p>
      <p>Tổng điểm đánh giá: {productDetail?.productRate?.totalPoint}</p>
      <p>Tổng số đánh giá: {productDetail?.productRate?.totalRate}</p>
    </Card>
  );
};

export default ProductCard;
