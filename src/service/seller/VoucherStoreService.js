import axios from "axios";
import { URL } from "../../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../../utils";
const VoucherService = {
    async getVoucherStoreOnSeller() {
        try {
            const response = await axios.get(URL + `/api/v1/seller/voucher/voucher-store`,
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
    async getUserVoucherForProduct(productId) {
        try {
            const response = await axios.get(URL + `/api/v1/voucher/user/voucher?productId=${productId}`,
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async getVoucherStore() {
        try {
            const response = await axios.get(URL + `/api/v1/voucher/voucher-store`,
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

export default VoucherService;