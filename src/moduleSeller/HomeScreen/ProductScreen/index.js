import React, { useState, useEffect } from 'react';
import { List, Pagination, Image, Row, Col, Button } from 'antd';
import ProductService from '../../../service/ProductService';
import ProductCategoryService from '../../../service/ProductCategoryService';
import CreateProductModal from './CreateProductModal';
import UpdateProductModal from './UpdateProductModal';
const ProductScreen = () => {
    const [productFilter, setProductFilter] = useState({});
    const [products, setProducts] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const [metadata, setMetadata] = useState({
        page: 0,
        size: 10,
        total: 0,
    });

    useEffect(() => {
        getSellerProduct();
    }, [metadata.page]);

    useEffect(() => {
        getProductCaregory();
    }, []);

    const getSellerProduct = async () => {
        const productInfo = await ProductService.findProduct({
            ...productFilter,
            page: metadata.page,
            size: metadata.size,
        });
        setMetadata({
            ...metadata,
            total: productInfo?.metadata.total || 0,
        });
        setProducts(productInfo?.data || []);
    };

    const getProductCaregory = async () => {
        const categoriInfo = await ProductCategoryService.getProductCategory();
        setProductCategory(categoriInfo)
    }
    const handlePageChange = (page, pageSize) => {
        setMetadata({
            ...metadata,
            page: page - 1, // Antd Pagination uses 1-based indexing, while our data uses 0-based indexing
            size: pageSize,
        });
    };

    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const handleCreateModalOpen = () => {
        setCreateModalVisible(true);
    };

    const handleCreateModalClose = () => {
        setCreateModalVisible(false);
    };

    const handleCreateProduct = (newProduct) => {
        setCreateModalVisible(false);
    };

    const createProduct = (
        <>
            <Button type="primary" onClick={handleCreateModalOpen}>
                Create Product
            </Button>
            <CreateProductModal
                visible={isCreateModalVisible}
                onClose={handleCreateModalClose}
                onCreate={handleCreateProduct}
            />
        </>
    );

    const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
    const handleUpdateModalOpen = () => {
        setUpdateModalVisible(true);
    };

    const handleUpdateModalClose = () => {
        setUpdateModalVisible(false);
    };

    const handleUpdateProduct = (updateProduct) => {
        setUpdateModalVisible(false);
    };

    const updateProduct = (
        <>
            <UpdateProductModal
                visible={isUpdateModalVisible}
                onClose={handleUpdateModalClose}
                onUpdate={handleUpdateProduct}
            />
        </>
    );

    return (
        <>
            {createProduct}
            {updateProduct}
            <List
                itemLayout="vertical"
                dataSource={products}
                renderItem={(item) => (
                    <List.Item key={item?.productId}>
                        <Row justify={'space-between'}>
                            <Col>
                                <Row>
                                    <Col>
                                        <Image src={item?.imageUrl}></Image>

                                    </Col>
                                    <Col>
                                        <h3>{item?.productName}</h3>
                                        <p>{item?.description}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col >
                                <Row justify={'space-between'}>
                                    <Col>

                                        <Button type="primary" onClick={handleUpdateModalOpen}>
                                            Cập nhật
                                        </Button>

                                    </Col>
                                    <Col>
                                        <Button type="primary" onClick={handleUpdateModalOpen}>
                                            Xóa
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <Pagination
                current={metadata.page + 1}
                pageSize={metadata.size}
                total={metadata.total}
                onChange={handlePageChange}
            />
        </>
    );
};

export default ProductScreen;
