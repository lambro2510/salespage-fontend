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
    },
    async getStoreDetail(storeId) {
        try {
            const response = await axios.get(URL + `/api/v1/public/seller-store/detail?storeId=${storeId}`,
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
    async deleteStore(storeId) {
        try {
            const response = await axios.get(URL + `/api/v1/seller-store?storeId=${storeId}`,
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
    async updateStore(store) {
        try {
            const response = await axios.put(URL + `/api/v1/seller-store`,
                { store },
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
}

export default SellerStoreService;