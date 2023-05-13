import * as React from 'react';
import { Button, Card, Carousel, Col, Divider, Image, Row, Space, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import ProductService from '../../../../service/ProductService';
import './style.scss'
import ProductList from '../ProductList';
const { Title, Text } = Typography;

const ProductDetail = () => {
    const location = useLocation();
    const productId = location.state.productId;
    const [product, setProduct] = React.useState({});
    
    React.useEffect(() => {
        const getProductDetail = async () => {
            const response = await ProductService.getProductDetail(productId);
            return response;
        };
    
        const fetchData = async () => {
            const data = await getProductDetail();
            setProduct(data);
        };
    
        fetchData();
    }, [productId]);
    
    return (
        <Card >
            <Row justify="center">
                <Col span={24}>
                    <Row gutter={[0, 0]}>
                        <Col xs={24} md={16}>
                            <Card>
                                <Card.Grid style={{ width: '100%', textAlign: 'center' }}>
                                    <Image
                                        src={product?.imageUrl}
                                        width="60%"
                                        height={'40vh'}
                                        loading='lazy'
                                        preview={false}
                                        style={{ objectFit: 'fill' }}
                                    />
                                </Card.Grid>
                                <Card.Grid style={{ width: '100%', textAlign: 'center' }}>
                                    <Carousel autoplay slidesToShow={5}>
                                        {product.imageUrls && product?.imageUrls?.map((url, index) => (
                                            <Image
                                                key={index}
                                                src={url}
                                                preview={{
                                                    mask: <EyeOutlined />,
                                                    maskClosable: true,
                                                }}
                                                width="100%"
                                                height={'30vh'}
                                                loading='lazy'
                                            />
                                        ))}
                                    </Carousel>
                                </Card.Grid>
                                <Card.Grid style={{ width: '100%', padding: '16px' }}>
                                    <Space direction="horizontal" size="middle">
                                        <Text strong>Tên cửa hàng:</Text>
                                        <Text>{product?.storeName}</Text>
                                        <Text strong>Địa chỉ:</Text>
                                        <Text>{product?.store?.address}</Text>
                                        <Text strong>Đánh giá:</Text>
                                        <Text>{product?.storeRate?.totalRate}</Text>
                                        <Text strong>Số sản phẩm:</Text>
                                        <Text>{product?.store?.productCount}</Text>
                                    </Space>
                                </Card.Grid>
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
            <Row>
                <Row>
                    <h2 >Sản phẩm tương tự</h2>
                </Row>
                <Row>
                    <ProductList productList={product?.similarProducts} />
                </Row>
            </Row>
        </Card>
    );
};
export default ProductDetail;
