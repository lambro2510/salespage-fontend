import axios from "axios";
import { URL } from "../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../utils";
const UserService = {
    async getProfile() {
        try {
            const response = await axios.get(URL + '/api/v1/user/profile',
                {

                  headers : Authorization()
                },
                
                );
                return notificationFromResponse(response?.data);
            } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async uploadImage(file) {
      try {
        const response = await axios.post(
            URL + '/api/v1/user/uploadImage',
            file,
            {
                headers: { ...Authorization(), 'Content-Type': 'multipart/form-data' }
            }
        );
        return notificationFromResponse(response?.data);
    } catch (error) {
        getErrorFromResponse(error)
    }
    }

}

export default UserService;