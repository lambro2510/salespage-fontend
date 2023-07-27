import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const UpdateProductModal = ({ visible, onClose, onUpdate }) => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    type: '',
    productPrice: 0,
    sellingAddress: '',
    storeId: '',
  });

  const handleUpdateProduct = () => {
    // Call the parent component's onUpdate function with the newProduct object
    onUpdate(newProduct);
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
      title="Update Product"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="Update" type="primary" onClick={handleUpdateProduct}>
          Update
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
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;
