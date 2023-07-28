import * as React from 'react';
import { List, Pagination, Image, Row, Col, Button } from 'antd';
import ProductCategoryService from '../../../service/ProductCategoryService';
import CreateCategoryModal from './CreateCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';

const ProductCategoryScreen = () => {
    const [productCategories, setProductCategories] = React.useState([]);
    const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
    const [isUpdateModalVisible, setUpdateModalVisible] = React.useState(false);
    const [categoriId, setCategoriId] = React.useState("")
    const [isLoading, setLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchProductCategories = async () => {
            const categoryData = await ProductCategoryService.getProductCategory();
            setProductCategories(categoryData);
        };

        fetchProductCategories();
        setLoading(false)
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
        setLoading(true)
    };

    const createCategory = (
        <>
            <Button type="primary" onClick={handleCreateModalOpen}>
                Tạo danh mục sản phẩm
            </Button>
            <CreateCategoryModal
                visible={isCreateModalVisible}
                onClose={handleCreateModalClose}
                onCreate={handleCreateCategory}
            />
        </>
    );

    const handleUpdateModalOpen = (id) => {
        setCategoriId(id)
        console.log(id);
        setUpdateModalVisible(true);
    };

    const handleUpdateModalClose = () => {
        setUpdateModalVisible(false);
    };

    const handleUpdateCategory = (newCategory) => {
        setUpdateModalVisible(false);
    };

    const handleDeleteCategory = (id) => {

    };

    const updateCategory = (
        <>
            <UpdateCategoryModal
                id={categoriId}
                visible={isUpdateModalVisible}
                onClose={handleUpdateModalClose}
                onUpdate={handleUpdateCategory}
            />
        </>
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
                        <Row justify={'space-around'}>
                            <Col>
                                <h3>{item?.CategoryName}</h3>
                                <p>{item?.description}</p>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={() => handleUpdateModalOpen(item?.id)}>
                                    Cập nhật
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={handleDeleteCategory}>
                                    Xóa
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
