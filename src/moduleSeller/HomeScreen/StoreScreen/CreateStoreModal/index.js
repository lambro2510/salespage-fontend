import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CreateStoreModal = ({ visible, onClose, onCreate }) => {
  const [form] = Form.useForm();

  const handleCreateStore = async () => {
    try {
      const values = await form.validateFields();
      onCreate(values);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title="Tạo mới cửa hàng"
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
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên cửa hàng"
          name="storeName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên cửa hàng',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mô tả',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Địa chỉ bán hàng"
          name="address"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ bán hàng',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStoreModal;
