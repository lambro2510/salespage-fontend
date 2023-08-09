import axios from "axios";
import { URL } from "../../constant";
import { Authorization, getErrorFromResponse, notificationFromResponse } from "../../utils";
const ProductCategoryService = {
    async getProductCategory() {
        try {
            const response = await axios.get(URL + '/api/v1/seller/product-category',
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async getDetailProductCategory(id) {
        try {
            const response = await axios.get(URL + '/api/v1/seller/product-category/detail?id=' + id,
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async deleteProductCategory(id) {
        try {
            const response = await axios.delete(URL + '/api/v1/seller/product-category?id=' + id,
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async createProductCategory(category) {
        try {
            const response = await axios.post(URL + '/api/v1/seller/product-category',
                {
                    categoryName: category?.categoryName,
                    categoryType: category?.categoryType,
                    description: category?.description,
                    timeType: category?.timeType,
                    timeValue: category?.timeValue,
                    productType: category?.productType
                },
                {
                    headers: Authorization()
                },

            );
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },
    async updateProductCategory(category) {
        try {
            const response = await axios.put(URL + '/api/v1/seller/product-category',
                {
                    id: category?.categoryId,
                    categoryName: category?.categoryName,
                    categoryType: category?.categoryType,
                    description: category?.description,
                    timeType: category?.timeType,
                    timeValue: category?.timeValue,
                    productType: category?.productType
                },
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