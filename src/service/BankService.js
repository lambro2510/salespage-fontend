import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse,Authorization, notificationFromResponse } from "../utils";
const BankService = {
    async getListBank() {
        try {
            const response = await axios.get(URL + `/api/v1/bank/list-bank`,
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async bankAccountInfo(bankAccountInfo) {
        try {
            const response = await axios.get(URL + `/api/v1/bank/list-bank`,
            {
                'bin' : bankAccountInfo?.bin,
                'accountNo' : bankAccountInfo?.accountNo
            },
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async genQrForPayment(paymentId) {
        try {
            const response = await axios.post(URL + `/api/v1/bank/gen-qr?paymentId=${paymentId}`,
            {},
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },


}

export default BankService;