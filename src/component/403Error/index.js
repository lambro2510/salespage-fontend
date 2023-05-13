import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/')
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
