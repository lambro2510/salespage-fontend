import React, { useState, useEffect } from "react";
import { List, Button, Space, Layout, Typography, Modal, Card, Row } from "antd";
import PaymentService from "../../../../service/PaymentService";
import CreatePaymentModal from "./CreatePaymentModal";
import QrCodeModal from "./QrCodeModal";
import { formatCurrency } from "../../../../utils";

const { Title, Text } = Typography;

const PaymentTransaction = () => {
    const [paymentTransaction, setPaymentTransaction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreatePaymentModalVisible, setIsCreatePaymentModalVisible] = useState(false);
    const [isQrCodeModalVisible, setIsQrCodeModalVisible] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [metaData, setMetaData] = React.useState({
        page: 0,
        size: 10
      })
    useEffect(() => {
        getPaymentTransaction();
    }, []);

    const getPaymentTransaction = async () => {
        try {
            setLoading(true);
            const paymentData = await PaymentService.getPaymentTransaction();
            setPaymentTransaction(paymentData?.data);
            setMetaData(paymentData?.metadata);
        } catch (error) {
            console.error("Error fetching payment transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    const cancelPayment = async (paymentId) => {
        try {
            await PaymentService.cancelPayment(paymentId);
            getPaymentTransaction();
        } catch (error) {
            console.error("Error canceling payment:", error);
        }
    };

    const openQrModal = (paymentId) => {
        setSelectedPaymentId(paymentId);
        setIsQrCodeModalVisible(true);
    };

    const getStatusName = (status) => {
        const foundStatus = paymentStatus.find(item => item.status === status);
        return foundStatus ? foundStatus.name : "";
    };

    const paymentStatus = [
        {
            status: "WAITING",
            name: "Đang chờ xác nhận giao dịch"
        },
        {
            status: "PENDING",
            name: "Giao dịch quá hạn thanh toán"
        },
        {
            status: "CANCEL",
            name: "Giao dịch đã bị hủy bỏ"
        },
        {
            status: "RESOLVE",
            name: "Giao dịch thành công"
        }
    ];

    const statusColors = {
        WAITING: "orange",
        PENDING: "gray",
        CANCEL: "red",
        RESOLVE: "green"
    };

    return (
        <Layout style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
            <CreatePaymentModal
                visible={isCreatePaymentModalVisible}
                setVisible={setIsCreatePaymentModalVisible}
            />
            <QrCodeModal
                isVisible={isQrCodeModalVisible}
                setIsVisible={setIsQrCodeModalVisible}
                paymentId={selectedPaymentId}
            />
            <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>Lịch sử giao dịch</Title>
            <List
                itemLayout="vertical"
                dataSource={paymentTransaction}
                loading={loading}
                renderItem={(payment) => (
                    <List.Item key={payment.paymentId}>
                        <Card
                            title={`Mã giao dịch: ${payment.paymentId}`}
                            style={{ borderColor: statusColors[payment.status] }}
                        >
                            <Row justify="space-between">
                                <Space direction="vertical">
                                    <Text>Trạng thái: <span style={{ color: statusColors[payment.status] }}>{getStatusName(payment.status)}</span></Text>
                                    <Text>Tài khoản thanh toán: {payment.bankName} - {payment.bankAccountNo} - {payment.bankAccountName}</Text>
                                    <Text>Số tiền thanh toán: {formatCurrency(payment.amount)}</Text>
                                    <Text>Thời gian tạo giao dịch: {payment.created}</Text>
                                </Space>
                                <Space>
                                    <Row >
                                        <Button
                                            type="primary"
                                            onClick={() => openQrModal(payment.paymentId)}
                                        >
                                            Tạo mã thanh toán
                                        </Button>
                                        <Button
                                            type="default"
                                            onClick={() => cancelPayment(payment.paymentId)}
                                        >
                                            Hủy giao dịch
                                        </Button>
                                    </Row>
                                </Space>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </Layout>
    );
};

export default PaymentTransaction;
