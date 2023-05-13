import React from 'react';
import { Card, Row, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ productList }) => {
    const navigate = useNavigate();

    const onLick = (productId) => {
        navigate(`/products/${productId}`, { state: { productId: productId } });
    }

    return (
        <Row gutter={[16, 16]}>
            {productList?.map((product) => (
                <Col key={product.productId} xs={24} sm={12} md={8} lg={6}>
                    <Card hoverable cover={<Image src={product?.imageUrl} width="100%" height={250} style={{ objectFit: 'cover' }} />} onClick={() => onLick(product.productId)}>
                        <Card.Meta title={product.productName} description={product.productPrice.toLocaleString() + ' VNĐ'} />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;
