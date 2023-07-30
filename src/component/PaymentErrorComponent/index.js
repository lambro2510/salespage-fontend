import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { paymentError } from '../../redux/modalVisibleSlice';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const PaymentErrorComponent = () => {
  const dispatch = useDispatch();
  const isErrorVisible = useSelector((state) => state.modal.paymentError);
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/profile/payment');
  };

  const handleCancel = () => {
    dispatch(paymentError(false));
  };

  return (
    <Modal
      visible={isErrorVisible}
      title="Tạo đơn hàng thất bại"
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy bỏ
        </Button>,
        <Button key="confirm" type="primary"  onClick={handleConfirm}>
          Nạp thêm tiền vào tài khoản
        </Button>,
      ]}
      onCancel={handleCancel}
      className="custom-modal" 
    >
      <div className="error-message">
        <p>Vui lòng nạp thêm tiền để có thể tiếp tục giao dịch.</p>
      </div>
    </Modal>
  );
};

export default PaymentErrorComponent;
