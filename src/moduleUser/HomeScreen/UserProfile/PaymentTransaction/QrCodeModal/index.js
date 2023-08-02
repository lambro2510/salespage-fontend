import { Image, Modal } from "antd";
import React, { useEffect, useState } from "react";

const QrCodeModal = ({ isVisible, setIsVisible, qrData }) => {
    const [image, setImage] = useState(qrData?.qrDataURL);

    useEffect(() => {
        setImage(qrData);
    }, [qrData])
    return (
        <Modal
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={null}
        >
            <Image  src={image} alt="QR Code" />
        </Modal>
    );
};

export default QrCodeModal;
