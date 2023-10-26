import { ActionType, ProColumns, ProDescriptions, ProForm, ProFormSelect, ProList, ProTable, RequestData } from "@ant-design/pro-components";
import { Button, Modal, Space, Tag } from "antd";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { NotificationType, formatCurrency, handleErrorResponse, showNotification } from "../../utils";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { RiPaypalFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";


const PaymentStatus: any = {
    WAITING: {
        text: "Đang chờ thanh toán",
        color: "yellow",
    },
    PENDING: {
        text: "Giao dịch quá thời gian chờ",
        color: "gray",
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


const PaymentType: any = {
    IN: {
        text: "+",
        color: "green",

    },
    OUT: {
        text: "-",
        color: "red",
    },
    null: {
        text: "",
        color: 'inherit'
    }
};

interface Payment {
    paymentId: string,
    status: string,
    type: string,
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

    const loadDetail = (row: Payment) => {

    }

    const generatePayment = (row: Payment) => {

    }

    const renderActionButtons = (row: Payment) => {
        if (row.status === 'PENDING') {
            return (
                <Space>
                    <Button type="default" onClick={() => generatePayment(row)}>Tạo mã thanh toán</Button>
                </Space>
            );
        } else if (row.status === 'RESOLVE') {
            return (
                <Space>
                    <Button type="default" onClick={() => loadDetail(row)}>Xem chi tiết giao dịch</Button>
                </Space>
            );
        } else if (row.status === 'CANCEL') {
            return (
                <Space>

                </Space>
            );
        }
        return null;
    };


    const showFormCreateTransaction = () => {
        modal.confirm({
            title: 'Tao thanh toán nạp tiền vào tài khoản',
            icon: <RiPaypalFill />,
            content: (
                <ProDescriptions column={1} title=" ">
                    <ProDescriptions.Item valueType="segmented" label="Tài khoản">
                        {auth?.username}
                    </ProDescriptions.Item>
                    <ProForm>
                        <ProFormSelect

                        />
                    </ProForm>
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
                    ...params,
                    status: params.status,
                    page: params.current - 1,
                    size: params.pageSize
                } as Payment,
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


    const columns: ProColumns[] = [
        {
            title: 'Mã giao dịch',
            dataIndex: 'paymentId',
            sorter: false,
            align: 'center',
            ellipsis: true,
            render: (_, row: Payment) => `${row.paymentId}`,
        },
        // {
        //     title: 'Tài khoản nạp tiền',
        //     dataIndex: 'bankAccountNo',
        //     sorter: false,
        //     align: 'center',
        //     ellipsis: true,
        //     render: (_, row: Payment) => `${row.bankAccountNo}`,
        // },

        // {
        //     title: 'Tên tài khoản',
        //     dataIndex: 'bankAccountName',
        //     sorter: false,
        //     align: 'center',
        //     ellipsis: true,
        //     search: false,
        //     render: (_, row: Payment) => `${row.bankAccountName}`,
        // },
        {
            title: 'Trạng thái giao dịch',
            dataIndex: 'status',
            sorter: false,
            align: 'center',
            ellipsis: true,
            search: false,
            render: (_, row: Payment) => <Tag color={PaymentStatus[row.status].color}>{PaymentStatus[row.status].text}</Tag>,
        },
        {
            title: 'Thời gian tạo giao dịch',
            dataIndex: 'createdAt',
            sorter: false,
            align: 'center',
            ellipsis: true,
            search: false,
            render: (_, row: Payment) => row.created,
        },
        {
            title: 'Số tiền thanh toán',
            dataIndex: 'amount',
            sorter: false,
            align: 'center',
            ellipsis: true,
            search: false,
            render: (_, row: Payment) => <p color={PaymentType[row.type]?.color}>{PaymentType[row.type]?.text}{formatCurrency(row.amount)}</p>,
        },
        {
            title: 'Chức năng',
            dataIndex: 'function',
            sorter: false,
            align: 'center',
            ellipsis: true,
            search: false,
            render: (_, row: Payment) => renderActionButtons(row)
        },
    ]
    return (
        <Space>
            <ProTable
                toolBarRender={(action, { selectedRowKeys, selectedRows }) => {
                    return [
                        <Button key="create" icon={<BiPlus />} onClick={showFormCreateTransaction} type="primary">
                            Nạp tiền
                        </Button>,
                    ];
                }}

                search={{
                    filterType: 'light',
                    searchText: 'TÌm kiếm',
                    resetText: 'Xóa bộ lọc'
                }}
                columns={columns}
                request={(params) => {
                    return loadPayments(params);
                }}
                actionRef={actionRef}
                scroll={{
                    scrollToFirstRowOnChange : true
                }}
            />

            {modalContextHolder}
        </Space>
    )
}

export default PaymentCard;