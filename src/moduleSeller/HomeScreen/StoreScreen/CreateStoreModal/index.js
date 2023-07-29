import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CreateStoreModal = ({ visible, onClose, onCreate }) => {
  const [createStore, setCreateStore] = useState({
    storeName: '',
    description: '',
    address: '',
  });

  const handleCreateStore = () => {
    // Check if all required fields are filled
    if (!createStore.storeName || !createStore.description || !createStore.address) {
      // You can add a notification or validation message here
      return;
    }
    onCreate(createStore);
    setCreateStore({
      storeName: '',
      description: '',
      address: '',
    });
  };

  return (
    <Modal
      title="Tạo mới cửa hàng"
      open={visible}
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
      <Form layout="vertical">
        <Form.Item label="Tên cửa hàng">
          <Input
            value={createStore.storeName}
            onChange={(e) => setCreateStore({ ...createStore, storeName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input
            value={createStore.description}
            onChange={(e) => setCreateStore({ ...createStore, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ bán hàng">
          <Input
            value={createStore.address}
            onChange={(e) => setCreateStore({ ...createStore, address: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStoreModal;
