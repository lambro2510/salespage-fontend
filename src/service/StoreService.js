import axios from "axios";
import { URL } from "../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../utils";
const SellerStoreService = {
    async getSellerStore() {
        try {
            const response = await axios.get(URL + '/v1/api/seller-store',
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    }
}

export default SellerStoreService;