import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const UpdateProductModal = ({ visible, onClose, onUpdate }) => {
  const [updateProduct, setUpdateProduct] = useState({
    productName: '',
    description: '',
    type: '',
    productPrice: 0,
    sellingAddress: '',
    storeId: '',
  });

  const handleUpdateProduct = () => {
    // Call the parent component's onUpdate function with the updateProduct object
    onUpdate(updateProduct);
    setUpdateProduct({
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
            value={updateProduct.productName}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, productName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={updateProduct.description}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, description: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;
