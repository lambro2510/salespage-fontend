import * as React from 'react';
import { Card, Carousel, Col, Divider, Image, Row, Space, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import './style.scss'
const { Title, Text } = Typography;

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state.product;

    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <Carousel autoplay>
                    {product?.imageUrls.map((url, index) => (
                        <Image
                            key={index}
                            src={url}
                            preview={{
                                mask: <EyeOutlined />,
                                maskClosable: true,
                            }}
                            width="100%"
                            height={'90vh'}
                        />
                    ))}
                </Carousel>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card title={<Title level={4}>{product?.productName}</Title>}>
                    <Text>{product?.description}</Text>
                    <Divider />
                    <Space direction="vertical" size="middle">
                        <Text strong>Giá:</Text>
                        <Text>{product?.price}</Text>
                    </Space>
                    <Divider />
                    <Space direction="vertical" size="middle">
                        <Text strong>Đánh giá:</Text>
                        <Text>{product?.rate.avgPoint} điểm</Text>
                    </Space>
                    <Divider />
                    <Space direction="vertical" size="middle">
                        <Text strong>Người bán:</Text>
                        <Text>{product?.sellerUsername}</Text>
                    </Space>
                </Card>
            </Col>
        </Row>
    );
};
export default ProductDetail;