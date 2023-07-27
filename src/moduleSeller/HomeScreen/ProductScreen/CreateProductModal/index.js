import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CreateProductModal = ({ visible, onClose, onCreate }) => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    type: '',
    productPrice: 0,
    sellingAddress: '',
    storeId: '',
  });

  const handleCreateProduct = () => {
    // Call the parent component's onCreate function with the newProduct object
    onCreate(newProduct);
    setNewProduct({
      productName: '',
      description: '',
      type: '',
      productPrice: 0,
      sellingAddress: '',
      storeId: '',
    });
  };

  return (
    <Modal
      title="Create Product"
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
      <Form>
        <Form.Item label="Product Name">
          <Input
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </Form.Item>
        {/* Add other form items for the remaining properties */}
      </Form>
    </Modal>
  );
};

export default CreateProductModal;