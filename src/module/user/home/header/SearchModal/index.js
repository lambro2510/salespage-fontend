import { Modal, Button, Select, Input, InputNumber } from 'antd';
const { Option } = Select;

const SearchModal = ({isModalVisible, handleModalVisible}) => {
    return (
        <Modal
        visible={isModalVisible}
        title="Tìm kiếm chi tiết"
        onCancel={handleModalVisible}
        footer={[
          <Button key="back" onClick={handleModalVisible}>
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalVisible}>
            Tìm kiếm
          </Button>,
        ]}
      >
        <Select defaultValue="all" style={{ width: '100%' }}>
          <Option value="all">Tất cả loại sản phẩm</Option>
          <Option value="phone">Điện thoại di động</Option>      <Option value="laptop">Laptop</Option>
          <Option value="tablet">Máy tính bảng</Option>
          <Option value="accessory">Phụ kiện</Option>
        </Select>
        <Input placeholder="Nhập tên người bán" style={{ marginTop: 16 }} />
        <Input placeholder="Nhập tên cửa hàng" style={{ marginTop: 16 }} />
        <InputNumber placeholder="Nhập giá tối thiểu" style={{ marginTop: 16, width: '50%' }} />
        <InputNumber placeholder="Nhập giá tối đa" style={{ marginTop: 16, width: '50%' }} />
      </Modal>
    );
};

export default SearchModal;