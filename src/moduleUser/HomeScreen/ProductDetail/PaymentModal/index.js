import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, Space } from "antd";
import VoucherService from "../../../../service/VoucherStoreService";
import ProductTransactionService from '../../../../service/ProductTransactionService';

const PaymentModal = ({ product, visible, setVisible }) => {
    const [isLoading, setLoading] = useState(false);
    const [userVoucher, setUserVoucher] = useState([]);
    const [transactionInfo, setTransactionInfo] = useState({
        quantity: 1,
        note: "",
        address: "",
        productId: product?.productId,
        voucherCode: ""
    });

    useEffect(() => {
        if(product?.productId){
            console.log(product?.productId);
            getUserVoucher(product?.productId);
        }
    }, [product?.productId]);

    const getUserVoucher = async (productId) => {
        console.log(productId);
        const userVoucherData = await VoucherService.getUserVoucherForProduct(productId);
        setUserVoucher(userVoucherData);
    };

    const handleCreateProduct = async () => {
        setLoading(true);
        const productTransactionResponse = await ProductTransactionService.createProductTransaction(transactionInfo);
        setLoading(false);
        setVisible(false);
        // Add any additional handling after the purchase, e.g., displaying a success message or updating the UI.
    };

    return (
        <Modal
            title="Xác nhận mua hàng"
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="cancel" onClick={() => setVisible(false)}>
                    Hủy
                </Button>,
                <Button key="buy" type="primary" onClick={handleCreateProduct} loading={isLoading}>
                    Đồng ý
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Form.Item label="Số lượng">
                    <Input
                        type="number"
                        value={transactionInfo.quantity}
                        onChange={(e) => setTransactionInfo({ ...transactionInfo, quantity: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Ghi chú">
                    <Input
                        value={transactionInfo.note}
                        onChange={(e) => setTransactionInfo({ ...transactionInfo, note: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Địa chỉ">
                    <Input
                        value={transactionInfo.address}
                        onChange={(e) => setTransactionInfo({ ...transactionInfo, address: e.target.value })}
                    />
                </Form.Item>
                {/* You can add more form items for voucher selection, additional information, etc. */}
                <Form.Item>
                    <Space>
                        <Button onClick={() => setVisible(false)}>Hủy</Button>
                        <Button type="primary" onClick={handleCreateProduct} loading={isLoading}>
                            Đồng ý
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PaymentModal;
