import React, { useState, useEffect } from 'react';
import SellerStoreService from '../../../service/StoreService';
import { List, Pagination, Image, Row, Col, Button, Typography, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateVoucherModal from './CreateVoucherModal';
import UpdateVoucherModal from './UpdateVoucherModal';
import VoucherStoreService from '../../../service/seller/VoucherStoreService';

const voucherStoreType = [
  {
    'voucherStoreType': 'PRODUCT',
    'type': 'sản phẩm'
  },
  {
    'voucherStoreType': 'STORE',
    'type': 'cửa hàng'
  },
]

const voucherStatus = [
  {
    'status': 'ACTIVE',
    'name': 'Đang sử dụng'
  },
  {
    'status': 'INACTIVE',
    'name': 'Chưa sử dụng'
  }
]

const voucherType = [
  {
    'discountType': 'PERCENT',
    'name' : 'Phần trăm sản phẩm'
  },
  {
    'discountType': 'TOTAL',
    'name' : 'Tổng giá trị sản phẩm'
  }
]

const { Text } = Typography;

const VoucherStore = () => {
  const [voucherStores, setVoucherStores] = useState([]);
  const [selectStoreId, setSelectStoreId] = useState();
  const [metadata, setMetadata] = useState({
    page: 0,
    size: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVoucherStore();
  }, []);

  const getVoucherStore = async () => {
    setLoading(true);
    const storeData = await VoucherStoreService.getVoucherStoreOnSeller();
    setVoucherStores(storeData?.data);
    setLoading(false);
  };

  const handlePageChange = (page, pageSize) => {
    setMetadata({
      ...metadata,
      page: page - 1,
      size: pageSize,
    });
  };

  const getVoucherTypeName = (type) => {
    const matchedType = voucherStoreType.find((item) => item?.voucherStoreType === type);
    return matchedType ? matchedType.type : type;
  };

  const getVoucherStatusName = (status) => {
    const matchedStatus = voucherStatus.find((item) => item?.status === status);
    return matchedStatus ? matchedStatus.name : status;
  };

  const getDiscountTypeName = (type) => {
    const matchedDiscountType = voucherType.find((item) => item?.discountType === type);
    return matchedDiscountType ? matchedDiscountType.name : type;
  };


  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalVisible(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalVisible(false);
  };

  const handleCreateStore = (newStore) => {
    SellerStoreService.createStore(newStore);
    setCreateModalVisible(false);
  };

  const createStore = (
    <>
      <Button type="primary" onClick={handleCreateModalOpen}>
        Create Product
      </Button>
      <CreateVoucherModal
        visible={isCreateModalVisible}
        onClose={handleCreateModalClose}
        onCreate={handleCreateStore}
      />
    </>
  );

  const handleDeleteStore = (storeId) => {
    SellerStoreService.deleteStore(storeId);
  };

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const handleUpdateModalOpen = (id) => {
    setSelectStoreId(id);
    setUpdateModalVisible(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false);
  };

  const handleUpdateStore = (updatedStore) => {
    SellerStoreService.updateStore(updatedStore);
    setUpdateModalVisible(false);
  };

  const updateStore = (
    <>
      <UpdateVoucherModal
        storeId={selectStoreId}
        visible={isUpdateModalVisible}
        onClose={handleUpdateModalClose}
        onUpdate={handleUpdateStore}
      />
    </>
  );

  return (
    <>
      {createStore}
      {updateStore}
      <List
        itemLayout="vertical"
        dataSource={voucherStores}
        renderItem={(item) => (
          <List.Item key={item?.voucherStoreId}>
            <Row gutter={16} align="middle">
              <Col span={16}>
                <Row gutter={8} align="middle">
                  <Col span={12}>
                    <div>
                      <h3>{item?.voucherStoreName}</h3>
                      <Text type="secondary">Áp dụng cho: {getVoucherTypeName(item?.voucherStoreType)}</Text>
                      <Tag color={item?.voucherStoreStatus === 'ACTIVE' ? 'success' : 'default'}>
                        {getVoucherStatusName(item?.voucherStoreStatus)}
                      </Tag>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify="end" gutter={8}>
                  <Col>
                    <Button type="primary" onClick={() => handleUpdateModalOpen(item?.storeId)}>
                      <EditOutlined />
                    </Button>
                  </Col>
                  <Col>
                    <Button type="danger" onClick={() => handleDeleteStore(item?.storeId)}>
                      <DeleteOutlined />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16} align="middle">
              <Col span={6}>
                <div>
                  <p>Tổng số voucher: {item?.totalQuantity}</p>
                  <p>Số voucher đã được sử dụng: {item?.totalUsed}</p>
                </div>
              </Col>
              <Col span={6}>
                <div>
                  <p>Loại giảm giá: {getDiscountTypeName(item?.discountType)}</p>
                  <p>Giá trị giảm giá: {item?.value} {item?.discountType === 'PERCENT' ? '%' : 'đ'}</p>
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Pagination
        current={metadata.page + 1}
        pageSize={metadata.size}
        total={metadata.total}
        onChange={handlePageChange}
      />
    </>
  );
};

export default VoucherStore;
