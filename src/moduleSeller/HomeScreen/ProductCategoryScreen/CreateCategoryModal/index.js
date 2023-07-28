import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const CreateCategoryModal = ({ productTypes, visible, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryType: 'SMALL',
    description: '',
    timeType: 'MINUTE',
    timeValue: 0,
    productType: '',
  });

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

  const handleCreateCategory = () => {
    onCreate(formData);
    setFormData({
      categoryName: '',
      categoryType: 'SMALL',
      description: '',
      timeType: 'MINUTE',
      timeValue: 0,
      productType: '',
    });
  };

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
      <Form layout="vertical">
        <Form.Item label="Tên danh mục">
          <Input
            value={formData.categoryName}
            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input.TextArea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Loại sản phẩm">
          <Select
            value={formData.categoryType}
            onChange={(value) => setFormData({ ...formData, categoryType: value })}
          >
            {categoryTypes.map((categoryType) => (
              <Option key={categoryType.categoryType} value={categoryType.type}>
                {categoryType.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Loại thời gian">
          <Select
            value={formData.timeType}
            onChange={(value) => setFormData({ ...formData, timeType: value })}
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
            type="number"
            value={formData.timeValue}
            onChange={(e) => setFormData({ ...formData, timeValue: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Loại sản phẩm">
          <Select
            value={formData.productType}
            onChange={(value) => setFormData({ ...formData, productType: value })}
          >
            {productTypes.map((productType) => (
              <Option key={productType.productType} value={productType.productType}>
                {productType.typeName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategoryModal;
