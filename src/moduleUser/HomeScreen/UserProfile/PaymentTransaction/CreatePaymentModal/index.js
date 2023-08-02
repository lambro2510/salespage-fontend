import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import PaymentService from "../../../../../service/PaymentService";

const CreatePaymentModal = ({ visible, setVisible }) => {
    const [form] = Form.useForm();

    const createPayment = async () => {
        try {
            const values = await form.validateFields();
            await PaymentService.createPayment(values);
            setVisible(false);
            form.resetFields();
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    return (
        <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            title="Create Payment"
            footer={[
                <Button key="cancel" onClick={() => setVisible(false)}>
                    Cancel
                </Button>,
                <Button key="create" type="primary" onClick={createPayment}>
                    Create
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="bankAccountId"
                    label="Bank Account ID"
                    rules={[
                        {
                            required: true,
                            message: "Please input the bank account ID!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the payment amount!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreatePaymentModal;
