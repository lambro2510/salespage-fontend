import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse, Authorization, notificationFromResponse } from "../utils";
const ProductService = {
    async findProduct(productFilter) {
        try {
            const response = await axios.get(URL + '/api/v1/public/product', {
                params: {
                    productId: productFilter?.productId,
                    productType: productFilter?.productType,
                    productName: productFilter?.productName,
                    minPrice: productFilter?.minPrice,
                    maxPrice: productFilter?.maxPrice,
                    storeName: productFilter?.storeName,
                    ownerStoreUsername: productFilter?.ownerStoreUsername,
                    page: productFilter?.page,
                    size: productFilter?.size,
                    sort: productFilter?.sort,
                },
                headers: Authorization(),
            });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    },

    async getProductType() {
        try {
            const response = await axios.get(URL + '/api/v1/public/product/type', {});
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error)
        }
    },

    async getProductDetail(productId) {
        try {
            const response = await axios.get(URL + '/api/v1/public/product/detail' + `?productId=${productId}`,
                {
                    headers: Authorization()
                });
            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error)
        }
    },
    
    async ratingProduct(productId, point) {
        try {
            const response = await axios.post(URL + `/api/v1/product/rating?productId=${productId}&point=${point}`,
                {},
                {
                    headers: Authorization(),
                });

            return notificationFromResponse(response?.data);
        } catch (error) {
            getErrorFromResponse(error);
        }
    }

}

export default ProductService;