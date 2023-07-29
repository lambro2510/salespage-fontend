import React, { useState, useEffect } from 'react';
import { List, Pagination, Image, Row, Col, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ProductService from '../../../service/ProductService';
import ProductCategoryService from '../../../service/ProductCategoryService';
import StoreService from '../../../service/StoreService';
import CreateProductModal from './CreateProductModal';
import UpdateProductModal from './UpdateProductModal';

const ProductScreen = () => {
  const [productFilter, setProductFilter] = useState({});
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectProductId, setSelectProductId] = useState();
  const [metadata, setMetadata] = useState({
    page: 0,
    size: 10,
    total: 0,
  });

  useEffect(() => {
    getProductCategory();
    getSellerStore();
    getSellerProduct();
    setLoading(false);
  }, [isLoading]);


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

  const getProductCategory = async () => {
    const categoryInfo = await ProductCategoryService.getProductCategory();
    setProductCategory(categoryInfo);
  };

  const getSellerStore = async () => {
    const storeData = await StoreService.getSellerStore();
    setStores(storeData?.data);
  };

  const handlePageChange = (page, pageSize) => {
    setMetadata({
      ...metadata,
      page: page - 1,
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
    ProductService.createProduct(newProduct);
    setCreateModalVisible(false);
    setLoading(true);
  };

  const createProduct = (
    <>
      <Button type="primary" onClick={handleCreateModalOpen}>
        Create Product
      </Button>
      <CreateProductModal
        stores={stores}
        productCategory={productCategory}
        visible={isCreateModalVisible}
        onClose={handleCreateModalClose}
        onCreate={handleCreateProduct}
      />
    </>
  );

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const handleUpdateModalOpen = (id) => {
    setSelectProductId(id);
    setUpdateModalVisible(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false);
  };

  const handleUpdateProduct = (updateProduct) => {
    ProductService.updateProduct(updateProduct);
    setUpdateModalVisible(false);
    setLoading(true);
  };

  const updateProduct = (
    <>
      <UpdateProductModal
        productId={selectProductId}
        stores={stores}
        productCategory={productCategory}
        visible={isUpdateModalVisible}
        onClose={handleUpdateModalClose}
        onUpdate={handleUpdateProduct}
      />
    </>
  );

  const handleDeleteProduct = (id) => {
    ProductService.deleteProduct(id)
    setLoading(true);
  }
  
  return (
    <>
      {createProduct}
      {updateProduct}
      <List
        itemLayout="vertical"
        dataSource={products}
        renderItem={(item) => (
          <List.Item key={item?.productId}>
            <Row justify="space-between" align="middle">
              <Col>
                <Row gutter={16}>
                  <Col>
                    <Image src={item?.imageUrl} />
                  </Col>
                  <Col>
                    <h3>{item?.productName}</h3>
                    <p>{item?.description}</p>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row justify="space-between" gutter={8}>
                  <Col>
                    <Button type="primary" onClick={() => handleUpdateModalOpen(item?.productId)}>
                      <EditOutlined />
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={() => handleDeleteProduct(item?.productId)}>
                      <DeleteOutlined />
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

