import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginError } from '../../redux/modalVisibleSlice';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const LoginErrorComponent = () => {
  const dispatch = useDispatch();
  const isErrorVisible = useSelector((state) => state.modal.loginError);
  const navigate = useNavigate();

  const handleConfirm = () => {
    dispatch(loginError(false));
    navigate('/login');
  };

  const handleCancel = () => {
    dispatch(loginError(false));
  };

  return (
    <Modal
      visible={isErrorVisible}
      title="Phiên đăng nhập hết hạn"
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy bỏ
        </Button>,
        <Button key="confirm" type="primary"  onClick={handleConfirm}>
          Đồng ý
        </Button>,
      ]}
      onCancel={handleCancel}
      className="custom-modal" 
    >
      <div className="error-message">
        <p>Bạn chưa đăng nhập, vui lòng đăng nhập để sử dụng chức năng này.</p>
      </div>
    </Modal>
  );
};

export default LoginErrorComponent;
