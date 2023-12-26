import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message, Card, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { NotificationType, handleErrorResponse, setPageTitle, showNotification } from "../../utils";
import VideoBackground from "../base/Video";
import './style.css'
import http from "../../utils/http";
import { apiRoutes } from "../../routes/api";
import { webRoutes } from "../../routes/web";
import { Auth } from "../../interfaces/models/auth";
import { login } from "../../store/slices/authSlice";
const Register = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || webRoutes.home;
    const auth = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setPageTitle("Đăng nhập");
    }, []);

    useEffect(() => {
        if (auth) {
            navigate(from, { replace: true });
        }
    }, [auth]);

    const onFinish = async (values: any) => {
       try{
        const response = await http.post(`${apiRoutes.register}`, values);
        showNotification(response.data.message);
        const auth: Auth = response?.data?.data;
        console.log(response?.data?.data?.role);

        if (response?.data?.data?.role != 'USER') {
            showNotification("Vui lòng đăng nhập trang quản trị viên để sử dụng", NotificationType.ERROR);
        } else {
            dispatch(login(auth));
            navigate(from)
            showNotification(response.data.message, NotificationType.SUCCESS);
        }
       }catch(err){
        handleErrorResponse(err)
       }finally{
        setLoading(false)
       } 
    };

    return (
        <div className="h-screen">
            <VideoBackground>
                <div className="flex justify-center items-center h-screen">
                    <Card
                        title={<p className="text-base w-full flex justify-center">Đăng ký</p>}
                        bordered={false}
                        className={!isMobile ? `w-1/3` : ``}
                        style={{
                            boxShadow: '0 0 30px #000',

                            backdropFilter: 'blur(3px)',
                            opacity: 0.75,
                            backgroundColor: 'transparent',
                            position: 'relative',
                            zIndex: 1
                        }}>
                        <Form
                            
                            className="bg-inherit"
                            name="register"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            size="large"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: "Chưa nhập tài khoản!" }]}
                            >
                                <Input placeholder="Tài khoản" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Chưa nhập mật khẩu!" }]}
                            >
                                <Input.Password className='bg-inherit' placeholder="Mật khẩu" />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                dependencies={["password"]}
                                hasFeedback
                                rules={[
                                    { required: true, message: "Chưa xác nhận mật khẩu!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error("Không trùng khớp mật khẩu!")
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password className='bg-inherit' placeholder="Xác nhận mật khấu" />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                rules={[{ required: true, message: "Chưa điền số điện thoại!" }]}
                            >
                                <Input className='bg-inherit' placeholder="Số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                name="userRole"
                                rules={[{ required: true, message: "Chưa điền số điện thoại!" }]}
                            >
                                <Select className='bg-inherit' placeholder="Loại tài khoản" >
                                    <Select.Option className='bg-inherit' key={'USER'} children="Người mua hàng"/>
                                    <Select.Option className='bg-inherit' key={'SELLER'} children="Người bán hàng"/>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button className="w-full " type="primary" htmlType="submit">
                                    Xác nhận
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </VideoBackground>
        </div>
    );
};

export default Register;
