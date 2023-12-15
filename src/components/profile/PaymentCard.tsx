import { useEffect, useState } from "react";
import { BankAccountData, BankAccountResponse, BankListData } from "../../interfaces/interface";
import { Avatar, Card, Col, Modal, Row, Typography } from "antd";
import { handleErrorResponse } from "../../utils";
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import NewBankModal from "./modal/NewBankModal";
import { BiPlusCircle } from "react-icons/bi";
import CreatePaymentModal from "./modal/CreatePaymentModal";

const { Text } = Typography;
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
    }, []);

    const renderListLinkBankAccount = () => {
        if (!linkBankAccount) {
            return (
                <Row>Chưa liên kết tài khoản nào</Row>
            )
        } else {
            return (
                <div>
                    <Row>
                        <Col lg={6}>
                            
                        </Col>
                        <Col lg={4} className="flex items-center justify-center">
                            <Text strong>
                                Tên ngân hàng
                            </Text>
                        </Col>
                        <Col lg={4} className="flex items-center justify-center">
                            <Text strong>
                                Số tài khoản
                            </Text>
                        </Col>
                        <Col lg={4} className="flex items-center justify-center">
                            <Text strong>
                                Trạng thái
                            </Text>
                        </Col>
                        <Col lg={2} className="flex items-center justify-center">
                            <Text strong>
                                Số tiền nạp
                            </Text>
                        </Col>
                        <Col lg={2} className="flex items-center justify-center">
                            <Text strong>
                               Số tiền rút
                            </Text>
                        </Col>
                        <Col lg={2} className="flex items-center justify-center">
                            <Text strong>
                                Xoá
                            </Text>
                        </Col>
                    </Row>
                    {linkBankAccount.map((account: BankAccountResponse) => {
                        return (
                            <Row>
                                <Col lg={6}>
                                    <img width={"100%"} src={account.bankLogoUrl} />
                                </Col>
                                <Col lg={4} className="flex items-center justify-center">
                                    <Text>
                                        {account.bankName}
                                    </Text>
                                </Col>
                                <Col lg={4} className="flex items-center justify-center">
                                    <Text>
                                        {account.accountNo}
                                    </Text>
                                </Col>
                                <Col lg={4} className="flex items-center justify-center">
                                    <Text>
                                        {account.status}
                                    </Text>
                                </Col>
                                <Col lg={2} className="flex items-center justify-center">
                                    <Text>
                                        {account.moneyIn}
                                    </Text>
                                </Col>
                                <Col lg={2} className="flex items-center justify-center">
                                    <Text>
                                        {account.moneyOut}
                                    </Text>
                                </Col>
                                <Col lg={2} className="flex items-center justify-center">
                                    <Text>
                                        Xoá
                                    </Text>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
            )
        }
    }
    return (
        <Row>
            <Col span={24} >
                <Card title='Danh sách tài khoản liên kết' extra={<a onClick={() => setOpenNewBankModal(true)}>Tạo mới</a>}>
                    {renderListLinkBankAccount()}
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
                <CreatePaymentModal paymentId={undefined} bankAccounts={linkBankAccount} close={() => setOpenPaymentModal(false)}/>
            </Modal>
        </Row>
    )
}

export default PaymentCard;