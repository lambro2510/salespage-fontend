import {
    GoogleOutlined,
    LockOutlined,
    MobileOutlined,
    FacebookFilled,
    TwitterOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    LoginFormPage,
    ProConfigProvider,
    ProForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { NotificationType, handleErrorResponse, showNotification } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { Auth } from '../../interfaces/models/auth';
import { login } from '../../store/slices/authSlice';
import { webRoutes } from '../../routes/web';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const Page = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const { token } = theme.useToken();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || -1;
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (auth) {
            navigate(from, { replace: true });
        }
    }, [auth]);

    const loginByUsername = async (loginData: any) => {
        try {
            const response = await http.post(`${apiRoutes.login}`, {
                ...loginData
            });
            const auth: Auth = response?.data?.data;
            console.log(response?.data?.data?.role);

            if (response?.data?.data?.role != 'USER') {
                showNotification("Vui lòng đăng nhập trang quản trị viên để sử dụng", NotificationType.ERROR);
            } else {
                dispatch(login(auth));
                navigate(-1)
                showNotification(response.data.message, NotificationType.SUCCESS);
            }

        } catch (err) {
            handleErrorResponse(err)
        }
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
            }}
        >
            <LoginFormPage
                backgroundImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWXca-DdF31fRrH7d9zsmZ2wPiwr3IkEjLlg&usqp=CAU"
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="Đăng nhập E-web"
                subTitle="E-WEB"
                submitter={{
                    searchConfig: {
                        submitText: 'Đăng nhập'
                    }
                }
                }
                onFinish={(value) => loginByUsername(value)}
                activityConfig={{
                    style: {
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                        color: token.colorTextHeading,
                        borderRadius: 8,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(4px)',
                    },
                    title: 'Trang demo dự án E-web',
                    subTitle: 'Sàn giao dịch thương mại điện tử',
                    action: (
                        <Button
                            size="large"
                            style={{
                                borderRadius: 20,
                                background: token.colorBgElevated,
                                color: token.colorPrimary,
                                width: 120,
                            }}
                        >
                            Xem thêm
                        </Button>
                    ),
                }}
                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Divider plain>
                            <span
                                style={{
                                    color: token.colorTextPlaceholder,
                                    fontWeight: 'normal',
                                    fontSize: 14,
                                }}
                            >
                                Đăng nhập qua
                            </span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid ' + token.colorPrimaryBorder,
                                    borderRadius: '50%',
                                }}
                            >
                                <GoogleOutlined style={{ ...iconStyles, color: '#FF6A1' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid ' + token.colorPrimaryBorder,
                                    borderRadius: '50%',
                                }}
                            >
                                <FacebookFilled style={{ ...iconStyles, color: '#1677FF' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid ' + token.colorPrimaryBorder,
                                    borderRadius: '50%',
                                }}
                            >
                                <TwitterOutlined style={{ ...iconStyles, color: '#1890ff' }} />
                            </div>
                        </Space>
                        <a className='pt-5' href={`${webRoutes.register}`}>Tạo tài khoản mới</a>
                    </div>
                }
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key={'account'} tab={'Tài khoản'} />
                    <Tabs.TabPane key={'phone'} tab={'Điện thoại'} />
                </Tabs>

                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <UserOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            placeholder={'lambro25102001'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Chưa nhập tài khoản!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <LockOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            placeholder={'Banhmy09@'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Chưa nhập mật khẩu!',
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <MobileOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            name="mobile"
                            placeholder={'0979163206'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Chưa nhập số điện thoại!',
                                },
                                {
                                    pattern: /^0\d{9,10}$/,
                                    message: 'Sai định dạng số điện thoại!',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <LockOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={'Mã xác nhận'}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'giây'}`;
                                }
                                return 'Tạo mới';
                            }}
                            name="otp"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chưa điền mã xác nhận',
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success('Mã xác nhận là: 1234');
                            }}
                        />
                    </>
                )}
                <div
                    className='flex justify-between items-center'
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        Ghi nhớ đăng nhập
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        Quên mật khẩu
                    </a>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default () => {
    return (
        <div>
            {/* <VideoBackground> */}
            <ProConfigProvider >
                <Page />
            </ProConfigProvider>
            {/* </VideoBackground> */}
        </div>

    );
}