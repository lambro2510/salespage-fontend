import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse, header } from "../utils";
const UserService = {
    async getProfile(token) {
        try {
            const response = await axios.post(URL + '/v1/api/user/profile',
                {},
                header(token)
                );
            return response.data;
        } catch (error) {
            getErrorFromResponse(error);
        }
    }
}

export default UserService;