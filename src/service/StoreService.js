import axios from "axios";
import { URL } from "../constant";
import { Authorization, getErrorFromResponse, header } from "../utils";
const SellerStoreService = {
    async getSellerStore() {
        try {
            const response = await axios.get(URL + '/v1/api/seller-store',
                {
                    headers: Authorization()
                },

            );
            return response.data;
        } catch (error) {
            getErrorFromResponse(error);
        }
    }
}

export default SellerStoreService;