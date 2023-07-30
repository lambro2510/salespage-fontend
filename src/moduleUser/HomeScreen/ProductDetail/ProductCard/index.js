import { Card, Rate } from "antd";
import React from "react";
import ProductService from "../../../../service/ProductService";

const ProductCard = ({productDetail}) => {

    const handleRating = async (point) => {
        const pointData = await ProductService.ratingProduct(productDetail?.productId, point);
        
      }

    return(
        <Card title={productDetail?.productName}>
              <p>Giá bán: {productDetail?.productPrice} VND</p>
              <p>Mô tả: {productDetail?.description}</p>
              <p>Người bán: {productDetail?.sellerUsername}</p>
              <p>Cửa hàng bán: {productDetail?.storeName}</p>
              <p>Địa chỉ bán hàng: {productDetail?.sellingAddress}</p>
              <p>Đánh giá trung bình: <Rate value={productDetail?.productRate?.avgPoint} onChange={handleRating}/></p>
              <p>Tổng điểm đánh giá: {productDetail?.productRate?.totalPoint}</p>
              <p>Tổng số đánh giá: {productDetail?.productRate?.totalRate}</p>
              <p>Vật phầm hot: {productDetail?.isHot}</p>
              <p>Sản phẩm yêu thích: {productDetail?.isLike}</p>
              {/* Add any other product details you want to display */}
            </Card>
    )
}

export default ProductCard;