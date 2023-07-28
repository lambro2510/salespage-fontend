import axios from "axios";
import { URL } from "../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../utils";
const SellerStoreService = {
    async getSellerStore() {
        try {
            const response = await axios.get(URL + '/api/v1/seller-store',
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