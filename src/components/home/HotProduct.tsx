import { useState } from 'react';
import { ProCard } from "@ant-design/pro-components";
import { Col, Row, Tag } from "antd";
import { webRoutes } from "../../routes/web";

const bestSaleProduct = {
    discount: 40,
    imgUrl: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
    name: 'Iphone 15 pro max',
    storeId: '1',
    description: 'hiệu năng cực mạnh'
}
const HotProduct = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const renderProcard = (saleProduct: any) => (
        <ProCard className="bg-card" style={{ paddingTop: '9.1%' }} bordered boxShadow>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <img src={saleProduct.imgUrl} alt={saleProduct.name} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <p className="text-center">{saleProduct.name}
                        <span className="ml-5">
                            <Tag color="red">
                                Giảm {saleProduct.discount} %
                            </Tag>
                        </span>
                    </p>
                </Col>

            </Row>
        </ProCard>
    );
    return (
        <ProCard>
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={24} md={24} lg={16} >
                    <ProCard className="bg-card" bordered boxShadow >
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={10}>
                                <Tag color="red-inverse">Giảm tới {bestSaleProduct.discount} %</Tag>
                                <h1>{bestSaleProduct.name}</h1>
                                <a className="text-mark" href={`${webRoutes.stores}/${bestSaleProduct.storeId}`}>Tới cửa hàng{'>>>'}</a>
                                <p>{bestSaleProduct.description}</p>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={14}>
                                <img src={bestSaleProduct.imgUrl} />
                            </Col>
                        </Row>
                    </ProCard>
                </Col>
                {!isMobile && <>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        {renderProcard(bestSaleProduct)}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6}>
                        {renderProcard(bestSaleProduct)}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6}>
                        {renderProcard(bestSaleProduct)}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6}>
                        {renderProcard(bestSaleProduct)}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6}>
                        {renderProcard(bestSaleProduct)}
                    </Col>
                </>}
            </Row>
        </ProCard>
    )
}

export default HotProduct;