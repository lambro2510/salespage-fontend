import React, { useEffect, useState } from "react";
import { Avatar, Card, Col, Row, Typography, Upload, Spin, message } from "antd";
import { Authorization, formatCurrency } from "../../../../utils";
import UserService from "../../../../service/UserService";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UPLOAD_USER_URL } from "../../../../constant";

const { Title, Text } = Typography;

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState();

    useEffect(() => {
        getProfile();
    }, []);


    const getProfile = async () => {
        const profileData = await UserService.getProfile();
        setProfile(profileData);
    };


    const handleUpload = (info) => {
        if (info.file.status === "uploading") {
            setUploading(true);
        }
        if (info.file.status === "done") {
            setUploading(false);
            message.success(`${info.file.name} file uploaded successfully`);
            handleAfterUpload();
        }
        if (info.file.status === "error") {
            setUploading(false);
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleAfterUpload = async () => {
        try {
            const profileData = await UserService.getProfile();
            setProfile(profileData);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const createPayment = () => {
        navigate('payment/create')
    }
    return (
        <Card>
            <Row gutter={[16, 16]} align="middle">
                <Col>
                    <Upload
                        name="file"
                        listType="picture-circle"
                        showUploadList={false}
                        action={UPLOAD_USER_URL}
                        headers={Authorization()}
                        onChange={handleUpload}
                    >
                        {uploading ? (
                            <Spin indicator={<LoadingOutlined />} />
                        ) : (
                            profile?.imageUrl ? (
                                <Avatar src={profile?.imageUrl} size={100} />
                            ) : (
                                <Avatar icon={<PlusOutlined />} size={100} />
                            )
                        )}
                    </Upload>
                </Col>
                <Col >
                    <Row justify="space-between" align="middle">
                        <Title level={4}>Tên người dùng: {profile?.displayName}</Title>
                    </Row>
                    <Row justify="space-between" align="middle">
                        <Text strong>Số tiền trong tài khoản:</Text>{" "}
                        <Text>{formatCurrency(profile?.balance?.money)}</Text>
                        <PlusOutlined
                            style={{ backgroundColor: "#f6f6f6", margin: "0px 10px", cursor: "pointer" }}
                            onClick={createPayment}
                        />
                    </Row>
                    <Row>
                        <Text strong>Điểm đánh giá của bạn:</Text>{"  "}
                        <Text> {profile?.rate?.avgPoint}</Text>
                    </Row>
                </Col>

            </Row>
        </Card>
    );
};

export default Profile;
