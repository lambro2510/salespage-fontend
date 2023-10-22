import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { formatCurrency, handleErrorResponse, showNotification } from "../../utils";
import { Avatar, Button, Checkbox, Col, Divider, Row, Typography } from "antd";
import { ProCard } from "@ant-design/pro-components";
import QuantityInput from "../quantityInput";
import { BiDownArrow } from "react-icons/bi";
import { CartByStoreResponseInterface, CartPaymentDto, CartPaymentTransaction, CartResponseInterface } from "../../interfaces/models/cart";

const { Text } = Typography;

const CardView = () => {
    const [loading, setLoading] = useState<boolean>();
    const [cartItems, setCartItems] = useState<CartByStoreResponseInterface[]>([]);
    const [cartDto, setCartDto] = useState<CartPaymentDto[]>()

    const getCartItems = async () => {
        try {
            setLoading(true);
            const response = await http.get(`${apiRoutes.cart}`);
            const datas = response.data?.data as CartByStoreResponseInterface[];
            setCartItems(datas || []);
        } catch (error) {
            handleErrorResponse(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDto = () => {
        let cartDtos = [];
        for (let data of cartItems) {
            let cartDto: CartPaymentDto = {
                comboId: data.bestCombo?.id,
                note: '',
                transaction: []
            };
            for (let item of data.cartResponses) {
                if (item.isSelected) {
                    let cardPaymentTransaction: CartPaymentTransaction = {
                        productDetailId: item.cartId,
                        storeId: item.storeId,
                        voucherCodeId: undefined,
                        note: '',
                        address: ''
                    };
                    cartDto.transaction.push(cardPaymentTransaction)
                }
            }
            cartDtos.push(cartDto);
        }
        console.log("----------------> xử lý kết quả để gửi lên sever thanh toán: ");
        console.log(cartDtos);

        setCartDto(cartDtos);
    }
    const updateCartItem = async (storeId: string, cartId: string, isSelect: boolean | undefined, quantity: number | undefined, voucherId: any | undefined) => {
        if (isSelect != undefined) {
            const updatedCartItems = [...cartItems];
            updatedCartItems.forEach(storeInfo => {
                if (storeInfo.storeId === storeId) {
                    storeInfo.cartResponses.forEach(cartItem => {
                        if (cartItem.cartId === cartId) {
                            cartItem.isSelected = isSelect;
                        }
                    });
                }
            });
            setCartItems(updatedCartItems);
        }
        if (quantity || voucherId) {
            try {
                setLoading(true);
                await http.put(`${apiRoutes.cart}/${cartId}`, {}, {
                    params: {
                        quantity: quantity,
                        voucherId: voucherId
                    }
                })
                getCartItems()
            } catch (err) {
                handleErrorResponse(err);
            } finally {
                setLoading(false)
            }
        }
    }



    const totalPrice = () => {

    };

    const paymentProductInCart = () => {

    }

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        handleDto();
    }, [cartItems]);

    const renderProductCombo = (cartItem: CartByStoreResponseInterface) => {
        if(cartItem.bestCombo){
            return (
                <Row className="w-full bg-rose-200">
                    <Col>
                        {cartItem.bestCombo?.comboName}
                    </Col>
                    <Col>
                        <Text>&nbsp;- giảm giá tối đa {formatCurrency(cartItem.bestCombo?.maxDiscount)}</Text>
                    </Col>
                    <Col>
                        <Text>&nbsp;khi mua {cartItem.bestCombo?.quantityToUse} sản phẩm</Text>
                    </Col>
                </Row>
            )
        }
    }
    const renderCartItem = (cartItem: CartByStoreResponseInterface, cartIndex: number) => {
        return (
            <ProCard
                className="mb-5"
                bordered
                title={cartItem.storeName}
                key={cartItem.storeId}
            >
                {renderProductCombo(cartItem)}
                {cartItem.cartResponses.map((item) => (
                    <Row key={item.cartId}>
                        <Divider />
                        <Col span={1} className="flex items-center justify-center">
                            <Checkbox checked={item.isSelected} onChange={(value: any) => updateCartItem(cartItem.storeId, item.cartId, value.target.checked, undefined, undefined)} />
                        </Col>
                        <Col span={8} className="flex items-center justify-center">{item.productName}</Col>
                        <Col span={4} className="flex items-center justify-center">
                            {item.discountPercent ? (
                                <div className="flex">
                                    <Text delete className="text-gray-400">
                                        {formatCurrency(item.price)}
                                    </Text>
                                    &nbsp;-&nbsp;
                                    <Text className="text-rose-500">
                                        {formatCurrency(item.sellPrice)}
                                    </Text>
                                </div>
                            ) : (
                                <Text className="text-rose-500">
                                    {formatCurrency(item.sellPrice)}
                                </Text>
                            )}
                        </Col>
                        <Col span={4} className="flex items-center justify-center">
                            <QuantityInput
                                quantity={item.quantity}
                                setQuantity={(value: any) =>
                                    updateCartItem(cartItem.storeId, item.cartId, undefined, value, item?.voucherInfo?.code)
                                }
                                limit={item.limit}
                            />
                        </Col>
                        <Col span={3} className="flex items-center justify-center">
                            <Text className="text-rose-500">{formatCurrency(item?.totalPrice)}</Text>
                        </Col>
                        <Col span={4} className="flex items-center justify-center">
                            <div>
                                <div className="flex items-center justify-center">
                                    <Button type="ghost">Xoá</Button>
                                </div>
                                <div className="flex items-center justify-center cursor-pointer">
                                    <Text className="text-rose-500">Sản phẩm tương tự </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                ))}
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
                        <Col span={1} className="flex items-center">
                            <Checkbox />
                        </Col>
                        <Col span={8} className="flex items-center justify-center">Sản phẩm</Col>
                        <Col span={4} className="flex items-center justify-center">Đơn giá</Col>
                        <Col span={4} className="flex items-center justify-center">Số lượng</Col>
                        <Col span={3} className="flex items-center justify-center">Số tiền</Col>
                        <Col span={4} className="flex items-center justify-center">Thao tác</Col>
                    </Row>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-2/3 pt-5">
                    {cartItems.map((item, index) => (
                        <div key={item.storeId}>{renderCartItem(item, index)}</div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <ProCard className="w-2/3">
                    <Row>
                        <Col span={24}>
                            <Row className="p-5 ">
                                <Col span={4} className="flex items-center">
                                    <Checkbox >Chọn tất cả</Checkbox>
                                </Col>
                                <Col span={4} className="flex items-center justify-around">
                                    <Button type="text">Xóa</Button>
                                </Col>
                                <Col span={16} className="flex items-center justify-end">
                                    <Text className="mr-2">Tổng thanh toán {formatCurrency(totalPrice())}</Text>
                                    <Button type="primary" onClick={() => paymentProductInCart()}>Mua hàng</Button>
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
