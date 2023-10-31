import { ProCard } from "@ant-design/pro-components";
import { ProductDataResponse } from "../../interfaces/Interface";
import { useState } from "react";
import { Button, Card, Col, Rate, Row, Tag, Typography } from "antd";
import defaultImage from "../../assets/img/product-default-image.png";
import LazyImage from "../lazy-image";
import { formatCurrency } from "../../utils";

const {Text, Title} = Typography;
const ProductCarousel = ({ products }: { products: ProductDataResponse[] }) => {
    const size = 4;
    const [index, setIndex] = useState<number>(products.length);
    const handleNextPage = () => {

    }

    const handlePrePage = () => {
        // Implement your logic for the previous page here
    }

    const renderProductCard = (product: ProductDataResponse) => {
        const imageUrl = product.imageUrl || defaultImage;
        const discountPrice = product.maxSellPrice - product.minSellPrice
        const renderPrice = () => {
            if (product.minSellPrice != product.maxSellPrice) {
                if (product.minOriginPrice != product.maxOriginPrice) {
                    return (
                        <div className="flex justify-around">
                            <Text delete className="text-sm">
                                {formatCurrency(product.maxOriginPrice)}
                            </Text>
                            <Text className="text-sm" >
                                &nbsp;-  {formatCurrency(product.minSellPrice)}
                            </Text>
                        </div>
    
                    )
                } else {
                    return (
                        <Text >
                            {formatCurrency(product.minSellPrice)} - {formatCurrency(product.maxSellPrice)}
                        </Text>
                    )
                }
            } else {
                return (
                    <Text >
                        {formatCurrency(product.minSellPrice)}
                    </Text>
                )
            }
        };
        return (
            <Col span={24 / size}>
                <Card
                    key={product.productId}
                    cover={<LazyImage className="w-full h-auto overflow-hidden" placeholder={<img src={defaultImage} className="w-full" />} src={imageUrl} />}
                >
                    <Text className="line-clamp-3 text-xs h-12">{product.productName}</Text>
                    <div className="text-xs h-10">
                        {discountPrice > 0 && <Tag color="yellow">giảm {formatCurrency(discountPrice)}</Tag>}
                    </div>
                    <div className="flex text-xs h-10">
                        {renderPrice()}
                    </div>
                    <div className="flex text-xs h-10">
                        <Rate allowHalf disabled defaultValue={product.productRate.avgPoint} />
                    </div>
                    <div className="flex text-xs h-10">
                        <Rate allowHalf disabled defaultValue={product.productRate.avgPoint} />
                    </div>
                </Card>
            </Col>
        )
    }

    return (
        <ProCard>

            <div className="flex justify-center">
                <Button>Pre</Button>
                <Row className="flex justify-around">
                    {products.map((product) => renderProductCard(product))}
                </Row>
                <Button >Next</Button>
            </div>

        </ProCard >
    )
}

export default ProductCarousel;
