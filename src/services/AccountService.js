import axios from 'axios'
import { notification } from 'antd';

URL = "https://shoppee-fake-lpdgp.appengine.bfcplatform.vn"

const AccountService = {
    async signIn(username, password) {
        try {
            const response = await axios.post(URL + '/v1/api/account/sign-in', {
                username: username,
                password: password
            });
            notification.success({
                message: 'Chào mừng ' + response.data.username + " trở lại",
                duration: 3,
            });
            return response.data.value;
        } catch (error) {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
                duration: 3,
            });
            throw error;
        }
    },
   
    async signUp(username, password,confirmPassword, firstName, lastName, email, phoneNumber, dateOfBirth) {
        try {
            const response = await axios.post(URL + '/v1/api/account/sign-up', {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                firstName : firstName,
                lastName : lastName,
                email :email,
                phoneNumber : phoneNumber,
                dateOfBirth : dateOfBirth
            });
            notification.success({
                message: "Tạo mới tài khoản thành công vui lòng đăng nhập",
                duration: 3,
            });
            return response.data;
        } catch (error) {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
                duration: 3,
            });
            throw error;
        }
    }
}

export default AccountService