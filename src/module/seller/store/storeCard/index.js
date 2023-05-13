import React from 'react';
import { Card } from 'antd';

function StoreCard() {
  return (
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={<img alt="example" src="https://via.placeholder.com/150" />}
    >
      <Card.Meta title="Cửa hàng 1" description="Địa chỉ cửa hàng" />
    </Card>
  );
}

export default StoreCard;
