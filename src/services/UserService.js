import axios from 'axios'
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
const URL = "https://shoppee-fake-lpdgp.appengine.bfcplatform.vn"

const dispatch = new useDispatch();
const UserService = {

    async getProfile(token) {
        try {
            const response = await axios.post(URL + '/v1/api/account/sign-in', {
                username: username,
                password: password,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            notification.success({
                message: 'Chào mừng ' + response.data.username + " trở lại",
                duration: 3,
            });
            dispatch.setProfile(response.data.value)
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
}
export default UserService

