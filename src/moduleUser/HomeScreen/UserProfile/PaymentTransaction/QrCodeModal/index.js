import { Image, Modal, Radio, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import BankService from "../../../../../service/BankService";

const { Text } = Typography;

const QrCodeModal = ({ isVisible, setIsVisible, paymentId }) => {
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentBanks, setPaymentBanks] = useState([]);

    useEffect(() => {
        
        if (selectedPayment ) {
            genQrForPayment();
        }
    }, [selectedPayment]);

    useEffect(() => {
        getPaymentBanks();
    }, []);

    useEffect(() => {
        setQrCode(null)
    }, [paymentId]);

    const genQrForPayment = async () => {
        try {
            setLoading(true);
            const qrData = await BankService.genQrForPayment(paymentId, selectedPayment);
            setQrCode(qrData);
        } catch (error) {
            console.error("Error generating QR code:", error);
        } finally {
            setLoading(false);
        }
    };

    const getPaymentBanks = async () => {
        try {
            setLoading(true);
            const banksData = await BankService.getPaymentBank();
            setPaymentBanks(banksData);
        } catch (error) {
            console.error("Error getting payment banks:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Thanh toán bằng mã qr"
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={null}
        >
            <Radio.Group
                onChange={(e) => setSelectedPayment(e.target.value)}
                value={selectedPayment}
            >
                {paymentBanks.map((bank) => (
                    <Radio key={bank.bin} value={bank}>
                        {bank.bankName} - {bank.bankShortName}
                    </Radio>
                ))}
            </Radio.Group>
            {selectedPayment && (
                <div>
                    <Text strong>Selected Bank:</Text>
                    <Text> {selectedPayment?.bankName}</Text>
                </div>
            )}
            {loading ? (
                <Spin size="large" />
            ) : (
                qrCode && <Image preview={false} src={qrCode.qrDataURL} alt="QR Code" />
            )}
        </Modal>
    );
};

export default QrCodeModal;
