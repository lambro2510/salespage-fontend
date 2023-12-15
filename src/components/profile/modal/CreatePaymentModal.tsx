import { useState, useEffect } from "react";
import { BankAccountData, BankAccountResponse } from "../../../interfaces/interface";
import { Button, Col, Input, Radio, Row, Select, Spin, Steps, Typography } from "antd";
import http from "../../../utils/http";
import { apiRoutes } from "../../../routes/api";
import { handleErrorResponse } from "../../../utils";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface CreatePaymentModalProps {
    bankAccounts: BankAccountResponse[];
    paymentId: string | undefined;
    close: () => void;
}

const { Step } = Steps;
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const CreatePaymentModal = ({
    bankAccounts,
    paymentId,
    close,
}: CreatePaymentModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [payment, setPayment] = useState<string | undefined>(paymentId)
    const [bankAccountId, setBankAccountId] = useState<string>();
    const [bankAccountNo, setBankAccountNo] = useState<string>();
    const [bin, setBin] = useState<string>();
    const [amount, setAmount] = useState<number>(0);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>();
    const [paymentMethod, setPaymentMethod] = useState<BankAccountData[]>([]);
    const [current, setCurrent] = useState(0);

    const next = async () => {
        if (current + 1 === items.length - 1) {
            let id: any = await createPayment()
            console.log('id: ', id);

            await getQr(id)
        }
        setCurrent(current + 1);

    };

    const prev = async () => {
        setCurrent(current - 1);
    };

    useEffect(() => {
        getPaymentMethod();
        if (paymentId) {
            getQr();
        }
    }, []);


    const createPayment = async () => {
        setLoading(true);
        try {
            const response = await http.post(`${apiRoutes.payment}`, {
                bankAccountId: bankAccountId,
                amount: amount,
            });
            setPayment(response.data.data);
            return response.data.data as string;
        } catch (err) {
            handleErrorResponse(err);
            return "";
        } finally {
            setLoading(false);
        }
    };

    const getPaymentMethod = async () => {
        setLoading(true);
        try {
            const response = await http.get(`${apiRoutes.bank}/payment-bank-account`);
            setPaymentMethod(response.data.data);
        } catch (err) {
            handleErrorResponse(err);
        } finally {
            setLoading(false);
        }
    };

    const getQr = async (id?: string) => {
        setLoading(true);
        try {
            const response = await http.post(`${apiRoutes.bank}/gen-qr`, {}, {
                params: {
                    paymentId: id !== undefined ? id : payment,
                    bin: bin,
                    bankAccountNo: bankAccountNo,
                }
            },
            );
            setQrCodeUrl(response.data.data.qrDataURL);
        } catch (err) {
            handleErrorResponse(err);
        } finally {
            setLoading(false);
        }
    };


    const renderSelectBank = () => {
        return (
            <Row>
                <Radio.Group name="bank">
                    {bankAccounts.map((account) => {
                        return (
                            <Col span={24}>
                                <Row>
                                    <Col lg={1} className="flex items-center">
                                        <Radio value={account.bankAccountId} onClick={() => setBankAccountId(account.bankAccountId)} />
                                    </Col>
                                    <Col lg={5} className="flex items-center">
                                        <img src={account.bankLogoUrl} />
                                    </Col>
                                    <Col lg={12} className="flex items-center">
                                        {account.bankFullName}
                                    </Col>
                                    <Col lg={6} className="flex items-center">
                                        {account.accountNo}
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                </Radio.Group>
            </Row>
        )
    }

    const renderTranfertBank = () => {
        return (
            <Row className="w-full">
                <Radio.Group name="tranferBank">
                    {paymentMethod.map((payment) => {
                        return (
                            <Col span={24} className="mt-5 mb-5">
                                <Row >
                                    <Col span={2} className="flex items-center">
                                        <Radio value={payment.bin} onClick={() => {
                                            setBin(payment.bin)
                                            setBankAccountNo(payment.bankAccountNo)
                                        }} />
                                    </Col>
                                    <Col span={11} className="flex items-center ">
                                        {payment.accountName}
                                    </Col>
                                    <Col span={11} className="flex items-center">
                                        {payment.bankShortName}
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                </Radio.Group>
                <Input type="number" onChange={(e) => setAmount(Number(e.target.value))} placeholder="Nhập số tiền cần nạp" />
            </Row>
        )
    }

    const renderQrPaymentConfirm = () => {
        return (
            <img src={qrCodeUrl} />
        )
    }
    const steps = [
        {
            title: 'Tài khoản nạp',
            content: renderSelectBank(),
        },
        {
            title: 'Phương thức thanh toán',
            content: renderTranfertBank(),
        },
        {
            title: 'Thanh toán',
            content: renderQrPaymentConfirm(),
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className="w-full">
            <Steps current={current} items={items} />
            <Spin spinning={loading}>{steps[current].content}</Spin>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => console.log('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>

        </div>
    );
};

export default CreatePaymentModal;
