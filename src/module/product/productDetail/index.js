import * as React from 'react';
import { Button, Card, Carousel, Col, Divider, Image, Row, Space, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import './style.scss'
const { Title, Text } = Typography;

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state.product;

    return (
        <Card >
            <Row justify="center">
                <Col span={24}>
                    <Row gutter={[0, 0]}>
                        <Col xs={24} md={16}>
                            <Card>
                                <Image
                                    src={product?.imageUrl}
                                    preview={{
                                        mask: <EyeOutlined />,
                                        maskClosable: true,
                                    }}
                                    width="100%"
                                    height={'40vh'}
                                    style={{ objectFit: 'fill' }}
                                />
                                <Carousel autoplay slidesToShow={5}>
                                    {product?.imageUrls.map((url, index) => (
                                        <Image
                                            key={index}
                                            src={url}
                                            preview={{
                                                mask: <EyeOutlined />,
                                                maskClosable: true,
                                            }}
                                            width="100%"
                                            height={'30vh'}
                                        />
                                    ))}
                                </Carousel>
                                <Space direction="horizontal" size="middle" style={{ padding: '16px' }}>
                                    <Text strong>Tên cửa hàng:</Text>
                                    <Text>{product?.storeName}</Text>
                                    <Text strong>Địa chỉ:</Text>
                                    <Text>{product?.store?.address}</Text>
                                    <Text strong>Đánh giá:</Text>
                                    <Text>{product?.storeRate?.totalRate}</Text>
                                    <Text strong>Số sản phẩm:</Text>
                                    <Text>{product?.store?.productCount}</Text>
                                </Space>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card title={<Title level={4}>{product?.productName}</Title>}>
                                <Text>{product?.description}</Text>
                                <Divider />
                                <Space direction="vertical" size="middle">
                                    <Text strong>Giá:</Text>
                                    <Text>{product?.productPrice}</Text>
                                </Space>
                                <Divider />
                                <Space direction="vertical" size="middle">
                                    <Text strong>Đánh giá:</Text>
                                    <Text>{product?.productRate?.avgPoint} điểm</Text>
                                </Space>
                                <Divider />
                                <Space direction="vertical" size="middle">
                                    <Text strong>Người bán:</Text>
                                    <Text>{product?.sellerUsername}</Text>
                                </Space>
                                <Divider />
                                <Space direction="horizontal" size="middle">
                                    <Button >Thêm vào giỏ hàng</Button>
                                    <Button>Mua ngay</Button>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};
export default ProductDetail;
