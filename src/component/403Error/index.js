import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const UnauthorizedPage = () => {
  const history = useHistory();

  const handleNavigateToHome = () => {
    history.push('/');
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền truy cập trang này."
      extra={
        <Button type="primary" onClick={handleNavigateToHome}>
          Về trang chủ
        </Button>
      }
    />
  );
};

export default UnauthorizedPage;
