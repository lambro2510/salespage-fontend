import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

const CreateStoreModal = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();

  const handleCreateStore = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields();
      onClose();
    } catch (error) {
      // Validation error occurred, show a message or handle the error as needed
      message.error('Please fill in all required fields.');
    }
  };

  return (
    <Modal
      title="Tạo mới kho mã giảm giá"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy bỏ
        </Button>,
        <Button key="create" type="primary" onClick={handleCreateStore}>
          Tạo mới
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Tên cửa hàng"
          name="storeName"
          rules={[{ required: true, message: 'Please enter the store name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ bán hàng"
          name="address"
          rules={[{ required: true, message: 'Please enter the selling address' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStoreModal;
