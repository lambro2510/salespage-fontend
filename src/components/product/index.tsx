import React, { useEffect, useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { BreadcrumbProps, Button, Col, Input, InputNumber, Rate, Row, Tag, Typography } from "antd";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProductDetailResponse } from "../../interfaces/models/product";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { webRoutes } from "../../routes/web";
import ListCarousel from "../listCarousel";
import BasePageContainer from "../layout/PageContainer";
import LazyImage from "../lazy-image";
import { formatCurrency, handleErrorResponse, showNotification } from '../../utils/index'
import { RiAddLine, RiSubtractFill } from "react-icons/ri";
import { BiCartAdd } from "react-icons/bi";
import QuantityInput from "../quantityInput";
const { Text } = Typography;

const ProductDetailView = () => {
    const { productId, productName } = useParams();
    const [product, setProduct] = useState<ProductDetailResponse>();
    const [currentImage, setCurrentImage] = useState<string>();
    const [quantity, setQuantity] = useState<any>(1);
    const [storeId, setStoreId] = useState<string>();
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

    const addToCart = async () => {
        try {
            let res = await http.post(`${apiRoutes.productTransaction}/cart`, {
                productId: product?.productId,
                storeId: storeId,
                quantity: quantity,
            })
            showNotification(res?.data?.message)
        } catch (error) {
            handleErrorResponse(error);
        }

    }
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

    const handleIncrement = () => {
        if (product) {
            if (quantity < product?.quantity) {
                setQuantity(quantity + 1);
            }
        }
    };

    const onQuantityChange = (value: any) => {
        if (product) {
            if (value < 1) {
                setQuantity(1);
            }
            else if (value > product?.quantity) {
                setQuantity(product?.quantity)
            } else {
                setQuantity(value)
            }
        }

    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleStoreClick = (storeId: string) => {
        setStoreId(storeId);
    };

    const renderPrice = () => {
        return (
            <div className="mt-5 flex items-center bg-slate-200">
                {product?.discountPercent ? (
                    <>
                        <Text delete className="text-2xs text-gray-500 pr-2">
                            {formatCurrency(product.productPrice)}
                        </Text>
                        <Text className="text-2xl text-red pr-2">
                            {formatCurrency(product.sellProductPrice)}
                        </Text>
                        <Tag color="red" className="flex items-center">
                            <span className="pr-1">{product.discountPercent}% giảm</span>
                        </Tag>
                    </>
                ) : (
                    <Text className="text-2xl text-red">
                        {formatCurrency(product?.sellProductPrice)}
                    </Text>
                )}
            </div>
        );
    };

    const renderProductInfo = () => {
        return (
            <div >
                <Row gutter={16} className="pt-4">
                    {product?.colors ? (
                        <>
                            <Col span={5}>
                                <span>Màu sắc:</span>
                            </Col>
                            <Col >
                                {product.colors.map((color, index) => (
                                    <Tag key={index}>{color}</Tag>
                                ))}
                            </Col>
                        </>
                    ) : null}
                </Row>
                <Row gutter={16} className="pt-4">
                    {product?.isForeign ? (
                        <>
                            <Col span={24}>
                                <span>Cần nhập khẩu</span>
                            </Col>
                        </>
                    ) : <>
                        <Col span={24}>
                            <span>Có sẵn trong nước</span>
                        </Col>
                    </>}
                </Row>
                <Row gutter={16} className="pt-4">
                    <Col span={5}>
                        <span>Bảo hành:</span>
                    </Col>
                    {product?.isGuarantee ? (
                        <>
                            <Col>
                                <span>Không</span>
                            </Col>
                        </>
                    ) : <>
                        <Col >
                            <span>Có</span>
                        </Col>
                    </>}
                </Row>
                <Row gutter={16} className="pt-4">
                    <Col span={5}>
                        <span>Nguồn gốc:</span>
                    </Col>
                    {product?.origin ? (
                        <>
                            <Col>
                                <span>{product.origin}</span>
                            </Col>
                        </>
                    ) : <>
                        <Col >
                            <span>Không rõ</span>
                        </Col>
                    </>}
                </Row>
                <Row gutter={16} className="pt-4">
                    <Col span={5}>
                        <span>Kích thước sản phẩm:</span>
                    </Col>
                    {product?.size ? (
                        <>
                            <Col>
                                <span>{product.size} {product.sizeType}</span>
                            </Col>
                        </>
                    ) : <>
                        <Col >
                            <span>Không rõ</span>
                        </Col>
                    </>}
                </Row>
                <Row gutter={16} className="pt-4">
                    <Col span={5}>
                        <span>Cửa hàng bán sản phẩm</span>
                    </Col>
                    {product?.size ? (
                        <>
                            <Col >
                                {product.stores.map((store, index) => (
                                    <Tag className={store.storeId === storeId ? 'bg-rose-200' : ''} key={index} onClick={() => handleStoreClick(store.storeId)}>
                                        {store.storeName}
                                    </Tag>
                                ))}
                            </Col>
                        </>
                    ) : <>
                        <Col >
                            <span>Không rõ</span>
                        </Col>
                    </>}
                </Row>
                <Row gutter={16} className="pt-4">
                    <Col span={5}>
                        <span>Trọng lượng sản phẩm:</span>
                    </Col>
                    {product?.size ? (
                        <>
                            <Col>
                                <span>{product.weight} {product.weightType}</span>
                            </Col>
                        </>
                    ) : <>
                        <Col >
                            <span>Không rõ</span>
                        </Col>
                    </>}
                </Row>
            </div>
        );
    }

    return (
        <BasePageContainer breadcrumb={breadcrumb}>
            <Row justify="space-around">
                <Col span={8} className="lg:col-span-6 xl:col-span-4">
                    <div className="flex justify-center mt-1">
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

                            </div>
                            <div className="mt-3 h-6 text-sm">
                                <Row>
                                    <Col span={1}>
                                        <Text className="text-red  underline">
                                            {product?.rate?.avgPoint}
                                        </Text>
                                    </Col>
                                    <Col span={6}>
                                        <Rate disabled allowHalf value={product?.rate.avgPoint} className="text-red text-xs" />
                                    </Col>
                                    <Col span={6} className="flex items-center text-xs">
                                        <Text className="flex items-center">|   {product.rate.totalRate}</Text>
                                        &nbsp;đánh giá
                                    </Col>
                                    <Col span={6} className="text-xs flex items-center">
                                        <Text >|   {product.totalView}</Text>
                                        &nbsp;lượt xem
                                    </Col>
                                    <Col span={5} className="flex justify-end">
                                        <NavLink to="#">Tố cáo</NavLink>
                                    </Col>
                                </Row>

                            </div>
                            <div className="mt-5">
                                {renderPrice()}
                                {renderProductInfo()}
                                <Row className="flex items-center mt-5">
                                    <Col span={5}>
                                        Số lượng
                                    </Col>
                                    <Col span={19}>
                                        {<QuantityInput quantity={quantity} setQuantity={setQuantity} limit={product.quantity} description={'sản phẩm có sẵn'} />}
                                    </Col>
                                </Row>

                                <Row className="pt-5 flex justify-around">
                                    <Button type="default" icon={<BiCartAdd />} onClick={() => addToCart()}>Thêm vào giỏ hàng</Button>
                                    <Button type="primary">Mua ngay</Button>
                                </Row>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </BasePageContainer>
    );
};

export default ProductDetailView;
