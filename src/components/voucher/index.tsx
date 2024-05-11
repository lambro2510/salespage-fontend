import React, { useEffect, useState } from 'react'
import BasePageContainer from '../layout/PageContainer';
import { Avatar, Button, Col, Divider, List, Row, Skeleton, Tooltip, Typography } from 'antd';
import { PercentageOutlined } from '@ant-design/icons'
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { NotificationType, handleErrorResponse, showNotification } from '../../utils';
import Banner from '../base/Banner';
import { webRoutes } from '../../routes/web';



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
    voucherReceived: number;
    isLimited: boolean;
}


const image = {
    imageUrl: "https://gombattrang.vn/wp-content/uploads/2022/09/banner-danh-muc-do-tho-men-ran-day-du.jpg",
    title: "Gốm sứ bát tràng",
    subTitle: "Gốm sứ bát tràng chính hãng cao cấp",
    link: webRoutes.products,
}
const VoucherView = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [loadmore, setLoadmore] = useState<boolean>(false);
    const [allVoucher, setAllVoucher] = useState<UserVoucherResponse[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPage, setTotalPage] = useState<number>(0)
    useEffect(() => {
        getAllVoucher(true, 0);
    }, [])

    const getAllVoucher = async (theFirst: boolean, currentPage: number) => {
        if (theFirst) {
            setLoading(true)
        } else {
            setLoadmore(true)
        }
        try {
            const response = await http.get(`${apiRoutes.public_voucher}`, {
                params: {
                    page: currentPage,
                    size: 10
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
            <Row gutter={[32, 16]}>
                <Col span={24} className='bg-slate-400'>
                    <Banner key={1} imageUrl={image.imageUrl} title={image.title} subTitle={image.subTitle} link={image.link} />
                </Col>
                <Col span={24} >
                    <div className='flex justify-center'>
                        <Typography.Title>Mã giảm giá</Typography.Title>
                    </div>
                </Col>
                <Col span={24} >
                    <Divider />
                </Col>
                <Col span={3} >
                    <img src='https://gombattrang.vn/wp-content/uploads/2022/09/loc-binh-bat-trang-banner-cua-hang-1.png' />
                </Col>
                <Col span={21} className='pt-10'>
                    <List
                        className="border-2 shad pl-10 pt-2 pb-2"
                        loading={loading}
                        itemLayout="horizontal"
                        loadMore={loadmore}
                        dataSource={allVoucher}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Tooltip title={`Đã nhận ${item.voucherReceived} voucher`}>
                                        <Button disabled={item.isLimited} key="list-loadmore-edit" onClick={() => saveVoucher(item.voucherStoreId)}>
                                            Nhận
                                        </Button>
                                    </Tooltip>
                                ]}
                            >
                                <Skeleton avatar title={false} loading={loading} active>
                                    <List.Item.Meta
                                        avatar={<Avatar className='bg-slate-300' src={<PercentageOutlined />} />}
                                        title={<a>{item.voucherStoreName} - Giảm giá {item.value} {item.discountType == 'PERCENT' ? '%' : 'VND'}</a>}
                                        description={`Áp dụng cho các sản phẩm từ ${item.minPrice} đến ${item.maxPrice}`}

                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>


        </BasePageContainer>
    )
}
export default VoucherView;
