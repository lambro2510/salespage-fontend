import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import ProductService from '../../../../service/ProductService';

const { Option } = Select;

const CreateCategoryModal = ({ visible, onClose, onCreate }) => {
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryType: "",
    description: "",
    timeType: "",
    timeValue: 0,
    productType: ""
  });

  const handleCreateCategory = () => {
    onCreate(newCategory);
    setNewCategory({
      categoryName: "",
      categoryType: "",
      description: "",
      timeType: "",
      timeValue: 0,
      productType: ""
    });
  };

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchProductType = async () => {
      const productTypes = await ProductService.getProductType();
      setProductTypes(productTypes);
    };

    fetchProductType();
  }, [])

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
  ];

  return (
    <Modal
      title="Tạo danh mục sản phẩm"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreateCategory}>
          Create
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="Tên danh mục">
          <Input
            value={newCategory?.categoryName}
            onChange={(e) =>
              setNewCategory({ ...newCategory, categoryName: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input.TextArea
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Loại sản phẩm">
          <Select
            value={newCategory.type}
            onChange={(value) => setNewCategory({ ...newCategory, categoryType: value })}
          >
            {categoriTypes.map((categoriType) => (
              <Option key={categoriType.type} value={categoriType.type}>
                {categoriType.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Loại thời gian">
          <Select
            value={newCategory.type}
            onChange={(value) => setNewCategory({ ...newCategory, timeType: value })}
          >
            {timeTypes.map((timeType) => (
              <Option key={timeType.type} value={timeType.type}>
                {timeType.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Thời gian">
          <Input
            value={newCategory?.timeValue}
            onChange={(e) =>
              setNewCategory({ ...newCategory, timeValue: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Loại sản phẩm">
          <Select
            value={newCategory.type}
            onChange={(value) => setNewCategory({ ...newCategory, productType: value })}
          >
            {productTypes.map((productType) => (
              <Option key={productType?.type} value={productType?.productType}>
                {productType?.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateCategoryModal;
