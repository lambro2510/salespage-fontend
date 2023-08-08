import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const CreateProductModal = ({ stores, productCategory, visible, onClose, onCreate }) => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    categoryId: '',
    productPrice: 0, // Updated to be a number instead of a string
    sellingAddress: '',
    storeId: '',
  });

  const handleCreateProduct = () => {
    // Convert productPrice to a number before saving it
    const productPriceAsNumber = parseFloat(newProduct.productPrice);
    onCreate({ ...newProduct, productPrice: productPriceAsNumber });
    setNewProduct({
      productName: '',
      description: '',
      categoryId: '',
      productPrice: 0,
      sellingAddress: '',
      storeId: '',
    });
  };

  return (
    <Modal
      title="Tạo mới sản phẩm"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreateProduct}>
          Create
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Tên sản phẩm">
          <Input
            value={newProduct.productName}
            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Giá tiền">
          <Input
            value={newProduct.productPrice}
            onChange={(e) => setNewProduct({ ...newProduct, productPrice: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ bán hàng">
          <Input
            value={newProduct.sellingAddress}
            onChange={(e) => setNewProduct({ ...newProduct, sellingAddress: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Loại danh mục">
          <Select
            value={newProduct.categoryId}
            onChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
          >
            {productCategory.map((category) => (
              <Option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Cửa hàng bán">
          <Select
            value={newProduct.storeId}
            onChange={(value) => setNewProduct({ ...newProduct, storeId: value })}
          >
            {stores.map((store) => (
              <Option key={store.storeId} value={store.storeId}>
                {store?.storeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
