import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const UpdateCategoryModal = ({ visible, onClose, onUpdate }) => {
  const [newCategory, setNewCategory] = useState({
    CategoryName: '',
    description: '',
    type: '',
    CategoryPrice: 0,
    sellingAddress: '',
    storeId: '',
  });

  const handleUpdateCategory = () => {
    // Call the parent component's onUpdate function with the newCategory object
    onUpdate(newCategory);
    setNewCategory({
      CategoryName: '',
      description: '',
      type: '',
      CategoryPrice: 0,
      sellingAddress: '',
      storeId: '',
    });
  };

  return (
    <Modal
      title="Update Category"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="Update" type="primary" onClick={handleUpdateCategory}>
          Update
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="Category Name">
          <Input
            value={newCategory.CategoryName}
            onChange={(e) =>
              setNewCategory({ ...newCategory, CategoryName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
          />
        </Form.Item>
        {/* Add other form items for the remaining properties */}
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
