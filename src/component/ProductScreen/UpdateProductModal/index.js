import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const UpdateProductModal = ({ visible, onClose, onUpdate, product }) => {
  const [form] = Form.useForm();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUpdate = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      onUpdate({ ...product, ...values });
      onClose();
    } catch (error) {
      console.error('Error while updating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Update Product"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={isSubmitting} onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={product}>
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the product description' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;
