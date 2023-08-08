import React, { useState, useEffect } from 'react';
import { List, Pagination, Image, Row, Col, Button, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ProductService from '../../../service/ProductService';
import ProductCategoryService from '../../../service/ProductCategoryService';
import StoreService from '../../../service/StoreService';
import CreateProductModal from './CreateProductModal';
import UpdateProductModal from './UpdateProductModal';
import { getRole } from '../../../helper/localStore';
import { useNavigate } from 'react-router-dom';

const ProductScreen = () => {
  const navigate = useNavigate();
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
    try {
      setLoading(true);
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
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductCategory = async () => {
    try {
      setLoading(true);
      const categoryInfo = await ProductCategoryService.getProductCategory();
      setProductCategory(categoryInfo);
    } catch (error) {
      console.error('Error fetching product categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSellerStore = async () => {
    try {
      setLoading(true);
      const storeData = await StoreService.getSellerStore();
      setStores(storeData?.data);
    } catch (error) {
      console.error('Error fetching seller stores:', error);
    } finally {
      setLoading(false);
    }
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

  const handleCreateProduct = async (newProduct) => {
    try {
      setLoading(true);
      await ProductService.createProduct(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setCreateModalVisible(false);
      setLoading(false);
    }
  };

  const createProduct = (
    <>
      <Button type="primary" onClick={handleCreateModalOpen}>
        Tạo sản phẩm mới
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

  const handleUpdateProduct = async (updateProduct) => {
    try {
      setLoading(true);
      await ProductService.updateProduct(updateProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setUpdateModalVisible(false);
      setLoading(false);
    }
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

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await ProductService.deleteProduct(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {createProduct}
      {updateProduct}
      <Spin spinning={isLoading}>
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
      </Spin>
    </>
  );
};

export default ProductScreen;
