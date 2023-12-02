import { useEffect, useState } from "react";
import { BankAccountData, BankAccountResponse, BankListData } from "../../interfaces/interface";
import { Card, Col, Modal, Row } from "antd";
import { handleErrorResponse } from "../../utils";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import NewBankModal from "./modal/NewBankModal";
import { BiPlusCircle } from "react-icons/bi";

const PaymentCard = () => {
    const [openNewBankModal, setOpenNewBankModal] = useState(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [bankAccount, setBankAccount] = useState<BankListData[]>([])
    const [linkBankAccount, setLinkBankAccount] = useState<BankAccountResponse[]>([])

    const getListBank = async () => {
        try {
            const response = await http.get(`${apiRoutes.bank}/list-bank`);
            setBankAccount(response.data.data)
        } catch (err) {
            handleErrorResponse(err)
        }
    }

    const getLinkBankAccount = async () => {
        try {
            const response = await http.get(`${apiRoutes.bank}/link-bank-account`);
            setLinkBankAccount(response.data.data)
        } catch (err) {
            handleErrorResponse(err)
        }
    }

    useEffect(() => {
        getListBank();
        getLinkBankAccount();
    }, [])
    return (
        <Row>
            <Col span={24} >
                <Card title='Danh sách tài khoản liên kết' extra={<a onClick={() => setOpenNewBankModal(true)}>Tạo mới</a>}>
                    {linkBankAccount ?
                        <Row>Chưa liên kết tài khoản nào</Row> :
                        <Row>Chưa liên kết tài khoản nào</Row>}
                </Card>
            </Col>
            <Col span={24} >
                <Card title='Giao dịch' extra={<a className="flex items-center" onClick={() => setOpenPaymentModal(true)}><BiPlusCircle />Nạp thêm</a>}>
                    {linkBankAccount ?
                        <Row>Chưa liên kết tài khoản nào</Row> :
                        <Row>Chưa liên kết tài khoản nào</Row>}
                </Card>
            </Col>
            <Modal title='Tạo thanh toán mới' open={openNewBankModal} onCancel={() => setOpenNewBankModal(false)} footer={false}>
                <NewBankModal banks={bankAccount} close={() => setOpenNewBankModal(false)} />
            </Modal>
            <Modal title='Nạp tiền tài khoản' open={openPaymentModal} onCancel={() => setOpenPaymentModal(false)} footer={false}>
                
            </Modal>
        </Row>
    )
}

export default PaymentCard;