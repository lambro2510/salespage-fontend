import { useState } from "react";
import { BankAccountData, BankAccountResponse } from "../../../interfaces/interface"
import { Button, Col, Row, Select, Steps, Typography } from "antd";
import http from "../../../utils/http";
import { apiRoutes } from "../../../routes/api";
import { handleErrorResponse, showNotification } from "../../../utils";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface CreatePaymentModalProps {
    bankAccounts : BankAccountResponse[];
    close: () => void
}


const { Step } = Steps;
const { Option } = Select;
const { Text } = Typography;

const CreatePaymentModal = ({ bankAccounts,close }: CreatePaymentModalProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [currentStep, setCurrentStep] = useState(0);
    const [bankAccountId, setBankAccountId] = useState<string | undefined>();
    const [bankAccountNo, setBankAccountNo] = useState<string | undefined>();
    const [bankAccountName, setBankAccountName] = useState<string>();

    const onChange = (value: string) => {
        setBankAccountId(value);
    };


    const nextStep = () => {
        if (currentStep == 0) {
            if (!bankAccountId) {
                showNotification("Bạn chưa chọn ngân hàng liên kết");
                return;
            }
        }
        setCurrentStep(currentStep + 1);
    };

    const preStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderConfirmCreate = () => {
        const selectedBank = bankAccounts.find((k) => k.bankAccountId == bankAccountId);

        return (
            <Row gutter={16}>
                <Col span={24}>
                    <Text>Ngân hàng: {selectedBank?.bankLogoUrl}</Text>
                </Col>
                <Col span={24}>
                    <Text>Số tài khoản: {bankAccountNo}</Text>
                </Col>
                <Col span={24}>
                    <Text>Tên tài khoản: {bankAccountName}</Text>
                </Col>
                <Col span={24} className="flex justify-between mt-3">
                    <Button onClick={preStep} icon={<BiLeftArrow />}> Quay lại</Button>
                    <Button type="primary">
                        {loading ? "Đang xử lý" : "Xác nhận tạo"}
                    </Button>
                </Col>
            </Row>
        );
    };

    const renderSelectBank = () => {
        return (
            <Row gutter={16}>
                <Col span={24}>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Chọn ngân hàng"
                        optionFilterProp="label"
                        onChange={onChange}
                        filterOption={(input, option) => {
                            if (option?.label && option.value !== undefined && option.value !== null) {
                                const labelString = option.label as string;
                                const valueString = option.value.toString();

                                return (
                                    labelString.toLowerCase().includes(input.toLowerCase()) ||
                                    valueString.includes(input.toLowerCase()) ||
                                    (option.data as BankAccountResponse).accountNo.toLowerCase().includes(input.toLowerCase()) ||
                                    (option.data as BankAccountResponse).bankName.toLowerCase().includes(input.toLowerCase())
                                );
                            }

                            return false;
                        }}
                    >
                        {bankAccounts.map((account) => (
                            <Option key={account.bankAccountId} value={account.bankAccountId} label={account.bankFullName} data={account}>
                                {account.bankFullName}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col span={24} className="flex justify-end mt-3">
                    <Button type="primary" onClick={nextStep} icon={<BiRightArrow />}> Tiếp theo</Button>
                </Col>
            </Row>
        );
    };

    const verifyCapcha = () => {
        return (
            <Row gutter={16}>
                <Col span={24}>
                    <></>
                </Col>
                <Col span={24} className="flex justify-between mt-3">
                    <Button onClick={preStep} icon={<BiLeftArrow />}> Quay lại</Button>
                    <Button type="primary" icon={<BiRightArrow />}> Tiếp theo</Button>
                </Col>
            </Row>
        );
    };

    const steps = [
        {
            title: 'Chọn ngân hàng',
            content: renderSelectBank(),
        },
        {
            title: 'Nhập số tài khoản',
            content: verifyCapcha(),
        },
        {
            title: 'Xác nhận tạo',
            content: renderConfirmCreate(),
        },
    ];

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <Steps current={currentStep} className="mb-4">
                {steps.map((step, index) => (
                    <Step key={index} title={step.title} />
                ))}
            </Steps>
            <div>{steps[currentStep].content}</div>
        </div>
    );
};

export default CreatePaymentModal;
