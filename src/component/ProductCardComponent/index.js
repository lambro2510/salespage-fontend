import { Card, Image } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const ProductCardComponent = ({ product }) => {
  const navigate = useNavigate();
  const mainImage = (imageUrl) => (
    <Image className='card-image' preview={false} src={imageUrl} />
  );

  const handleCardClick = () => {
    navigate(`/product/${product.productId}`); // Assuming the product object has a 'productId' property
  };

  return (
    <div className='card' onClick={handleCardClick}>
      <Card className='card-container' cover={mainImage(product?.imageUrl)} hoverable>
        <Card.Meta title={product?.productName} description={product?.description} />
      </Card>
    </div>
  );
};

export default ProductCardComponent;
