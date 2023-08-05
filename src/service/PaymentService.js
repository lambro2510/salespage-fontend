import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse,Authorization, notificationFromResponse } from "../utils";
const PaymentService = {
    async createPayment(paymentInfo) {
        try {
            const response = await axios.post(URL + '/api/v1/payment/create-payment',
            {
                'bankAccountId' : paymentInfo?.bankAccountId,
                'amount' : paymentInfo?.amount
            },
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async cancelPayment(paymentId) {
        try {
            const response = await axios.put(URL + `/api/v1/payment/cancel-payment?paymentId=${paymentId}`,
            {},
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async confirmPayment(paymentId) {
        try {
            const response = await axios.post(URL + `/api/v1/payment/confirm-payment?paymentId=${paymentId}`,
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async getPaymentTransaction() {
        try {
            const response = await axios.get(URL + `/api/v1/payment/payment-transaction`,
            {
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
}

export default PaymentService;