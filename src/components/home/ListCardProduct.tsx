import React from "react";
import { ProductDataResponse } from "../../interfaces/interface";
import { Card, Col, Row } from "antd";
import LazyImage from "../lazy-image";

const ListCardProduct = ({ products }: { products: ProductDataResponse[] }) => {
    return (
        <Row>
            {products.map((product) => (
                <Col lg={6} className="flex justify-center">
                    <Card
                        style={{ width: '30vh', marginBottom : 30 }}
                        bodyStyle={{margin : 0, padding : 0}}
                        cover={<div ><LazyImage src={product.imageUrl} /></div>}
                        key={product.productId}
                    >
                        <p className="vsm">{product.productName}</p>
                        <p>{product.minSellPrice}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ListCardProduct;
