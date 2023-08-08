import React, { useEffect, useState } from 'react';
import { List, Button, Row, Col } from 'antd';
import ProductCategoryService from '../../../service/ProductCategoryService';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateCategoryModal from './CreateCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import ProductService from '../../../service/ProductService';

const ProductCategoryScreen = () => {
    const [productCategories, setProductCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProductCategories = async () => {
            const categoryData = await ProductCategoryService.getProductCategory();
            setProductCategories(categoryData);
            const productTypes = await ProductService.getProductType();
            setProductTypes(productTypes);
        };

        fetchProductCategories();
        setLoading(false);
    }, [isLoading]);

    const handleCreateModalOpen = () => {
        setCreateModalVisible(true);
    };

    const handleCreateModalClose = () => {
        setCreateModalVisible(false);
    };

    const handleCreateCategory = (newCategory) => {
        ProductCategoryService.createProductCategory(newCategory);
        setCreateModalVisible(false);
        setLoading(true);
    };

    const createCategory = (
        <>
            <Button type="primary" onClick={handleCreateModalOpen}>
                Tạo danh mục sản phẩm
            </Button>
            <CreateCategoryModal
                productTypes={productTypes}
                visible={isCreateModalVisible}
                onClose={handleCreateModalClose}
                onCreate={handleCreateCategory}
            />
        </>
    );

    const handleUpdateModalOpen = (id) => {
        setCategoryId(id);
        setUpdateModalVisible(true);
    };

    const handleUpdateModalClose = () => {
        setUpdateModalVisible(false);
    };

    const handleUpdateCategory = (updatedCategory) => {
        if (updatedCategory) {
            ProductCategoryService.updateProductCategory(updatedCategory);
            setLoading(true);
        }
        setUpdateModalVisible(false);
        setCategoryId('');
    };

    const handleDeleteCategory = (id) => {
        if (id) {
            ProductCategoryService.deleteProductCategory(id);
            setLoading(true);
        }
    };

    const updateCategory = (
        <UpdateCategoryModal
            id={categoryId}
            productTypes={productTypes}
            visible={isUpdateModalVisible}
            onClose={handleUpdateModalClose}
            onUpdate={handleUpdateCategory}
        />
    );

    return (
        <>
            {createCategory}
            {updateCategory}
            <List
                itemLayout="vertical"
                dataSource={productCategories}
                renderItem={(item) => (
                    <List.Item key={item?.id}>
                        <Row justify={'space-between'}>
                            <Col>
                                <h3>{item?.categoryName}</h3>
                                <p>{item?.description}</p>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={() => handleUpdateModalOpen(item?.categoryId)}>
                                    <EditOutlined />
                                </Button>
                                <Button type="primary" onClick={() => handleDeleteCategory(item?.categoryId)}>
                                    <DeleteOutlined />
                                </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </>
    );
};

export default ProductCategoryScreen;
