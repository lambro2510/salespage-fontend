import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import SellerStoreService from '../../../../service/StoreService';
const UpdateVoucherModal = ({ storeId, visible, onClose, onUpdate }) => {
  const [updateStore, setUpdateStore] = useState({
    storeName: '',
    description: '',
    address: '',
  });

  const handleUpdateStore = () => {
    // Check if all required fields are filled
    if (!updateStore.storeName || !updateStore.description || !updateStore.address) {
      // You can add a notification or validation message here
      return;
    }
    onUpdate(updateStore);
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
      title="Update Product"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateStore}>
          Update
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Tên cửa hàng">
          <Input
            value={updateStore.storeName}
            onChange={(e) => setUpdateStore({ ...updateStore, storeName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input
            value={updateStore.description}
            onChange={(e) => setUpdateStore({ ...updateStore, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ bán hàng">
          <Input
            value={updateStore.address}
            onChange={(e) => setUpdateStore({ ...updateStore, address: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateVoucherModal;
