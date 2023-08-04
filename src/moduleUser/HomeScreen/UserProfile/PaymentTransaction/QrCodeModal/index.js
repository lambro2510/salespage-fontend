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

        if (selectedPayment) {
            genQrForPayment();
        }
    }, [selectedPayment]);

    useEffect(() => {
        getPaymentBanks();
    }, []);

    useEffect(() => {
        setQrCode(null)
        setSelectedPayment(paymentBanks[0])
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
                    <Text strong>Ngân hàng bạn chọn:</Text>
                    <Text> {selectedPayment?.bankName}</Text>
                </div>
            )}
            <div style={{display: 'flex', justifyContent : 'center', paddingTop: '1vh'}}>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    qrCode && <Image preview={false} src={qrCode.qrDataURL} alt="QR Code" />
                )}
            </div>
        </Modal>
    );
};

export default QrCodeModal;
