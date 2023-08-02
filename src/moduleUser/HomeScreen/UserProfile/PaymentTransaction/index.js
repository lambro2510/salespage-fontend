import React, { useState, useEffect } from "react";
import { List, Button } from "antd";
import PaymentService from "../../../../service/PaymentService";
import BankService from "../../../../service/BankService";
import CreatePaymentModal from "./CreatePaymentModal";
import QrCodeModal from "./QrCodeModal";

const PaymentTransaction = () => {
    const [paymentTransaction, setPaymentTransaction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [qrCode, setQrCode] = useState();
    const [isCreatePaymentModalVisible, setIsCreatePaymentModalVisible] = useState(false);
    const [isQrCodeModalVisible, setIsQrCodeModalVisible] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);

    useEffect(() => {
        getPaymentTransaction();
    }, [loading]);

    const getPaymentTransaction = async () => {
        const paymentData = await PaymentService.getPaymentTransaction();
        setPaymentTransaction(paymentData);
    };

    const cancelPayment = async (paymentId) => {
        await PaymentService.cancelPayment(paymentId);
    };

    const genQrForPayment = async (paymentId) => {
        const qrData = await BankService.genQrForPayment(paymentId);
        setQrCode(qrData);
        setIsQrCodeModalVisible(true);
    };

    return (
        <div>
            <CreatePaymentModal
                visible={isCreatePaymentModalVisible}
                setVisible={setIsCreatePaymentModalVisible}
            />
            <QrCodeModal
                isVisible={isQrCodeModalVisible}
                setIsVisible={setIsQrCodeModalVisible}
                qrData={qrCode}
            />
            <h2>Payment Transactions</h2>
            <List
                itemLayout="vertical"
                dataSource={paymentTransaction}
                renderItem={(payment) => (
                    <List.Item key={payment.paymentId}>
                        <h3>Payment ID: {payment.paymentId}</h3>
                        <p>Status: {payment.status}</p>
                        <p>Bank Name: {payment.bankName}</p>
                        <p>Bank Account No: {payment.bankAccountNo}</p>
                        <p>Bank Account Name: {payment.bankAccountName}</p>
                        <p>Amount: {payment.amount}</p>
                        <p>Created: {payment.created}</p>
                        <Button onClick={() => genQrForPayment(payment.paymentId)}>Generate QR</Button>
                        <Button onClick={() => cancelPayment(payment.paymentId)}>Cancel Payment</Button>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PaymentTransaction;
