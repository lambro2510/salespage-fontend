import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, Card, Select, Space, Typography } from "antd";
import VoucherService from "../../../../service/VoucherStoreService";
import ProductTransactionService from '../../../../service/ProductTransactionService';
import { getToken } from '../../../../helper/localStore';

const { Text } = Typography;

const PaymentModal = ({ product, visible, setVisible }) => {
    const [isLoading, setLoading] = useState(false);
    const [userVoucher, setUserVoucher] = useState([]);
    const [transactionInfo, setTransactionInfo] = useState({
        quantity: 1,
        note: "",
        address: "",
        productId: product?.productId,
        voucherCode: null, // Initialize voucherCode as null
    });

    useEffect(() => {
        if (product?.productId && getToken()) {
            getUserVoucher(product?.productId);
        }
        setTransactionInfo({ ...transactionInfo, productId: product?.productId });
    }, [product?.productId]);

    const getUserVoucher = async (productId) => {
        console.log(productId);
        const userVoucherData = await VoucherService.getUserVoucherForProduct(productId);
        setUserVoucher(userVoucherData);
    };

    const handleCreateProduct = async () => {
        setLoading(true);
        // Assuming createProductTransaction function returns a success status
        const successStatus = await ProductTransactionService.createProductTransaction(transactionInfo);
        setLoading(false);
        if (successStatus) {
            setVisible(false);
            // Show a success message to the user, e.g., notification.success("Purchase successful!");
        } else {
            // Show an error message to the user, e.g., notification.error("Purchase failed. Please try again.");
        }
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
                <Form.Item label="Chọn voucher code">
                    <Select
                        value={transactionInfo.voucherCode}
                        onChange={(value) => setTransactionInfo({ ...transactionInfo, voucherCode: value })}
                    >
                        {userVoucher.map((voucher) => (
                            <Select.Option key={voucher.voucherCode} value={voucher.voucherCode}>
                                {voucher.voucherStoreName}
                                <Card style={{ marginBottom: 10, backgroundColor: 'inherit' }}>
                                    <Space direction="vertical">
                                        <Text >Mã giảm giá: {voucher.voucherStoreName}</Text>
                                        <Text >Giảm giá từ {voucher.minPrice} đến {voucher.maxPrice}</Text>
                                        <Text >Giảm giá: {voucher.discountType === "PERCENT" ? '%' : 'VND'}</Text>
                                        <Text >Mã hết hạn trong: {voucher.dayToExpireTime} ngày</Text>
                                    </Space>
                                </Card>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PaymentModal;
