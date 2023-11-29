import { Key, useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { Avatar, Button, Col, Collapse, Progress, Row, Space, Tag, Typography } from "antd";
import { ProductTransactionDetailResponse, ProductTransactionResponse } from "../../interfaces/models/productTransaction";
import { ProList } from "@ant-design/pro-components";
import { formatCurrency, handleErrorResponse } from "../../utils";
import { ProductTransactionState } from "../../interfaces/interface";
import { SyncLoader } from "react-spinners";

const dataSource = [
    {
        title: '语雀的天空',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    {
        title: 'Ant Design',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    {
        title: '蚂蚁金服体验科技',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    {
        title: 'TechUI',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
];

const getTransactionState = (state: ProductTransactionState) => {
    switch (state) {
        case "IN_CART":
            return { text: "Trong giỏ hàng", color: "blue" };
        case "WAITING_STORE":
            return { text: "Chờ cửa hàng", color: "orange" };
        case "ACCEPT_STORE":
            return { text: "Chờ giao hàng", color: "green" };
        case "WAITING_SHIPPER":
            return { text: "Chờ giao hàng", color: "orange" };
        case "SHIPPER_PROCESSING":
            return { text: "Đang vận chuyển", color: "purple" };
        case "SHIPPER_COMPLETE":
            return { text: "Đã đến nơi", color: "green" };
        case "ALL_COMPLETE":
            return { text: "Hoàn tất", color: "green" };
        case "CANCEL":
            return { text: "Huỷ bỏ", color: "red" };
        default:
            return { text: "Lỗi giao dịch", color: "gray" };
    }
};

const { Title, Text } = Typography;
const OrderCard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [transactions, setTransactions] = useState([]);
    const [page, setpage] = useState<number>(0)
    const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);

    const getTransaction = async () => {
        try {
            setLoading(true)
            const response = await http.get(`${apiRoutes.productTransaction}`, {
                params: {
                    page: page,
                    size: 10
                }
            })
            setTransactions(response.data.data.data)
            console.log('response.data.data.data: ', response.data.data.data);
        } catch (err) {
            handleErrorResponse(err);
        } finally {
            setLoading(false)
        }
    };

    const getTransactionStateTag = (state: ProductTransactionState) => {
        const { text, color } = getTransactionState(state);
        return <Tag color={color}>{text}</Tag>;
    };

    useEffect(() => {
        getTransaction();
    }, [])

    const renderPanelHeader = (transaction: ProductTransactionResponse) => {
        return (
            <Col span={24}>
                <Row className="flex items-center">
                    <Col xs={4} lg={1}>
                        <Avatar src={transaction.details[0].store.imageUrl} shape="circle" />
                    </Col>
                    <Col xs={6} lg={6}>
                        <Text>{transaction.details[0].store.storeName}</Text>
                    </Col>
                    <Col xs={14} lg={17} className="flex justify-end">
                        {transaction.comboInfo.isUseCombo ?
                            <>
                                <Text className="mr-2 text-gray-400" delete>{formatCurrency(transaction.comboInfo.sellPrice + transaction.comboInfo.totalDiscount)}</Text>
                                -
                                <Text className="ml-2 text-red">{formatCurrency(transaction.comboInfo.sellPrice)}</Text>
                            </>
                            :
                            <Text className=" text-red">{formatCurrency(transaction.comboInfo.sellPrice)}</Text>
                        }
                    </Col>
                </Row>
            </Col>
        )
    };

    const renderTransactionDetail = (transaction: ProductTransactionDetailResponse) => {
        return (
            <Row className="flex items-center" gutter={[0, 16]}>
                <Col xs={4} lg={1}>
                    <Avatar shape="circle" src={transaction.productDetail.imageUrl} />
                </Col>
                <Col xs={20} lg={12}>
                    <Text >{transaction.product.productName}{` (${transaction.productDetail.type.type})`}</Text>
                </Col>
                <Col xs={12} lg={4}>
                    <Text >{transaction.quantity} sản phẩm</Text>
                </Col>
                <Col xs={12} lg={4}>
                    {getTransactionStateTag(transaction.state)}
                </Col>
                <Col xs={24} lg={3} >
                    <Text className="text-red flex justify-center">{transaction.totalPrice}</Text>
                </Col>
            </Row>
        )
    };

    const renderTransactionDetailHeader = (transaction: ProductTransactionDetailResponse) => {
        return (
            <Row className="flex justify-between items-center">
                <Text >{transaction.productDetail.type.type}</Text>
                <Text className="text-red">{transaction.totalPrice}</Text>
            </Row>
        )
    };

    if (loading) {
        return (
            <div style={{height : '20vh'}} className="flex justify-center items-center">
                <SyncLoader color="red" loading={loading} />
            </div>
        );
    } else {
        return (
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Collapse >
                        {transactions.map((transaction: ProductTransactionResponse) => {
                            return (
                                <Collapse.Panel key={transaction.id} header={renderPanelHeader(transaction)}>
                                    <Collapse>
                                        {transaction.details.map((detail: ProductTransactionDetailResponse) => {
                                            return (
                                                <Collapse.Panel key={detail.id} header={renderTransactionDetailHeader(detail)} >
                                                    {renderTransactionDetail(detail)}
                                                </Collapse.Panel>
                                            )
                                        })}

                                    </Collapse>
                                </Collapse.Panel>
                            )
                        })}
                    </Collapse>;
                </Col>
            </Row>
        )
    }

}

export default OrderCard;