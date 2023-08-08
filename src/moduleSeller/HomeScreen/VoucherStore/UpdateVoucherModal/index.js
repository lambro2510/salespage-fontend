import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import SellerStoreService from '../../../../service/StoreService';

const UpdateVoucherModal = ({ storeId, visible, onClose, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateStore, setUpdateStore] = useState({
    storeName: '',
    description: '',
    address: '',
  });

  const handleUpdateStore = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onUpdate(values);
      setLoading(false);
      onClose();
    } catch (error) {
      // Validation error occurred, show a message or handle the error as needed
      message.error('Please fill in all required fields.');
    }
  };

  useEffect(() => {
    if (storeId) {
      getProductDetail();
    }
  }, [storeId]);

  const getProductDetail = async () => {
    const storeData = await SellerStoreService.getStoreDetail(storeId);
    setUpdateStore(storeData);
  };

  return (
    <Modal
      title="Cập nhật kho mã giảm giá"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" loading={loading} onClick={handleUpdateStore}>
          Update
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} initialValues={updateStore}>
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

export default UpdateVoucherModal;
