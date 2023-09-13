import { ActionType, ProColumns, ProDescriptions, ProList, ProTable, RequestData } from "@ant-design/pro-components";
import { Button, Modal, Space, Tag } from "antd";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { NotificationType, handleErrorResponse, showNotification } from "../../utils";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { RiPaypalFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRef } from "react";

const PaymentStatus: any = {
    PENDING: {
        text: "Đang chờ thanh toán",
        color: "yellow",
    },
    RESOLVE: {
        text: "Giao dịch hoàn tất",
        color: "green",
    },
    CANCEL: {
        text: "Giao dịch bị hủy",
        color: "red",
    },
};



interface Payment {
    paymentId: string,
    status: string,
    bankName: string,
    bankAccountNo: string,
    bankAccountName: string,
    amount: number,
    created: string
}
const PaymentCard = () => {

    const actionRef = useRef<ActionType>();
    const auth = useSelector((state: RootState) => state.auth)
    const [modal, modalContextHolder] = Modal.useModal();
    const showFormCreateTransaction = () => {
        modal.confirm({
            title: 'Tao thanh toán nạp tiền vào tài khoản',
            icon: <RiPaypalFill />,
            content: (
                <ProDescriptions column={1} title=" ">
                    <ProDescriptions.Item valueType="segmented" label="Tài khoản">
                        {auth?.username}
                    </ProDescriptions.Item>
                </ProDescriptions>
            ),
            okButtonProps: {
                className: 'bg-primary',
            },
            onOk: () => {
                return http
                    .post(`${apiRoutes.payment}`)
                    .then(() => {
                        showNotification(
                            'Success',
                            NotificationType.SUCCESS,
                            'Tạo giao dịch thành công'
                        );

                        actionRef.current?.reloadAndRest?.();
                    })
                    .catch((error) => {
                        handleErrorResponse(error);
                    });
            },

        })
    };

    const loadPayments = (params: any) => {
        return http
            .get(apiRoutes.payment, {
                params: {
                    status: params.status,
                    page: params.current - 1,
                    size: params.pageSize
                },
            })
            .then((response) => {
                const payments: [any] = response.data.data.data;

                return {
                    data: payments,
                    success: true,
                    total: response.data.data.metadata.total,
                } as RequestData<any>;
            })
            .catch((error) => {
                handleErrorResponse(error);

                return {
                    data: [],
                    success: false,
                } as RequestData<any>;
            });
    };


    return (
        <Space>
            <ProList
                toolBarRender={() => {
                    return [
                        <Button key="create" type="primary" onClick={showFormCreateTransaction}>
                            Tạo giao dịch mới
                        </Button>,
                    ];
                }}
                search={{
                    filterType: 'light',
                }}
                request={(param: any) => {
                    return loadPayments(param);
                }}
                pagination={{
                    pageSize: 10,
                }}
                metas={
                    {
                        description: {
                            dataIndex: 'description',
                            render: (_, row: Payment) => {
                                return (
                                    <p>{`Bạn đã tạo yêu cầu giao dịch thanh toán đến tài khoản 
                                    ${row.bankAccountNo} của anh ${row.bankAccountName} 
                                    vào lúc ${row.created}`}</p>
                                )
                            },
                            search: false,
                        },

                        subTitle: {
                            dataIndex: 'tittle',
                            render: (_, row: Payment) => {
                                return (
                                    <Space size={0}>
                                        <Tag color={PaymentStatus[row.status]?.color}>
                                            {PaymentStatus[row.status]?.text}
                                        </Tag>
                                    </Space>
                                );
                            },
                            search: false,
                        },
                        status: {
                            title: 'Trạng thái giao dịch',
                            valueEnum: PaymentStatus,
                        }
                    }
                }
            >

            </ProList>
            {modalContextHolder}
        </Space>
    )
}

export default PaymentCard;