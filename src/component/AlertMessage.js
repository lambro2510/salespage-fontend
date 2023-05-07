import { Modal, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const AlertMessage = ({ message, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      closable={false}
      onCancel={onClose}
      
      footer={[
        <div key="ok" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onClose} style={{ width: '20%' }}>
            OK
          </Button>
        </div>,
      ]}
      title={
        <div>
          <div style={{ textAlign: 'center' }}>
            <CheckCircleFilled style={{ color: '#52c41a', fontSize: '36px', marginBottom: '10px' }} />
            <div style={{ fontSize: '20px' }}>{message}</div>
          </div>
        </div>
      }
      centered={true}
    />
  );
};

export default AlertMessage;