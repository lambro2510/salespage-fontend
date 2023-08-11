import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import SellerStoreService from '../../../../service/StoreService';

const UpdateStoreModal = ({ storeId, visible, onClose, onUpdate }) => {
  const [updatedStore, setUpdatedStore] = useState({
    storeName: '',
    description: '',
    address: '',
    state : '', //ACTIVE, INACTIVE
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateStore = async () => {
    try {
      setLoading(true);
      onUpdate(updatedStore);
    } catch (error) {
      console.error('Error updating store:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    if (storeId) {
      setLoading(true);
      getStoreDetail();
    }
  }, [storeId]);

  const getStoreDetail = async () => {
    try {
      const storeData = await SellerStoreService.getStoreDetail(storeId);
      setUpdatedStore(storeData);
    } catch (error) {
      console.error('Error fetching store data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update Store"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateStore} loading={loading}>
          Update
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Store Name">
          <Input
            value={updatedStore.storeName}
            onChange={(e) => setUpdatedStore({ ...updatedStore, storeName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Input
            value={updatedStore.description}
            onChange={(e) => setUpdatedStore({ ...updatedStore, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Address">
          <Input
            value={updatedStore.address}
            onChange={(e) => setUpdatedStore({ ...updatedStore, address: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateStoreModal;
