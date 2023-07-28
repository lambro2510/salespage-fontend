import { Card, Image } from 'antd';
import React from 'react'; // Import React from 'react', no need for alias *
import './style.scss';

const ProductCardComponent = ({ product }) => {
  const mainImage = (imageUrl) => (
    <Image className='card-image' preview={false} src={imageUrl} />
  );

  return (
    <div className='card'>
      <Card className='card-container' cover={mainImage(product?.imageUrl)} hoverable >
        <Card.Meta title={product?.productName} description={product?.description} />
      </Card>
    </div>
  );
};

export default ProductCardComponent;
