import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { formatCurrency, handleErrorResponse } from "../../utils";
import { Avatar, Button, Checkbox, Col, Row, Typography } from "antd";
import { ProCard } from "@ant-design/pro-components";
import QuantityInput from "../quantityInput";

const Text = Typography;

const CardView = () => {
    const [cartItems, setCartItems] = useState<ProductTransactionResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [dto, setDto] = useState<ListTransactionDto[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<ListTransactionDto[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const getCartItems = async () => {
        try {
            setLoading(true);
            const response = await http.get(`${apiRoutes.productTransaction}/cart`);
            const data = response.data?.data as ProductTransactionResponse[];
            setCartItems(data || []);
            setDto(
                data.map((item) => ({
                    selected: false,
                    price: item.price,
                    transactionId: item.transactionId,
                    address: item.address,
                    note: item.note,
                    voucherCode: item?.voucherInfo?.voucherCode,
                    quantity: item.quantity,
                }))
            );
        } catch (error) {
            handleErrorResponse(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        const totalAmount = selectedItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
        );
        setTotalAmount(totalAmount);
        setSelectAll(selectedItems.length === dto.length);
    }, [selectedItems]);

    const updateQuantity = (transactionId: string, newQuantity: number) => {
        const updatedDto = dto.map((item) =>
            item.transactionId === transactionId
                ? { ...item, quantity: newQuantity }
                : item
        );
        const updatedCartItem = cartItems.map((item: ProductTransactionResponse) =>
            item.transactionId === transactionId
                ? { ...item, total_price: item.price * newQuantity }
                : item
        );
        const updateSelectedItems = selectedItems.map((item: ListTransactionDto) =>
            item.transactionId === transactionId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setDto(updatedDto);
        setCartItems(updatedCartItem);
        setSelectedItems(updateSelectedItems);
    };

    const handleCheckboxChange = (isChecked: boolean, item: ProductTransactionResponse) => {
        const selectedDtoItem = {
            selected: isChecked,
            price: item.price,
            transactionId: item.transactionId,
            address: item.address,
            note: item.note,
            voucherCode: item?.voucherInfo?.voucherCode,
            quantity: dto.find((dtoItem) => dtoItem.transactionId === item.transactionId)?.quantity || 0,
        };

        setSelectedItems((prevSelectedItems) =>
            isChecked
                ? [...prevSelectedItems, selectedDtoItem]
                : prevSelectedItems.filter(
                    (selectedItem) => selectedItem.transactionId !== item.transactionId
                )
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems([...dto]);
        }
        setSelectAll(!selectAll);
    };

    const renderCartItem = (item: ProductTransactionResponse) => {
        const data =
            dto.find((dtoItem) => dtoItem.transactionId === item.transactionId) || ({} as ListTransactionDto);

        return (
            <ProCard key={item.transactionId} className="mb-5">
                <Row>
                    <Col span={24}>
                        <Row className="p-5 ">
                            <Col span={1} className="flex items-center">
                                <Checkbox
                                    onChange={(e) => handleCheckboxChange(e.target.checked, item)}
                                    checked={selectedItems.some(
                                        (selectedItem) => selectedItem.transactionId === item.transactionId
                                    )}
                                />
                            </Col>
                            <Col span={1} className="flex items-center">
                                <Avatar src={item.productImageUrl} />
                            </Col>
                            <Col span={6} className="flex items-center">
                                {item.productName}
                            </Col>
                            <Col span={4} className="flex items-center">
                                {item.storeName}
                            </Col>
                            <Col span={8} className="flex items-center">
                                <QuantityInput
                                    quantity={data.quantity}
                                    setQuantity={(value: number) => updateQuantity(item.transactionId, value)}
                                    limit={undefined}
                                    description={""}
                                />
                            </Col>
                            <Col span={4} className="flex items-center">
                                {formatCurrency(item.total_price)}
                            </Col>
                        </Row>
                        <Row className="mt-2 border-t-2 border-gray-100">
                            <div className="pt-3">
                                {item.isUseVoucher ? <div>Đã áp dụng mã</div> : <div>Chưa áp dụng mã</div>}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </ProCard>
        );
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-2/3 flex justify-center bg-lightWhite text-center">
                    <div>Giỏ hàng</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-2/3 mt-5 p-5 bg-white">
                    <Row>
                        <Col span={3} className="flex items-center">
                            <Checkbox onChange={handleSelectAll} checked={selectAll} />
                        </Col>
                        <Col span={5} >
                            Sản phẩm
                        </Col >
                        <Col span={5}>
                            Cửa hàng
                        </Col>
                        <Col span={7}>
                            Đơn giá
                        </Col>
                        <Col span={4}>
                            Số lượng
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-2/3 pt-5">
                    {cartItems.map((item) => (
                        <div key={item.transactionId}>{renderCartItem(item)}</div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <ProCard className="w-2/3">
                    <Row>
                        <Col span={24}>
                            <Row className="p-5 ">
                                <Col span={4} className="flex items-center">
                                    <Checkbox onChange={handleSelectAll} checked={selectAll}>
                                        Chọn tất cả
                                    </Checkbox>
                                </Col>
                                <Col span={4} className="flex items-center justify-around">
                                    <Button type="text">Xóa</Button>
                                </Col>
                                <Col span={16} className="flex items-center justify-end">
                                    <Text>
                                        Tổng thanh toán ({selectedItems.length}): {formatCurrency(totalAmount)}&nbsp;
                                    </Text>
                                    <Button type="primary">Mua hàng</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ProCard>
            </div>
        </div>
    );
};

export default CardView;
