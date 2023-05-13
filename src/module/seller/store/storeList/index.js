import React from 'react';
import { Row, Col } from 'antd';
import StoreCard from '../storeCard';

function StoreList() {
  return (
    <div>
      <h1>Danh sách cửa hàng</h1>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <StoreCard />
        </Col>
        <Col span={8}>
          <StoreCard />
        </Col>
        <Col span={8}>
          <StoreCard />
        </Col>
      </Row>
    </div>
  );
}

export default StoreList;
