import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import SellerStoreService from '../../../../service/StoreService';

const UpdateStoreModal = ({ storeId, visible, onClose, onUpdate }) => {
  const [form] = Form.useForm();
  const [updateStore, setUpdateStore] = useState({
    storeName: '',
    description: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateStore = async () => {
    try {
      const values = await form.validateFields();
      onUpdate(values);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  useEffect(() => {
    if (storeId) {
      setLoading(true);
      getProductDetail();
    }
  }, [storeId]);

  const getProductDetail = async () => {
    try {
      const storeData = await SellerStoreService.getStoreDetail(storeId);
      setUpdateStore(storeData);
    } catch (error) {
      console.error('Error fetching store data:', error);
    } finally {
      setLoading(false);
    }
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
        <Button key="update" type="primary" onClick={handleUpdateStore}>
          Update
        </Button>,
      ]}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" initialValues={updateStore}>
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
          <Input />
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

export default UpdateStoreModal;
