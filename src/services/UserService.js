import axios from 'axios'
import { notification } from 'antd';
const URL = "https://shoppee-fake-lpdgp.appengine.bfcplatform.vn"

const UserService = {

    async getProfile(token) {
        try {
            const response = await axios.get(URL + '/v1/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            notification.success({
                message: 'Chào mừng ' + response.data.username + " trở lại",
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
    },
}
export default UserService

