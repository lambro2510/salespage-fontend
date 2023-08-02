import React , {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { payment } from '../../redux/modalVisibleSlice';
import { Modal, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const PaymentComponent = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.modal.payment);
  const navigate = useNavigate();

  
  useEffect(() => {
    
  }, [isVisible])


  const handleCancel = () => {
    dispatch(payment(false));
  };

  const handleConfirm = () => {
    
  };

  return (
    <Modal
      visible={isVisible}
      title="Nạp thêm tiền vào tài khoản"
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
      <Card>

      </Card>
    </Modal>
  );
};

export default PaymentComponent;
