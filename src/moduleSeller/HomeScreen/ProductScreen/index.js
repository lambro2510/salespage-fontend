import React, { useState, useEffect } from 'react';
import { List, Pagination, Image, Row, Col, Button } from 'antd';
import ProductService from '../../../service/ProductService';
import CreateProductModal
    from './CreateProductModal';
const ProductScreen = () => {
    const [productFilter, setProductFilter] = useState({});
    const [products, setProducts] = useState([]);
    const [metadata, setMetadata] = useState({
        page: 0,
        size: 10,
        total: 0,
    });
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);

    useEffect(() => {
        getSellerProduct();
    }, [metadata.page]);

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

    const handlePageChange = (page, pageSize) => {
        setMetadata({
            ...metadata,
            page: page - 1, // Antd Pagination uses 1-based indexing, while our data uses 0-based indexing
            size: pageSize,
        });
    };

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
    return (
        <>
            {createProduct}
            <List
                itemLayout="vertical"
                dataSource={products}
                renderItem={(item) => (
                    <List.Item key={item?.productId}>
                        <Row>
                            <Col>
                                <Image src={item?.imageUrl}></Image>

                            </Col>
                            <Col>
                                <h3>{item?.productName}</h3>
                                <p>{item?.description}</p>
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
