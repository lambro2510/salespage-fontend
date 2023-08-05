import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, Row, Col, Typography, message } from "antd";
import BankService from "../../../../service/BankService";
import PaymentService from "../../../../service/PaymentService";

const { Title } = Typography;

const CreatePayment = () => {
    const [linkBank, setLinkBank] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        bankAccountId: '',
        amount: 0
    });

    useEffect(() => {
        getLinkBankAccount();
    }, []);

    const getLinkBankAccount = async () => {
        try {
            const bankAccountData = await BankService.getListBankAccount();
            setLinkBank(bankAccountData);
        } catch (error) {
            console.error("Error fetching bank accounts:", error);
        }
    };

    const handlePaymentInfoChange = (field, value) => {
        setPaymentInfo({ ...paymentInfo, [field]: value });
    };

    const createPayment = async () => {
        try {
            setLoading(true);
            await PaymentService.createPayment(paymentInfo);
            setLoading(false);
            message.success("Giao dịch được tạo thành công");
        } catch (error) {
            setLoading(false);
            console.error("Error creating payment:", error);
            message.error("Đã xảy ra lỗi khi tạo giao dịch");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Title level={4}>Tạo giao dịch thanh toán</Title>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="Tài khoản ngân hàng">
                    <Select
                        placeholder="Chọn tài khoản"
                        onChange={(value) => handlePaymentInfoChange('bankAccountId', value)}
                    >
                        {linkBank.map((bank, index) => (
                            <Select.Option key={index} value={bank.bankAccountId}>
                                {bank.bankName} - {bank.bankAccountName} - {bank.accountNo}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Số tiền nạp">
                    <Input
                        type="number"
                        suffix="VND"
                        onChange={(e) => handlePaymentInfoChange('amount', e.target.value)}
                    />
                </Form.Item>
                <Row justify="center">
                    <Col>
                        <Button type="primary" loading={loading} onClick={createPayment}>
                            Tạo giao dịch
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default CreatePayment;
