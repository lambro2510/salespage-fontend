import axios from "axios";
import { URL } from "../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../utils";
const UserService = {
    async getProfile(token) {
        try {
            const response = await axios.get(URL + '/v1/api/user/profile',
                {
                  headers : Authorization(token)  
                },
                
                );
                return notificationFromResponse(response?.data);
            } catch (error) {
            getErrorFromResponse(error);
        }
    }
}

export default UserService;