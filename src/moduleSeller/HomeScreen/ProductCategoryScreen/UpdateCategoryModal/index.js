import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import ProductService from '../../../../service/ProductService';

const { Option } = Select;

const UpdateCategoryModal = ({id, visible, onClose, onUpdate }) => {
  const [updateCategory, setUpdateCategory] = useState({
    id: id,
    categoryName: "",
    categoryType: "",
    description: "",
    timeType: "",
    timeValue: 0,
    productType: ""
  });

  const handleUpdateCategory = () => {
    onUpdate(updateCategory);
    setUpdateCategory({
      id: id,
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

    const fetchProductCategory = async () => {
      const categoryData = await ProductService.getProductDetail(id);
      setUpdateCategory(categoryData);
    };

    if(id){
      fetchProductCategory();
    }
    
    fetchProductType();
  }, [id])

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
        <Form.Item label="Tên danh mục">
          <Input
            value={updateCategory?.categoryName}
            onChange={(e) =>
              setUpdateCategory({ ...updateCategory, categoryName: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input.TextArea
            value={updateCategory?.description}
            onChange={(e) =>
              setUpdateCategory({ ...updateCategory, description: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Loại sản phẩm">
          <Select
            value={updateCategory?.categoryType}
            onChange={(value) => setUpdateCategory({ ...updateCategory, categoryType: value })}
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
            value={updateCategory?.timeType}
            onChange={(value) => setUpdateCategory({ ...updateCategory, timeType: value })}
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
            value={updateCategory?.timeValue}
            onChange={(e) =>
              setUpdateCategory({ ...updateCategory, timeValue: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Loại sản phẩm">
          <Select
            value={updateCategory?.productType}
            onChange={(value) => setUpdateCategory({ ...updateCategory, productType: value })}
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

export default UpdateCategoryModal;
