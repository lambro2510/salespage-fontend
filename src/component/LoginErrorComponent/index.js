import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginError } from '../../redux/modalVisibleSlice';
import { Modal, Button } from 'antd';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom';

const LoginErrorComponent = () => {
  const dispatch = useDispatch();
  const isErrorVisible = useSelector((state) => state.modal.loginError);
  const navigate = useNavigate();

  const handleConfirm = () => {
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
        <Button key="cancel" icon={<FiXCircle />} onClick={handleCancel}>
          Hủy bỏ
        </Button>,
        <Button key="confirm" type="primary" icon={<FiAlertCircle />} onClick={handleConfirm}>
          Đồng ý
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <p>
        <FiAlertCircle className="error-icon" />
        Vui lòng đăng nhập lại.
      </p>
    </Modal>
  );
};

export default LoginErrorComponent;
