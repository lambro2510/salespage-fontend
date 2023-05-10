import { Modal, Button,Result } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const AlertMessage = ({ message, visible, onClose, status }) => {
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
            <Result status={status} title={message} />
          </div>
        </div>
      }
      centered={true}
    />
  );
};

export default AlertMessage;