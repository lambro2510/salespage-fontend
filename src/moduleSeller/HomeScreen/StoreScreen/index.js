import React, { useState, useEffect } from 'react';
import SellerStoreService from '../../../service/seller/StoreService';
import { List, Pagination, Image, Row, Col, Button, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateStoreModal from './CreateStoreModal';
import UpdateStoreModal from './UpdateStoreModal';

const StoreScreen = () => {
  const [store, setStores] = useState([]);
  const [selectStoreId, setSelectStoreId] = useState();
  const [metadata, setMetadata] = useState({
    page: 0,
    size: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getStore();
  }, [updated]);

  const getStore = async () => {
    setLoading(true);
    const storeData = await SellerStoreService.getSellerStore();
    setStores(storeData?.data);
    setLoading(false);
  };

  const handlePageChange = (page, pageSize) => {
    setMetadata({
      ...metadata,
      page: page - 1,
      size: pageSize,
    });
  };

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalVisible(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalVisible(false);
  };

  const handleCreateStore = async (newStore) => {
    await SellerStoreService.createStore(newStore);
    setCreateModalVisible(false);
    setUpdated(!updated)
  };

  const createStore = (
    <>
      <Button type="primary" onClick={handleCreateModalOpen}>
        <PlusOutlined /> Create Store
      </Button>
      <CreateStoreModal
        visible={isCreateModalVisible}
        onClose={handleCreateModalClose}
        onCreate={handleCreateStore}
      />
    </>
  );

  const handleDeleteStore = async (storeId) => {
    await SellerStoreService.deleteStore(storeId);
    setUpdated(!updated)
  };

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const handleUpdateModalOpen = (id) => {
    setSelectStoreId(id);
    setUpdateModalVisible(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false);
  };

  const handleUpdateStore = async (updatedStore) => {
    await SellerStoreService.updateStore(updatedStore);
    setUpdateModalVisible(false);
    setUpdated(!updated)
  };

  const updateStore = (
    <>
      <UpdateStoreModal
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
      <Spin spinning={loading}>
        <List
          itemLayout="vertical"
          dataSource={store}
          renderItem={(item) => (
            <List.Item key={item?.storeId}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Row gutter={16}>
                    <Col>
                      <Image src={item?.imageUrl} />
                    </Col>
                    <Col>
                      <h3>{item?.storeName}</h3>
                      <p>{item?.description}</p>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row justify="space-between" gutter={8}>
                    <Col>
                      <Button type="primary" onClick={() => handleUpdateModalOpen(item?.storeId)}>
                        <EditOutlined /> Edit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="primary" onClick={() => handleDeleteStore(item?.storeId)}>
                        <DeleteOutlined /> Delete
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Spin>
      <Pagination
        current={metadata.page + 1}
        pageSize={metadata.size}
        total={metadata.total}
        onChange={handlePageChange}
      />
    </>
  );
};

export default StoreScreen;
