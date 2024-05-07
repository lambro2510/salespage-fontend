import React, { useEffect, useState } from 'react'
import BasePageContainer from '../layout/PageContainer';
import { Avatar, Button, Col, List, Row, Skeleton } from 'antd';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { NotificationType, handleErrorResponse, showNotification } from '../../utils';



interface UserVoucherResponse {
    voucherStoreName: string;
    voucherCodeId: string;
    voucherStoreId: string;
    voucherCode: string;
    minPrice: number;
    maxPrice: number;
    value: number;
    discountType: string; // Assuming DiscountType is represented as a string in JavaScript
    storeType: string; // Assuming VoucherStoreType is represented as a string in JavaScript
    dayToExpireTime: number;
    isLimited: boolean;
}

const exampleResponse: UserVoucherResponse[] = [
    {
        voucherStoreName: "Example Store",
        voucherCodeId: "12345",
        voucherStoreId: "67890",
        voucherCode: "ABC123",
        minPrice: 50,
        maxPrice: 100,
        value: 10,
        discountType: "Percentage", // Example value
        storeType: "Online", // Example value
        dayToExpireTime: 30,
        isLimited: false
    }
]

const VoucherView = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [loadmore, setLoadmore] = useState<boolean>(false);
    const [allVoucher, setAllVoucher] = useState<UserVoucherResponse[]>(exampleResponse)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPage, setTotalPage] = useState<number>(0)
    useEffect(() => {
        getAllVoucher(true, 0);
    }, [])

    const getAllVoucher = async (theFirst: boolean, currentPage : number) => {
        if (theFirst) {
            setLoading(true)
        } else {
            setLoadmore(true)
        }
        try {
            const response = await http.get(`${apiRoutes.public_voucher}`, {
                params : {
                    page : currentPage,
                    size : 10
                }
            })
            setAllVoucher(response.data.data.data)
            setTotalPage(response.data.data.metadata.totalPages)
        } catch {

        } finally {
            setLoading(false);
            setLoadmore(false)
        }
    }

    const saveVoucher = async (voucherStoreId: string) => {
        try {
            const response = await http.get(`${apiRoutes.voucher}/receive/voucher-code`, {
                params: {
                    voucherStoreId: voucherStoreId
                }
            });
            showNotification("Nhận mã voucher thành công", NotificationType.SUCCESS)
        } catch (error) {
            handleErrorResponse(error)
        } finally {
            setLoading(false);
            getAllVoucher(false, 0);
        }
    }

    return (
        <BasePageContainer >
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadmore}
                dataSource={allVoucher}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Button key="list-loadmore-edit" onClick={() => saveVoucher(item.voucherStoreId)}>Nhận</Button>]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                avatar={<Avatar />}
                                title={<a>{item.voucherStoreName} - Giảm giá {item.value} {item.discountType == 'PERCENT' ? '%' : 'VND'}</a>}
                                description={`Áp dụng cho các sản phẩm từ ${item.minPrice} đến ${item.maxPrice}`}

                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </BasePageContainer>
    )
}
export default VoucherView;
