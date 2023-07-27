import * as React from 'react';
import { List, Pagination, Image, Row, Col, Button } from 'antd';
import ProductCategoryService from '../../../service/ProductCategoryService';
import CreateCategoryModal from './CreateCategoryModal';
const ProductCategoryScreen = () => {

    const [productCategories, setProductCategories] = React.useState([]);
    const [isCreateModalVisible, setCreateModalVisible] = React.useState(false);
    React.useEffect(() => {
        setProductCategories(getProductCategories());
    }, [])
    const getProductCategories = async () => {
        const categoryData = await ProductCategoryService.getProductCategory();
        return categoryData;
    }

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
            <CreateCategoryModal
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
                dataSource={productCategories}
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
        </>
    );
};

export default ProductCategoryScreen;