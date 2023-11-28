import React from "react";
import { ProductDataResponse } from "../../interfaces/interface";
import { Card, Col, Row, Space } from "antd";
import LazyImage from "../lazy-image";
import { formatCurrency } from "../../utils";
import { ImStarFull } from "react-icons/im";
import { ProCard } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "../../routes/web";
import { GrFormView } from "react-icons/gr";

const ListCardProduct = ({ products }: { products: ProductDataResponse[] }) => {
    const navigate = useNavigate();
    return (

        <ProCard
            actions={[
                <a>{`Xem thêm`}</a>
            ]}
        >
            <Col span={24} className="mb-10">
                <h1 className="text-center">Sản phẩm phổ biến</h1>
            </Col>
            <Row gutter={[32, 32]}>
                {products.map((product) => (
                    <Col xs={12} sm={8} md={6} lg={6} xl={4}>
                        <Card
                            style={{ borderRadius: 'none', cursor: 'pointer' }}
                            bodyStyle={{ margin: 0, padding: 10 }}
                            cover={<div ><LazyImage src={product.imageUrl} /></div>}
                            key={product.productId}
                            onClick={() => navigate(`${webRoutes.products}/${product.productId}`)}
                        >
                            <Card.Meta
                                title={product.productName}
                                description={
                                    <Row  >
                                        <Col xs={12} lg={12} >
                                            <div className="flex justify-start items-center">
                                                <p className="vsm">{product.productRate.avgPoint.toFixed(0)}</p>
                                                <ImStarFull style={{ marginTop: '1%', paddingLeft: '1%', paddingRight: '5%' }} size={'12px'} color="yellow" />
                                            </div>
                                            <div className="flex justify-start items-center">
                                                <p>{formatCurrency(product.minSellPrice)}</p>
                                            </div>
                                        </Col>
                                        <Col xs={12} lg={12}>
                                            <div className="flex justify-center items-center">
                                                <p>{product.totalView} </p>
                                                <GrFormView />
                                            </div>
                                        </Col>
                                    </Row>
                                }
                            ></Card.Meta>
                        </Card>
                    </Col>
                ))}
            </Row>
        </ProCard>
    );
};

export default ListCardProduct;
