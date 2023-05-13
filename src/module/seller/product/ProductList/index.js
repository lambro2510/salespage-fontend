import React from 'react';
import { Card, Row, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

const SellerListProduct = ({ productList, setVisible, setProduct }) => {
    const navigate = useNavigate();

    const onLick = (product) => {
        setProduct(product);
        setVisible(true);
    }

    return (
        <div style={{ width: '99%' }}>
            <Row gutter={[16, 16]}>
                {productList?.map((product) => (
                    <Col key={product.productId} xs={24} sm={12} md={8} lg={6}>
                        <Card hoverable cover={<Image src={product?.imageUrl} loading='lazy' width="100%" height={250} style={{ objectFit: 'fill' }} />} onClick={() => onLick(product)}>
                            <Card.Meta title={product.productName} description={product.productPrice.toLocaleString() + ' VNĐ'} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SellerListProduct;
