import { useState } from 'react';
import { ProCard } from "@ant-design/pro-components";
import { Col, Row, Tag } from "antd";
import { webRoutes } from "../../routes/web";

const bestSaleProduct = {
    discount: 40,
    imgUrl: "https://gombattrang.vn/wp-content/uploads/2022/09/banner-danh-muc-loc-binh-gom-bat-trang.jpg",
    name: 'GỐM SỨ BÁT TRÀNG',
    storeId: '1',
    description: 'hiệu năng cực mạnh'
}

const secondSaleProduct = {
    discount: 40,
    imgUrl: "https://gombattrang.vn/wp-content/uploads/2022/09/banner-danh-muc-do-tho-men-ran-day-du.jpg",
    name: 'ĐỒ THỜ BÁT TRÀNG',
    storeId: '1',
    description: 'hiệu năng cực mạnh'
}

const second2SaleProduct = {
    discount: 40,
    imgUrl: "https://gombattrang.vn/wp-content/uploads/2022/09/loc-binh-bat-trang-tu-canh-men-ran.jpg",
    name: 'LỘC BÌNH BÁT TRÀNG TỨ CẢNH MEN RẠN',
    storeId: '1',
    description: 'hiệu năng cực mạnh'
}
const second3SaleProduct = {
    discount: 40,
    imgUrl: "https://gombattrang.vn/wp-content/uploads/2022/09/tu-canh-co-do-men-mau.jpg",
    name: 'TRANH SỨ TỨ CẢNH CỔ ĐỒ MEN MÀU',
    storeId: '1',
    description: 'hiệu năng cực mạnh'
}
const second4SaleProduct = {
    discount: 40,
    imgUrl: "https://gombattrang.vn/wp-content/uploads/2022/09/am-chen-bup-sen-luc-bao.jpg",
    name: 'ẤM CHÉN BÚP SEN LỤC BẢO',
    storeId: '1',
    description: 'hiệu năng cực mạnh'
}
const second5SaleProduct = {
    discount: 40,
    imgUrl: "https://gombattrang.vn/wp-content/uploads/2022/09/bong-hut-loc-an-phu-lien-ngu-su-khu-gom-bat-trang.jpg",
    name: 'BÓNG HÚT LỘC AN PHÚ LIÊN NGƯ SỨ KHỬ',
    storeId: '1',
    description: 'hiệu năng cực mạnh'
}
const HotProduct = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const renderProcard = (saleProduct: any) => (
        <ProCard className="bg-card" bordered boxShadow>
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
                <Col xs={24} sm={24} md={16} lg={16} >
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
                    <Col xs={24} sm={24} md={8} lg={8}>
                        {renderProcard(secondSaleProduct)}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        {renderProcard(second2SaleProduct)}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        {renderProcard(second3SaleProduct)}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        {renderProcard(second4SaleProduct)}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        {renderProcard(second5SaleProduct)}
                    </Col>
                </>}
            </Row>
        </ProCard>
    )
}

export default HotProduct;