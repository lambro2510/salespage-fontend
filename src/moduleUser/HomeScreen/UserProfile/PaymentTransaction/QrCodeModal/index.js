import { Image, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import BankService from "../../../../../service/BankService";

const QrCodeModal = ({ isVisible, setIsVisible, paymentId }) => {
    const [qrCode, setQrCode] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (paymentId) {
            genQrForPayment();
        }
    }, [paymentId]);

    const genQrForPayment = async () => {
        try {
            setLoading(true);
            const qrData = await BankService.genQrForPayment(paymentId);
            setQrCode(qrData);
        } catch (error) {
            console.error("Error generating QR code:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={null}
        >
            {loading ? (
                <Spin size="large" />
            ) : (
                <Image src={qrCode?.qrDataURL} alt="QR Code" />
            )}
        </Modal>
    );
};

export default QrCodeModal;
