import * as React from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import './style.scss'

const ProductCategory = () => {
    const [productCategories, setProductCategories] = React.useState([])

    React.useEffect(() => {
        setProductCategories(getProductCategories);
    }, [])

    const getProductCategories = () => {
        return [
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn",
                "title": "Thời trang nam"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca_tn",
                "title": "Điện thoại và phụ kiện"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5_tn",
                "title": "Thiết bị điện tử"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d_tn",
                "title": "Máy tính & Laptop"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d_tn",
                "title": "Máy ảnh & Máy quay phim"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn",
                "title": "Đồng hồ"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de_tn",
                "title": "Giày dép nam"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857_tn",
                "title": "Thiết bị điện gia dụng"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4_tn",
                "title": "Thể thao và du lịch"
            },
            {
                "imageUrl": "https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334_tn",
                "title": "Ô tô & xe máy & xe đạp"
            },
        ]
    };


    return (
        <Row justify="center" span={24}>
            <Col justify="center" span={20}>
                <Card title={'Danh mục sản phẩm'} className='categories-card'>
                    <Row justify="center">
                        {productCategories.map((category, index) => (
                            <Col xs={8} sm={6} md={4} lg={2} key={index}>
                                <Tooltip title={category.title}>
                                    <Card className="product-item" hoverable cover={<img src={category.imageUrl} />}>
                                        <Card.Meta title={category.title} />
                                    </Card>
                                </Tooltip>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>


    );
}

export default ProductCategory;