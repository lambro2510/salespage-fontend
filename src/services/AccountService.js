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
                message: 'Đăng nhập thành công',
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