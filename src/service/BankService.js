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

    async getListBankAccount() {
        try {
            const response = await axios.get(URL + `/api/v1/bank/link-bank-account`,
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async createListBankAccount() {
        try {
            const response = await axios.post(URL + `/api/v1/bank/list-bank-account`,
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

    async genQrForPayment(paymentId, bankInfo) {
        try {
            const response = await axios.post(URL + `/api/v1/bank/gen-qr?paymentId=${paymentId}&bin=${bankInfo?.bin}&bankAccountId=${bankInfo?.bankAccount}`,
            {},
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
    async getPaymentBank() {
        try {
            const response = await axios.get(URL + `/api/v1/bank/payment-bank-account`,
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