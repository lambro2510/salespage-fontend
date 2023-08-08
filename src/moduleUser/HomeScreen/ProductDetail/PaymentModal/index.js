import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, Card, Select, Space, Typography, message } from "antd";
import VoucherService from "../../../../service/VoucherStoreService";
import ProductTransactionService from '../../../../service/ProductTransactionService';
import { getToken } from '../../../../helper/localStore';
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const PaymentModal = ({ product, visible, setVisible }) => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [userVoucher, setUserVoucher] = useState([]);
    const [transactionInfo, setTransactionInfo] = useState({
        quantity: 1,
        note: "",
        address: "",
        productId: product?.productId,
        voucherCode: null,
    });

    useEffect(() => {
        if (product?.productId && getToken()) {
            getUserVoucher(product?.productId);
        }
        setTransactionInfo({ ...transactionInfo, productId: product?.productId });
    }, [product?.productId]);

    const getUserVoucher = async (productId) => {
        try {
            const userVoucherData = await VoucherService.getUserVoucherForProduct(productId);
            setUserVoucher(userVoucherData);
        } catch (error) {
            // Handle error (e.g., show error message)
        }
    };

    const handleCreateProductTransaction = async () => {
        // Check if all required fields are filled
        if (!transactionInfo.quantity || !transactionInfo.address) {
            message.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const successStatus = await ProductTransactionService.createProductTransaction(transactionInfo);
            if (successStatus) {
                setVisible(false);
                navigate('location-map');
            } else {
                // Handle error (e.g., show error message)
            }
        } catch (error) {
            // Handle error (e.g., show error message)
        } finally {
            setLoading(false);
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
                <Button key="buy" type="primary" onClick={handleCreateProductTransaction} loading={isLoading}>
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
                                        <Text >Giảm giá: {voucher.discountType === "PERCENT" ? '%' : 'VND'} cho các sản phẩm từ {voucher.minPrice} đến {voucher.maxPrice}</Text>
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
