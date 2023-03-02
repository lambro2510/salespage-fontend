import axios from 'axios'

const URL = "https://salepage-server-rherm.appengine.bfcplatform.vn/"

const UserService = {

    async getProfile(token) {
        const response = await axios.get(URL + 'v1/api/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
}

export default UserService

