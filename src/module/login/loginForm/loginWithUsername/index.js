import * as React from 'react';
import { Form, QRCode, Button, Input, Checkbox, notification, Modal, Spin } from 'antd';
import { FacebookOutlined, GoogleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../../redux/authSlide';
import { LOGIN_WITH_PHONE, REGISTER } from '../../constant';
import AccountService from '../../../../service/AccountService';
import AlertMessage from '../../../../component/AlertMessage';
const LoginWithUsername = ({ setForm }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isShowModal, setIsShowModal] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [loginData, setLoginData] = React.useState({
		username: '',
		password: '',
	});

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const response =await AccountService.signIn(loginData)
			
			dispatch(login({ token: response?.token, username: response?.username, role: response?.role }));
			setIsLoading(false);
			setIsShowModal(true);
			setTimeout(() => {
				setIsShowModal(false);
				navigate(-1);
			}, 2000);
		}catch(err){

		}
	

};


const handleInputChange = (e) => {
	const { name, value } = e.target;
	console.log(name);
	console.log(value);
	setLoginData((prev) => ({
		...prev,
		[name]: value,
	}));
};

return (

	<Form className="form-container" onFinish={handleLogin}>
		<AlertMessage message={"Đăng nhập thành công"} visible={isShowModal} onClose={() => setIsShowModal(false)} status={'success'} />
		<Spin spinning={isLoading}>
			<div className="login-tittle-header">
				<h2>Đăng nhập</h2>
				<div className='qr-code'>
					<QRCode value={'localhost'} size={100} />
				</div>
			</div>
			<div className="input-container">
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập tên đăng nhập',
						},
					]}
				>
					<Input placeholder="Tên đăng nhập" name="username" value={loginData.username} onChange={handleInputChange} />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Vui lòng nhập mật khẩu',
						},
					]}
				>
					<Input.Password
						placeholder="Mật khẩu"
						name="password"
						value={loginData.password}
						onChange={handleInputChange}
					/>
				</Form.Item>
				<Form.Item className='options-actions' >
					<Checkbox>Ghi nhớ đăng nhập</Checkbox>
					<Link to={'/forgot-password'} className='forgot-password'>Quên mật khẩu?</Link>
				</Form.Item>
				<Form.Item>
					<Button className="login-button" onClick={handleLogin}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								handleLogin();
							}
						}}>Đăng nhập</Button>
				</Form.Item>
				<div className="other-login-options">
					<Button icon={<FacebookOutlined />} className="fb-login-button">
					</Button>
					<Button icon={<GoogleOutlined />} className="google-login-button">
					</Button>
					<Button icon={<PhoneOutlined />} className="phone-login-button" onClick={() => { setForm(LOGIN_WITH_PHONE) }}>
					</Button>
				</div>
				<div className='footer-text'>
					<span>
						Chưa có tài khoản?
						<Link onClick={() => setForm(REGISTER)} > Đăng ký ngay!</Link>
					</span>
				</div>
			</div>
		</Spin>
	</Form>

)
}

export default LoginWithUsername;