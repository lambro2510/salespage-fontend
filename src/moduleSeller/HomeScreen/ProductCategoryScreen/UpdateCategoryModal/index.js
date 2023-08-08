import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import ProductService from '../../../../service/ProductService';
import ProductCategoryService from '../../../../service/ProductCategoryService';

const { Option } = Select;

const UpdateCategoryModal = ({ id, productTypes, visible, onClose, onUpdate }) => {
  const [updateCategory, setUpdateCategory] = useState({
    id: id,
    categoryName: '',
    categoryType: 'SMALL',
    description: '',
    timeType: 'MINUTE',
    timeValue: 0,
    productType: '',
  });

  const handleUpdateCategory = () => {
    onUpdate(updateCategory);
    // setUpdateCategory({
    //   id: id,
    //   categoryName: '',
    //   categoryType: 'SMALL',
    //   description: '',
    //   timeType: 'MINUTE',
    //   timeValue: 0,
    //   productType: '',
    // });
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await ProductCategoryService.getDetailProductCategory(id);
      setUpdateCategory(categoryData);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const categoryTypes = [
    { type: 'SMALL', typeName: 'Nhỏ' },
    { type: 'BIG', typeName: 'Lớn' },
    { type: 'LARGE', typeName: 'Rất lớn' },
    { type: 'SUPPER_LARGE', typeName: 'Cực lớn' },
  ];

  const timeTypes = [
    { type: 'MINUTE', typeName: 'Phút' },
    { type: 'HOUR', typeName: 'Giờ' },
    { type: 'DAY', typeName: 'Ngày' },
    { type: 'WEEK', typeName: 'Tuần' },
    { type: 'MONTH', typeName: 'Tháng' },
  ];

  return (
    <Modal
      title="Update Category"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdateCategory}>
          Update
        </Button>,
      ]}
      centered
      destroyOnClose
    >
      <Form layout="vertical">
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
            {categoryTypes?.map((categoryType) => (
              <Option key={categoryType?.type} value={categoryType?.type}>
                {categoryType?.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Loại thời gian">
          <Select
            value={updateCategory?.timeType}
            onChange={(value) => setUpdateCategory({ ...updateCategory, timeType: value })}
          >
            {timeTypes?.map((timeType) => (
              <Option key={timeType?.type} value={timeType?.type}>
                {timeType?.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Thời gian">
          <Input
            type="number"
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
            {productTypes?.map((productType) => (
              <Option key={productType?.productType} value={productType?.productType}>
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
