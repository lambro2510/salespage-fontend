import axios from 'axios'
import { notification } from 'antd';
const URL = "https://salepage-server-rherm.appengine.bfcplatform.vn"

const UserService = {

    async getProfile(token) {
        const response = await axios.get(URL + '/v1/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin' : '*'
            }
        });
        return response.data;
    }
}

export default UserService

