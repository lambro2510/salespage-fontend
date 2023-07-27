import axios from "axios";
import { URL } from "../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../utils";
const ProductCategoryService = {
    async getProductCategory() {
        try {
            const response = await axios.get(URL + '/api/v1/product-category',
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

export default ProductCategoryService;