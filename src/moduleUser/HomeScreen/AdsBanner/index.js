import * as React from 'react';
import { Carousel, Row, Col, Tooltip, Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './style.scss';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <LeftOutlined />,
    nextArrow: <RightOutlined />,
};

const AdsBanner = () => {
    const [banners, setBanners] = React.useState([
        'https://drive.google.com/u/0/uc?id=1-D9AkYJNsfh9sxtphy67kMRjdon2Q70E',
        'https://drive.google.com/u/0/uc?id=1jcgBxKBiUONvyJTHe3xb4BUUUDfRkTFT',
        'https://drive.google.com/u/0/uc?id=1gBn0KFngH1Yraem86jnvxzJQX6Ou7lgX',
        'https://drive.google.com/u/0/uc?id=1RMqJNHiIXris72hn0aH8H93hSL7Stvs2'

    ]);

    const [subBanners, setSubBanners] = React.useState([
        {
            "url": "https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi",
            "imageName": "Khung giờ săn sale"
        },
        {
            "url": "https://cf.shopee.vn/file/a8d76bca057ba0b117dcf8e1ef068d16_xhdpi",
            "imageName": "Miễn phí hết ship"
        },
        {
            "url": "https://cf.shopee.vn/file/vn-50009109-11d9732a464d895d3699ca40431d0bfd_xhdpi",
            "imageName": "Voucher giảm đến 200.000Đ"
        },
        {
            "url": "https://cf.shopee.vn/file/vn-50009109-852300c407c5e79bf5dc1854aa0cfeef_xhdpi",
            "imageName": "Hàng hiệu giảm 50%"
        },
        {
            "url": "https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi",
            "imageName": "Mã giảm giá"
        },
        {
            "url": "https://cf.shopee.vn/file/vn-50009109-1975fb1af4ae3c22878d04f6f440b6f9_xhdpi",
            "imageName": "Bắt trend - Giá sốc"
        },
        {
            "url": "https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi",
            "imageName": "Nạp thẻ dịch vụ, khách hàng"
        },
        {
            "url": "https://cf.shopee.vn/file/vn-50009109-49f959ff1c532d2c9b5b88a634a656da_xhdpi",
            "imageName": "Nhận free 50.000 xu"
        },
        {
            "url": "https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi",
            "imageName": "Hàng quốc tế"
        },
        {
            "url": "https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi",
            "imageName": "Gì cũng rẻ - mua hàng freeship"
        }
    ]
    );

    const [img1, setImg1] = React.useState('https://drive.google.com/u/0/uc?id=1g-Ji1POyTQgiSYTTT3OhyxjXn8GyW0Fp')
    const [img2, setImg2] = React.useState('https://drive.google.com/u/0/uc?id=1IqvJfOMymST66dPRdhCduDfzIJTsfDXE')

    const SubMenu = (
        <Row gutter={[16, 16]} className="submenu-container" justify="center">
            {subBanners.map((subBanner, index) => (
                <Col key={index} span={Math.floor(24 / subBanners.length)}>
                    <Tooltip title={subBanner?.imageName}>
                        <Card className="submenu-card" bordered={false} hoverable cover={<img src={subBanner.url} alt={`Image ${subBanner?.url}`} />}>
                            <Card.Meta title={subBanner?.imageName} />
                        </Card>
                    </Tooltip>
                </Col>
            ))}
        </Row>
    );



    return (
        <Row  justify="center">
            <Col>
            <Row justify="center" className='container'>
                <Col className='main-banner'>
                    <Row justify="center">
                        <Col className="banner-container">
                            <Carousel {...settings} >
                                {banners.map((banner, index) => (
                                    <img className='ads-image' src={banner} alt="Banner" key={index} />
                                ))}
                            </Carousel>
                        </Col>
                        <Col justify='space-evenly'>
                            <Row>
                                <img className='image' src={img1} alt="Banner" key={1} />
                            </Row>
                            <Row>
                                <img className='image' src={img2} alt="Banner" key={2} />
                            </Row>
                        </Col>
                    </Row>
                    {SubMenu}
                </Col>
            </Row>
        </Col>
        </Row>
    );
};

export default AdsBanner;