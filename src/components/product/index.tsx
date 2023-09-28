import React, { useEffect, useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { BreadcrumbProps, Col, Rate, Row, Tag, Typography } from "antd";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProductDetailResponse } from "../../interfaces/models/product";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { webRoutes } from "../../routes/web";
import ListCarousel from "../listCarousel";
import BasePageContainer from "../layout/PageContainer";
import LazyImage from "../lazy-image";
import { formatCurrency } from '../../utils/index'
const { Text } = Typography;

const ProductDetailView = () => {
    const { productId, productName } = useParams();
    const [product, setProduct] = useState<ProductDetailResponse | undefined>();
    const [currentImage, setCurrentImage] = useState<string>();

    const getProductDetail = async () => {
        try {
            const response = await http.get(
                `${apiRoutes.products}/${productId}`
            );
            const productData = response.data.data as ProductDetailResponse;
            setProduct(productData);
            setCurrentImage(productData?.imageUrls[0].url);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    useEffect(() => {
        getProductDetail();
    }, []);

    const ListImage = product?.imageUrls?.map((image: UploadImageData, index) => (
        <LazyImage key={index} src={image.url} className="w-full h-auto p-1" />
    )) || [];

    const breadcrumb: BreadcrumbProps = {
        items: [
            {
                key: webRoutes.home,
                title: <Link to={webRoutes.home}>Trang chủ</Link>,
            },
            {
                key: webRoutes.products,
                title: <Link to={webRoutes.products}>Sản phẩm</Link>,
            },
            {
                key: `${webRoutes.products}/${productId}`,
                title: productName,
            },
        ],
    };

    return (
        <BasePageContainer breadcrumb={breadcrumb}>
            <Row justify="space-around">
                <Col span={8} className="lg:col-span-6 xl:col-span-4">
                    <div className="flex justify-center mt-10">
                        <img className="w-full h-auto rounded-lg" src={currentImage} alt={productName} />
                    </div>
                    <div className="pt-5">
                        <ListCarousel child={ListImage} setCurrentChild={setCurrentImage} />
                    </div>
                </Col>
                <Col span={15} className="lg:col-span-6 xl:col-span-8">
                    {product && (
                        <div>
                            <div className="flex justify-between items-center">
                                <h1 className="text-xl font-semibold">{product?.productName}</h1>
                                <NavLink to="#">Tố cáo</NavLink>
                            </div>
                            <div className="mt-3">
                                <div className="flex mt-3 items-center">
                                    <Text className="text-red-500 text-xs underline">
                                        {product?.rate?.avgPoint}
                                    </Text>
                                    <Rate disabled allowHalf value={product?.rate.avgPoint} className="text-red-500 text-xs" />
                                </div>
                            </div>
                            <div className="mt-5">
                                {product?.discountPercent ? (
                                    <div className="mt-5 flex items-center bg-slate-200">
                                        <Text delete className="text-2xs text-gray-500 pr-2">{formatCurrency(product.productPrice)}</Text>
                                        <Text className="text-2xl text-red-500 pr-2">{formatCurrency(product.sellProductPrice)}</Text>
                                        <Tag color="red" className="flex items-center">
                                            <span className="pr-1">{product.discountPercent}% giảm</span>
                                        </Tag>
                                    </div>
                                ) : (
                                    <Text className="text-2xl text-red-500"> {formatCurrency(product?.sellProductPrice)}</Text>
                                )}
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </BasePageContainer>
    );
};

export default ProductDetailView;
