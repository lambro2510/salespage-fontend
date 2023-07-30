import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse, Authorization, notificationFromResponse } from "../utils";
const ProductTransactionService = {
    async findProduct(productTransaction) {
        try {
            const response = await axios.post(URL + '/api/v1/product-transaction', {
                params: {
                    quantity: productTransaction?.quantity,
                    note: productTransaction?.note,
                    address: productTransaction?.address,
                    productId: productTransaction?.productId,
                    voucherCode: productTransaction?.voucherCode
                },
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

}

export default ProductTransactionService;