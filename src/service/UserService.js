import axios from "axios";
import { URL } from "../constant";
import { Authorization, getErrorFromResponse, header } from "../utils";
const UserService = {
    async getProfile(token) {
        try {
            const response = await axios.get(URL + '/v1/api/user/profile',
                {
                  headers : Authorization(token)  
                },
                
                );
            return response.data;
        } catch (error) {
            getErrorFromResponse(error);
        }
    }
}

export default UserService;