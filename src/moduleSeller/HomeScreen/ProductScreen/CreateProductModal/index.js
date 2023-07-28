import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const CreateProductModal = ({ visible, onClose, onCreate }) => {
  const [newProduct, setNewProduct] = useState({
    productName: '',
    description: '',
    type: '',
    productPrice: 0,
    sellingAddress: '',
    storeId: '',
  });

  const handleCreateProduct = () => {
    onCreate(newProduct);
    setNewProduct({
      productName: '',
      description: '',
      type: '',
      productPrice: 0,
      sellingAddress: '',
      storeId: '',
    });
  };

  const categoriTypes = [
    {
      "type": "SMALL",
      "typeName": "Nhỏ",
    },
    {
      "type": "BIG",
      "typeName": "Lớn",
    },
    {
      "type": "LARGE",
      "typeName": "Rất lớn",
    },
    {
      "type": "SUPPER_LARGE",
      "typeName": "Cực lớn",
    },
  ];

  const timeTypes = [
    {
      "type": "MINUTE",
      "typeName": "Phút",
    },
    {
      "type": "HOUR",
      "typeName": "Giờ",
    },
    {
      "type": "DAY",
      "typeName": "Ngày",
    },
    {
      "type": "WEEK",
      "typeName": "Tuần",
    },
    {
      "type": "MONTH",
      "typeName": "Tháng",
    }
  ]

  return (
    <Modal
      title="Create Product"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreateProduct}>
          Create
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="Tên sản phẩm">
          <Input
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input.TextArea
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Loại danh mục">
          <Select
            value={newProduct.type}
            onChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}
          >
            {categoriTypes.map((categoriType) => (
              <Option key={categoriType.id} value={categoriType.categoryName}>
                {categoriType.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateProductModal;
